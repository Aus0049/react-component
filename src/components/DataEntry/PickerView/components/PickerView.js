/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import PickerColumn from './PickerColumn'
import '../style/index.scss'

// 选择器组件
class PickerView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultSelectedValue: []
        }
    }
    componentDidMount () {
        // picker view 当做一个非受控组件
        let {value, controlled} = this.props;
        if(!controlled){
            this.setState({
                defaultSelectedValue: value
            });
        }
    }
    handleValueChange (newValue, index) {
        // 子组件column发生变化的回调函数
        // 每次值发生变化 都要判断整个值数组的新值
        let {defaultSelectedValue} = this.state;
        let {data, cascade, controlled, value, onChange} = this.props;

        if(controlled){
            // 也要算一下正确的值
            const oldValue = value.slice();
            oldValue[index] = newValue;

            if(cascade) {
                const newState = this.getNewValue(data, oldValue, [], 0);

                if(onChange){
                    onChange(newState);
                }
            } else {
                if(onChange){
                    onChange(oldValue);
                }
            }

            return;
        }

        let oldValue = defaultSelectedValue.slice();
        oldValue[index] = newValue;

        if(cascade){
            // 如果级联的情况下
            const newState = this.getNewValue(data, oldValue, [], 0);

            this.setState({
                defaultSelectedValue: newState
            });

            // 如果有回调
            if(onChange){
                onChange(newState);
            }
        } else {
            // 不级联 单纯改对应数据
            if(!controlled){
                this.setState({
                    defaultSelectedValue: oldValue
                });
            }

            // 如果有回调
            if(onChange){
                onChange(oldValue);
            }
        }
    }
    getColumns () {
        const result = [];
        const {col, data, cascade, value, controlled} = this.props;
        const {defaultSelectedValue} = this.state;

        if(controlled){
            if(value.length == 0) return;
        } else {
            if(defaultSelectedValue.length == 0) return;
        }

        let array;

        if(cascade){
            if(controlled){
                array = this.getColumnsData(data, value, [], 0);
            } else {
                array = this.getColumnsData(data, defaultSelectedValue, [], 0);
            }
        } else {
            array = data;
        }

        for(let i = 0; i < col; i++){
            result.push(<PickerColumn
                key={i}
                value={controlled ? value[i] : defaultSelectedValue[i]}
                data={array[i]}
                index={i}
                onValueChange={this.handleValueChange.bind(this)}
                        />);
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
    getNewValue (tree, oldValue, newValue, deep) {
        // 遍历tree
        let has;
        for(let i = 0; i < tree.length; i++){
            if(tree[i].value == oldValue[deep]) {
                newValue.push(tree[i].value);
                has = i;
            }
        }

        if(has === undefined) {
            has = 0;
            newValue.push(tree[has].value);
        }

        if(tree[has].children) {
            this.getNewValue(tree[has].children, oldValue, newValue, deep+1);
        }

        return newValue;
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

PickerView.propTypes = {
    col: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.array,
    cascade: React.PropTypes.bool,
    controlled: React.PropTypes.bool, // 是否受控
    onChange: React.PropTypes.func
};

PickerView.defaultProps = {
    col: 1,
    cascade: true,
    controlled: false,
};

export default PickerView