/**
 * Created by Aus on 2017/5/27.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Picker from '../../components/DataEntry/Picker'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

class PickerPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            areaValue: ['辽宁省', '本溪市', '桓仁满族自治县']
        }
    }
    handleChange (newValue) {
        console.log("change");
        console.log(newValue);
    }
    render () {
        let {areaValue} = this.state;
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

        return (
            <div className="page picker">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Picker
                </h1>

                <ListTitle title="基本" />

                <List>
                    <Picker
                        col={3}
                        data={areaArray}
                        value={areaValue}
                        onChange={this.handleChange.bind(this)}>
                        <Item subtitle={areaValue.join('')} icon="horizontal">地区选择器</Item>
                    </Picker>
                </List>
            </div>
        )
    }
}

export default PickerPage