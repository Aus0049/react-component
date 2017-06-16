/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'
import Hammer from 'hammerjs'

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
        const {data} = this.props;
        const listHammer = new Hammer(list);

        let positionX;

        // 拖动开始记下当前位置
        listHammer.on('panstart', (e)=>{
            positionX = e.deltaX;
        });

        // 拖动中
        listHammer.on('panmove', (e)=>{
            // 拖动
            list.style.marginLeft = (e.deltaX - positionX) + "px";
        });

        // 拖动结束 判断是否翻页
        listHammer.on('panend', (e)=>{
            // 拖动
        });

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
    render () {
        const listStyle = this.getListStyle();
        const listDOM = this.getListDOM();

        return (
            <div className="zby-carousel-box" ref="box">
                <div className="zby-carousel-list" ref="list" style={listStyle}>
                    {listDOM}
                </div>
                <div className="zby-carousel-dot-box">
                    <span className="zby-carousel-dot"></span>
                    <span className="zby-carousel-dot"></span>
                    <span className="zby-carousel-dot"></span>
                    <span className="zby-carousel-dot"></span>
                </div>
            </div>
        )
    }
}

export default Carousel