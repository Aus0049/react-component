/**
 * Created by Aus on 2017/10/13.
 */
export default () => ({
    path: 'data-entry',
    getChildRoutes (nextState, callback) {
        require.ensure([], (require) => {
            callback(null, [
                require('./containers/Button/index').default(),
                require('./containers/Switch/index').default(),
                require('./containers/Uploader/index').default(),
            ]);
        }, 'data-entry')
    },
})
