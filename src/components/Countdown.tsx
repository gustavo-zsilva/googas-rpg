import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

import styles from '../styles/components/Countdown.module.css';

export function Counter() {

    const { minutes, seconds } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div className={styles.countdownContainer}>
            <span>Time until next 10 spins:</span>
            <div>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                :
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
        </div>
    );
}