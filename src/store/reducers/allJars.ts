import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJarReducer } from '../../interfaces';
import { defaultObject } from '../defaultData';



const initialState: IJarReducer[] = [{ ...defaultObject }, { ...defaultObject }, { ...defaultObject }];

const allJarsSlice = createSlice({
    name: 'allJarsSlice',
    initialState,
    reducers: {
        setJar(state, action: PayloadAction<IJarReducer>) {
            let index: number | null = null;
            state.some((e, i) => {
                if (e.amount === 0) {
                    index = i;
                    return true;
                }
            });
            if (index !== null) {
                const obj = { ...action.payload };
                obj.filled = true;
                state[index] = obj;
            }
        },
        resetJar(state, action: PayloadAction<number>) {
            state[action.payload] = { ...defaultObject };
        }
        ,
        resetAllJars() {
            return initialState;
        }
    }
})

export const { setJar, resetJar, resetAllJars } = allJarsSlice.actions;
export default allJarsSlice.reducer;