// 路由入口文件
import Layout from '../layout/index'
import Home from '../containers/Home'
import Button from '../containers/DataEntry/ButtonPage'
import Switch from '../containers/DataEntry/SwitchPage'
import DatePicker from '../containers/DataEntry/DatePickerPage'
import Picker from '../containers/DataEntry/PickerPage'
import PickerView from '../containers/DataEntry/PickerViewPage'
import Uploader from '../containers/DataEntry/UploaderPage'
import List from '../containers/DataDisplay/ListPage'
import Carousel from '../containers/DataDisplay/CarouselPage'
import ToastPage from '../containers/Feedback/ToastPage'
import TagPage from '../containers/DataDisplay/TagPage'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
        {path: 'index', component: Home},
        {path: '/data-entry', childRoutes: [
            {path: 'button', component: Button},
            {path: 'switch', component: Switch},
            {path: 'date-picker', component: DatePicker},
            {path: 'picker', component: Picker},
            {path: 'picker-view', component: PickerView},
            {path: 'uploader', component: Uploader},
        ]},
        {path: '/data-display', childRoutes: [
            {path: 'list', component: List},
            {path: 'carousel', component: Carousel},
            {path: 'Tag', component: TagPage},
        ]},
        {path: '/feedback', childRoutes: [
            {path: 'list', component: ToastPage}
        ]}
    ]
});

export default createRoutes