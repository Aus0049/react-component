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
        this.uploadQuene = []; // 选中图片待上传队列
        this.handleInputChange = this.handleInputChange.bind(this);
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
                <input ref="input" type="file" className="file-input" name="image" accept="image/*" multiple="multiple" onChange={this.handleInputChange} />
            </div>
        )
    }
}

function empty() {}

Uploader.propTypes = {
    data: React.PropTypes.array.isRequired, // 图片缓存区数组
    uploadUrl: React.PropTypes.string.isRequired, // 图上传路径
    typeArray: React.PropTypes.array, // 支持类型数组
    max: React.PropTypes.number, // 最大上传图片数
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number, // 图片压缩比例 单位：%
    onChange: React.PropTypes.func.isRequired, // 图片上传之后的回调
    onDelete: React.PropTypes.func.isRequired, // 图片删除之后的回调
    onLoadEnd: React.PropTypes.func// 图片全部上传完成之后的回调
};

Uploader.defaultProps = {
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
    maxSize: 5 * 1024, // 5MB
    compress: true,
    compressionRatio: 20,
    onLoadEnd: empty
};

export default Uploader