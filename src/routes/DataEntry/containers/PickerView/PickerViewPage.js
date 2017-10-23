/**
 * Created by Aus on 2017/10/20.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import PickerView from 'components/DataEntry/PickerView/'
import Tools from 'components/Tools/Tools'

class PickerViewPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: ['fruit', 'watermelon'],
            value2: ['一', '4', '貮']
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (newValue) {
        console.log(newValue);
    }
    render () {
        const {value1, value2} = this.state;
        const array1 = [
            {label: '水果', value: 'fruit', children: [
                {label: '苹果', value: 'apple'},
                {label: '香蕉', value: 'banana'},
                {label: '橘子', value: 'orange'},
                {label: '西瓜', value: 'watermelon'}
            ]},
            {label: '蔬菜', value: 'vegetables', children: [
                {label: '番茄', value: 'tomato'},
                {label: '土豆', value: 'potato'},
                {label: '白菜', value: 'cabbage'}
            ]},
            {label: '动物', value: 'animal', children: [
                {label: '皮皮虾', value: 'shrimp'},
                {label: '象拔蚌', value: 'clam'},
                {label: '骚猪', value: 'pdd'}
            ]},
        ];
        const array2 = [
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
            <div className="page picker-view">
                <h1 className="title">
                    <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                    PickerView
                </h1>

                <ListTitle title="默认级联" />
                <PickerView
                    col={2}
                    data={array1}
                    value={value1}
                    onChange={this.handleChange}
                />

                <ListTitle title="不级联" />
                <PickerView
                    col={3}
                    data={array2}
                    value={value2}
                    cascade={false}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default PickerViewPage;