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
    handleUploadChange (obj) {
        const {uploadList1} = this.state;

        if(obj.status === 'loading'){
            uploadList1.push(obj);
        } else {
            uploadList1.map((item, index)=>{
                if(item.id === obj.id){
                    uploadList1.splice(index, 1, obj)
                }
            });
        }

        this.setState({uploadList1: uploadList1});
    }
    handleDelete (id) {
        const {uploadList1} = this.state;

        uploadList1.map((item, index)=>{
            if(item.id === id){
                uploadList1.splice(index, 1);
            }
        });

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
                    onChange={this.handleUploadChange.bind(this)}
                    onDelete={this.handleDelete.bind(this)}
                />
            </div>
        )
    }
}

export default UploaderPage