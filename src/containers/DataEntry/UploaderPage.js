/**
 * Created by Aus on 2017/7/4.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Uploader from '../../components/DataEntry/Uploader/'
import Tools from '../../components/Tools/Tools'

class UploaderPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            uploadList1: []
        };
        this.handleUploadChange = this.handleUploadChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleUploadChange (obj) {

        if(obj.status === 'loading'){
            this.setState((previousState)=>{
                return previousState.uploadList1.push(obj);
            });
        } else {
            this.setState((previousState)=>{
                return previousState.uploadList1.map((item, index)=>{
                    if(item.id === obj.id){
                        previousState.uploadList1.splice(index, 1, obj)
                    }
                });
            });
        }
    }
    handleDelete (id) {
        this.setState((previousState)=>{
            return previousState.uploadList1.map((item, index)=>{
                if(item.id === id){
                    previousState.uploadList1[index].status = 'deleted';
                }
            });
        });
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
                    onChange={this.handleUploadChange}
                    onDelete={this.handleDelete}
                />
            </div>
        )
    }
}

export default UploaderPage