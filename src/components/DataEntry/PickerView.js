/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import PickerColumn from './PickerColumn'

// 选择器组件
class PickerView extends React.Component {
    componentDidMount () {

    }
    getColumns () {
        let result = [];
        let {col, data, value} = this.props;

        let array = this.getColumnsData(data, value, [], 0);

        for(let i = 0; i < col; i++){
            result.push(<PickerColumn key={i} value={value[i]} data={array[i]} index={i}/>);
        }

        return result;
    }
    getColumnsData (tree, value, hasFind, deep) {
        // 遍历tree
        let has;
        let array = [];
        for(let i = 0; i < tree.length; i++){
            array.push({label: tree[i].label, value: tree[i].value});
            if(tree[i].value == value[deep]) {
                has = i;
            }
        }

        // 判断有没有找到
        // 没找到return
        // 找到了 没有下一集 也return
        // 有下一级 则递归
        if(has == undefined) return hasFind;

        hasFind.push(array);
        if(tree[has].children) {
            this.getColumnsData(tree[has].children, value, hasFind, deep+1);
        }

        return hasFind;
    }
    render () {
        const columns = this.getColumns();

        return (
            <div className="zby-picker-view-box">
                {columns}
            </div>
        )
    }
}

export default PickerView