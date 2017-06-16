/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'

class Carousel extends React.Component {
    render () {
        return (
            <div className="zby-carousel-box">
                <div className="zby-carousel-window"></div>
                <div className="zby-carousel-list">
                    <div className="zby-carousel-item"></div>
                    <div className="zby-carousel-item"></div>
                    <div className="zby-carousel-item"></div>
                </div>
                <div className="zby-carousel-dot-box">
                    <span className="zby-carousel-dot"></span>
                    <span className="zby-carousel-dot"></span>
                    <span className="zby-carousel-dot"></span>
                </div>
            </div>
        )
    }
}

export default Carousel