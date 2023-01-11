export default function createStore(reducer, enhancer) {

    // 当传入 enhancer
    if(enhancer) {
        return enhancer(createStore)(reducer);
    }
    
    let state = null;
    let listeners = [];

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    // 用来获取初始值
    dispatch({
        type: 'INIT'
    })

    return {
        dispatch,
        getState,
        subscribe
    }
}