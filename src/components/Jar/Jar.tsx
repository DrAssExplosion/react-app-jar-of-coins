import { useEffect, createRef, useRef } from 'react';
import { IJarComponent } from '../../interfaces';
import style from './Style.module.scss';
import imgJar from './../../images/jar.png';
import imgFilledJar from './../../images/filledJar.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIdActiveMiniJar, setMoneyInJar } from '../../store/reducers/currentJar';
import Money from '../Money/Money';
import React from 'react';
import ReactDOM from 'react-dom';


const Jar = (props: IJarComponent) => {

    const jarComponentRef = useRef(null);
    const dispatch = useAppDispatch();
    const currentJar = useAppSelector(state => state.currentJar);

    useEffect(() => {
        if (props.main === true) {
            props.setJarComponentRef(jarComponentRef);
        }
    }, [props.filled]);

    const styleImage = {
        backgroundImage: props.filled === true ? `url(${imgFilledJar})` : `url(${imgJar})`,
        filter: props.filled === false ? 'opacity(0.7)' : 'opacity(1)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: props.filled !== undefined ? '105px' : '150px',
        height: props.filled !== undefined ? '170px' : '250px'
    };



    const dragEnterHandler = (e: any): void => {
        if (props.main === true) {
            e.currentTarget.style.filter = 'hue-rotate(325deg)';
            dispatch(setMoneyInJar(true));
        }
    }
    const dragLeaveHandler = (e: any): void => {
        if (props.main === true) {
            e.currentTarget.style.filter = 'hue-rotate(345deg)';
            dispatch(setMoneyInJar(false));
        }
    }

    const openModal = () => {
        if (props.idJar !== undefined && props.idJar !== null) {
            dispatch(setIdActiveMiniJar(props.idJar));
        }
    };

    return (
        <div
            className={style.jarContainer}
            ref={jarComponentRef}
            draggable={undefined}
        >
            <div
                style={styleImage}
                onDragEnter={e => dragEnterHandler(e)}
                onDragOver={e => { e.preventDefault() }}
                onDragLeave={e => dragLeaveHandler(e)}>
                {
                    props.main !== true ? null :
                        currentJar.arrCounterMoney.map((count, index) => {
                            const newArrElements = [];
                            for (let i = 0; i < count; i++) {
                                newArrElements.push(<Money key={i} idMoney={i} imageLink={currentJar.arrLinksMoney[index]} eventMoneyInJar={true} />)
                            }
                            return newArrElements;
                        })
                }
            </div>
            <div className={style.textBottom}>
                {
                    props.filled === true ? <span onClick={() => { openModal(); }}>Перепроверить</span> : null
                }
            </div>


        </div>
    );

}

export default Jar;
