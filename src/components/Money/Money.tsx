import { createAction } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IMoneyComponent } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMoney, setIdActiveMoney } from '../../store/reducers/currentJar';
import MiniCounter from '../MiniCounter/MiniCounter';
import style from './Style.module.scss';



const Money = (props: IMoneyComponent) => {

    const dispatch = useAppDispatch();
    const idActiveMoneyStore = useAppSelector(state => state.currentJar.activeMoney);
    const moneyInJar = useAppSelector(state => state.currentJar.moneyInJar);

    // useEffect(() => {
    //     console.log(idActiveMoneyStore);
    // }, [idActiveMoneyStore, moneyInJar])


    const styleImage = {
        backgroundImage: `url(${props.imageLink})`
    };

    const dragStartHandler = (e: any): void => {
        props.jarComponentRef.current.style.filter = 'hue-rotate(345deg)';
        dispatch(setIdActiveMoney(props.idMoney));
    }
    const dragEndHandler = (e: any): void => {
        props.jarComponentRef.current.style.filter = 'hue-rotate(0)';
        if (moneyInJar) {
            dispatch(addMoney(idActiveMoneyStore));
        }
        dispatch(setIdActiveMoney(null));
    }

    return (
        <div style={{ position: 'relative' }}>
            <div
                className={style.imageBlock}
                style={styleImage}
                draggable={true}
                onDragStart={e => dragStartHandler(e)}
                onDragEnd={e => dragEndHandler(e)}>
            </div>
            <div>
                {
                    (props.count !== null && props.count !== undefined) ? <MiniCounter count={props.count} /> : null
                }
            </div>
        </div >
    );

}

export default Money;
