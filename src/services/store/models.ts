export interface Project {
    id: string;
    name: string;
    cards: CardConfig[];
}

export function buildEmptyProject(): Project {
    return { id: crypto.randomUUID(), name: "New project", cards: [] };
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
