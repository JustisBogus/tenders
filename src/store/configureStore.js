import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import tendersReducer from './reducers/tenders';

const rootReducer = combineReducers({
    tenders: tendersReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export default configureStore;