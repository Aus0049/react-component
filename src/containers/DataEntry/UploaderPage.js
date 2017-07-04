/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Tools from '../../components/Tools/Tools'

const UploaderPage = () => {
    return (
        <div className="page uploader">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Uploader
            </h1>

            <ListTitle title="基本" />
        </div>
    )
};

export default UploaderPage