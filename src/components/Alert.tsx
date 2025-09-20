import { useLegends } from '../contexts/LegendsContext';

import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';

import { rarityScheme } from '../utils/colorSchemes';
import { priceScheme } from '../utils/priceScheme';

import styles from '../styles/components/Alert.module.css';

interface AlertController {
    openModal: () => void;
    closeModal: () => void;
}

interface AlertProps {
    controller: AlertController;
}

export function Alert({ controller }: AlertProps) {

    const { legend, handleSellLegend } = useLegends();

    const rarityColor = rarityScheme[legend?.rarity];

    function handleConfirmSelling() {
        handleSellLegend();
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
                <span>por ${priceScheme[legend?.rarity].toLocaleString('pt-BR')} bogaTokens?</span>
            </h3>
            
            
            <div>
                <button onClick={handleCloseModal}>
                    <AiOutlineCloseCircle color="#ff3939" size={42} />
                </button>
                <button onClick={handleConfirmSelling}>
                    <AiOutlineCheckCircle color="var(--primary)" size={42} />
                </button>
            </div>
        </div>
    );
}