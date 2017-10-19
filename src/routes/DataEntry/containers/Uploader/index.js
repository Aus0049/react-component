/**
 * Created by Aus on 2017/10/19.
 */
export default () => ({
    path: 'uploader',
    getComponents(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./UploaderPage').default)
        }, 'uploader')
    }
})