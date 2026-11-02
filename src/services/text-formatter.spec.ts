import { describe, expect, it } from "vitest";
import { preformat } from "./text-formatter";

describe(preformat.name, () => {
    it("should format mana cost", () => {
        const input = "{(1)}";
        const expected = `<span class="mana-cost">1</span>`;
        expect(preformat(input)).toStrictEqual(expected);
    });

    it("should format tap", () => {
        const input = "{(tap)}";
        const expected = `<span class="tap-cost">↷</span>`;
        expect(preformat(input)).toStrictEqual(expected);
    });

    it("should format simple text", () => {
        const input =
            "Défaussez-vous d'une carte, sacrifiez cet artefact : Piochez une carte.";
        expect(preformat(input)).toStrictEqual(input);
    });

    it("should format complex text", () => {
        const input =
            "{(1)},{(tap)}, défaussez-vous d'une carte, sacrifiez cet artefact : Piochez une carte.";
        const expected =
            `<span class="mana-cost">1</span>,<span class="tap-cost">↷</span>, défaussez-vous d'une carte, sacrifiez cet artefact : Piochez une carte.`;
        expect(preformat(input)).toStrictEqual(expected);
    });
});
