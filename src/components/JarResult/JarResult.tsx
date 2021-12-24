import { useRef } from 'react';
import { IJarComponentResult } from '../../interfaces';
import style from './Style.module.scss';
import imgFilledJar from './../../images/filledJar.png';
import imgJar from './../../images/jar.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


const JarResult = (props: IJarComponentResult) => {

    const jarComponentRef = useRef(null);
    const dispatch = useAppDispatch();
    const arrJars = useAppSelector(state => state.allJars);



    const styleImage = {
        backgroundImage: props.filled === true ? `url(${imgFilledJar})` : `url(${imgJar})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100px',
        height: '170px'
    };

    const styleContainer = {
        backgroundColor: props.amount === 0.56 ? '#E8FFE0' : '#FFE6E0',
        border: props.amount === 0.56 ? '2px solid #9DD765' : '2px solid #F7A491',
    };


    return (
        <div className={style.jarContainer}>
            <div className={style.header}>${props.amount}</div>
            <div className={style.container} style={styleContainer}>
                <div style={styleImage}></div>
            </div>
        </div>
    );

}

export default JarResult;
