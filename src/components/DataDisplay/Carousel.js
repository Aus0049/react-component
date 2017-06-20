/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'
import Hammer from 'hammerjs'
import classNames from 'classnames'

class Carousel extends React.Component {
    static propTypes = {
        data: React.PropTypes.array, // 图片源数组
        startIndex: React.PropTypes.number, // 初始位置
        autoplay: React.PropTypes.bool, // 是否自动播放
        intervalTime: React.PropTypes.number, // 循环播放时间差
        loopFromStart: React.PropTypes.bool, // 是否从头循环
        dots: React.PropTypes.bool, // 是否显示底部指示点
        swipe: React.PropTypes.bool, // 是否可以滑动
    };
    static defaultProps = {
        data: [],
        startIndex: 0,
        autoplay: false,
        intervalTime: 2000,
        loopFromStart: true,
        dots: true,
        swipe: true
    };
    constructor (props) {
        super(props);
        this.state = {
            data: props.data,
            loopData: [], // loopFromStart为false的时候 显示的数组
            currentFigureIndex: 0,
        }
    }
    componentDidMount () {
        const {startIndex, loopFromStart, autoplay, swipe} = this.props;
        const loopData = loopFromStart ? [] : this.getLoopData();

        this.setState({
            loopData: loopData,
            currentFigureIndex: startIndex ? startIndex : 0
        });

        // 获取轮播图宽度
        this.carouselWidth = this.refs.box.getBoundingClientRect().width;

        // 初始化手势事件
        if(swipe){
            this.bindGestureEvent();
        }

        if (autoplay) {
            this.bindAutoPlay();
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalPlay);
    }
    bindAutoPlay () {
        // 绑定自动轮播
        const {intervalTime} = this.props;
        this.intervalPlay = setInterval(()=>{
            this.changeFigure();
        }, intervalTime);
    }
    bindGestureEvent () {
        // 手势事件
        const {loopFromStart} = this.props;
        const list = this.refs.list;
        const listHammer = new Hammer(list);

        let positionX, currentMarginLeft, _this = this;

        // 拖动开始记下当前位置
        listHammer.on('panstart', (e)=>{
            positionX = e.deltaX;
            currentMarginLeft = Number.parseFloat(list.style.marginLeft);
        });

        // 拖动中
        listHammer.on('panmove', (e)=>{
            // 拖动
            list.style.marginLeft = _this.getMovePosition(e.deltaX - positionX, currentMarginLeft) + "px";
        });

        // 拖动结束 判断是否翻页
        listHammer.on('panend', (e)=>{
            // 拖动结束 判断归位
            if(loopFromStart){
                const currentIndex = _this.getCurrentIndex();
                currentMarginLeft = - (currentIndex * this.carouselWidth) + 'px';
                // 滑动动画 滑到对应位置
                _this.animation(list, {marginLeft: currentMarginLeft}, 300, ()=>{
                    // 改变当前index
                    _this.setState({currentFigureIndex: currentIndex});
                });
            } else {
                let move = e.deltaX - positionX;
                let nextIndex;

                if(move / _this.carouselWidth >= 0.5){
                    move = _this.carouselWidth + currentMarginLeft + "px";
                    nextIndex = _this.state.currentFigureIndex - 1;
                } else if (move / _this.carouselWidth <= -0.5) {
                    move = -_this.carouselWidth + currentMarginLeft + "px";
                    nextIndex = _this.state.currentFigureIndex + 1;
                } else {
                    // 归位
                    move = -_this.carouselWidth + "px";
                    nextIndex = _this.state.currentFigureIndex;
                }

                if(nextIndex < 0){
                    nextIndex = _this.state.data.length - 1;
                } else if (nextIndex > _this.state.data.length - 1) {
                    nextIndex = 0;
                }

                _this.animation(list, {marginLeft: move}, 300, ()=>{
                    // 改变当前index
                    list.style.marginLeft = -_this.carouselWidth + "px";
                    _this.setState({
                        loopData: _this.getLoopData(true, nextIndex),
                        currentFigureIndex: nextIndex
                    });
                });
            }
        });
    }
    changeFigure () {
        const {loopFromStart} = this.props;
        const list = this.refs.list;

        if(loopFromStart){
            let {currentFigureIndex} = this.state;
            let nextIndex = currentFigureIndex + 1;
            if(currentFigureIndex == this.state.data.length - 1){
                nextIndex = 0;
            }

            this.animation(list, {'marginLeft': -nextIndex * this.carouselWidth + "px"}, 300, ()=>{
                this.setState({currentFigureIndex: nextIndex});
            });
        } else {
            this.animation(list, {'marginLeft': - 2 * this.carouselWidth + "px"}, 300, ()=>{
                let nextIndex = this.state.currentFigureIndex + 1;

                if(nextIndex < 0){
                    nextIndex = this.state.data.length - 1;
                } else if (nextIndex > this.state.data.length - 1) {
                    nextIndex = 0;
                }

                list.style.marginLeft = -this.carouselWidth + "px";
                this.setState({
                    loopData: this.getLoopData(true, nextIndex),
                    currentFigureIndex: nextIndex
                });
            });
        }
    }
    animation (obj, style, time, callback) {
        // 简易实现jq animate
        const currentStyle = obj.style;
        const diffObj = {};
        const step = 20, intervalNum = time / step;
        let num = 0;

        for(let i in style){
            diffObj[i] = (Number.parseFloat(style[i]) - Number.parseFloat(currentStyle[i])) / intervalNum;
        }

        // 开始调用
        let timer = setInterval(()=>{
            if(num < intervalNum){
                for(let i in diffObj){
                    currentStyle[i] = Number.parseFloat(currentStyle[i]) + diffObj[i] + 'px';
                }

                num++;
            } else {
                clearInterval(timer);
                // 回调
                if(callback){
                    callback();
                }
            }
        }, step);
    }
    getLoopData (fromState, newIndex) {
        // 不从头循环的时候 制造对应数组
        let data, startIndex;

        if(fromState){
            data = this.state.data;
            startIndex = newIndex;
        } else {
            data = this.props.data;
            startIndex = this.props.startIndex;
        }

        const length = data.length;
        let result = [];

        if(length == 1){
            result = [data[0], data[0], data[0]];
        } else if (length == 2) {
            result = [data[1 - startIndex], data[2 - startIndex], data[1 - startIndex]];
        } else {
            // length >= 3;
            if(startIndex == 0){
                result = [data[length - 1], data[startIndex], data[startIndex + 1]];
            } else if (startIndex == length - 1) {
                result = [data[startIndex - 1], data[startIndex], data[0]];
            } else {
                result = [data[startIndex - 1], data[startIndex], data[startIndex + 1]];
            }
        }

        return result;
    }
    getMovePosition (moveDistance, currentMarginLeft) {
        const {loopFromStart} = this.props;

        // 做一个 达到左右极限 简易弹簧效果
        const length = this.state.data.length;
        let result = moveDistance + currentMarginLeft;

        if(loopFromStart){
            if(result >= 0){
                result = result / 2;
            } else if (result < -((length - 1) * this.carouselWidth)) {
                // 右边距
                result = -((length - 1) * this.carouselWidth) + ((result + ((length - 1) * this.carouselWidth)) / 2);
            }
        } else {
            // loopFromStart为false的时候 滑屏不能超过一张图大
            if(moveDistance >= this.carouselWidth){
                result = this.carouselWidth + currentMarginLeft;
            } else if (moveDistance <= -this.carouselWidth) {
                // 右边距
                result = -this.carouselWidth + currentMarginLeft;
            }
        }

        return result;
    }
    getCurrentIndex () {
        // 判断list当前应在那个index
        const {data} = this.state;
        const list = this.refs.list;
        const currentMarginLeft = list.style.marginLeft;
        const currentRemainder = Math.abs(Number.parseInt(currentMarginLeft) % this.carouselWidth);
        let currentIndex;

        if(Number.parseInt(currentMarginLeft) <= 0){
            currentIndex = Math.abs(Number.parseInt(Number.parseInt(currentMarginLeft) / this.carouselWidth));
            if((currentRemainder / this.carouselWidth) >= 0.5){
                currentIndex++;
            } else if ((currentRemainder / this.carouselWidth) <= -0.5 ){
                currentIndex--;
            }

            // 最大限制
            if(currentIndex > data.length - 1){
                currentIndex = data.length - 1;
            }
        } else {
            currentIndex = 0;
        }

        return currentIndex;
    }
    getListStyle () {
        // 处理list的宽度和当前的marginLeft
        const {currentFigureIndex, data, loopData} = this.state;
        const {loopFromStart} = this.props;
        const result = loopFromStart ? {'width': (data.length * 100) + "%"} : {'width': (loopData.length * 100) + "%"};

        // 获取轮播图宽度
        if(this.carouselWidth) {
            if(loopFromStart){
                result.marginLeft = - (this.carouselWidth * currentFigureIndex) + "px";
            } else {
                result.marginLeft = - (this.carouselWidth * 1) + "px";
            }
        } else {
            // 不存在 归0
            if(loopFromStart){
                result.marginLeft = "0px";
            } else {
                result.marginLeft = "-33.33%";
            }
        }

        return result;
    }
    getListDOM () {
        // 分成两种 从头循环和不从头循环
        const {loopFromStart} = this.props;
        const {data, loopData} = this.state;
        let result = [];

        if(loopFromStart){
            // 从头循环
            const width = (100 / data.length) + "%";

            data.map((item, index)=>{
                const {content, style, ...props} = item;
                result.push(
                    <div className="zby-carousel-figure" key={index} style={Object.assign({'width': width}, style)} {...props}>{content}</div>
                );
            });

            return result;
        }

        const width = (100 / loopData.length) + "%";

        loopData.map((item, index)=>{
            const {content, style, ...props} = item;
            result.push(
                <div className="zby-carousel-figure" key={index} style={Object.assign({'width': width}, style)} {...props}>{content}</div>
            );
        });

        return result;
    }
    getDotDOM () {
        const {currentFigureIndex, data} = this.state;
        const {dots} = this.props;

        if(!dots) return;

        let result = [];

        data.map((item, index)=>{
            result.push(
                <span key={index} className={classNames(['zby-carousel-dot', {'active': index == currentFigureIndex}])}></span>
            );
        });

        return <div className="zby-carousel-dot-box">
            {result}
        </div>;
    }
    render () {
        const listStyle = this.getListStyle();
        const listDOM = this.getListDOM();
        const dotDOM = this.getDotDOM();

        return (
            <div className="zby-carousel-box" ref="box">
                <div className="zby-carousel-list" ref="list" style={listStyle}>
                    {listDOM}
                </div>
                {dotDOM}
            </div>
        )
    }
}

export default Carousel