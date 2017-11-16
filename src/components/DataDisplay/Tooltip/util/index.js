/**
 * Created by Aus on 2017/11/16.
 */
export const getTipPosition = (elementPosition, titlePosition, direct) => {
    const result = {};

    if(elementPosition === undefined || titlePosition === undefined) return result;

    const {tipWidth, tipHeight} = titlePosition;
    const {width, height, x, y} = elementPosition;
    const clineWidth = document.body.clientWidth;
    const clineHeight = document.body.clientHeight;

    // 算出tip 在上边的中心点的位置
    const centerPositionTop = {
        left: x + width / 2 - tipWidth / 2,
        top: y - tipHeight
    };

    // 显示在左边是否合适
    const centerPositionLeft = {
        left: x - tipWidth,
        top: y + (height / 2) - (tipHeight / 2)
    };

    // 判断显示在右边
    const centerPositionRight = {
        left: x + width,
        top: y + (height / 2) - (tipHeight / 2)
    };

    // 显示在下边
    const centerPositionBottom = {
        left: x + width / 2 - tipWidth / 2,
        top: y + height
    };

    // 是否有指令
    if(direct === 'top'){
        return {direction: direct, position: centerPositionTop};
    } else if (direct === 'left') {
        return {direction: direct, position: centerPositionLeft};
    } else if (direct === 'right') {
        return {direction: direct, position: centerPositionRight};
    } else if (direct === 'bottom') {
        return {direction: direct, position: centerPositionRight};
    }

    // 自动计算
    // 判断显示在上边是否合适
    if(centerPositionTop.top >= 10 && // 上
        centerPositionTop.left >= 10 && // 左
        (clineWidth - (centerPositionTop.left + tipWidth)) >=10 ){ // 右

        return {direction: 'top', position: centerPositionTop};
    }


    if(centerPositionLeft.top >= 10 && // 上
        centerPositionLeft.left >= 10 && // 左
        (clineHeight - (centerPositionLeft.top + tipHeight)) >=10 ){ // 下

        return {direction: 'left', position: centerPositionLeft};
    }


    if(centerPositionRight.top >= 10 && // 上
        centerPositionRight.left + tipWidth >= 10 && // 右
        (clineHeight - (centerPositionRight.top + tipHeight)) >=10 ){ // 下

        return {direction: 'right', position: centerPositionRight};
    }

    return {direction: 'bottom', position: centerPositionBottom};
};

export const getTitleDOMPosition = (dom) => {
    const cloneDOM = dom.cloneNode(true);

    cloneDOM.style.display = 'block';
    cloneDOM.style.left = '-1000px';
    cloneDOM.style.top = '-1000px';

    document.body.appendChild(cloneDOM);

    const result = {
        tipWidth: cloneDOM.offsetWidth,
        tipHeight: cloneDOM.offsetHeight
    };

    cloneDOM.remove();

    return result;
};