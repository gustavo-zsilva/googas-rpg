import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import styles from '../styles/components/Controls.module.css';

export function Controls() {

    const {
        spins,
        isRevealing,
        handleSpin,
        handleDiscardLegend,
        handleAddLegend,
    } = useContext(LegendsContext);

    const isOutOfSpins = spins <= 0;

    return (
        <div className={styles.controlsContainer}>

            <span>
                <span>
                    {spins}
                </span>
                spins left
            </span>

            {isRevealing && (
                <div>
                    <button onClick={handleDiscardLegend}>
                        <AiOutlineCloseCircle color="#fff" size={32} />
                        Descartar
                    </button>
                    <button onClick={handleAddLegend}>
                        Adicionar
                        <AiOutlineCheckCircle color="#fff" size={32} />
                    </button>
                </div>
            )}

            <button
                type="button"
                disabled={isOutOfSpins || isRevealing}
                style={{ display: isRevealing ? 'none' : null }}
                onClick={handleSpin}
            >
                Spin
            </button>
        </div>
    );
}