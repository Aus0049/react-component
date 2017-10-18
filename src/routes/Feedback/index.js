/**
 * Created by Aus on 2017/10/18.
 */
export default () => ({
    path: 'feedback',
    getChildRoutes (nextState, callback) {
        require.ensure([], (require) => {
            callback(null, [
                require('./containers/Toast/index').default()
            ]);
        }, 'feedback')
    },
})