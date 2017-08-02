/**
 * Created by Aus on 2017/8/2.
 */
const Validate = (dataArray) => {
    // 策略模式
    for(let i of dataArray){
        // 有自定义验证规则 则忽略其他规则
        if(i.customVerify){
            const customVerifyResult = i.customVerify(i.name, i.value);

            if(customVerifyResult !== true){
                // 有报错
                return {status: false, name: i.name, error: customVerifyResult};
            }
        }

        let text;
        // 没有自定义规则 常规验证
        // required
        if(i.required === true){
            if(i.value === undefined || i.value === null || i.value === ""){
                text = i.name + "不能为空!";

                if(i.errorText){
                    text = i.errorText;
                }

                return {status: false, name: i.name, error: text};
            }
        }


        if(i.length === true){
            if(i.min !== undefined && i.max === undefined && typeof i.min === "number"){
                if(i.value.length < i.min){
                    text = i.name + "不能少于" + i.min + "个字";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }
            if(i.max !== undefined && i.min === undefined && typeof i.max === "number"){
                if(i.value.length > i.max){
                    text = i.name + "不能超过" + i.max + "个字";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }
            if(i.max !== undefined && i.min !== undefined && typeof i.max === "number" && typeof i.min === "number"){
                if(i.value.length > i.max || i.value.length < i.min){
                    text = i.name + "长度应在" + i.min + "~" + i.max + "之间";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }
        } else {
            // 先验证最多两位小数
            if(i.value && !/^[-+]?[0-9]+([.]\d{1,2})?$/.test(i.value)){
                text = i.name + "最多两位小数";
                return {status: false, name: i.name, error: text};
            }
            // 长度验证 最小
            if(i.min !== undefined && i.max === undefined && typeof i.min === "number"){
                if(i.value < i.min){
                    text = i.name + "不能小于" + i.min;

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }

            // 最大
            if(i.max !== undefined && i.min === undefined && typeof i.max === "number"){
                if(i.value > i.max){
                    text = i.name + "不能超过" + i.max;

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }

            // 区间
            if(i.max !== undefined && i.min !== undefined && typeof i.max === "number" && typeof i.min === "number"){
                if(i.value > i.max || i.value < i.min){
                    text = i.name + "应在" + i.min + "~" + i.max + "之间";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }
        }
    }

    return {status: true};
};

export default Validate;