// 路由入口文件
import Layout from '../layout/index'
import Home from './Home/'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    getChildRoutes(location, callback) {
        require.ensure([], function (require) {
            callback(null, [
                require('./DataDisplay').default(),
                require('./DataEntry').default(),
                require('./Feedback').default(),
                require('./Form').default(),
            ])
        })
    }
    // childRoutes: [
    //     {path: 'index', component: Home},
    //     {path: '/data-entry', childRoutes: [
    //         {path: 'button', component: Button},
    //         {path: 'switch', component: Switch},
    //         {path: 'date-picker', component: DatePicker},
    //         {path: 'picker', component: Picker},
    //         {path: 'picker-view', component: PickerView},
    //         {path: 'uploader', component: Uploader},
    //     ]},
    //     {path: '/data-display', childRoutes: [
    //         {path: 'list', component: List},
    //         {path: 'carousel', component: Carousel},
    //         {path: 'Tag', component: TagPage},
    //     ]},
    //     {path: '/form', childRoutes: [
    //         {path: 'input', component: Input},
    //         {path: 'textarea', component: TextArea},
    //         {path: 'number', component: Number},
    //         {path: 'switch', component: FormSwitch},
    //         {path: 'select', component: Select},
    //         {path: 'date-range', component: DateRange},
    //         {path: 'date-time', component: DateTime},
    //         {path: 'checkbox', component: Checkbox},
    //         {path: 'form', component: Form},
    //     ]},
    //     {path: '/feedback', childRoutes: [
    //         {path: 'list', component: ToastPage},
    //         {path: 'popover', component: PopoverPage},
    //     ]}
    // ]
});

export default createRoutes