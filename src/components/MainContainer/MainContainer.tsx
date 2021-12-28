import { useEffect, useState } from 'react';
import style from './Style.module.scss';
import Jar from '../Jar/Jar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCurrentJar } from '../../store/reducers/currentJar';
import { resetAllJars, setJar } from '../../store/reducers/allJars';
import ModalJarInfo from '../ModalJarInfo/ModalJarInfo';
import JarResult from '../JarResult/JarResult';
import Title from '../Title/Title';
import MoneyContainer from '../MoneyContainer/MoneyContainer';
import JarContainer from '../JarContainer/JarContainer';
import Money from '../Money/Money';


const MainContainer = () => {

    const arrJars = useAppSelector(state => state.allJars);
    const currentJar = useAppSelector(state => state.currentJar);
    const dispatch = useAppDispatch();

    const [jarComponentRef, setJarComponentRef] = useState(null);
    const [submitIsDown, setSubmitIsDown] = useState(false);

    const restartApp = () => {
        dispatch(resetAllJars());
        dispatch(clearCurrentJar());
        setSubmitIsDown(false);
    };


    return (
        <>
            {
                submitIsDown === false ?
                    <div className={style.bodyContainer} >

                        <div className={style.main}>

                            <div className={style.header}><Title /></div>

                            <div className={style.container}>


                                <MoneyContainer arrMoney={currentJar.arrCounterMoney} currentJar={currentJar} jarComponentRef={jarComponentRef} />

                                <JarContainer setJarComponentRef={setJarComponentRef} />

                                <div className={style.multiJarContainer}>
                                    {
                                        arrJars.map((e, i) => <Jar idJar={i} key={i} filled={e.filled} />)
                                    }
                                    <ModalJarInfo />
                                </div>

                            </div>

                        </div>

                        <div className={style.bottomButtonSubmit}> <input onClick={() => { setSubmitIsDown(true); }} className={style.buttonDone} type='button' value='Сабмит' /></div>
                    </div>

                    :

                    <div className={style.bodyContainer} >

                        <div className={style.resultMain}>
                            <div className={style.resultContainer}>
                                <div className={style.container}>
                                    {
                                        arrJars.map((e, i) => <JarResult amount={e.amount} key={i} filled={e.filled} />)
                                    }
                                </div>
                                <div className={style.bottomButtonRedo}> <input onClick={() => { restartApp() }} className={style.buttonDone} type='button' value='Повторить' /></div>
                            </div>
                        </div>

                    </div>
            }
        </>
    );
}

export default MainContainer;
