/**
 * Created by Aus on 2017/11/28.
 */
export default () => ({
    path: 'form',
    getChildRoutes (nextState, callback) {
        require.ensure([], (require) => {
            callback(null, [
                require('./containers/Input').default(),
            ]);
        }, 'form')
    },
})