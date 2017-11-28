/**
 * Created by Aus on 2017/11/28.
 */
export default () => ({
    path: 'input',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./InputPage').default)
        }, 'input')
    }
})