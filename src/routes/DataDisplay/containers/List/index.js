/**
 * Created by Aus on 2017/10/14.
 */
export default () => ({
    path: 'list',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./ListPage').default)
        }, 'list')
    }
})