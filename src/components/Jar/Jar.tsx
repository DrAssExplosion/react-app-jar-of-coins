import { useEffect, createRef, useRef } from 'react';
import { IJarComponent } from '../../interfaces';
import style from './Style.module.scss';
import imgJar from './../../images/jar.png';
import imgFilledJar from './../../images/filledJar.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIdActiveMiniJar, setMoneyInJar } from '../../store/reducers/currentJar';


const Jar = (props: IJarComponent) => {

    const jarComponentRef = useRef(null);
    const dispatch = useAppDispatch();
    const arrJars = useAppSelector(state => state.allJars);


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
                onDragLeave={e => dragLeaveHandler(e)}></div>
            <div className={style.textBottom}>
                {
                    props.filled === true ? <span onClick={() => { openModal(); }}>Перепроверить</span> : null
                }
            </div>


        </div>
    );

}

export default Jar;
