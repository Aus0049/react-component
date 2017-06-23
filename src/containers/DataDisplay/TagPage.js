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
                {content: "Basic", selected: false, closeable: true, onClick: this.handleTagClick},
                {content: "Pink", selected: true, closeable: true, style: {color: "#f5317f", background: "#fdd8e7", borderColor: "#fdd8e7"}},
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