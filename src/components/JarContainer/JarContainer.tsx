import { useState } from 'react';
import { IJarContainer } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setJar } from '../../store/reducers/allJars';
import { clearCurrentJar } from '../../store/reducers/currentJar';
import Jar from '../Jar/Jar';
import style from './Style.module.scss';


const JarContainer = (props: IJarContainer) => {

    const currentJar = useAppSelector(state => state.currentJar);
    const dispatch = useAppDispatch();


    return (
        <div className={style.style}>
            <Jar main={true} setJarComponentRef={props.setJarComponentRef} />

            {
                currentJar.amount > 0 ?
                    <div className={style.bottomElement}>
                        <span onClick={() => { dispatch(clearCurrentJar()) }} className={style.textClear}>Очистить</span>
                        <input onClick={() => { dispatch(setJar(currentJar)); dispatch(clearCurrentJar()); }} className={style.buttonDone} type='button' value='Подтвердить' />
                    </div> : null
            }
        </div>
    );
}

export default JarContainer;
