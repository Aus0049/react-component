/**
 * Created by Aus on 2017/5/6.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Picker from '../../components/DataEntry/Picker'
import List from '../../components/DataDisplay/List'

const Item = List.Item;

class PickerPage extends React.Component {
    render () {
        return (
            <div className="page switch">
                <h1 className="title">Picker</h1>

                <ListTitle title="基本" />
                <List>
                    <Picker>
                        <Item >单列选择</Item>
                    </Picker>
                </List>
            </div>
        );
    }
}

export default PickerPage;
