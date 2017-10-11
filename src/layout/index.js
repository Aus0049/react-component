import React from 'react'
import 'normalize.css'
import '../static/sass/index.scss'
import '../static/sass/component.scss'
import '../static/icon/font.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
