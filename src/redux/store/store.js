import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import weatherReducer from '../slices/weatherSlices';

const store = configureStore({
    reducer: weatherReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;