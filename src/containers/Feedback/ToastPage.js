/**
 * Created by Aus on 2017/6/13.
 */
import React from 'react'
import Tools from '../../components/Tools/Tools'

class ToastPage extends React.Component {
    render () {
        return (
            <div className="page toast">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Toast
                </h1>
            </div>
        )
    }
}

export default ToastPage