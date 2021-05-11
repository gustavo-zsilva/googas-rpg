import { useLegends } from '../contexts/LegendsContext';

import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';

import { rarityScheme } from '../utils/rarityScheme';

import styles from '../styles/components/Alert.module.css';

interface AlertController {
    openModal: () => void;
    closeModal: () => void;
}

interface AlertProps {
    controller: AlertController;
}

export function Alert({ controller }: AlertProps) {

    const { legend, handleAddSpins, handleDiscardLegend } = useLegends();

    const rarityColor = rarityScheme[legend?.rarity];

    const spinMarket = {
        epic: 2,
        legendary: 5,
        mythical: 10,
    }

    function handleSellLegend() {
        handleAddSpins(spinMarket[legend.rarity]);
        handleDiscardLegend();

        controller.closeModal();
    }

    function handleCloseModal() {
        controller.closeModal();
    }

    return (
        <div className={styles.alertContainer}>
            
            <h3>
                <AiOutlineInfoCircle color="var(--primary)" size={32} />
                <span>Você deseja mesmo vender</span>
                <span style={{
                    color: rarityColor,
                    fontFamily: legend?.font,
                    borderRight: `2px solid ${rarityColor}`,
                    borderLeft: `2px solid ${rarityColor}`
                }}>
                    {legend?.name}
                </span>
                <span>por {spinMarket[legend?.rarity]} spins?</span>
            </h3>
            
            
            <div>
                <button onClick={handleCloseModal}>
                    <AiOutlineCloseCircle color="#ff3939" size={42} />
                </button>
                <button onClick={handleSellLegend}>
                    <AiOutlineCheckCircle color="var(--primary)" size={42} />
                </button>
            </div>
        </div>
    );
}