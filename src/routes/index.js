// 路由入口文件
import Layout from '../layout/index'
import Home from '../containers/Home'
import Button from '../containers/DataEntry/ButtonPage'
import Switch from '../containers/DataEntry/SwitchPage'
import Picker from '../containers/DataEntry/PickerPage'
import PickerView from '../containers/DataEntry/PickerViewPage'
import List from '../containers/DataDisplay/ListPage'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
        {path: 'index', component: Home},
        {path: '/data-entry', childRoutes: [
            {path: 'button', component: Button},
            {path: 'switch', component: Switch},
            {path: 'picker', component: Picker},
            {path: 'picker-view', component: PickerView},
        ]},
        {path: '/data-display', childRoutes: [
            {path: 'list', component: List}
        ]}
    ]
});

export default createRoutes