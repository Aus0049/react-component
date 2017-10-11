/**
 * Created by Aus on 2017/8/2.
 */
// 常规的验证方法 根据给定的数据来验证
// 支持的验证类型有：必填 长度 数值 自定义
// Validate([
//     {name: '', value: '', require: true}, // 必填验证
//     {name: '', value: '', require: true, errorText: ''}, // 自定义报错文案
//     {name: '', value: '', min: '', max: ''}, // 长度验证
//     {name: '', value: '', type: 'number', min: '', max: ''}, // 数值验证
//     {name: '', value: '', type: 'email'}, // 邮箱验证
//     {name: '', value: '', type: 'phone'}, // 手机验证
//     {name: '', value: '', customVerify: (name, value)=>{}}, // 自定义验证方式
// ]);
//  验证会将输入的值全部验证

// 准备输出结果
let result = [];

const Validate = (validateArray) => {
    // 验证validateArray
    if(!validateArray || !(validateArray instanceof Array)) return;

    result = [];
    // 策略模式
    for(let item of validateArray){
        const {id, name, value, require, type, customVerify, errorText, max, min} = item;

        // 1.最高优先级：自定义验证规则
        if(customVerify){
            if(!verifyCustomVerify(customVerify, id, name, value)){
                continue;
            }
        }

        // 2.验证required
        if(require){
            if(!verifyRequire(id, name, value)){
                continue;
            }
        }

        // 3.根据不同type验证
        if(!type){
            if(!verifyLength(id, name, value, errorText, min, max)){
                continue;
            }
        }

        // 4.type
        switch (type) {
            case 'email':
                if(!verifyEmail(id, name, value, errorText)){
                    continue;
                }
                break;
            case 'phone':
                if(!verifyPhone(id, name, value, errorText)){
                    continue;
                }
                break;
            case 'number':
                if(!verifyNumber(id, name, value, errorText, min, max)){
                    continue;
                }
                break;
        }
    }

    return result;
};

// 验证自定义验证
const verifyCustomVerify = (customVerify, id, name, value) => {
    const customVerifyResult = customVerify(name, value);
    let pass = true;

    // 自定义验证规则的结果：true / 报错文案
    if(customVerifyResult !== true){
        // 有报错
        updateErrorInResult(id, customVerifyResult);
        pass = false;
    }

    return pass;
};

// 验证必填
const verifyRequire = (id, name, value, errorText) => {
    let pass = true;
    let validateErrorText = '';

    if(!(value && value.length > 0)){
        validateErrorText = name + '不能为空!';

        updateErrorInResult(id, validateErrorText, errorText);
        pass = false;
    }

    return pass;
};

// 验证最大最小值
const verifyLength = (id, name, value, errorText, min, max) => {
    let pass = true;
    let validateErrorText = '';

    // 没有type 长度验证
    if(min && !max && typeof min === 'number'){
        // 只有最小
        if(value.length < min){
            validateErrorText = name + '长度不能少于' + min;

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    } else if (max && !min && typeof max === 'number') {
        // 只有最大
        if(max < value.length){
            validateErrorText = name + '长度不能超过' + max;

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    } else if (max && min && typeof max === 'number' && typeof min === 'number') {
        if(value.length < min || value.length > max){
            validateErrorText = name + '长度应在' + min + '~' + max + '之间';

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    }

    return pass;
};

// 验证邮箱
const verifyEmail = (id, name, value, errorText) => {
    let pass = true;
    let validateErrorText = '';

    // 正则验证
    if(!/[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/.test(value)){
        validateErrorText = name + '格式不正确！';
        updateErrorInResult(id, validateErrorText, errorText);
        pass = false;
    }

    return pass;
};

// 验证手机号
const verifyPhone = (id, name, value, errorText) => {
    let pass = true;
    let validateErrorText = '';

    // 正则验证
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
        validateErrorText = name + '格式不正确！';
        updateErrorInResult(id, validateErrorText, errorText);
        pass = false;
    }

    return pass;
};

// 验证数值
const verifyNumber = (id, name, value, errorText, min, max) => {
    let pass = true;
    let validateErrorText = '';

    // 数值
    // 没有type 长度验证
    if(min && !max && typeof min === 'number'){
        // 只有最小
        if(value < min){
            validateErrorText = name + '不能少于' + min;

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    } else if (max && !min && typeof max === 'number') {
        // 只有最大
        if(max < value){
            validateErrorText = name + '不能超过' + max;

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    } else if (max && min && typeof max === 'number' && typeof min === 'number') {
        if(value < min || value > max){
            validateErrorText = name + '应在' + min + '~' + max + '之间';

            updateErrorInResult(id, validateErrorText, errorText);
            pass = false;
        }
    }

    return pass;
};

const updateErrorInResult = (id, validateErrorText, errorText) => {

    if(errorText) validateErrorText = errorText;

    const errorItem = {error: validateErrorText};

    if(id) errorItem.id = id;

    result.push(errorItem);
};

export default Validate;