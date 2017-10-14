/**
 * Created by Aus on 2017/10/13.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import List from '../../components/DataDisplay/List/'
import Tools from '../../components/Tools/Tools'

const Item = List.Item;

const Home = () => {
    return (
        <div className="page home">
            <h1 className="title">React 组件库</h1>
            <ListTitle title="数据输入" />
            <List>
                <Item
                    extra="Button" arrow="horizontal"
                    onClick={()=>{Tools.linkTo('/data-entry/button')}}
                >按钮
                </Item>
                {/*<Item*/}
                    {/*subtitle="Switch" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-entry/switch')}}*/}
                {/*>滑动按钮*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="DatePicker" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-entry/date-picker')}}*/}
                {/*>日期选择器*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Picker" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-entry/picker')}}*/}
                {/*>选择器*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="PickerView" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-entry/picker-view')}}*/}
                {/*>选择器*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Uploader" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-entry/uploader')}}*/}
                {/*>上传预览*/}
                {/*</Item>*/}
            </List>
            <ListTitle title="数据展示" />
            <List>
                <Item
                    extra="List" arrow="horizontal"
                    onClick={()=>{Tools.linkTo('/data-display/list')}}
                >列表项
                </Item>
                {/*<Item*/}
                    {/*subtitle="Carousel" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-display/carousel')}}*/}
                {/*>轮播图*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Tag" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/data-display/tag')}}*/}
                {/*>标签*/}
                {/*</Item>*/}
            </List>
            {/*<ListTitle title="表单组件" />*/}
            {/*<List>*/}
                {/*<Item*/}
                    {/*subtitle="Input" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/input')}}*/}
                {/*>单行文本*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="TextArea" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/textarea')}}*/}
                {/*>多行文本*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Number" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/number')}}*/}
                {/*>数值*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Switch" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/switch')}}*/}
                {/*>开关*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="DateRange" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/date-range')}}*/}
                {/*>日期区间*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="DateTime" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/date-time')}}*/}
                {/*>日期时刻*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Select" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/select')}}*/}
                {/*>单选框*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Checkbox" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/checkbox')}}*/}
                {/*>复选框*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Form" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/form/form')}}*/}
                {/*>表单*/}
                {/*</Item>*/}
            {/*</List>*/}
            {/*<ListTitle title="操作反馈" />*/}
            {/*<List>*/}
                {/*<Item*/}
                    {/*subtitle="Toast" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/feedback/list')}}*/}
                {/*>提示*/}
                {/*</Item>*/}
                {/*<Item*/}
                    {/*subtitle="Popover" icon="horizontal"*/}
                    {/*onClick={()=>{Tools.linkTo('/feedback/popover')}}*/}
                {/*>气泡提示*/}
                {/*</Item>*/}
            {/*</List>*/}
        </div>
    )
};

export default Home