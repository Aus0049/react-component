/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle/'
import Uploader from '../../components/DataEntry/Uploader/'
import Tools from '../../components/Tools/Tools'

class UploaderPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uploadList1: []
        };
    }
    render () {
        const {uploadList1} = this.state;

        return (
            <div className="page uploader">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo('/index')}} />
                    Uploader
                </h1>

                <ListTitle title="基本" />
                <Uploader
                    data={uploadList1}
                    uploadUrl={'https://jsonplaceholder.typicode.com/posts/'}
                    max={9}
                />
            </div>
        )
    }
}

export default UploaderPage