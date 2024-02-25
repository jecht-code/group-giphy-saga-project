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
};

const favorites = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            action.payload;
        default:
            return state;
    }
};

//Saga
const sagaMiddleware = createSagaMiddleware();

//SAGA generator functions
function* searchGiphySaga(action) {
    //try catch block
    try {
        // code to try running here
        //changed .post to .get becuase of our router call.
        const searchResult = yield axios.post('/api/giphy/search', {
           searchTerm: action.payload.name, 
        });
        yield put({ type: 'SET_IMAGES', payload: searchResult.data });
    } catch (error) {
        // error happens try get sent here
        console.log('ERROR:', error);
    }
};

function* getFavoritesSaga(action) {
    try {
        const foundFavs = yield axios.get('/api/favorites');
        yield put ({ type: 'SET_FAVORITES', payload: foundFavs.data})
    } catch (error) {
        console.log('Error: ', error)
    }
};

//ADD a POST TO ADD ELEMENTS
function* postFavoriteSaga(action) {
    //try catch block
    try {
        //post a new element to the server
        yield axios({
            method: 'POST',
            url: '/api/favorites',
            data: action.payload
        });
        yield put({ type: 'GET_FAVORITES' });
    } catch(error) {
        console.log('error:', error);
    }
}

//Saga function [generator function]
function* watcherSaga() {
    // yield
    yield takeEvery('GET_FAVORITES', getFavoritesSaga);
    yield takeEvery('SEARCH_GIPHY', searchGiphySaga);
    yield takeEvery('GET_FAVORITES', postFavoriteSaga);
}

//This creating the store
//the store is the big JS object to that holds all of the data for our app
const store = createStore(
    //this function is our first reducer
    //reducer is a function that runs every time an action is dispatched
    combineReducers({
        giphy,
        favorites,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

export default store;