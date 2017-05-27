// 项目的根组件
import React, { Component } from 'react'
import { browserHistory, Router } from 'react-router'

class AppContainer extends Component {
  // 验证参数
  static propTypes = {
    routes : React.PropTypes.object.isRequired
  };
  // 禁止reRender
  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes } = this.props;

    return (
        <div className="router-container">
          <Router history={browserHistory} children={routes} />
        </div>
    )
  }
}

export default AppContainer
