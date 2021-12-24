import React from 'react';
import style from './Style.module.scss';

const MiniCounter = ({ count }: { count: number }) => {

    const backgroundStyle = {
        backgroundColor: count > 0 ? '#56bdda' : '#56bddaa2'
    }

    return (
        <div className={style.container} style={backgroundStyle}>
            ×{count}
        </div>
    );

}

export default MiniCounter;
