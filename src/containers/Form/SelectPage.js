/**
 * Created by Aus on 2017/7/19.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {Select} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class SelectPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: {value: '选项一'},
            value2: {value: '选项二'},
            value3: '选项三'
        };
    }
    handleChange (type, value) {
        this.setState({
            [type]: value
        });
    }
    render () {
        const {value1, value2, value3} = this.state;
        const data = [{label: '选项一', value: '选项一'}, {label: '选项二', value: '选项二'}, {label: '选项三', value: '选项三'}];

        return (
            <div className="page select">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Select
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>
                    <Select
                        labelName="正常"
                        data={data}
                        value={value1.value}
                        onChange={this.handleChange.bind(this, 'value1')}
                    />
                    <Select
                        labelName="readonly"
                        readOnly
                        data={data}
                        value={value2.value}
                        onChange={this.handleChange.bind(this, 'value2')}
                    />
                </div>
            </div>
        )
    }
}

export default SelectPage