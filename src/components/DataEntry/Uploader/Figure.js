/**
 * Created by Aus on 2017/7/6.
 */
import React from 'react'
import classNames from 'classnames'

const Figure = (props) => {
    const {status, url, dataUrl, id} = props;
    const src = url ? url : dataUrl;
    return (
        <div className={classNames('zby-img-preview-box', {loading: status === 'loading'}, {loaded: status === 'loaded'}, {error: status === 'error'})}>
            {src ? <img src={src} onClick={()=>{url ? window.open(url) : ''}}/> : <div className="uploading"><i className="fa fa-picture-o"></i></div>}
            {status === 'loading' ? <div className="progress-text"></div> : ''}
            {status === 'loading' ? <div className="progress"></div> : ''}
            {status === 'loaded' || status === 'error' ? <div className="close"><i className="fa fa-times"></i></div> : ''}
        </div>
    )
};

export default Figure;