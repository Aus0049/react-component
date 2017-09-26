/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import Figure from './Figure'
import Toast from '../../../Feedback/Toast/components/Toast'
import '../style/index.scss'

// 统计img总数 防止重复
let imgNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return "img-" + new Date().getTime() + "-" + imgNumber++;
};

class Uploader extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            imgArray: [] // 图片已上传 显示的数组
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.compress = this.compress.bind(this);
        this.processData = this.processData.bind(this);
    }
    componentDidmount () {
        // 判断是否有初始化的数据传入
        const {data} = this.props;

        if(data && data.length > 0){
            this.setState({imgArray: data});
        }
    }
    handleInputChange (event) {
        const _this = this;
        const {typeArray, maxSize} = this.props;
        const uploadedImgArray = [];
        const uploadQueue = [];
        // 遍历数组 给每个item加上uuid
        const selectedFiles = Array.prototype.slice.call(event.target.files).map((item)=>(item));

        // 检查文件个数
        if(this.state.imgArray.length + selectedFiles.length > maxSize){
            Toast.error('文件数量超出最大值', 2000, undefined, false);
            return;
        }

        // 循环遍历检查图片
        // 类型尺寸检查
        selectedFiles.map((item)=>{
            // 图片类型检查
            if(typeArray.indexOf(item.type.split('/')[1]) === -1){
                Toast.error('不支持文件类型', 2000, undefined, false);
                return;
            }
            // 图片尺寸检查
            if(item.size > maxSize * 1024){
                Toast.error('文件大小超过限制', 2000, undefined, false);
                return;
            }

            const uuid = getUuid();

            uploadQueue.push({uuid: uuid, file: item});
            // 文件检查无误 这些图片都将被上传
            uploadedImgArray.push(
                // status表示这张图片的状态 1：上传中，2上传成功，3：上传失败
                {id: uuid, imgKey: '', imgUrl: '', name: item.name, dataUrl: '', status: 1}
            );
        });

        this.setState({
            imgArray: uploadedImgArray
        });

        // 通过该函数拿到要上传的图片及个数
        this.uploadGen = this.uploadGenerator(uploadQueue);

        const firstUpload = this.uploadGen.next();

        firstUpload.value.map((item)=>{
            // 图片转dataUrl 开始上传
            this.transformFileToDataUrl(item, this.compress, this.processData);
        });
    }
    *uploadGenerator (selectedFiles) {
        // 获取相应的图片进行上传
        // 第一次执行的时候，取前三个数据上传
        // 判断图片张数
        if(selectedFiles.length > 3){
            // return 3张图片
            yield [selectedFiles[0], selectedFiles[1], selectedFiles[2]];

            // 后面每次取一张
            for(let i = 3; i < selectedFiles.length; i++){
                yield selectedFiles[i];
            }

        } else {
            yield selectedFiles.map((item)=>(item));
        }
    }
    transformFileToDataUrl (item, callback, compressCallback) {
        const {compress} = this.props;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

        // 封装好的函数
        const reader = new FileReader();

        reader.onload = function(e) {
            const result = e.target.result;

            if(compress && result.length > imgCompassMaxSize){
                callback({file: item.file, dataUrl: result, compress: true}, compressCallback); // 图片压缩
            } else {
                callback({file: item.file, dataUrl: result, compress: false}, compressCallback); // 图片不压缩
            }
        };

        reader.readAsDataURL(item.file);
    }
    compress (data, callback) {
        const {compressionRatio} = this.props;
        const imgFile = data.file;
        const img = new window.Image();

        img.src = data.dataURL;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let compressedDataUrl;

            if(data.compress){
                compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }

            data.compressedDataUrl = compressedDataUrl;

            callback(data);
        }
    }
    processData (data) {
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

        data.blob = blob;
        this.processFormData(data);
    }
    processFormData (data) {
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
        const _this = this;
        const imgFile = data.file;
        const xhr = new XMLHttpRequest();
        const {uploadUrl} = this.props;

        // 进度监听
        xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this, imgFile.uuid), false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    // 上传成功
                    _this.handleUploaded(imgFile, 2);
                } else {
                    // 上传失败
                    _this.handleUploaded(imgFile, 3);
                }
            }
        };
        xhr.open('POST', uploadUrl , true);
        xhr.send(formData);
    }
    handleProgress (id, e) {
        // 上传中
        const number = Number.parseInt((e.loaded / e.total) * 100) + "%";
        const text = document.querySelector('#text-'+id);
        const progress = document.querySelector('#progress-'+id);

        text.innerHTML = number;
        progress.style.width = number;
    }
    handleUploaded (file, status) {
        // 准备一条标准数据
        const _this = this;
        const obj = {id: file.uuid, imgKey: '', imgUrl: '', name: file.name, dataUrl: file.dataUrl, status: status};

        // 更改状态
        this.setState((previousState)=>{
            return previousState.map((item)=>{
                if(item.uuid === file.uuid){
                    item = obj;
                }
            });
        });

        // 上传下一个
        const nextUpload = this.uploadGen.next();

        if(nextUpload.status){
            nextUpload.map((item)=>{
                _this.transformFileToDataUrl(item, _this.compress, _this.processData);
            });
        }
    }
    handleDelete (id) {
        // const {onDelete} = this.props;
        // if(onDelete) onDelete(id);
    }
    getImagesListDOM () {
        const {max} = this.props;
        const result = [];
        const _this = this;
        const data = this.state.imgArray;

        data.map((item)=>{
            result.push(
                <Figure key={item.id} {...item} onDelete={_this.handleDelete.bind(_this)} />
            );
        });

        const figureInShow = data.filter(item => item.status !== 'deleted');

        if(max && figureInShow.length >= max) return result;

        result.push(
            <Touchable
                key="add"
                activeClassName={'zby-upload-img-active'}
                onPress={()=>{_this.refs.input.click();}}>
                <div className="zby-upload-img">
                    <i key="icon" className="fa fa-plus"></i>
                    <p className="text">上传图片</p>
                </div>
            </Touchable>
        );

        return result;
    }
    render () {
        const imagesList = this.getImagesListDOM();
            
        return (
            <div className="zby-uploader-box">
                {imagesList}
                <input ref="input" type="file" className="file-input" name="image" accept="image/*" multiple="multiple" onChange={this.handleInputChange} />
            </div>
        )
    }
}

function empty() {}

Uploader.propTypes = {
    uploadUrl: React.PropTypes.string.isRequired, // 图上传路径
    data: React.PropTypes.array, // 图片缓存区数组
    typeArray: React.PropTypes.array, // 支持类型数组
    max: React.PropTypes.number, // 最大上传图片数
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number // 图片压缩比例 单位：%
};

Uploader.defaultProps = {
    data: [],
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
    maxSize: 5 * 1024, // 5MB
    compress: true,
    compressionRatio: 20
};

export default Uploader