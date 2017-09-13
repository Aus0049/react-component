/**
 * Created by Aus on 2017/9/6.
 */
import React from 'react'
import classNames from 'classnames'

class Popover extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isAppear: false
        }
    }
    handle (e) {
        this.setState({isAppear: true});
    }
    render () {

        return (
            <div onTouchStart={this.handle.bind(this)}>
                {this.props.children}
                {this.state.isAppear ? <div>1111</div> : ''}
            </div>
        );
    }
}

export default Popover