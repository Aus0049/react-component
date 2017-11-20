/**
 * Created by Aus on 2017/11/20.
 */
export default () => ({
    path: 'badge',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./BadgePage').default)
        }, 'badge')
    }
})