/**
 * Created by Aus on 2017/7/6.
 */
import React from 'react'
import classNames from 'classnames'

// Figure就是每个图片的容器 以及实现预览的容器
const Figure = (props) => {
    const {status, imgUrl, dataUrl, id, onDelete} = props;
    const src = imgUrl ? imgUrl : dataUrl;

    const handleDelete = () => {
        if(onDelete) onDelete(id);
    };

    return (
        <div className={classNames('zby-img-preview-box', {loading: status === 1}, {loaded: status === 2}, {error: status === 3})}>
            {src ? <img src={src} onClick={()=>{imgUrl ? window.open(imgUrl) : ''}}/> : <div className="uploading"><i className="fa fa-picture-o"></i></div>}
            {status === 1 ? <div className="progress-text" id={`text-${id}`}></div> : ''}
            {status === 1 ? <div className="progress" id={`progress-${id}`}></div> : ''}
            {status === 2 || status === 3 ? <div className="close" onClick={handleDelete}><i className="fa fa-times"></i></div> : ''}
        </div>
    )
};

function empty() {}

Figure.propTypes = {
    id: React.PropTypes.string.isRequired, // 图片的id
    status: React.PropTypes.oneOf([1,2,3]).isRequired, // 此图片上传的状态 1:上传中,2:上传成功,3:上传失败
    canPreview: React.PropTypes.bool, // 是否使用预览功能
    dataUrl: React.PropTypes.string, // 图片的base64编码
    imgKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]), // 图片的key 很多后端只保存key 图片的url是可变的
    imgUrl: React.PropTypes.string, // 图片的路径
    onDelete: React.PropTypes.func, // 删除的回调
};

Figure.defaultProps = {
    canPreview: true,
    dataUrl: '',
    imgKey: '',
    imgUrl: '',
    isPreview: false,
    onDelete: empty
};

export default Figure;