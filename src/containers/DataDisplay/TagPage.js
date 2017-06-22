/**
 * Created by Aus on 2017/6/22.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'
import Tools from '../../components/Tools/Tools'

class TagPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            colorfulTags: [{content: ""}]
        }
    }
    render () {
        return (
            <div className="page carousel">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Tag
                </h1>

                <ListTitle title="基本" />


            </div>
        );
    }
}

export default TagPage;