/**
 * Created by Aus on 2017/8/1.
 */
import React from 'react'
import {Input, TextArea, Switch, DateRange,
    DateTime, Select, Checkbox, Validate} from '../index'
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
                if(j.require || j.min || j.max || j.kind || j.customValidate || j.errorText){
                    validateState[j.id] = {id: j.id, type: j.type, require: j.require, min: j.min, max: j.max, kind: j.kind, customValidate: j.customValidate, errorText: j.errorText};
                }
                // 解析出显示信息
                formItem[j.id] = j;
            }

            // 表单组件 寻找里面的数据
            valueState[i.id] = {type: 'group', value: i.name, children: formItem};
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
    getValue () {
        // 获取state的平铺信息
        const {valueState} = this.state;
        let result = {};

        for(let i in valueState){
            result = Object.assign(result, valueState[i].children);
        }

        return result;
    }
    validate () {
        // 验证表单
        const {validateState} = this.state;
        const value = this.getValue();
        const validateArray = [];

        // 获取验证数组
        for(let i in validateState) {
            validateArray.push({
                id: value[i].id,
                name: value[i].labelName,
                value: value[i].value,
                customVerify: value[i].customVerify,
                required: value[i].require,
                kind: value[i].kind,
                min: value[i].min,
                max: value[i].max,
                errorText: value[i].errorText
            });
        }

        // 验证
        const validateResult = Validate(validateArray);

        // 将有错误的添加到对应的状态上
        this.combineErrorToState(validateResult);
    }
    combineErrorToState (validateErrorArray) {
        const {valueState} = this.state;
        const state = {...valueState};

        for(let i in state){
            if(state[i].type !== 'group') continue;

            for(let j in state[i].children){
                for(let x = 0; x < validateErrorArray.length; x++){
                    if(validateErrorArray[x].id === j){
                        state[i].children[j].error = validateErrorArray[x].error;
                        // 删除该项
                        validateErrorArray.splice(x, 1);
                        // 退出循环
                        break;
                    }
                }
            }
        }

        console.log(state);
        return state;
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
                    case 'input':
                        // 单行文本
                        itemDOM.push(
                            <Input
                                key={j}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                kind={item.kind}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'textarea':
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
                    case 'switch':
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
                    case 'date-range':
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
                    case 'date-time':
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
                    case 'select':
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
                    case 'checkbox':
                        // 多选框
                        itemDOM.push(
                            <Checkbox
                                key={j}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                options={item.options}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;

                }
            }

            result.push(<div className="zby-form-title" key={i}>{obj.value}</div>);
            result.push(
                <div className='zby-form-box'>
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