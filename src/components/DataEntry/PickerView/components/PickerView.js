/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import PickerColumn from './PickerColumn'
import '../style/picker-view.scss'

// 递归寻找value
function getNewValue (tree, oldValue, newValue, deep) {
    // 遍历tree
    let has;

    tree.map((item, i)=>{
        if(item.value === oldValue[deep]) {
            newValue.push(item.value);
            has = i;
        }
    });

    if(has === undefined) {
        has = 0;
        newValue.push(tree[has].value);
    }

    if(tree[has].children) getNewValue(tree[has].children, oldValue, newValue, deep+1);

    return newValue;
}

// 根据value找索引
function getColumnsData (tree, value, hasFind, deep) {
    // 遍历tree
    let has;
    const array = [];

    tree.map((item, i)=>{
        array.push({label: item.label, value: item.value});
        if(item.value === value[deep]) has = i;
    });

    // 判断有没有找到
    // 没找到return
    // 找到了 没有下一集 也return
    // 有下一级 则递归
    if(has === undefined) return hasFind;

    hasFind.push(array);

    if(tree[has].children) getColumnsData(tree[has].children, value, hasFind, deep+1);

    return hasFind;
}


// 选择器组件
class PickerView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultSelectedValue: [] // 默认选择的值
        };
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    componentDidMount () {
        // picker view 当做一个非受控组件
        const {value, controlled} = this.props;
        if (!controlled) this.setState({defaultSelectedValue: value});
    }
    handleValueChange (newValue, index) {
        // 子组件column发生变化的回调函数
        // 每次值发生变化 都要判断整个值数组的新值
        const {defaultSelectedValue} = this.state;
        const {data, cascade, controlled, value, onChange} = this.props;

        if(controlled){
            // 也要算一下正确的值
            const oldValue = value.slice();
            oldValue[index] = newValue;

            if(cascade) {
                onChange(getNewValue(data, oldValue, [], 0));
            } else {
                onChange(oldValue);
            }

            return;
        }

        const oldValue = defaultSelectedValue.slice();
        oldValue[index] = newValue;

        if(cascade){
            // 如果级联的情况下
            const newState = getNewValue(data, oldValue, [], 0);

            this.setState({defaultSelectedValue: newState});

            onChange(newState);
        } else {
            // 不级联 单纯改对应数据
            if(!controlled){
                this.setState({defaultSelectedValue: oldValue});
            }

            onChange(oldValue);
        }
    }
    getColumns () {
        const {col, data, cascade, value, controlled} = this.props;
        const {defaultSelectedValue} = this.state;
        const result = [];

        if(controlled){
            if(value.length === 0) return;
        } else {
            if(defaultSelectedValue.length === 0) return;
        }

        let array;

        if(cascade){
            if(controlled){
                array = getColumnsData(data, value, [], 0);
            } else {
                array = getColumnsData(data, defaultSelectedValue, [], 0);
            }
        } else {
            array = data;
        }

        for(let i = 0; i < col; i++){
            result.push(
                <PickerColumn
                    key={i}
                    index={i}
                    value={controlled ? value[i] : defaultSelectedValue[i]}
                    data={array[i]}
                    onValueChange={this.handleValueChange}
                />
            );
        }

        return result;
    }
    render () {
        const {prefixCls} = this.props;
        const columns = this.getColumns();

        return (
            <div className={prefixCls}>
                {columns}
            </div>
        )
    }
}

PickerView.propTypes = {
    prefixCls: React.PropTypes.string, // 前缀class
    col: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.array,
    cascade: React.PropTypes.bool,
    controlled: React.PropTypes.bool, // 是否受控
    onChange: React.PropTypes.func
};

PickerView.defaultProps = {
    prefixCls: 'zby-picker-view',
    col: 1,
    cascade: true,
    controlled: false,
};

export default PickerView