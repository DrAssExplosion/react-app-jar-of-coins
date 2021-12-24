import { IJarReducer } from "../interfaces";
import imgMoney_0_1 from './../images/money_0_1.png';
import imgMoney_0_01 from './../images/money_0_01.png';
import imgMoney_0_05 from './../images/money_0_05.png';
import imgMoney_0_25 from './../images/money_0_25.png';

export const arrDataMoney = [0.25, 0.1, 0.05, 0.01];

export const defaultObject: IJarReducer = {
    amount: 0,
    filled: false,
    main: false,
    arrCounterMoney: [0, 0, 0, 0],
    arrLinksMoney: [imgMoney_0_25, imgMoney_0_1, imgMoney_0_05, imgMoney_0_01],
    activeMoney: null,
    activeMiniJar: null,
    moneyInJar: false
};

