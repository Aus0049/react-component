/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'

class Carousel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentFigureIndex: 0,
        }
    }
    componentDidMount () {
        // 初始化手势事件
        this.bindGestureEvent();
    }
    bindGestureEvent () {
        // 手势事件
        const list = this.refs.list;
        const {data} = this.props;





    }
    getListDOM () {
        const {data} = this.props;
        let result = [];

        data.map((item, index)=>{
            const {content, style, ...props} = item;
            result.push(
                <div className="zby-carousel-figure" key={index} style={style} {...props}>{content}</div>
            );
        });

        return result;
    }
    render () {
        const listDOM = this.getListDOM();

        return (
            <div className="zby-carousel-box">
                <div className="zby-carousel-list" ref="list">
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