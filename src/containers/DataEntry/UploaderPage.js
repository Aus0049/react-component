/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Uploader from '../../components/DataEntry/Uploader'
import Tools from '../../components/Tools/Tools'

class UploaderPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uploadList1: []
        }
    }
    handleUploadChange (obj, status = "start") {
        const {uploadList1} = this.state;

        if(status == "start"){
            uploadList1.push(obj);
        } else if (status == "loaded") {
            uploadList1.pop();
            uploadList1.push(obj);
        }

        this.setState({uploadList1: uploadList1});
    }
    render () {
        const {uploadList1} = this.state;

        return (
            <div className="page uploader">
                <h1 className="title">
                    <i className="fa fa-home" onClick={()=>{Tools.linkTo("/index")}}></i>
                    Uploader
                </h1>

                <ListTitle title="基本" />
                <Uploader
                    data={uploadList1}
                    uploadUrl={'https://jsonplaceholder.typicode.com/posts/'}
                    onChange={this.handleUploadChange.bind(this)} />
            </div>
        )
    }
}

export default UploaderPage