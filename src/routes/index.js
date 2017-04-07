// 路由入口文件
import Layout from '../layout/index'
import Home from '../containers/Home'
import Button from '../containers/DataEntry/Button'
import List from '../containers/DataDisplay/ListBox'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
        {path: 'index', component: Home},
        {path: '/data-entry', childRoutes: [
            {path: 'button', component: Button}
        ]},
        {path: '/data-display', childRoutes: [
            {path: 'list', component: List}
        ]}
    ]
})

export default createRoutes