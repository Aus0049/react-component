/**
 * Created by Aus on 2017/7/31.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import {Switch} from '../../components/Form/'
import Tools from '../../components/Tools/Tools'

class SwitchPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: true,
            value2: true,
            value3: true
        };
    }
    handleChange (type, value) {
        this.setState({
            [type]: value.value
        });
    }
    render () {
        const {value1, value2, value3} = this.state;

        return (
            <div className="page form-switch">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Switch
                </h1>

                <ListTitle title="普通" />

                <div className='zby-form-box'>
                   <Switch
                       required
                       labelName={value1 ? '开' : '关'}
                       value={value1}
                       onChange={this.handleChange.bind(this, 'value1')}
                   />
                    <Switch
                        required
                        controlled={false}
                        labelName="非受控"
                        value={value2}
                        attachedText={['开', '关']}
                    />
                    <Switch
                        readOnly
                        labelName="readonly"
                        value={value3}
                    />
                </div>
            </div>
        )
    }
}

export default SwitchPage