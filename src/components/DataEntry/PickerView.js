/**
 * Created by Aus on 2017/5/24.
 */
import React from 'react'
import Hammer from 'hammerjs'

// 选择器组件
class PickerView extends React.Component {
    componentDidMount () {
        this.bindTouchEvent();
    }
    bindTouchEvent () {
        // 初次加载时候 初始化绑定事件
        // 给list绑定事件
        let list = this.refs.list;
        let content = this.refs.content;
        let listHammer = new Hammer(list);
        // console.log(this.refs.content);
        // window.content = this.refs.content;

        let position = undefined;
        // 拖动开始记录位置
        listHammer.on('pan', function (e) {
            position = e.deltaY;
            // console.log("start");
        });
        listHammer.on('panmove', function (e) {
            const distance = e.deltaY - position;
            // console.log(distancen);
            content.style.transform = `translateY(${distance}px)`;
        });
        listHammer.on('panend', function (e) {
            console.log("end");
        });

        // listHammer.on('swipeleft', function (e) {
        //     console.log("swipeleft");
        // });

        // this.bindPanDown(listHammer);
    }
    // bindPanDown (hammer) {
    //     // 绑定向下滑事件
    //     hammer.on('panstart', (e)=>{
    //         // 获取到滑动的距离
    //         const distance = e.deltaY;
    //         // 使content滑动对应距离
    //         console.log(distance);
    //         // this.refs.content.style.transform = `translateY(${distance}px)`;
    //     });
    // }
    render () {

        return (
            <div className="zby-picker-view-box">
                <div className="zby-picker-view-item">
                    <div className="zby-picker-view-list">
                        <div className="zby-picker-view-window" ref="list"></div>
                        <div className="zby-picker-view-indicator"></div>
                        <div className="zby-picker-view-content" ref="content">
                            <div className="zby-picker-view-col selected">1</div>
                            <div className="zby-picker-view-col">2</div>
                            <div className="zby-picker-view-col">3</div>
                            <div className="zby-picker-view-col">4</div>
                            <div className="zby-picker-view-col">5</div>
                            <div className="zby-picker-view-col">6</div>
                            <div className="zby-picker-view-col">7</div>
                            <div className="zby-picker-view-col">8</div>
                            <div className="zby-picker-view-col">9</div>
                            <div className="zby-picker-view-col">10</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PickerView