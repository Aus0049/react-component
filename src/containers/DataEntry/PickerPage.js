/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'

const Item = List.Item;

class PickerPage extends React.Component {
    render () {
        return (
            <div className="page switch">
                <h1 className="title">Picker</h1>

                <ListTitle title="基本" />
                <List>
                    <Item >单列选择</Item>
                </List>
            </div>
        );
    }
}

export default PickerPage;
