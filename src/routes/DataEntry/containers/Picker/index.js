/**
 * Created by Aus on 2017/11/7.
 */
export default () => ({
    path: 'picker',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./PickerPage').default)
        }, 'picker')
    }
})