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
    return (
        <div className="page carousel">
            <h1 className="title">
                <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                Carousel
            </h1>

            <ListTitle title="基本" />
            <Carousel />
        </div>
    )
};

export default CarouselPage