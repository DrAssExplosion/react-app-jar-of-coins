import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    data: null,
};

const dataMainJarSlice = createSlice({
    name: 'dataMainJar',
    initialState,
    reducers: {
        setDataMainJar(state, action: PayloadAction<any>) {
            state.data = action.payload;
        }
    }
})

export const { setDataMainJar } = dataMainJarSlice.actions;
export default dataMainJarSlice.reducer;