import { combineReducers, createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CallWeather, CallForecast, callCity } from '../../apis/openweather';


//ACTIONS
export const fetchOWCityAction = createAsyncThunk(
    'city/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(callCity(payload.lat, payload.lon));
            // console.log(data);
            return data[0];
        } catch (error) {
            if (!error?.response) {
                throw error;
            }

            return rejectWithValue(error?.response?.data);
        }
    }
)

export const fetchWeatherAction = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(CallWeather(payload.lat, payload.lon));
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error;
            }

            return rejectWithValue(error?.response?.data)
        }
    }
);

export const fetchForecastAction = createAsyncThunk(
    'forecast/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(CallForecast(payload.lat, payload.lon));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }

            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchWorldAction = createAsyncThunk(
    'world/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(payload)
            //console.log(data);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }

            return rejectWithValue(error?.response?.data);
        }
    }
);

export const selectedCityAction = createAction(
    'city',
    (payload) => {
        try {
            console.log('weatherSlices->selectedCityAction->payload');
            console.log(payload);
            return payload
        } catch (error) {
            console.log(error);
        }
    }
)

//SLICES
export const currentLocationCoordsAction = dispatch => {
    const coord = { lat: 0, lon: 0 };
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        coord.lat = position.coords.latitude;
        coord.lon = position.coords.longitude
    }, error => {
        console.log(error);
    });

    dispatch(getCoords())
};
const currentLocationCoordsSlice = createSlice({
    name: 'currentLocationCoords',
    initialState: {},
    reducers: {
        getCoords: (state, action) => {
            // const coord = { lat: 0, lon: 0 };
            // navigator.geolocation.getCurrentPosition(position => {
            //     console.log(position.coords);
            //     coord.lat = position.coords.latitude;
            //     coord.lon = position.coords.longitude
            // }, error => {
            //     console.log(error);
            // });

            state.coords = action?.payload;

            return state;
        }
    }
})

const owCitySlice = createSlice({
    name: 'owCity',
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchOWCityAction.pending, (state) => {
            state.loading = true;
        });

        //fulfilled
        builder.addCase(fetchOWCityAction.fulfilled, (state, action) => {
            state.loading = false;
            state.owCity = action?.payload;
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchOWCityAction.rejected, (state, action) => {
            state.loading = false;
            state.owCity = undefined;
            state.error = action?.payload;
        })
    }
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true;
        });

        //fulfilled
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            // console.log(action);
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchWeatherAction.rejected, (state, action) => {
            state.loading = false;
            state.weather = undefined;
            state.error = action?.payload;
        });
    }
});

const forecastSlice = createSlice({
    name: 'forecast',
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchForecastAction.pending, (state, action) => {
            state.loading = true;
        });

        //fullfiled
        builder.addCase(fetchForecastAction.fulfilled, (state, action) => {
            state.forecast = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchForecastAction.rejected, (state, action) => {
            state.forecast = undefined;
            state.loading = false;
            state.error = action?.payload;
        });
    }
});

const worldSlice = createSlice({
    name: 'world',
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWorldAction.pending, (state, action) => {
            state.loading = true;
        });

        //fulfilled
        builder.addCase(fetchWorldAction.fulfilled, (state, action) => {
            state.world = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchWorldAction.rejected, (state, action) => {
            state.world = undefined;
            state.loading = false;
            state.error = action?.payload;
        });
    }
})

const selectedCitySlice = createSlice({
    name: 'city',
    initialState: {},
    reducers: {
        changeCity: (state, action) => {
            state = action?.payload;
        }
    }
})

const rootReducer = combineReducers({
    coords: currentLocationCoordsSlice.reducer,
    owCity: owCitySlice.reducer,
    weather: weatherSlice.reducer,
    forecast: forecastSlice.reducer,
    world: worldSlice.reducer,
    city: selectedCitySlice.reducer
});

export const { getCoords } = currentLocationCoordsSlice.actions;
export default rootReducer;