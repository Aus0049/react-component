/**
 * Created by Aus on 2017/11/7.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import List from 'components/DataDisplay/List/'
import Picker from 'components/DataEntry/Picker/'
import Tools from 'components/Tools/Tools'

const Item = List.Item;

class PickerPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            areaValue: ['辽宁省', '本溪市', '桓仁满族自治县'],
            numberValue: ['一', '4', '貮']
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePickerChange = this.handlePickerChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }
    handleChange (newValue) {
        console.log('value change');
        console.log(newValue);
        this.setState({
            areaValue: newValue
        });
    }
    handlePickerChange (newValue) {
        console.log('picker change');
        console.log(newValue);
    }
    handleNumberChange (newValue) {
        console.log('number change');
        console.log(newValue);
        this.setState({
            numberValue: newValue
        });
    }
    render () {
        let {areaValue, numberValue} = this.state;
        const areaArray = [
            {label: '北京市', value: '北京市', children: [
                {label: '北京市', value: '北京市', children: [
                    {label: '朝阳区', value: '朝阳区'},
                    {label: '海淀区', value: '朝阳区'},
                    {label: '东城区', value: '朝阳区'},
                    {label: '西城区', value: '朝阳区'}
                ]}
            ]},
            {label: '辽宁省', value: '辽宁省', children: [
                {label: '沈阳市', value: '沈阳市', children: [
                    {label: '沈河区', value: '沈河区'},
                    {label: '浑南区', value: '浑南区'},
                    {label: '沈北新区', value: '沈北新区'},
                ]},
                {label: '本溪市', value: '本溪市', children: [
                    {label: '溪湖区', value: '溪湖区'},
                    {label: '东明区', value: '东明区'},
                    {label: '桓仁满族自治县', value: '桓仁满族自治县'},
                ]}
            ]},
            {label: '云南省', value: '云南省', children: [
                {label: '昆明市', value: '昆明市', children:[
                    {label: '五华区', value: '五华区'},
                    {label: '官渡区', value: '官渡区'},
                    {label: '呈贡区', value: '呈贡区'},
                ]}
            ]},
        ];

        const numberArray = [
            [
                {label: '一', value: '一'},
                {label: '二', value: '二'},
                {label: '三', value: '三'}
            ],
            [
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'}
            ],
            [
                {label: '壹', value: '壹'},
                {label: '貮', value: '貮'},
                {label: '叁', value: '叁'}
            ]
        ];

        return (
            <div className="page picker">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                    Picker
                </h1>

                <ListTitle title="基本" />

                <List>
                    <Picker
                        col={3}
                        data={areaArray}
                        value={areaValue}
                        title="选择地区"
                        onChange={this.handleChange}
                        onPickerChange={this.handlePickerChange}
                    >
                        <Item extra={areaValue.join('')} arrow="horizontal">级联选择</Item>
                    </Picker>
                    <Picker
                        col={3}
                        data={numberArray}
                        value={numberValue}
                        cascade={false}
                        onChange={this.handleNumberChange}
                    >
                        <Item extra={numberValue.join(' ')} arrow="horizontal">不级联选择</Item>
                    </Picker>
                </List>
            </div>
        )
    }
}

export default PickerPage