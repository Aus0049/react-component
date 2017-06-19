/**
 * Created by Aus on 2017/6/16.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Carousel from '../../components/DataDisplay/Carousel'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

const CarouselPage = () => {
    const carouselData = [
        {content: "Figure1", style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#26a69a'}},
        {content: "Figure2", style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#ff751f'}},
        {content: <div style={{'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#a88652'}}>Figure3</div>},
        {content: <img src="http://imglf1.ph.126.net/yGAEbKu1MI4PBX8afuQP3Q==/6619135865514155584.jpg" style={{width: '100%', height: '100%'}}/>}
    ];

    return (
        <div className="page carousel">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Carousel
            </h1>

            <ListTitle title="基本" />
            <div style={{'padding': '0 5%'}}>
                <Carousel
                    data={carouselData}
                    startIndex={1} />
            </div>
        </div>
    )
};

export default CarouselPage