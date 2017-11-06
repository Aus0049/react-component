/**
 * Created by Aus on 2017/7/6.
 */
import React from 'react'
import classNames from 'classnames'
import '../style/figure.scss'

// Figure就是每个图片的容器 以及实现预览的容器
class Figure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePreview = this.handlePreview.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReUpload = this.handleReUpload.bind(this);
        this.handleClosePreview = this.handleClosePreview.bind(this);
    }
    componentWillUnmount () {
        const {id} = this.props;
        const mask = document.getElementById('preview-' + id);

        if(mask) mask.remove();
    }
    handlePreview () {
        const {prefixCls, id, imgUrl, dataUrl, canPreview} = this.props;
        const src = imgUrl ? imgUrl : dataUrl;
        // 打开预览
        if(!canPreview) return;

        // 动态插入dom
        const img = document.createElement('img');
        img.src = src;
        img.onclick = this.handleClosePreview;
        const mask = document.createElement('div');
        mask.id = 'preview-' + id;
        mask.className = `${prefixCls}-preview-container`;
        mask.onclick = this.handleClosePreview;
        mask.appendChild(img);

        document.body.appendChild(mask);
    }
    handleDelete (e) {
        const {id, onDelete} = this.props;
        e.stopPropagation();
        document.getElementById(id).className += ' deleted';
        const timer = setTimeout(() => {
            clearTimeout(timer);
            onDelete(id);
        }, 300);
    }
    handleReUpload () {
        const {id, onError} = this.props;
        onError(id);
    }
    handleClosePreview (e) {
        const {id} = this.props;
        document.getElementById('preview-' + id).remove();
        e.stopPropagation();
    }
    getPreviewBoxDOM () {
        const {prefixCls, id, status, imgUrl, dataUrl, canDelete} = this.props;
        const src = imgUrl ? imgUrl : dataUrl;

        switch (status) {
            case 1: {
                // 上传中
                return (
                    <div
                        id={id}
                        className={`${prefixCls}-preview-box loading`}
                        onClick={this.handlePreview}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} />
                        {canDelete ? <div className="close" onClick={this.handleDelete}><span className="fa fa-times" /></div> : null}
                    </div>
                );
            }
            case 2: {
                // 上传成功
                return (
                    <div
                        id={id}
                        className={`${prefixCls}-preview-box loaded`}
                        onClick={this.handlePreview}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} />
                        {canDelete ? <div className="close" onClick={this.handleDelete}><span className="fa fa-times" /></div> : null}
                    </div>
                );
            }
            case 3: {
                // 上传失败
                return (
                    <div
                        id={id}
                        className={`${prefixCls}-preview-box error`}
                        onClick={this.handleReUpload}
                    >
                        <div className="img-box"><img src={src}/></div>
                        <div className="progress-text" id={`text-${id}`} ><span className="fa fa-refresh" /></div>
                        {canDelete ? <div className="close" onClick={this.handleDelete}><span className="fa fa-times" /></div> : null}
                    </div>
                );
            }
            default:
                break;
        }
    }
    render() {
        const {prefixCls} = this.props;
        const previewBoxDOM = this.getPreviewBoxDOM();

        return (
            <div className={classNames([prefixCls, `${prefixCls}-with-preview`])}>
                {previewBoxDOM}
            </div>
        );
    }
}

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