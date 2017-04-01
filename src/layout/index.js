import React from 'react'
import 'normalize.css'
import '../static/sass/index.scss'
import '../static/icon/font.css'

class Layout extends React.Component {
    render () {
        let state = this.state;

        return (
            <div className="react-container">
                {this.props.children}
            </div>
        )
    }
}

export default Layout
