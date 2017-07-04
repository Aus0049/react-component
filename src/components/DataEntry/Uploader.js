/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import Touchable from 'rc-touchable'

class Uploader extends React.Component{
    getImagesListDOM () {
        const {data} = this.props;
        const result = [];

        data.map((item)=>{
            result.push(
                <div className="zby-img-preview-box">
                    <img src={item.src} alt=""/>
                </div>
            );
        });

        result.push(
            <Touchable
                activeClassName={'zby-upload-img-active'}>
                <div className="zby-upload-img">
                    <i className="fa fa-plus"></i>
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
            </div>
        )
    }
}

export default Uploader