import styles from '../styles/components/Popup.module.css';

export function Popup() {
    return (
        <div className={styles.popupContainer}>
            <div>
                <header>
                    <h3>Thanks for visiting!</h3>
                </header>

                <section>
                    <p>
                        Googas RPG é um pequeno jogo de website em que
                        você coleta lendas jogando na roleta de spins.
                    </p>
                    <p>
                        Este site foi inicialmente feito como um passatempo,
                        porém cresceu MUITO por todo apoio e todas ideias que os casas <span>(Mimi, Romão e Vitinho)</span> deram,
                        e com certeza o projeto não teria durado um dia sem eles.
                    </p>
                </section>
                <section>
                    <p>
                        Todo o código do website está presente <a href="https://github.com/gustavo-zsilva/googas-rpg">aqui</a>.
                        Estou frequentemente trabalhando em melhorias e atualizações, então fique de olho em códigos secretos novos.
                    </p>
                    <p className={styles.secretCode}>
                        Código secreto de brinde: <span>secretcode</span>
                    </p>
                </section>
                <footer>
                    <button>
                        Don't show me this again
                    </button>
                    <button>
                        Continue to Googas RPG
                    </button>
                </footer>
            </div>
        </div>
    );
}