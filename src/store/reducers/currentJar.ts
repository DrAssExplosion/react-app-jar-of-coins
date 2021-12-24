import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJarReducer } from '../../interfaces';
import { arrDataMoney, defaultObject } from '../defaultData';


const initialState: IJarReducer = { ...defaultObject };

const currentJarSlice = createSlice({
    name: 'currentJar',
    initialState,
    reducers: {
        addMoney(state, action: PayloadAction<number | null>) {
            if (action.payload !== null) {
                const money = arrDataMoney[action.payload] || 0;
                state.arrCounterMoney[action.payload] += 1;
                state.amount = +(state.amount + money).toFixed(2);
            }
        },
        setIdActiveMiniJar(state, action: PayloadAction<number | null>) {
            state.activeMiniJar = action.payload;
        },
        setIdActiveMoney(state, action: PayloadAction<number | null>) {
            state.activeMoney = action.payload;
        },
        setMoneyInJar(state, action: PayloadAction<boolean>) {
            state.moneyInJar = action.payload;
        },
        clearCurrentJar() {
            return initialState;
        },
    }
})

export const { setIdActiveMoney, setMoneyInJar, addMoney, clearCurrentJar, setIdActiveMiniJar } = currentJarSlice.actions;
export default currentJarSlice.reducer;