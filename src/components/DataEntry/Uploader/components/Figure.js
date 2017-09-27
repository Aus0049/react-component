/**
 * Created by Aus on 2017/7/6.
 */
import React from 'react'
import classNames from 'classnames'

const Figure = (props) => {
    const {status, imgUrl, dataUrl, id, onDelete} = props;
    const src = imgUrl ? imgUrl : dataUrl;

    const handleDelete = () => {
        if(onDelete) onDelete(id);
    };

    return (
        <div className={classNames('zby-img-preview-box', {loading: status === 1}, {loaded: status === 2}, {error: status === 3}, {deleted: status == 'deleted'})}>
            {src ? <img src={src} onClick={()=>{imgUrl ? window.open(imgUrl) : ''}}/> : <div className="uploading"><i className="fa fa-picture-o"></i></div>}
            {status === 1 ? <div className="progress-text" id={`text-${id}`}></div> : ''}
            {status === 1 ? <div className="progress" id={`progress-${id}`}></div> : ''}
            {status === 2 || status === 3 ? <div className="close" onClick={handleDelete}><i className="fa fa-times"></i></div> : ''}
        </div>
    )
};

export default Figure;