import Money from '../Money/Money';
import style from './Style.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIdActiveMiniJar } from '../../store/reducers/currentJar';
import vector from './../../images/vector.png';
import { useEffect, useState } from 'react';
import { resetJar } from '../../store/reducers/allJars';

const ModalJarInfo = () => {

    const arrJars = useAppSelector(state => state.allJars);
    const currentJar = useAppSelector(state => state.currentJar);
    const [idJar, setIdJar] = useState(currentJar.activeMiniJar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIdJar(currentJar.activeMiniJar);
    }, [currentJar.activeMiniJar])

    const styleModal = {
        display: currentJar.activeMiniJar !== null ? 'flex' : 'none'
    };

    const redoEvent = () => {
        if (idJar !== null) {
            dispatch(resetJar(idJar));
            dispatch(setIdActiveMiniJar(null));
        }
    }
    return (
        <div className={style.container} style={styleModal}>

            <div className={style.header}><img src={vector} onClick={() => { dispatch(setIdActiveMiniJar(null)); }} /> </div>


            <div className={style.main}>
                {
                    idJar !== null ? arrJars[idJar].arrCounterMoney.map((count, i) => <Money key={i} idMoney={i} imageLink={arrJars[idJar].arrLinksMoney[i]} count={count} />) : null
                }
            </div>


            <div className={style.footer}>
                <input onClick={() => { redoEvent() }} className={style.buttonDone} type='button' value='Повторить' />
            </div>

        </div>
    );
}

export default ModalJarInfo;
