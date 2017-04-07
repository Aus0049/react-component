/**
 * Created by Aus on 2017/4/7.
 */
import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import List from '../../components/DataDisplay/List'

const Item = List.Item;

class Button extends React.Component {
    render () {
        return (
            <div className="page button">
                <h1 className="title">Button</h1>

                <ListTitle title="基本" />

            </div>
        )
    }
}

export default Button