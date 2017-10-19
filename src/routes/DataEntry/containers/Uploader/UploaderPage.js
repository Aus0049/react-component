/**
 * Created by Aus on 2017/10/19.
 */
import React from 'react'
import ListTitle from 'components/DataDisplay/ListTitle/'
import Uploader from 'components/DataEntry/Uploader/'
import Tools from 'components/Tools/Tools'

class UploaderPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        return (
            <div className="page uploader">
                <h1 className="title">
                    <span className="fa fa-home" onClick={()=>{Tools.linkTo('/')}} />
                    Uploader
                </h1>

                <ListTitle title="基本" />
                <Uploader
                    uploadUrl={'https://jsonplaceholder.typicode.com/posts/'}
                    max={9}
                />
            </div>
        )
    }
}

export default UploaderPage
