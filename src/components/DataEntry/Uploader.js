/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import Touchable from 'rc-touchable'

class Uploader extends React.Component{
    constructor (props) {
        super(props);
        this.imgFile = {};
    }
    static propTypes = {
        data: React.PropTypes.array, // 图片缓存区数组
        uploadUrl: React.PropTypes.string, // 图上传路径
    };
    static defaultProps = {

    };
    handleInputChange (event) {
        const file = event.target.files[0];

        // 图片转dataUrl
        this.transformFileToDataUrl(file);
    }
    transformFileToDataUrl (file) {
        const _this = this;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

        // 存储文件相关信息
        this.imgFile.type = file.type || 'image/jpeg';
        this.imgFile.size = file.size;
        this.imgFile.name = file.name;

        // 封装好的函数
        const reader = new FileReader();

        reader.onload = function(e) {
            const result = e.target.result;

            if(result.length < imgCompassMaxSize) {
                _this.compress(result, _this.processData.bind(_this), false );    // 图片不压缩
            } else {
                _this.compress(result, _this.processData.bind(_this));            // 图片压缩
            }
        };

        reader.readAsDataURL(file);
    }
    compress (dataURL, callback, shouldCompress = true) {
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
                compressedDataUrl = canvas.toDataURL(imgFile.type, 0.2);
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
        const imgFile = this.imgFile;
        const xhr = new XMLHttpRequest();
        const {uploadUrl, onChange} = this.props;

        // 进度监听
        // xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this), false);
        // 加载监听
        // xhr.addEventListener('load', ()=>{console.log("加载中");}, false);
        // 错误监听
        // xhr.addEventListener('error', ()=>{Toast.error("上传失败！", 2000, undefined, false);}, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const result = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    // 上传成功
                    if(onChange) {
                        onChange({key: '', url: '', name: imgFile.name, dataUrl: imgFile.dataUrl});
                    }
                } else {
                    // 上传失败
                }
            }
        };
        xhr.open('POST', uploadUrl , true);
        xhr.send(formData);
    }
    getImagesListDOM () {
        const {data} = this.props;
        const result = [];
        const _this = this;

        data.map((item, index)=>{
            result.push(
                <div key={index} className="zby-img-preview-box">
                    <img src={item.src} alt=""/>
                </div>
            );
        });

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
                <input ref="input" type="file" className="file-input" name="image" accept="image/*" onChange={this.handleInputChange.bind(this)} />
            </div>
        )
    }
}

export default Uploader