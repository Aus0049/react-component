// 项目入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer'

// 接受服务器端传来的state
// 初始化state

// 定义根节点的render
// render的时候 传进去store和router
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default()

  ReactDOM.render(
    <AppContainer routes={routes} />,
    MOUNT_NODE
  )
}

// 开发环境下 开启开发工具调试
if (window.__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
// 开发环境下的报错
if (window.__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// 非开发环境下 正常执行
render()
