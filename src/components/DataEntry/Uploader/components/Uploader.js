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

Uploader.propTypes = {
    uploadUrl: React.PropTypes.string.isRequired, // 图上传路径
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number, // 图片压缩比例 单位：%
    data: React.PropTypes.array, // 初始化数据 其中的每个元素必须是标准化数据格式
    max: React.PropTypes.number, // 最大上传图片数
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    typeArray: React.PropTypes.array, // 支持图片类型数组
};

Uploader.defaultProps = {
    compress: true,
    compressionRatio: 20,
    data: [],
    max: 9,
    maxSize: 5 * 1024, // 5MB
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
};

export default Uploader