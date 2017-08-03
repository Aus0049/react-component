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

const Validate = (validateArray) => {
    // 验证validateArray
    if(!validateArray || !(validateArray instanceof Array)) return;

    // 准备输出结果
    const result = [];

    // 策略模式
    for(let item of validateArray){
        const {id, name, value, require, customVerify, errorText} = item;
        let validateErrorText = '';

        // 1.最高优先级：自定义验证规则
        if(customVerify){
            const customVerifyResult = customVerify(name, value);

            // 自定义验证规则的结果：true / 报错文案
            if(customVerifyResult !== true){
                // 有报错
                return {status: false, name: name, error: customVerifyResult};
            }
        }

        // 2.验证required
        if(require){
            if(value && value.length > 0){
                validateErrorText = name + "不能为空!";

                if(errorText) validateErrorText = errorText;

                const errorItem = {status: false, name: name, error: text};

                if(id) errorItem.id = id;

                result.push(errorItem);
            }
        }


    }
};
// const Validate = (dataArray) => {
//     // 策略模式
//     for(let i of dataArray){
//         // 有自定义验证规则 则忽略其他规则
//         if(i.customVerify){
//             const customVerifyResult = i.customVerify(i.name, i.value);
//
//             if(customVerifyResult !== true){
//                 // 有报错
//                 return {status: false, name: i.name, error: customVerifyResult};
//             }
//         }
//
//         let text;
//         // 没有自定义规则 常规验证
//         // required
//         if(i.required === true){
//             if(i.value === undefined || i.value === null || i.value === ""){
//                 text = i.name + "不能为空!";
//
//                 if(i.errorText){
//                     text = i.errorText;
//                 }
//
//                 return {status: false, name: i.name, error: text};
//             }
//         }
//
//
//         if(i.length === true){
//             if(i.min !== undefined && i.max === undefined && typeof i.min === "number"){
//                 if(i.value.length < i.min){
//                     text = i.name + "不能少于" + i.min + "个字";
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//             if(i.max !== undefined && i.min === undefined && typeof i.max === "number"){
//                 if(i.value.length > i.max){
//                     text = i.name + "不能超过" + i.max + "个字";
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//             if(i.max !== undefined && i.min !== undefined && typeof i.max === "number" && typeof i.min === "number"){
//                 if(i.value.length > i.max || i.value.length < i.min){
//                     text = i.name + "长度应在" + i.min + "~" + i.max + "之间";
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//         } else {
//             // 先验证最多两位小数
//             if(i.value && !/^[-+]?[0-9]+([.]\d{1,2})?$/.test(i.value)){
//                 text = i.name + "最多两位小数";
//                 return {status: false, name: i.name, error: text};
//             }
//             // 长度验证 最小
//             if(i.min !== undefined && i.max === undefined && typeof i.min === "number"){
//                 if(i.value < i.min){
//                     text = i.name + "不能小于" + i.min;
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//
//             // 最大
//             if(i.max !== undefined && i.min === undefined && typeof i.max === "number"){
//                 if(i.value > i.max){
//                     text = i.name + "不能超过" + i.max;
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//
//             // 区间
//             if(i.max !== undefined && i.min !== undefined && typeof i.max === "number" && typeof i.min === "number"){
//                 if(i.value > i.max || i.value < i.min){
//                     text = i.name + "应在" + i.min + "~" + i.max + "之间";
//
//                     if(i.errorText){
//                         text = i.errorText;
//                     }
//
//                     return {status: false, name: i.name, error: text};
//                 }
//             }
//         }
//     }
//
//     return {status: true};
// };

export default Validate;