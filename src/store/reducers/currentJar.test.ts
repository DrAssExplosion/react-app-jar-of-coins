import reducer, { addMoney } from './currentJar';
import { defaultObject } from '../defaultData';

test('should add money', () => {
    expect(reducer(defaultObject, addMoney(1))).toEqual(
        expect.objectContaining({
            amount: expect.any(Number)
        })
    );
})