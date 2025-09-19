import { useState } from 'react';
import { useLegends } from '../contexts/LegendsContext';

import { useSpring, useChain, useSpringRef, animated } from '@react-spring/web';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';
import { CiBag1 } from 'react-icons/ci';

import { Alert } from '../components/Alert';

import styles from '../styles/components/Controls.module.css';
import Image from 'next/image';
import { rarityScheme } from '../utils/colorSchemes';
import Tilt from 'react-parallax-tilt';

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
        openBundle,
        handleAddSpins,
        luckySpins,
        bundleLegends,
        handleAddBundleLegends
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

    function handleSellBundleLegends() {
        setIsOpen(false);
    }

    function handleGetBundleLegends() {
        handleAddBundleLegends();
        setIsOpen(false);
    }

    const isOutOfSpins = spins <= 0;

    const springRef = useSpringRef();
    const props = useSpring({ ref: springRef })

    useChain([springRef, springRef], [0.5, 2])

    return (
        <div className={styles.controlsContainer}>
            <div className="flex flex-col items-center gap-3">
                <span>
                    <animated.span style={props}>
                        {spins}
                    </animated.span>
                    spins left
                </span>
                {luckySpins >= 20 && (
                    <p className="text-amber-300 text-lg border-2 border-amber-300 px-2 rounded-sm animate-pulse">
                        2,5x Lucky Spin 🔥
                    </p>
                )}
            </div>

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

            <button className="bg-purple-500" disabled={isOutOfSpins || isRevealing || spins < 10} onClick={handleOpenBundle}>
                <CiBag1 color="#fff" size={28} />
                <span>Open Bundle</span>
                <i className="text-sm">10 spins</i>
            </button>

            <button onClick={() => handleAddSpins(300)}>get free spins</button>

            <div className={`
                fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-500
                ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
            `}>
                <div className={`flex flex-col max-w-[50rem] w-full max-h-[40rem] h-full p-8 rounded-2xl border-2 border-gray-700 bg-background gap-6`}>
                    <header className='flex flex-col justify-center items-center relative'>
                        <CiBag1 color="#fff" size={50} className='animate-bounce' />
                        <h1 className="text-2xl">⚡ Bundle Loot</h1>
                    </header>
                    <ul className='grid grid-cols-5 gap-6 h-full'>
                        {bundleLegends.map((legend, index) => (
                            <Tilt className='flex' glareEnable scale={1.1} glareColor={rarityScheme[legend.rarity]} glarePosition='all' glareMaxOpacity={0.2} key={index}>
                                <li
                                    className="flex flex-col items-center rounded-lg p-2 border-2 w-full"
                                    style={{
                                        borderColor: rarityScheme[legend.rarity],
                                        boxShadow: `0 0 5px ${rarityScheme[legend.rarity]}`,
                                        backgroundColor: rarityScheme[legend.rarity] + '20' }}  // 20 is the opacity in hex
                                    >
                                    <div className='flex flex-col items-center gap-2 h-full'>
                                        <picture className="overflow-hidden w-20 h-20 flex justify-center rounded-full">
                                            <Image
                                                key={index}
                                                src={legend.imageUrl}
                                                alt={legend.name}
                                                width={160}
                                                height={160}
                                            />
                                        </picture>
                                        <h3
                                            className="text-center text-lg leading-tight"
                                            style={{ fontFamily: legend.font }}
                                        >
                                            {legend.name}
                                        </h3>
                                    </div>
                                    <p
                                        className="capitalize border-2 rounded-sm px-2"
                                        style={{ borderColor: rarityScheme[legend.rarity], color: rarityScheme[legend.rarity] }}
                                    >
                                        {legend.rarity}
                                    </p>
                                </li>
                            </Tilt>
                        ))}
                    </ul>
                    <div className='flex justify-end gap-4'>
                        <button className="bg-red-400 rounded-lg text-white px-4 py-2 flex items-center gap-1" onClick={handleSellBundleLegends}>
                            <MdAttachMoney size={20} className='inline' />
                            Sell all
                        </button>
                        <button className="bg-teal-400 rounded-lg text-white px-4 py-2 flex items-center gap-2" onClick={handleGetBundleLegends}>
                            <AiOutlineCheckCircle size={20} />
                            Get all
                        </button>
                    </div>
                </div>
            </div>
            

        </div>
    );
}

