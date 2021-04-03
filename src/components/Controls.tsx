import { useContext } from 'react';
import { LegendsContext } from '../contexts/LegendsContext';

import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import styles from '../styles/components/Controls.module.css';

export function Controls() {

    const {
        legend,
        spins,
        isRevealing,
        isOutOfSpins,
        handleSpin,
        handleDiscardLegend,
        handleAddLegend,
    } = useContext(LegendsContext);

    return (
        <div className={styles.controlsContainer}>

            {isRevealing && (
                <div className={styles.legendInfo}>
                    <span style={{ fontFamily: legend.font }}>{legend.name}</span>
                    <span>{legend.rarity}</span>
                </div>
            )}

            <span>{spins} spins left</span>

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