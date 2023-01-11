import createStore from './createStore.js';
import applyMiddleware from './middleware.js';

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

function logger({ dispatch, getState }) {
    return next => action => {
        const prevState = getState();
        console.log('start logging.........');
        console.log('prev state', prevState);
        console.log('action', action);
        const result = next(action);
        const nextState = getState();
        console.log('next state', nextState);
        console.log('end logging.........');
        return result;
    }
}

const store = createStore(reducer, applyMiddleware(logger));
const { subscribe, dispatch, getState } = store;

subscribe(() => {
    const state = getState();
    console.log('state', state)
})

dispatch({
    type: 'inc'
})