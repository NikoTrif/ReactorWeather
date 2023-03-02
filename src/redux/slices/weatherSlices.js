import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


//actions
export const fetchWeatherAction = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log(payload);
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&appid=a043fe65d728314064a9719e20ff126f`);
            // console.log(res);

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
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true;
        });

        //fulfilled
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            console.log(action);
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
});

export default weatherSlice.reducer;