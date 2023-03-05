import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CallWeather, CallForecast } from '../../apis/openweather';


//actions
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
)

//slices
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
        })
    }
    // name: 'forecast',
    // initialState: {},
    // extraReducers: builder => {
    //     //pending
    //     builder.addCase(fetchForecastAction.pending, (state, action) => {
    //         state.loading = true;
    //     });

    //     //fullfiled
    //     builder.addCase(fetchForecastAction.fulfilled, (state, action) => {
    //         state.forecast = action?.payload;
    //         state.loading = false;
    //         state.error = undefined;
    //     });

    //     //rejected
    //     builder.addCase(fetchForecastAction.rejected, (state, action) => {
    //         state.forecast = undefined;
    //         state.loading = false;
    //         state.error = action?.payload;
    //     });
    // }
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
})

// export weatherSlice.reducer;
// export forecastSlice.reducer;

export default {
    weatherReducer: weatherSlice.reducer,
    forecastReducer: forecastSlice.reducer
};