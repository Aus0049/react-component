/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import PickerView from '../../components/DataEntry/PickerView'
import List from '../../components/DataDisplay/List'

const Item = List.Item;

class PickerPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value1: ['fruit', 'watermelon']
        }
    }
    render () {
        const {value1} = this.state;
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

        return (
            <div className="page switch">
                <h1 className="title">Picker</h1>

                {/*<ListTitle title="基本" />*/}
                {/*<List>*/}
                    {/*<Picker>*/}
                        {/*<Item >单列选择</Item>*/}
                    {/*</Picker>*/}
                {/*</List>*/}

                <PickerView
                    col={2}
                    data={array1}
                    value={value1}/>
            </div>
        );
    }
}

export default PickerPage;
