import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


//actions
export const fetchWeatherData = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${payload[0]}&lon=${payload[1]}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
        } catch (error) {
            if (!error?.response) {
                throw error
            }

            return rejectWithValue(error?.response?.data)
        }
    }
);

//slices
const weatherSlice = createSlice({
    name: 'weather',
    initialState: { data: 'Loaded' },
    extraReducers: (builder) => {
        //pending
        builder.addCase(fetchWeatherData.pending, (state, action) => {
            state.loading = true;
        });

        //fulfilled
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        //rejected
        builder.addCase(fetchWeatherData.rejected, (state, action) => {
            state.loading = false;
            state.weather = undefined;
            state.error = action?.payload;
        })
    }
});

export default weatherSlice.reducer;