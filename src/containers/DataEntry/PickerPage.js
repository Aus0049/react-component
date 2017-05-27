/**
 * Created by Aus on 2017/5/27.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Tools from '../../components/Tools/Tools'

class PickerPage extends React.Component {
    render () {
        return (
            <div className="page picker">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    PickerView
                </h1>

                <ListTitle title="基本" />


            </div>
        )
    }
}

export default PickerPage