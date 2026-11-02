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

export interface CardConfig {
  name: string;
  image: string;
  type: string;
  kind: string;
  text: string;
  textAlign: "left" | "center" | "right" | "justify";
  power: number | "*";
  toughness: number | "*";
  count: number;
  style: "black-and-red";

  // TODO: color
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
    count: 1,
    style: "black-and-red",
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
