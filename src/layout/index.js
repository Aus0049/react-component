import React from 'react'
import 'normalize.css'
import 'sass/index.scss'
import 'sass/component.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
require('font-awesome/css/font-awesome.css');


class Layout extends React.Component {
    render () {
        return (
            <ReactCSSTransitionGroup
            component="div"
            className="react-container"
            transitionName="slide-in"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            >
                <div key={this.props.location.pathname} className={this.props.location.pathname}>
                    {this.props.children}
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default Layout
