/**
 * Created by Aus on 2017/11/10.
 */
// 简易实现jq animate
// 不断调用setInterval 实现动画
export const animationFunc = (obj, style, time, callback) => {
    const currentStyle = obj.style;
    const diffObj = {};
    const step = 20, intervalNum = time / step;
    let num = 0;

    for(let i in style){
        diffObj[i] = (Number.parseFloat(style[i]) - Number.parseFloat(currentStyle[i])) / intervalNum;
    }

    // 开始调用
    const timer = setInterval(()=>{
        if(num < intervalNum){
            for(let i in diffObj){
                currentStyle[i] = Number.parseFloat(currentStyle[i]) + diffObj[i] + 'px';
            }

            num++;
        } else {
            clearInterval(timer);
            // 回调
            if(callback) callback();
        }
    }, step);
};