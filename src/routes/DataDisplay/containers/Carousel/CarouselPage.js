/**
 * Created by Aus on 2017/11/10.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import Carousel from 'components/DataDisplay/Carousel/'
import Tools from 'components/Tools/Tools'
import StarBucks from '../../../../static/img/star-bucks.jpg'

const CarouselPage = () => {
    const carouselData = [
        {content: 'Figure1', style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#26a69a'}},
        {content: 'Figure2', style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#ff751f'}},
        {content: <div style={{'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#a88652'}}>Figure3</div>},
        {content: <img src={StarBucks} style={{width: '100%', height: '100%'}}/>}
    ];

    return (
        <div className="page carousel">
            <h1 className="title">
                <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                Carousel
            </h1>

            <ListTitle title="基本" />
            <div style={{'padding': '0 5%'}}>
                <Carousel
                    data={carouselData}
                    startIndex={1}
                    dots={false}
                />
            </div>

            <ListTitle title="自动轮播，循环轮播" />
            <div style={{'padding': '0 5%'}}>
                <Carousel
                    data={carouselData}
                    autoplay
                    intervalTime={2000}
                    loopFromStart={false}
                />
            </div>

            <ListTitle title="自动轮播，不循环轮播，不可滑动" />
            <div style={{'padding': '0 5%'}}>
                <Carousel
                    data={carouselData}
                    startIndex={3}
                    autoplay
                    intervalTime={2000}
                    swipe={false}
                />
            </div>
            <ListTitle title="没有动画效果，有回调函数" />
            <div style={{'padding': '0 5%'}}>
                <Carousel
                    data={carouselData}
                    loopFromStart={false}
                    animation={false}
                    onFigureChange={(nextIndex)=>{console.log('afterChange index is ' + nextIndex)}}
                />
            </div>
        </div>
    )
};

export default CarouselPage