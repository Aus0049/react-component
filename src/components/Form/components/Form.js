/**
 * Created by Aus on 2017/8/1.
 */
import React from 'react'
import {Input, TextArea, Number, Switch, DateRange,
    DateTime, Select, Checkbox} from '../index'
import '../style/index.scss'
import moment from 'moment'

class Form extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            valueState: {},
            validateState: {},
            originalData: []
        }
    }
    componentDidMount () {
        // 循环数组 解析出验证信息和显示信息
        const {data} = this.props;
        const valueState = {};
        const validateState = {};

        for(let i of data){
            if(i.type !== 'group') continue;

            const formItem = {};
            for(let j of i.children){
                // 解析出验证信息
                if(j.require || j.min || j.max || j.type === 4){
                    validateState[j.id] = {type: j.type, require: j.require, min: j.min, max: j.max};
                }
                // 解析出显示信息
                formItem[j.id] = j;
            }

            // 表单组件 寻找里面的数据
            valueState[i.id] = {type: 0, value: i.name, children: formItem};
        }

        this.setState({
            valueState: valueState,
            validateState: validateState,
            originalData: data
        });
    }
    handleChange (formId, itemId, value) {
        const {onChange} = this.props;

        this.setState((previousState)=>{
            previousState.valueState[formId].children[itemId] = Object.assign(previousState.valueState[formId].children[itemId], value);
            return {...previousState};
        });

        onChange({formId, itemId, value});
    }
    getFormDOM () {
        const {valueState} = this.state;
        const {readOnly} = this.props;
        const result = [];
        const _this = this;

        for (let i in valueState) {
            const obj = valueState[i];
            const itemDOM = [];

            for(let j in obj.children) {
                const item = obj.children[j];

                switch (item.type) {
                    case 1:
                        // 单行文本
                        itemDOM.push(
                            <Input
                                key={j}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 2:
                        // 多行文本
                        itemDOM.push(
                            <TextArea
                                key={j}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 3:
                        // 数字
                        itemDOM.push(
                            <Number
                                key={j}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                unit={item.unit}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 4:
                        // 开关
                        itemDOM.push(
                            <Switch
                                key={j}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                attachedText={item.attachedText}
                                theme={item.theme}
                                controlled={item.controlled}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 5:
                        // 日期区间
                        itemDOM.push(
                            <DateRange
                                key={j}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                startLabelName={item.startLabelName}
                                startValue={item.startValue}
                                endLabelName={item.endLabelName}
                                endValue={item.endValue}
                                rangeLabelName={item.rangeLabelName}
                                kind={item.kind}
                                format={item.format}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 6:
                        // 时间点
                        itemDOM.push(
                            <DateTime
                                key={j}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                kind={item.kind}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 7:
                        // 单选框
                        itemDOM.push(
                            <Select
                                key={j}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                data={item.data}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 8:
                        // 多选框
                        itemDOM.push(
                            <Checkbox
                                key={j}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                data={item.data}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;

                }
            }

            result.push(<Title key={i} content={obj.value} />);
            result.push(
                <div className='form-box'>
                    {itemDOM}
                </div>
            );
        }

        return result;
    }
    render () {
        const formDOM = this.getFormDOM();

        return (
            <div className="standard-form-box">
                {formDOM}
            </div>
        )
    }
}

function empty() {}

Form.PropTypes = {
    data: React.PropTypes.array.isRequired,
    validate: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Form.defaultProps = {
    validate: false,
    readOnly: false,
    onChange: empty
};

export default Form