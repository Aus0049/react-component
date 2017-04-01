// 路由入口文件
import Layout from '../layout/index'
import Home from '../containers/Home'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
        {path: 'index', component: Home},
        {path: '/data-list', childRoutes: [
            {path: 'list', component: List}
        ]}
    ]
})

export default createRoutes