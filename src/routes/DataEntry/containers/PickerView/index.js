/**
 * Created by Aus on 2017/10/20.
 */
export default () => ({
    path: 'picker-view',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./PickerViewPage').default)
        }, 'picker-view')
    }
})