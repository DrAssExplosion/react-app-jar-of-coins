import React, { useContext, useEffect, useState } from 'react';
import { IMoneyContainer } from '../../interfaces';
import Money from '../Money/Money';
import style from './Style.module.scss';

const MoneyContainer = (props: IMoneyContainer) => {

    const [jarComponentRef, setJarComponentRef] = useState(null);
    useEffect(() => {
        setJarComponentRef(props.jarComponentRef);
    }, [props.jarComponentRef])

    return (
        <div className={style.style}>
            {
                props.arrMoney.map((count: any, i: number) => <Money key={i} drag={true} idMoney={i} jarComponentRef={jarComponentRef} imageLink={props.currentJar.arrLinksMoney[i]} count={count} />)
            }
        </div>
    );

}

export default MoneyContainer;
