import { useState } from 'react';
import { useLegends } from '../contexts/LegendsContext';

import { useSpring, useChain, useSpringRef, animated, useTransition } from '@react-spring/web';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';

import { Alert } from '../components/Alert';

import styles from '../styles/components/Controls.module.css';

interface AlertController {
    openModal: () => void;
    closeModal: () => void;
}

export function Controls() {

    const {
        spins,
        isRevealing,
        handleSpin,
        handleDiscardLegend,
        handleAddLegend,
        legend
    } = useLegends();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const alertController: AlertController = {
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false)
    }

    function handleShowAlert() {
        if (legend.rarity === 'common' || legend.rarity === 'rare') {
            return handleDiscardLegend();
        }

        setIsModalOpen(true);
    }

    const isOutOfSpins = spins <= 0;

    const springRef = useSpringRef();
    const props = useSpring({ ref: springRef })

    useChain([springRef, springRef], [0.5, 2])

    return (
        <div className={styles.controlsContainer}>

            <span>
                <animated.span style={props}>
                    {spins}
                </animated.span>
                spins left
            </span>

            {isRevealing && (
                <div>
                    <button onClick={handleShowAlert}>
                        <MdAttachMoney color="#fff" size={32} className={styles.icon} />
                        Vender
                    </button>
                    <button onClick={handleAddLegend}>
                        Adicionar
                        <AiOutlineCheckCircle color="#fff" size={32} className={styles.icon} />
                    </button>
                </div>
            )}

            {isModalOpen && <Alert controller={alertController} />}

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