/**
 * Created by Aus on 2017/7/6.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/figure.scss'

// Figure就是每个图片的容器 以及实现预览的容器
const Figure = (props) => {
    const {id, prefixCls, status, canPreview, imgUrl, dataUrl, canDelete, onDelete, onError} = props;
    const src = imgUrl ? imgUrl : dataUrl;
    const handleReUpload = function () {onError(id);};

    const handlePreview = function () {
        // 打开预览
        if(!canPreview) return;

        // 动态插入dom
        const img = document.createElement('img');
        img.src = src;
        const mask = document.createElement('div');
        mask.id = 'preview-' + id;
        mask.className = `${prefixCls}-preview-container`;
        mask.onclick = handleClosePreview;
        mask.appendChild(img);

        document.body.appendChild(mask);
    };

    const handleClosePreview = function () {
        document.getElementById('preview-' + id).remove();
    };

    const handleDelete = function (e) {

        e.stopPropagation();

        document.getElementById(id).className += ' deleted';
        const timer = setTimeout(function () {
            clearTimeout(timer);
            onDelete(id);
        }, 300);
    };

    const previewBoxDOM = function () {
        switch (status) {
            case 1: {
                // 上传中
                return (
                    <div
                        id={id}
                        className={classNames([prefixCls, 'loading'])}
                        onClick={handlePreview}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} />
                    </div>
                );
            }
            case 2: {
                // 上传成功
                return (
                    <div
                        id={id}
                        className={classNames([prefixCls, 'loaded'])}
                        onClick={handlePreview}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} />
                        {canDelete ? <div className="close" onClick={handleDelete}><span className="fa fa-times" /></div> : null}
                    </div>
                );
            }
            case 3: {
                // 上传失败
                return (
                    <div
                        id={id}
                        className={classNames([prefixCls, 'error'])}
                        onClick={handleReUpload}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} ><span className="fa fa-refresh" /></div>
                        {canDelete ? <div className="close" onClick={handleDelete}><span className="fa fa-times" /></div> : null}
                    </div>
                );
            }
        }
    }();

    return (
        <div className={`${prefixCls}-with-preview`}>
            {previewBoxDOM}
        </div>
    );
};

function empty() {}

Figure.propTypes = {
    id: React.PropTypes.string.isRequired, // 图片的id
    status: React.PropTypes.oneOf([1,2,3]).isRequired, // 此图片上传的状态 1:上传中,2:上传成功,3:上传失败
    prefixCls: React.PropTypes.string, // class前缀
    canPreview: React.PropTypes.bool, // 是否使用预览功能
    canDelete: React.PropTypes.bool, // 是否可以删除
    dataUrl: React.PropTypes.string, // 图片的base64编码
    imgUrl: React.PropTypes.string, // 图片的路径
    onDelete: React.PropTypes.func, // 删除的回调
    onError: React.PropTypes.func, // 上传失败的回调
};

Figure.defaultProps = {
    prefixCls: 'zby-figure',
    canPreview: true,
    canDelete: true,
    dataUrl: '',
    imgUrl: '',
    onDelete: empty,
    onError: empty
};

export default Figure;