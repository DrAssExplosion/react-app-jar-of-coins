import { createAction } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IMoneyComponent } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMoney, setIdActiveMoney, setMoneyInJar } from '../../store/reducers/currentJar';
import MiniCounter from '../MiniCounter/MiniCounter';
import style from './Style.module.scss';


const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


const Money = (props: IMoneyComponent) => {

    const dispatch = useAppDispatch();
    const idActiveMoneyStore = useAppSelector(state => state.currentJar.activeMoney);
    const moneyInJar = useAppSelector(state => state.currentJar.moneyInJar);
    const [positionX, setPositionX] = useState('20px');
    const [positionY, setPositionY] = useState('20px');
    const [zIndex, setZIndex] = useState(5);

    let styleMoney = {};

    useEffect(() => {
        const x = getRandomInt(5, 50);
        const y = getRandomInt(15, 45);
        let left = x + 'px';
        let top = y + 'px';
        setPositionX(left);
        setPositionY(top);
        setZIndex(20 - y);
    }, [])

    if (props.eventMoneyInJar === true) {
        styleMoney = {
            left: positionX,
            bottom: positionY,
            zIndex: zIndex
        };
    }

    const styleImage = {
        backgroundImage: `url(${props.imageLink})`
    };

    const moveMoneyInJar = (e: any): void => {
        e.preventDefault()

        let x = e.clientX - e.target.offsetParent.offsetParent.offsetWidth * 3;
        let y = - e.clientY + e.target.offsetParent.offsetParent.offsetHeight * 2;
        x = x >= 50 ? 50 : (x <= 5) ? 5 : x;
        y = y >= 45 ? 45 : (y <= 15) ? 15 : y;

        let left = x + 'px';
        let top = y + 'px';

        setZIndex(20 - y);
        setPositionX(left);
        setPositionY(top);
    }

    const dragStartHandler = (e: any): void => {
        props.jarComponentRef.current.style.filter = 'hue-rotate(345deg)';
        dispatch(setIdActiveMoney(props.idMoney));
    }
    const dragEnterHandler = (e: any): void => {
        if (props.eventMoneyInJar === true) {
            e.currentTarget.style.filter = 'hue-rotate(325deg)';
            dispatch(setMoneyInJar(true));
        }
    }
    const dragEndHandler = (e: any): void => {
        props.jarComponentRef.current.style.filter = 'hue-rotate(0)';
        if (moneyInJar) {
            dispatch(addMoney(idActiveMoneyStore));
        }
        dispatch(setIdActiveMoney(null));
    }

    return (
        <div style={{ position: props.eventMoneyInJar === true ? 'absolute' : 'relative', ...styleMoney }} >
            <div
                className={style.imageBlock}
                style={styleImage}
                draggable={true}
                onDrag={e => props.eventMoneyInJar === true ? moveMoneyInJar(e) : e.preventDefault()}
                //  onDragOver={e => e.preventDefault()}
                onDragOver={e => dragEnterHandler(e)}
                onDragStart={e => props.drag === true ? dragStartHandler(e) : props.eventMoneyInJar === true ? {} : e.preventDefault()}
                onDragEnd={e => props.drag === true ? dragEndHandler(e) : props.eventMoneyInJar === true ? {} : e.preventDefault()}>
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
