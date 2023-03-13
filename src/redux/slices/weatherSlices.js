import { combineReducers, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CallWeather, CallForecast } from '../../apis/openweather';


//ACTIONS
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
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
)

//SLICES
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
    initialState: '',
    reducers: {
        changeCity: (state, action) => {
            state = action?.payload;
        }
    }
})

const rootReducer = combineReducers({
    weather: weatherSlice.reducer,
    forecast: forecastSlice.reducer,
    world: worldSlice.reducer,
    city: selectedCitySlice.reducer
});

export default rootReducer;