import createStore from './createStore.js';

const reducer = (state, action) => {
    switch (action.type) {
        case 'inc':
            return state + 1;
        case 'dec':
            return state - 1;
        default:
            return 0;
    }
}

const store = createStore(reducer);
const { subscribe, dispatch, getState } = store;

subscribe(() => {
    const state = getState();
    console.log('state', state)
})

dispatch({
    type: 'inc'
})