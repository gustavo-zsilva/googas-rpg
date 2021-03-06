import { useState, useEffect, useContext } from 'react';

import { FiCode } from 'react-icons/fi';
import { CodesContext } from '../contexts/CodesContext';

import styles from '../styles/components/SpinCodes.module.css';

export function SpinCodes() {

    const { codes, redeemCode, dailyCode, isDailyCodeRedeemed, redeemDailyCode } = useContext(CodesContext);
    const [code, setCode] = useState('');

    useEffect(() => {

        const codeNames = codes.map(code => code.name);

        if (dailyCode === code && !isDailyCodeRedeemed) {
            // redeemDailyCode();
            setCode('');
            return;
        }

        if (!codeNames.includes(code)) return;

        const codeObj = codes.find(({name}) => name === code);
        
        redeemCode(codeObj);
        setCode('');
    }, [code])

    return (
        <div className={styles.spinCodesContainer}>
            <span>
                <FiCode color="var(--primary)" size={30} />
            </span>
            <input
                type="text"
                placeholder="Insert Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </div>
    );
}