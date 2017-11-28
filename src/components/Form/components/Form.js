/**
 * Created by Aus on 2017/8/1.
 */
import React from 'react'
import {Input, TextArea, Switch, DateRange,
    DateTime, Select, Checkbox, Validate} from '../index'
import '../style/form.scss'

// Form为非受控组件
// 无法动态删除增加表单项
// 以及实时掌控表单数据等问题
// 而且对于非输入框表单项 怎么显示错误信息是个问题
// 所以Form适合简单的表单场景
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
        const valueState = [];
        const validateState = [];
        let num = 0;

        for(let i of data){
            if(i.type !== 'group') continue;

            const formItem = [];
            for(let j of i.children){
                // 解析出验证信息
                if(j.require || j.min || j.max || j.kind || j.customValidate || j.errorText){
                    validateState.push({
                        id: j.id,
                        type: j.type,
                        require: j.require,
                        min: j.min,
                        max: j.max,
                        kind: j.kind,
                        customValidate: j.customValidate,
                        errorText: j.errorText,
                        position: num++
                    });
                }
                // 解析出显示信息
                formItem.push(j);
            }

            // 表单组件 寻找里面的数据
            valueState.push({type: 'group', value: i.name, children: formItem});
        }

        this.setState({
            valueState: valueState,
            validateState: validateState,
            originalData: data
        });
    }
    handleChange (formIndex, itemIndex, value) {
        const {onChange} = this.props;

        this.setState((previousState)=>{
            previousState.valueState[formIndex].children[itemIndex] = Object.assign(previousState.valueState[formIndex].children[itemIndex], value);
            return {...previousState};
        });

        onChange({
            formIndex: formIndex,
            itemIndex: itemIndex,
            value: value.value
        });
    }
    getValue () {
        // 获取state的平铺信息
        const {valueState} = this.state;
        let result = [];

        for(let i in valueState){
            result = result.concat(valueState[i].children);
        }

        return result;
    }
    validate () {
        // 验证表单
        const {validateState} = this.state;
        const value = this.getValue();
        const validateArray = [];

        // 获取验证数组
        for(let item of validateState) {

            validateArray.push({
                id: item.id,
                name: value[item.position].labelName,
                value: value[item.position].value,
                customVerify: item.customVerify,
                required: item.require,
                kind: item.kind,
                min: item.min,
                max: item.max,
                errorText: item.errorText
            });
        }

        // 验证
        const validateResult = Validate(validateArray);

        if(validateResult.length === 0) return;

        // 将有错误的添加到对应的状态上
        const valueStateWithError = this.combineErrorToState(validateResult);

        this.setState({valueState: valueStateWithError});

        return validateResult;
    }
    combineErrorToState (validateErrorArray) {
        const {valueState} = this.state;
        const state = [...valueState];
        const errorArray = [...validateErrorArray];

        for(let i of state){
            if(i.type !== 'group') continue;

            for(let j of i.children){
                for(let x = 0; x < errorArray.length; x++){
                    if(errorArray[x].id === j.id){
                        j.error = errorArray[x].error;
                        // 删除该项
                        errorArray.splice(x, 1);
                        // 退出循环
                        break;
                    }
                }
            }
        }

        return state;
    }
    getFormDOM () {
        const {valueState} = this.state;
        const {readOnly} = this.props;
        const result = [];
        const _this = this;

        for(let i = 0; i < valueState.length; i++){
            const obj = valueState[i];
            const itemDOM = [];

            for(let j = 0; j < obj.children.length; j++) {
                const item = obj.children[j];

                switch (item.type) {
                    case 'input':
                        // 单行文本
                        itemDOM.push(
                            <Input
                                key={item.id}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                error={item.error}
                                kind={item.kind}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'textarea':
                        // 多行文本
                        itemDOM.push(
                            <TextArea
                                key={item.id}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                placeHolder={item.placeholder}
                                error={item.error}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'switch':
                        // 开关
                        itemDOM.push(
                            <Switch
                                key={item.id}
                                required={item.require}
                                labelName={item.labelName}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                value={item.value}
                                attachedText={item.attachedText}
                                theme={item.theme}
                                controlled={item.controlled}
                                error={item.error}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'date-range':
                        // 日期区间
                        itemDOM.push(
                            <DateRange
                                key={item.id}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                startLabelName={item.startLabelName}
                                startValue={item.startValue}
                                endLabelName={item.endLabelName}
                                endValue={item.endValue}
                                rangeLabelName={item.rangeLabelName}
                                kind={item.kind}
                                format={item.format}
                                error={item.error}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'date-time':
                        // 时间点
                        itemDOM.push(
                            <DateTime
                                key={item.id}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                kind={item.kind}
                                error={item.error}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'select':
                        // 单选框
                        itemDOM.push(
                            <Select
                                key={item.id}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                data={item.data}
                                error={item.error}
                                onChange={_this.handleChange.bind(_this, i, j)}
                            />
                        );
                        break;
                    case 'checkbox':
                        // 多选框
                        itemDOM.push(
                            <Checkbox
                                key={item.id}
                                required={item.require}
                                readOnly={readOnly ? true : item.readonly ? true : false}
                                labelName={item.labelName}
                                value={item.value}
                                options={item.options}
                                error={item.error}
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