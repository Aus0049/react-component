/**
 * Created by Aus on 2017/10/17.
 */
export default () => ({
    path: 'switch',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./SwitchPage').default)
        }, 'switch')
    }
})