import { isDefinedAndNotEmpty } from "@anthonypena/fp";
import {
  createContext,
  createEffect,
  onMount,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js/store";

export interface StoreData {
  cards: CardConfig[];
}

type TextAlign = "left" | "center" | "right" | "justify";
export const CARD_COLORS = [
  "colorless",
  "black",
  "blue",
  "green",
  "red",
  "white",
  "phyrexian-black",
  "phyrexian-blue",
  "phyrexian-green",
  "phyrexian-red",
  "phyrexian-white",
] as const;
export type CardColor = (typeof CARD_COLORS)[number];

export interface CardConfig {
  name: string;
  image: string;
  type: string;
  kind: string;
  text: string;
  textAlign: TextAlign;
  power: number | "*";
  toughness: number | "*";
  color: CardColor[];
  count: number;
  style: "black-and-red";
  focus: boolean;
}

export function buildEmptyCardConfig(): CardConfig {
  return {
    name: "",
    image: "/imgs/sang-01.jpg",
    type: "",
    kind: "",
    text: "",
    textAlign: "center",
    power: 0,
    toughness: 0,
    color: ["colorless", "colorless", "colorless"],
    count: 1,
    style: "black-and-red",
    focus: false,
  };
}

console.log("buildEmptyCardConfig()", buildEmptyCardConfig());

const store = createStore<StoreData>({ cards: [] }, { name: "config" });
const StoreContext = createContext(store);

export function ProvideStore({ children }: ParentProps) {
  const currentState = () => store[0];
  onMount(() => {
    // restore previous state
    const previousState = localStorage.getItem("__STORE_STATE");
    if (isDefinedAndNotEmpty(previousState)) {
      const parsedPreviousState: StoreData = JSON.parse(previousState);
      parsedPreviousState.cards = parsedPreviousState.cards.map(
        (configCard) => ({ ...buildEmptyCardConfig(), ...configCard }),
      );
      store[1](parsedPreviousState);
    }
  });

  createEffect(() => {
    // save new state
    console.log("should save", currentState());
    localStorage.setItem("__STORE_STATE", JSON.stringify(currentState()));
  });

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
