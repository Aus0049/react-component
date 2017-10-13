/**
 * Created by Aus on 2017/10/13.
 */
export default () => ({
    path: 'button',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./ButtonPage').default)
        }, 'button')
    }
})
