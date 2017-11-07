/**
 * Created by Aus on 2017/11/7.
 */
export default () => ({
    path: 'date-picker',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./DatePickerPage').default)
        }, 'date-picker')
    }
})