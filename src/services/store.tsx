import { createContext, useContext, type ParentProps } from "solid-js";
import { createStore, type StoreReturn } from "solid-js/store";

export interface StoreData {
    cards: CardConfig[];
}

export interface CardConfig {
    name: string;
    image: string;
    type: string;
    kind: string;
    power: number | '*';
    toughness: number | '*';
    count: number;
}

export function buildEmptyCardConfig(): CardConfig {
    return {
        name: '',
        image: '',
        type: '',
        kind: '',
        power: 0,
        toughness: 0,
        count: 1
    }
}

export interface StoreContextValue {
    store: StoreReturn<StoreData>[0];
    setStore: StoreReturn<StoreData>[1]
}

const StoreContext = createContext<StoreContextValue>(null!);

export function ProvideStore({ children }: ParentProps) {
    const [store, setStore] = createStore<StoreData>({ cards: [] }, { name: 'config' });
    return <StoreContext.Provider value={{ store, setStore }} >{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
    return useContext(StoreContext) ?? { store: { cards:[] }, setStore: () => {} };
}