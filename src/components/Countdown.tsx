import { useContext, useState } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

import styles from '../styles/components/Countdown.module.css';

export function Counter() {

    const { minutes, seconds, progress } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div className={styles.countdownContainer}>
            <span>Time until next 10 spins:</span>
            <div
                className={styles.progressCircle}
                style={{ background: `conic-gradient(var(--background) ${progress * 3.6}deg, var(--primary) 0deg)` }}
            >
                <div>
                    <div className={styles.countdown}>
                        <div className={styles.minutes}>
                            <span>{minuteLeft}</span>
                            <span>{minuteRight}</span>
                        </div>
                        :
                        <div className={styles.seconds}>
                            <span>{secondLeft}</span>
                            <span>{secondRight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}