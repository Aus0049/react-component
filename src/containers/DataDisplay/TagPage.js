/**
 * Created by Aus on 2017/6/22.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Tools from '../../components/Tools/Tools'
import Tag from '../../components/DataDisplay/Tag'

class TagPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            colorfulTags: [
                {content: "Basic", selected: false, closeable: true, onClick: this.handleTagClick, onClose: this.handleTagClick},
                {content: "Basic", selected: true, closeable: false, onClick: this.handleTagClick},
                {content: "Pink", selected: false, closeable: false, style: {color: "#f5317f", background: "#fdd8e7", borderColor: "#fdd8e7"}},
                {content: <span><i className="fa fa-circle-o-notch fa-spin"></i>带icon的Tag</span>, selected: false, closeable: false, style: {color: "#f04134", background: "#fcdbd9", borderColor: "#fcdbd9"}},
                {content: "Disabled", selected: false, closeable: false, disabled: true},
                {content: "Orange", selected: false, closeable: false, disabled: true, style: {color: "#f56a00", background: "#fde3cf", borderColor: "#fde3cf"}},
                {content: "Green", selected: false, closeable: false, disabled: true, style: {color: "#00a854", background: "#cfefdf", borderColor: "#cfefdf"}},
                {content: "Cyan", selected: false, closeable: false, disabled: true, style: {color: "#00a2ae", background: "#cfedf0", borderColor: "#cfedf0"}},
                {content: "Blue", selected: false, closeable: false, disabled: true, style: {color: "#108ee9", background: "#d2eafb", borderColor: "#d2eafb"}},
                {content: "Purple", selected: false, closeable: false, disabled: true, style: {color: "#7265e6", background: "#e4e2fa", borderColor: "#e4e2fa"}},
            ]
        }
    }
    handleTagClick (item) {
        console.log(item);
    }
    getTagsDOM () {
        let result = [];
        const {colorfulTags} = this.state;

        colorfulTags.map((item, index)=>{
            result.push(<Tag key={index} {...item} />);
        });

        return result;
    }
    render () {
        const tagsDOM = this.getTagsDOM();

        return (
            <div className="page carousel">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Tag
                </h1>

                <ListTitle title="基本" />
                <div style={{padding: "20px 5%"}}>
                    {tagsDOM}
                </div>
            </div>
        );
    }
}

export default TagPage;