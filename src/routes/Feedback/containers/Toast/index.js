/**
 * Created by Aus on 2017/10/18.
 */
export default () => ({
    path: 'toast',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./ToastPage').default)
        }, 'toast')
    }
})