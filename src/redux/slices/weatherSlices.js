import { combineReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { callCity } from '../../apis/bigdatacloud';
import { CallWeather, CallForecast } from '../../apis/openweather';


//ACTIONS
export const fetchCityAction = createAsyncThunk(
    'city/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(callCity(payload?.lat, payload?.lon));
            // console.log('FetchCityAction', data);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }

            return rejectWithValue(error?.response?.data);
        }
    }
);

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

//SLICES
const currentLocationCoordsSlice = createSlice({
    name: 'currentLocationCoords',
    initialState: { coords: { lat: 0, lon: 0 } },
    reducers: {
        getCoords: (state, action) => {
            // console.log(action?.payload);
            state.coords = { ...action?.payload };
        }
    }
});

const citySlice = createSlice({
    name: 'city',
    initialState: {},
    extraReducers: builder => {

        //fulfilled
        builder.addCase(fetchCityAction.fulfilled, (state, action) => {
            state.loading = false;
            state.city = { ...action?.payload };
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchCityAction.rejected, (state, action) => {
            state.loading = false;
            state.city = undefined;
            state.error = action?.payload;
        });
    }
});

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
});

const searchSelectToggleSlice = createSlice({
    name: 'selectSearchToggle',
    initialState: { toggle: false },
    reducers: {
        setSearchSelectToggle: (state, action) => {
            state.toggle = action?.payload;
        }
    }
});

const temperatureScaleSlice = createSlice({
    name: 'temperatureScale',
    initialState: { scale: 'C', antiscale: 'F' },
    reducers: {
        setTemperatureScale: (state, action) => {
            state.scale = action?.payload;
            switch (action?.payload) {
                case 'C':
                    state.antiscale = 'F';
                    break;
                case 'F':
                    state.antiscale = 'C';
                    break;
            }
        }
    }
});

const rootReducer = combineReducers({
    coords: currentLocationCoordsSlice.reducer,
    searchSelectToggle: searchSelectToggleSlice.reducer,
    city: citySlice.reducer,
    weather: weatherSlice.reducer,
    forecast: forecastSlice.reducer,
    temperatureScale: temperatureScaleSlice.reducer,
    world: worldSlice.reducer
});

export const { getCoords } = currentLocationCoordsSlice.actions;
export const { setSearchSelectToggle } = searchSelectToggleSlice.actions;
export const { setTemperatureScale } = temperatureScaleSlice.actions;
export default rootReducer;