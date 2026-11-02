import { createEffect, For } from "solid-js";
import { buildEmptyCardConfig, useStore, type CardConfig } from "../services/store"

export function CardConfigurator() {
    const {store, setStore} = useStore();

    console.log('store', store)

    const cards = () => store.cards;
    const addCard = () => {
        console.log('addCard');
        setStore('cards', cards => [...cards, buildEmptyCardConfig()]);
    };

    createEffect(() => console.log('cards', cards()));

    return <section class="hidden-on-print">
        <form>
            <For each={cards()}>
                {(cardConfig) => <CardConfigCard cardConfig={cardConfig} />}
            </For>
            <button type="button" onClick={addCard}>Add a card</button>
        </form>
    </section>
}

interface CardConfigCardProps {
    cardConfig: CardConfig;   
}

export function CardConfigCard(props: CardConfigCardProps) {
    const name = () => props.cardConfig.name;
    return <article>
        <header>{name()}</header>
    </article>
}