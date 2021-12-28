import style from './Style.module.scss';
import { ITitle } from '../../interfaces';

const Title = (props: ITitle) => {

    let content = props.text;
    content ??= 'Составьте три разные комбинации, чтобы получить 0,56 доллара';

    return (
        <p className={style.style}>{content}</p>
    );

}

export default Title;
