import { useContext } from 'react';
import { CodesContext } from '../contexts/CodesContext';

import styles from '../styles/components/DailyCode.module.css';

export function DailyCode() {

    const { dailyCode, isDailyCodeRedeemed } = useContext(CodesContext);

    return (
        <div className={styles.dailyCodeContainer} style={{ background: isDailyCodeRedeemed ? '#90E57E' : null }}>
            <h3>Your Daily code is:</h3>
            <div>
                <span>{dailyCode}</span>
                {isDailyCodeRedeemed && <span className={styles.redeemed}>redeemed!</span> }
            </div>
        </div>
    );
}
