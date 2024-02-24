import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//reducer (redux)
const giphy = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

//Saga
const sagaMiddleware = createSagaMiddleware();

//SAGA generator functions
function* searchGiphySaga(action) {
    //try catch block
    try {
        // code to try running here
        const searchResult = yield axios.post('/api/giphysearch', {
           searchTerm: action.payload.name, 
        });
        yield put({ type: 'SET_IMAGES', payload: searchResult.data });
    } catch (error) {
        // error happens try get sent here
        console.log('ERROR:', error);
    }
}

//Saga function [generator function]
function* watcherSaga() {
    // yield
    yield takeEvery('SEARCH_GIPHY', searchGiphySaga);
}

//This creating the store
//the store is the big JS object to that holds all of the data for our app
const store = createStore(
    //this function is our first reducer
    //reducer is a function that runs every time an action is dispatched
    combineReducers({
        giphy,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

export default store;