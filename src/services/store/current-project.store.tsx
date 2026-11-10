import { isDefinedAndNotEmpty } from "@anthonypena/fp";
import {
  createContext,
  createEffect,
  onMount,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js/store";

export interface CurrentProjectStoreData {
  id: string;
  name: string;
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
  hasPowerAndToughness: boolean;
  power: string;
  toughness: string;
  color: CardColor[];
  count: number;
  style: "black-and-red";
  focus: boolean;
  open: boolean;
}

export function buildEmptyCardConfig(): CardConfig {
  return {
    name: "",
    image: "/imgs/sang-01.jpg",
    type: "",
    kind: "",
    text: "",
    textAlign: "center",
    hasPowerAndToughness: false,
    power: "",
    toughness: "",
    color: ["colorless", "colorless", "colorless"],
    count: 1,
    style: "black-and-red",
    focus: false,
    open: true,
  };
}

const projectStore = createStore<CurrentProjectStoreData>(
  { id: "", name: "", cards: [] },
  { name: "config" },
);
const CurrentProjectStoreContext = createContext(projectStore);

const STORAGE_PREFIX = "__MTG_PROXIES__";
const PROJECT_STORAGE_PREFIX = `${STORAGE_PREFIX}projects__`;

export function ProvideCurrentProject(
  props: ParentProps & { projectId: string },
) {
  const currentState = () => projectStore[0];
  onMount(() => {
    // restore previous state
    const previousState = localStorage.getItem(
      PROJECT_STORAGE_PREFIX + props.projectId,
    );
    if (isDefinedAndNotEmpty(previousState)) {
      const parsedPreviousState: CurrentProjectStoreData =
        JSON.parse(previousState);
      parsedPreviousState.name = parsedPreviousState.name ?? "";
      parsedPreviousState.cards = parsedPreviousState.cards.map(
        (configCard) => ({
          ...buildEmptyCardConfig(),
          ...configCard,
        }),
      );
      projectStore[1](parsedPreviousState);
    }
  });

  createEffect(() => {
    // save new state
    localStorage.setItem(
      PROJECT_STORAGE_PREFIX + props.projectId,
      JSON.stringify(currentState()),
    );
  });

  return (
    <CurrentProjectStoreContext.Provider value={projectStore}>
      {props.children}
    </CurrentProjectStoreContext.Provider>
  );
}

export function useCurrentProject() {
  return useContext(CurrentProjectStoreContext);
}
