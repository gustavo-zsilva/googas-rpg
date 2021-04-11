import { useState, useEffect, useContext } from 'react';

import { FiCode } from 'react-icons/fi';
import { CodesContext } from '../contexts/CodesContext';

import styles from '../styles/components/SpinCodes.module.css';

export function SpinCodes() {

    const { codes, usedCodes, setUsedCode } = useContext(CodesContext);
    const [code, setCode] = useState('');
    const codeNames = codes.map(code => code.name);

    useEffect(() => {
        if (!codeNames.includes(code)) return;
        
        const codeObj = codes.filter(code => code.name)[0];
        
        setUsedCode(codeObj);
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