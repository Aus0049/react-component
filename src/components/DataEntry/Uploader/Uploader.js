/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import Figure from './Figure'
import Toast from '../../Feedback/Toast'
import './style/index.scss'

// 统计img总数 防止重复
let imgNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return "img-" + new Date().getTime() + "-" + imgNumber++;
};

class Uploader extends React.Component{
    constructor (props) {
        super(props);
        this.imgFile = {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange (event) {
        const file = event.target.files[0];
        const {typeArray, maxSize} = this.props;
        // 图片类型检查
        if(typeArray.indexOf(file.type.split('/')[1]) === -1){
            Toast.error('不支持文件类型', 2000, undefined, false);
            return;
        }
        // 图片尺寸检查
        if(file.size > maxSize * 1024){
            Toast.error('文件大小超过限制', 2000, undefined, false);
            return;
        }
        // 图片转dataUrl
        this.transformFileToDataUrl(file);
    }
    transformFileToDataUrl (file) {
        const _this = this;
        const {compress} = this.props;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

        // 存储文件相关信息
        this.imgFile.type = file.type || 'image/jpeg';
        this.imgFile.size = file.size;
        this.imgFile.name = file.name;

        // 封装好的函数
        const reader = new FileReader();

        reader.onload = function(e) {
            const result = e.target.result;

            if(compress && result.length > imgCompassMaxSize){
                _this.compress(result, _this.processData.bind(_this));            // 图片压缩
            } else {
                _this.compress(result, _this.processData.bind(_this), false );    // 图片不压缩
            }
        };

        reader.readAsDataURL(file);
    }
    compress (dataURL, callback, shouldCompress = true) {
        const {compressionRatio} = this.props;
        const imgFile = this.imgFile;
        const img = new window.Image();

        img.src = dataURL;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let compressedDataUrl;

            if(shouldCompress){
                compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }

            callback(compressedDataUrl);
        }
    }
    processData (dataURL) {
        this.imgFile.dataUrl = dataURL;

        const binaryString = window.atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);
        const imgFile = this.imgFile;

        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }

        const data = [intArray];

        let blob;

        try {
            blob = new Blob(data, { type: imgFile.type });
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

        this.processFormData(blob);
    }
    processFormData (blob) {
        const formData = new FormData();
        const imgFile = this.imgFile;

        // type
        formData.append('type', blob.type);
        // size
        formData.append('size', blob.size);
        // append 文件
        formData.append('file', blob, imgFile.name);

        this.uploadImg(formData);
    }
    uploadImg (formData) {
        const _this = this;
        const imgFile = this.imgFile;
        const xhr = new XMLHttpRequest();
        const {uploadUrl, onChange} = this.props;
        const uuid = getUuid();

        // 开始发送ajax
        if(onChange) {
            onChange({id: uuid, imgKey: '', imgUrl: '', name: imgFile.name, dataUrl: '', status: 'loading'});
        }

        // 进度监听
        xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this, uuid), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    // 上传成功
                    if(onChange) {
                        onChange({id: uuid, imgKey: '', imgUrl: '', name: imgFile.name, dataUrl: imgFile.dataUrl, status: 'loaded'});
                    }
                } else {
                    // 上传失败
                    if(onChange) {
                        onChange({id: uuid, imgKey: '', imgUrl: '', name: imgFile.name, dataUrl: imgFile.dataUrl, status: 'error'});
                    }
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
    handleDelete (id) {
        const {onDelete} = this.props;
        if(onDelete) onDelete(id);
    }
    getImagesListDOM () {
        const {data, max} = this.props;
        const result = [];
        const _this = this;

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
                <input ref="input" type="file" className="file-input" name="image" accept="image/*" onChange={this.handleInputChange} />
            </div>
        )
    }
}

Uploader.propTypes = {
    data: React.PropTypes.array.isRequired, // 图片缓存区数组
    uploadUrl: React.PropTypes.string.isRequired, // 图上传路径
    onChange: React.PropTypes.func.isRequired, // 图片上传之后的回调
    onDelete: React.PropTypes.func.isRequired, // 图片删除之后的回调
    typeArray: React.PropTypes.array, // 支持类型数组
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number, // 图片压缩比例 单位：%
    max: React.PropTypes.number // 最大上传图片数
};

Uploader.defaultProps = {
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
    maxSize: 5 * 1024, // 5MB
    compress: true,
    compressionRatio: 20
};

export default Uploader