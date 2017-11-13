/**
 * Created by Aus on 2017/11/13.
 */
export default () => ({
    path: 'tooltip',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./TooltipPage').default)
        }, 'tooltip')
    }
})