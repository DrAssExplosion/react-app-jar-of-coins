import { createAction } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IMoneyComponent } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMoney, setIdActiveMoney, setMoneyInJar } from '../../store/reducers/currentJar';
import MiniCounter from '../MiniCounter/MiniCounter';
import style from './Style.module.scss';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}



const Money = (props: IMoneyComponent) => {

    const dispatch = useAppDispatch();
    const idActiveMoneyStore = useAppSelector(state => state.currentJar.activeMoney);
    const moneyInJar = useAppSelector(state => state.currentJar.moneyInJar);
    const dataMainJar = useAppSelector(state => state.dataMainJar);
    const [coordsMoney, setCoordsMoney] = useState([0, 0]);
    const [coordsMoveMoney, setCoordsMoveMoney] = useState([0, 0]);
    const moneyRef = useRef<HTMLInputElement>(null);
    const [zIndex, setZIndex] = useState(5);


    let styleMoney = {};

    useEffect(() => {
        const x = getRandomInt(0, 50);
        const y = getRandomInt(130, 145);
        setCoordsMoney([x, y]);
        setZIndex(y);
    }, [])

    if (props.eventMoneyInJar === true) {
        styleMoney = {
            left: coordsMoney[0] + 'px',
            top: coordsMoney[1] + 'px',
            zIndex: zIndex
        };
    }

    const styleImage = {
        backgroundImage: `url(${props.imageLink})`
    };

    const MoneyComponent = () => {
        return (
            <div ref={moneyRef} style={{ position: props.eventMoneyInJar === true ? 'absolute' : 'relative', ...styleMoney }} >
                <div className={style.imageBlock} style={styleImage}></div>
                <div>{(props.count !== null && props.count !== undefined) ? <MiniCounter count={props.count} /> : null}</div>
            </div>
        )
    }

    const moveMoneyInJar = (e: any, x: number, y: number): void => {
        if (moneyRef.current) {
            const dataElement = moneyRef.current.getBoundingClientRect();
            // const grabPositionX = x - left;
            // const grabPositionY = y - top;
            let coordsElementX = dataElement.left - dataMainJar.data.left;
            let coordsElementY = (dataMainJar.data.top + dataMainJar.data.height) - (dataElement.top + dataElement.height) + 70;
            
            coordsElementX = coordsElementX < 0 ? 0 : (coordsElementX > 50) ? 50 : coordsElementX;
            coordsElementY = coordsElementY < 130 ? 130 : (coordsElementY > 145) ? 145 : coordsElementY;
          
            setCoordsMoveMoney([coordsElementX, coordsElementY]);
            setZIndex(coordsElementY);
        }
    }

    const dragStartHandler = (): void => {
        dispatch(setIdActiveMoney(props.idMoney));
    }

    const dragEnterHandler = (e: any): void => {
        if (props.eventMoneyInJar === true) {
            dispatch(setMoneyInJar(true));
        }
    }

    const dragEndHandler = (_: any, x: number, y: number): void => {
        setCoordsMoney([coordsMoveMoney[0], coordsMoveMoney[1]]);
        if (moneyInJar) { dispatch(addMoney(idActiveMoneyStore)); }
        dispatch(setIdActiveMoney(null));
    }

    return (
        <>
            {
                props.drag === true ?
                    <DragDropContainer
                        targetKey="jar"
                        onDragOver={(_: any, e: any) => dragEnterHandler(e)}
                        onDragStart={() => dragStartHandler()}
                        onDragEnd={() => dragEndHandler(null, 0, 0)}>
                        <MoneyComponent />
                    </DragDropContainer>
                    : props.eventMoneyInJar === true ?
                        <DragDropContainer
                            targetKey="jar2"
                            onDrag={(_: any, e: any, x: number, y: number) => moveMoneyInJar(e, x, y)}
                            onDragEnd={(_: any, e: any, x: number, y: number) => dragEndHandler(e, x, y)}>
                            <MoneyComponent />
                        </DragDropContainer>
                        : <MoneyComponent />
            }
        </>
    );

}

export default Money;
