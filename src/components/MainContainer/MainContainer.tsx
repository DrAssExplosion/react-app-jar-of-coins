import { useState } from 'react';
import Money from '../Money/Money';
import style from './Style.module.scss';
import Jar from '../Jar/Jar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCurrentJar } from '../../store/reducers/currentJar';
import { resetAllJars, setJar } from '../../store/reducers/allJars';
import ModalJarInfo from '../ModalJarInfo/ModalJarInfo';
import JarResult from '../JarResult/JarResult';


const MainContainer = () => {

    const arrJars = useAppSelector(state => state.allJars);
    const currentJar = useAppSelector(state => state.currentJar);
    const dispatch = useAppDispatch();

    const [jarComponentRef, setJarComponentRef] = useState(null);
    const [submitIsDown, setSubmitIsDown] = useState(false);
    console.log(arrJars);
    console.log(currentJar);

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

                            <div className={style.header}>Составьте три разные комбинации, чтобы получить 0,56 доллара</div>

                            <div className={style.container}>

                                <div className={style.moneyContainer}>
                                    {
                                        currentJar.arrCounterMoney.map((count, i) => <Money key={i} idMoney={i} imageLink={currentJar.arrLinksMoney[i]} count={count} jarComponentRef={jarComponentRef} />)
                                    }
                                </div>

                                <div className={style.jarContainer}>
                                    <Jar main={true} setJarComponentRef={setJarComponentRef} />

                                    {
                                        currentJar.amount > 0 ?
                                            <div className={style.bottomElement}>
                                                <span onClick={() => { dispatch(clearCurrentJar()) }} className={style.textClear}>Очистить</span>
                                                <input onClick={() => { dispatch(setJar(currentJar)); dispatch(clearCurrentJar()); }} className={style.buttonDone} type='button' value='Подтвердить' />
                                            </div> : null
                                    }

                                </div>

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
