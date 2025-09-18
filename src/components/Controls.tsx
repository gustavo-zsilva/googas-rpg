import { useState } from 'react';
import { useLegends } from '../contexts/LegendsContext';

import { useSpring, useChain, useSpringRef, animated } from '@react-spring/web';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';
import { CiBag1 } from 'react-icons/ci';

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
        legend,
        openBundle
    } = useLegends();

    const [isOpen, setIsOpen] = useState(false);
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

    function handleOpenBundle() {
        setIsOpen(true);
        openBundle();
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
                        <MdAttachMoney color="#fff" size={28} className={styles.icon} />
                        <span>
                            Vender
                        </span>
                    </button>
                    <button onClick={handleAddLegend} className="bg-primary">
                        <AiOutlineCheckCircle color="#fff" size={28} className={styles.icon} />
                        <span>
                            Adicionar
                        </span>
                    </button>
                </div>
            )}

            {isModalOpen && <Alert controller={alertController} />}

            <button
                type="button"
                disabled={isOutOfSpins || isRevealing}
                style={{ display: isRevealing ? 'none' : null }}
                onClick={handleSpin}
                className="bg-primary"
            >
                Spin
            </button>

            <button className="bg-purple-500" disabled={isRevealing} onClick={handleOpenBundle}>
                <CiBag1 color="#fff" size={28} />
                <span>Open Bundle</span>
                <i className="text-sm">10 spins</i>
            </button>

                <div className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                    <div className=" rounded-lg bg-background">
                        <header className='flex'>
                            <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
                                Close
                            </button>
                        </header>
                        <p>Bundle loot</p>
                    </div>
                </div>

        </div>
    );
}

