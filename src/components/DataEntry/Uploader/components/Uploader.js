/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import Figure from './Figure'
import Toast from 'components/Feedback/Toast/'
import '../style/uploader.scss'

// 统计img总数 防止重复
let imgNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return 'img-' + new Date().getTime() + '-' + imgNumber++;
};

// 内置的一个获取图片key的format方法
const getImgKey = (item) => (item.imgKey);

class Uploader extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            imgArray: [] // 图片已上传 显示的数组
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReUpload = this.handleReUpload.bind(this);
        this.compress = this.compress.bind(this);
        this.processData = this.processData.bind(this);
    }
    componentDidMount () {
        // 判断是否有初始化的数据传入
        const {data} = this.props;

        if(data && data.length > 0){
            this.setState({imgArray: data});
        }
    }
    componentWillUnmount () {
        this._isMounted = true;
    }
    handleReUpload (id) {
        // 根据id重新上传
        const {imgArray} = this.state;

        const errorItem = imgArray.filter((item)=>{
            if(item.id === id) return true;
        })[0];

        // set新的state
        errorItem.status = 1;
        this.setState({imgArray});

        this.processFormData(errorItem);
    }
    handleDelete(id) {
        this.setState((previousState)=>{
            previousState.imgArray = previousState.imgArray.filter((item)=>(item.id !== id));
            return previousState;
        });
    }
    handleProgress (id, e) {
        // 监听上传进度 操作DOM 显示进度
        const number = Number.parseInt((e.loaded / e.total) * 100) + '%';
        const text = document.querySelector('#text-'+id);

        if(text) text.innerHTML = number;
    }
    handleUploadEnd (data, response, status) {
        // 隐藏进度
        const text = document.querySelector('#text-'+ data.uuid);
        if(text) text.innerHTML = '';

        // 处理页面卸载的情况
        if(this._isMounted) return;

        // 准备一条标准数据
        const _this = this;
        const obj = {
            id: data.uuid,
            uuid: data.uuid,
            imgKey: '',
            imgUrl: '',
            name: data.file.name,
            dataUrl: data.dataUrl,
            compressedDataUrl: data.compressedDataUrl,
            blob: data.blob,
            file: data.file,
            status: status
        };

        // 更改状态
        this.setState((previousState)=>{
            previousState.imgArray = previousState.imgArray.map((item)=>{
                if(item.id === data.uuid){
                    item = obj;
                }

                return item;
            });
            return previousState;
        });

        // 上传下一个
        const nextUpload = this.uploadGen.next();
        if(!nextUpload.done){
            nextUpload.value.map((item)=>{
                _this.compress(item, _this.processData);
            });
        }
    }
    handleInputChange (event) {
        const {typeArray, max, maxSize} = this.props;
        const {imgArray} = this.state;
        const _this = this;
        const uploadedImgArray = []; // 真正在页面显示的图片数组
        const uploadQueue = []; // 图片上传队列 这个队列是在图片选中到上传之间使用的 上传完成则清除

        // event.target.files是个类数组对象 需要转成数组方便处理
        const selectedFiles = Array.prototype.slice.call(event.target.files).map((item)=>(item));

        // 检查文件个数 页面显示的图片个数不能超过限制
        if(imgArray.length + selectedFiles.length > max){
            Toast.error('文件数量超出最大值', 2000, undefined, false);
            return;
        }

        let imgPass = {typeError: false, sizeError: false};

        // 循环遍历检查图片 类型、尺寸检查
        selectedFiles.map((item)=>{
            // 图片类型检查
            if(typeArray.indexOf(item.type.split('/')[1]) === -1){
                imgPass.typeError = true;
            }
            // 图片尺寸检查
            if(item.size > maxSize * 1024){
                imgPass.sizeError = true;
            }

            // 为图片加上位移id
            const uuid = getUuid();
            // 页面显示加入数据
            this.transformFileToDataUrl(item, (data)=>{
                // 上传队列加入该数据
                uploadQueue.push({uuid: uuid, file: item, dataUrl: data});

                uploadedImgArray.push({ // 显示在页面的数据的标准格式
                    id: uuid, // 图片唯一id
                    dataUrl: data, // 图片的base64编码
                    imgKey: '', // 图片的key 后端上传保存使用
                    imgUrl: '', // 图片真实路径 后端返回的
                    name: item.name, // 图片的名字
                    status: 1 // status表示这张图片的状态 1：上传中，2上传成功，3：上传失败
                });
            });
        });

        // 有错误跳出
        if(imgPass.typeError){
            Toast.error('不支持文件类型', 2000, undefined, false);
            return;
        }

        if(imgPass.sizeError){
            Toast.error('文件大小超过限制', 2000, undefined, false);
            return;
        }

        const timer = setInterval(function () {
            if(uploadedImgArray.length === selectedFiles.length){
                clearInterval(timer);

                // 没错误准备上传
                // 页面先显示一共上传图片个数
                _this.setState({imgArray: imgArray.concat(uploadedImgArray)});

                // 通过该函数获取每次要上传的数组
                _this.uploadGen = _this.uploadGenerator(uploadQueue);
                // 第一次要上传的数量
                const firstUpload = _this.uploadGen.next();

                // 真正开始上传流程
                firstUpload.value.map((item)=>{
                    /**
                     * 图片上传分成5步
                     * 图片转dataUrl
                     * 压缩
                     * 处理数据格式
                     * 准备数据上传
                     * 上传
                     *
                     * 前两步是回调的形式 后面是同步的形式
                     */
                    _this.compress(item, _this.processData);
                });
            }
        }, 20);
    }
    *uploadGenerator (uploadQueue) {
        /**
         * 多张图片并发上传控制规则
         * 上传1-max数量的图片
         * 设置一个最大上传数量
         * 保证最大只有这个数量的上传请求
         *
         */
            // 最多只有三个请求在上传
        const {maxUploadSize} = this.props;

        if(uploadQueue.length > maxUploadSize){

            const result = [];

            for(let i = 0; i < uploadQueue.length; i++){
                // 第一次return maxUploadSize数量的图片
                if(i < maxUploadSize){
                    result.push(uploadQueue[i]);

                    if(i === maxUploadSize - 1){
                        yield result;
                    }
                } else {
                    yield [uploadQueue[i]];
                }
            }

        } else {
            yield uploadQueue.map((item)=>(item));
        }
    }
    transformFileToDataUrl (file, callback) {
        /**
         * 图片上传流程的第一步
         * @param data file文件
         */
            // 封装好的函数
        const reader = new FileReader();

        // ⚠️ 这是个回调过程 不是同步的
        reader.onload = function(e) {
            const result = e.target.result;

            callback(result);
        };

        reader.readAsDataURL(file);
    }
    compress (data, callback) {
        /**
         * 压缩图片
         * @param data file文件 数据会一直向下传递
         * @param callback 下一步回调
         */
        const {compressionRatio, compress} = this.props;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
        const imgFile = data.file;
        const img = new window.Image();

        img.src = data.dataUrl;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let compressedDataUrl;

            if(compress && imgFile.length > imgCompassMaxSize){
                compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }

            data.compressedDataUrl = compressedDataUrl;

            callback(data);
        }
    }
    processData (data) {
        // 为了兼容性 处理数据
        const dataURL = data.compressedDataUrl;
        const imgFile = data.file;
        const binaryString = window.atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }

        const fileData = [intArray];

        let blob;

        /* eslint-disable */
        try {
            blob = new Blob(fileData, { type: imgFile.type });
        } catch (error) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (error.name === 'TypeError' && window.BlobBuilder){
                const builder = new BlobBuilder();
                builder.append(arrayBuffer);
                blob = builder.getBlob(imgFile.type);
            } else {
                throw new Error('版本过低，不支持上传图片');
            }
        }
        /* eslint-disable */

        data.blob = blob;

        this.processFormData(data);
    }
    processFormData (data) {
        // 准备上传数据
        const formData = new FormData();
        const imgFile = data.file;
        const blob = data.blob;

        // type
        formData.append('type', blob.type);
        // size
        formData.append('size', blob.size);
        // append 文件
        formData.append('file', blob, imgFile.name);

        this.uploadImg(data, formData);
    }
    uploadImg (data, formData) {
        // 开始发送请求上传
        const _this = this;
        const xhr = new XMLHttpRequest();
        const {uploadUrl} = this.props;

        // 进度监听
        xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this, data.uuid), false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // const result = JSON.parse(xhr.responseText);
                if (xhr.status === 200 || xhr.status === 201) {
                    // 上传成功
                    _this.handleUploadEnd(data, undefined, 2);
                } else {
                    // 上传失败
                    _this.handleUploadEnd(data, undefined, 3);
                }
            }
        };

        xhr.open('POST', uploadUrl , true);
        xhr.send(formData);
    }
    getImgArray (format = getImgKey) {
        // 获取图片数据，供使用者调用
        const {imgArray} = this.state;

        return imgArray.map(format);
    }
    getUploadStatus () {
        // 获取目前上传状态
        // 1 全部上传成功 2 有图片正在上传 3 有图片上传失败
        const {imgArray} = this.state;
        let uploadingArray = 0;
        let errorArray = 0;

        imgArray.map((item)=>{
            switch (item.status) {
                case 1: {
                    uploadingArray++;
                    break;
                }
                case 3: {
                    errorArray++;
                    break;
                }
            }
        });

        return (uploadingArray || errorArray) > 0 ? errorArray > 0 ? 3 : 2 : 1 ;
    }
    getImagesListDOM () {
        // 处理显示图片的DOM
        const {max, prefixCls} = this.props;
        const _this = this;
        const result = [];
        const uploadingArray = [];
        const imgArray = this.state.imgArray;

        imgArray.map((item)=>{
            result.push(
                <Figure
                    key={item.id} {...item}
                    onDelete={_this.handleDelete}
                    onError={_this.handleReUpload}
                />
            );

            // 正在上传的图片
            if(item.status === 1){
                uploadingArray.push(item);
            }
        });

        // 图片数量达到最大值
        if(result.length >= max ) return result;

        let onPress = ()=>{_this.refs.input.click();};

        //  或者有正在上传的图片的时候 不可再上传图片
        if(uploadingArray.length > 0) {
            onPress = undefined;
        }

        // 简单的显示文案逻辑判断
        let text = '上传图片';

        if(imgArray.length > 0){
            // 上传成功 / 上传总数
            text = (imgArray.filter((item)=>{if(item.status === 2) return true}).length) + '/' + imgArray.length;
        }

        result.push(
            <div key="button" className={`${prefixCls}-button`} onClick={onPress}>
                <span key="icon" className="fa fa-camera" />
                <p className="text">{text}</p>
            </div>
        );

        return result;
    }
    render () {
        const {prefixCls} = this.props;
        const imagesList = this.getImagesListDOM();

        return (
            <div className={prefixCls}>
                {imagesList}
                <input
                    ref="input" type="file"
                    className="file-input" name="image"
                    accept="image/*" multiple="multiple"
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }
}

Uploader.propTypes = {
    uploadUrl: React.PropTypes.string.isRequired, // 图上传路径
    prefixCls: React.PropTypes.string, // class前缀
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number, // 图片压缩比例 单位：%
    data: React.PropTypes.array, // 初始化数据 其中的每个元素必须是标准化数据格式
    max: React.PropTypes.number, // 最大上传图片数
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    maxUploadSize: React.PropTypes.number, // 最大同时上传数目
    typeArray: React.PropTypes.array, // 支持图片类型数组
};

Uploader.defaultProps = {
    prefixCls: 'zby-uploader',
    compress: true,
    compressionRatio: 20,
    data: [],
    max: 9,
    maxSize: 5 * 1024, // 5MB
    maxUploadSize: 3,
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
};

export default Uploader