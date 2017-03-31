import React from 'react'

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
