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
    getListDOM () {
        const {data} = this.props;
        let result = [];

        for(let i of data){
            const {content, style, ...props} = i;
            result.push(
                <div className="zby-carousel-figure" style={style} {...props}>{content}</div>
            );
        }

        return result;
    }
    render () {
        const listDOM = this.getListDOM();

        return (
            <div className="zby-carousel-box">
                <div className="zby-carousel-list">
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