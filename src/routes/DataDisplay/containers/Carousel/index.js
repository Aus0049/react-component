/**
 * Created by Aus on 2017/11/10.
 */
export default () => ({
    path: 'carousel',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./CarouselPage').default)
        }, 'carousel')
    }
})