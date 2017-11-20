/**
 * Created by Aus on 2017/10/14.
 */
export default () => ({
    path: 'data-display',
    getChildRoutes (nextState, callback) {
        require.ensure([], (require) => {
            callback(null, [
                require('./containers/List/').default(),
                require('./containers/Carousel/').default(),
                require('./containers/Tooltip/').default(),
                require('./containers/Badge/').default(),
            ]);
        }, 'data-display')
    },
})