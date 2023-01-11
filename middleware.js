// function middleware({dispatch, getState}) {
//     return (next) => {
//         return (action) => {
//             return next(action);
//         }
//     }
// }

// createStore(reducer, applyMiddleware(a, b, c))
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => store.dispatch(action, ...args),
        }

        const middlewareChain = middlewares.map(mid => mid(middlewareAPI))

        const dispatch = compose(...middlewareChain)(store.dispatch);

        return {
            ...store,
            dispatch
        }
    };
}

function compose(...funcs) {
    // 没有中间件
    if (funcs?.length === 0) {
        return args => args;
    }

    // 单个中间件
    if (funcs?.length === 1) {
        return funcs[0];
    }

    // 多个中间件
    return funcs.reduce((prev, next) => (...args) => prev(next(...args)));
}