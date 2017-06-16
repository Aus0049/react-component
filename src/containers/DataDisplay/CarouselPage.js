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
        {content: "1", style: {'textAlign': 'center', 'font-size': '40px', 'color': '#fff', 'background': 'red'}},
        {content: "2", style: {'textAlign': 'center', 'font-size': '40px', 'color': '#fff', 'background': 'blue'}},
        {content: "3", style: {'textAlign': 'center', 'font-size': '40px', 'color': '#fff', 'background': 'yellow'}},
        {content: "4", style: {'textAlign': 'center', 'font-size': '40px', 'color': '#fff', 'background': 'green'}}
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
                    startIndex={0} />
            </div>
        </div>
    )
};

export default CarouselPage