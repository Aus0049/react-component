/**
 * Created by Aus on 2017/10/14.
 */
export default () => ({
    path: 'data-display',
    getChildRoutes (nextState, callback) {
        require.ensure([], (require) => {
            callback(null, [
                require('./containers/List/index').default(),
            ]);
        }, 'data-display')
    },
})