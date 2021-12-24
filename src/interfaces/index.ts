export interface IMoneyComponent {
    idMoney: number,
    imageLink: string,
    count?: number,
    drag?: boolean,
    jarComponentRef?: any//React.MutableRefObject<JSX.Element> | null
}

export interface IJarComponent {
    main?: boolean,
    filled?: boolean,
    setJarComponentRef?: any,
    idJar?: number
}


export interface IJarComponentResult {
    filled: boolean,
    amount: number | null
}

export interface IJarReducer extends Required<Partial<Omit<IJarComponent, 'setJarComponentRef' | 'idJar'>>> {
    amount: number, // Сумма
    arrCounterMoney: [number, number, number, number]; // Количество каждой монеты (всего из 4) - [$0.25, $0.1, $0.05, $0.01]
    arrLinksMoney: [string, string, string, string]; // Ссылки на изображение монет
    activeMoney: number | null,
    activeMiniJar: number | null,
    moneyInJar: boolean
}