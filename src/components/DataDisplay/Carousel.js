/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'
import Hammer from 'hammerjs'
import classNames from 'classnames'

class Carousel extends React.Component {
    static propTypes = {
        data: React.PropTypes.array, // 图片源数组
        startIndex: React.PropTypes.number // 初始位置
    };
    static defaultProps = {
        data: [],
        startIndex: 0
    };
    constructor (props) {
        super(props);
        this.state = {
            currentFigureIndex: 0,
        }
    }
    componentDidMount () {
        // 初始化手势事件
        this.bindGestureEvent();

        const startIndex = this.props.startIndex;
        if(startIndex){
            this.setState({currentFigureIndex: startIndex});
        }

        // 获取轮播图宽度
        this.carouselWidth = this.refs.box.getBoundingClientRect().width;
    }
    bindGestureEvent () {
        // 手势事件
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
            const currentIndex = _this.getCurrentIndex();
            currentMarginLeft = - (currentIndex * this.carouselWidth) + 'px';
            // 滑动动画 滑到对应位置
            _this.animation(list, {marginLeft: currentMarginLeft}, 300, ()=>{
                // 改变当前index
                _this.setState({currentFigureIndex: currentIndex});
            });
        });
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
    getMovePosition (moveDistance, currentMarginLeft) {
        // 做一个 达到左右极限 简易弹簧效果
        const length = this.props.data.length;
        let result = moveDistance + currentMarginLeft;

        if(result >= 0){
            result = result / 2;
        } else if (result < -((length - 1) * this.carouselWidth)) {
            // 右边距
            result = -((length - 1) * this.carouselWidth) + ((result + ((length - 1) * this.carouselWidth)) / 2);
        }

        return result;
    }
    getCurrentIndex () {
        // 判断list当前应在那个index
        const {data} = this.props;
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
    getListDOM () {
        const {data} = this.props;
        let result = [];
        const width = (100 / data.length) + "%";

        data.map((item, index)=>{
            const {content, style, ...props} = item;
            result.push(
                <div className="zby-carousel-figure" key={index} style={Object.assign({'width': width}, style)} {...props}>{content}</div>
            );
        });

        return result;
    }
    getListStyle () {
        // 处理list的宽度和当前的marginLeft
        const {data} = this.props;
        const {currentFigureIndex} = this.state;
        const result = {'width': (data.length * 100) + "%"};

        // 获取轮播图宽度
        if(this.carouselWidth) {
            result.marginLeft = - (this.carouselWidth * currentFigureIndex) + "px";
        } else {
            // 不存在 归0
            result.marginLeft = "0px";
        }

        return result;
    }
    getDotDOM () {
        const data = this.props.data;
        const {currentFigureIndex} = this.state;
        let result = [];

        data.map((item, index)=>{
            result.push(
                <span key={index} className={classNames(['zby-carousel-dot', {'active': index == currentFigureIndex}])}></span>
            );
        });

        return result;
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
                <div className="zby-carousel-dot-box">
                    {dotDOM}
                </div>
            </div>
        )
    }
}

export default Carousel