import { createEffect, createResource, For, type JSX } from "solid-js";
import {
  buildEmptyCardConfig,
  CARD_COLORS,
  useStore,
  type CardColor,
  type CardConfig,
} from "../services/store";
import { identity } from "@anthonypena/fp";

export function CardConfigurator() {
  const [store, setStore] = useStore();

  createEffect(() => console.log("store", store));

  const cards = () => store.cards;
  const addCard = () => {
    console.log("addCard");
    setStore("cards", (cards) => [...cards, buildEmptyCardConfig()]);
  };

  return (
    <section class="card-configurator hidden-on-print">
      <form>
        <For each={cards()}>
          {(cardConfig, index) => (
            <CardConfigCard
              cardConfig={cardConfig}
              onChange={(cc) => {
                console.log("CardConfigurator > onChange", cc);
                setStore("cards", index(), cc);
              }}
              onDelete={() =>
                setStore("cards", (cards) =>
                  cards.filter((_c, ci) => ci !== index()),
                )
              }
            />
          )}
        </For>
        <button type="button" onClick={addCard}>
          Add a card
        </button>
      </form>
    </section>
  );
}

interface CardConfigCardProps {
  cardConfig: CardConfig;
  onChange: (cc: CardConfig) => void;
  onDelete: VoidFunction;
}

export function CardConfigCard(props: CardConfigCardProps) {
  const [images] = createResource(() =>
    fetch("/imgs/list.json").then((r): Promise<string[]> => r.json()),
  );

  const cardConfigPatcher =
    (
      key: keyof CardConfig,
      valueConverter: (x: string) => unknown = identity,
    ) =>
    (e: { target: HTMLInputElement }) =>
      props.onChange({
        ...props.cardConfig,
        [key]: valueConverter(e.target.value),
      });

  return (
    <article class="card-config">
      <h3>
        <label>
          {props.cardConfig.name}
          <input
            type="checkbox"
            name="open"
            checked={props.cardConfig.open}
            onClick={() =>
              props.onChange({
                ...props.cardConfig,
                open: !props.cardConfig.open,
              })
            }
          />
        </label>
      </h3>
      <label>
        👁
        <input
          type="checkbox"
          name="focus"
          checked={props.cardConfig.focus}
          onClick={() =>
            props.onChange({
              ...props.cardConfig,
              focus: !props.cardConfig.focus,
            })
          }
        />
      </label>
      <main>
        <InputField
          label="Name"
          value={props.cardConfig.name}
          onChange={cardConfigPatcher("name")}
        />
        <InputField
          label="Type"
          value={props.cardConfig.type}
          onChange={cardConfigPatcher("type")}
        />
        <InputField
          label="Kind"
          value={props.cardConfig.kind}
          onChange={cardConfigPatcher("kind")}
        />
        <InputField
          label="Power"
          value={props.cardConfig.power}
          onChange={cardConfigPatcher("power", powerOrToughnessConverter)}
        />
        <InputField
          label="Toughness"
          value={props.cardConfig.toughness}
          onChange={cardConfigPatcher("toughness", powerOrToughnessConverter)}
        />
        <label>
          Text:
          <textarea
            value={props.cardConfig.text}
            onkeyup={(e) => {
              console.log("text onChange", e);
              props.onChange({
                ...props.cardConfig,
                text: e.currentTarget.value,
              });
            }}
          ></textarea>
        </label>
        <label>
          Image:
          <select
            value={props.cardConfig.image}
            onChange={(e) =>
              props.onChange({
                ...props.cardConfig,
                image: e.currentTarget.value,
              })
            }
          >
            <For each={images.latest ?? []}>{(f) => <option>{f}</option>}</For>
          </select>
        </label>
        <label>
          Color:
          <div class="multi-select-container">
            <select
              value={props.cardConfig.color[0]}
              onChange={(e) =>
                props.onChange({
                  ...props.cardConfig,
                  color: props.cardConfig.color.map((c, index) =>
                    index === 0 ? (e.currentTarget.value as CardColor) : c,
                  ),
                })
              }
            >
              <For each={CARD_COLORS}>{(c) => <option>{c}</option>}</For>
            </select>
            <select
              value={props.cardConfig.color[1]}
              onChange={(e) =>
                props.onChange({
                  ...props.cardConfig,
                  color: props.cardConfig.color.map((c, index) =>
                    index === 1 ? (e.currentTarget.value as CardColor) : c,
                  ),
                })
              }
            >
              <For each={CARD_COLORS}>{(c) => <option>{c}</option>}</For>
            </select>
            <select
              value={props.cardConfig.color[2]}
              onChange={(e) =>
                props.onChange({
                  ...props.cardConfig,
                  color: props.cardConfig.color.map((c, index) =>
                    index === 2 ? (e.currentTarget.value as CardColor) : c,
                  ),
                })
              }
            >
              <For each={CARD_COLORS}>{(c) => <option>{c}</option>}</For>
            </select>
          </div>
        </label>
        <InputField
          label="Count"
          type="number"
          value={props.cardConfig.count}
          onChange={cardConfigPatcher("count", (x) => Number.parseInt(x, 10))}
        />
      </main>
      <button type="button" onClick={props.onDelete}>
        Delete
      </button>
    </article>
  );
}

interface InputFieldProps {
  type?: "number" | "text";
  label: string;
  value: number | string;
  onChange: (e: { target: HTMLInputElement }) => void;
}

function InputField(props: InputFieldProps) {
  return (
    <label>
      {props.label}:{" "}
      <input
        type={props.type ?? "text"}
        value={props.value}
        onInput={props.onChange}
      />
    </label>
  );
}

function powerOrToughnessConverter(x: string): CardConfig["power"] {
  if (x === "*") {
    return "*";
  }
  if (x === "-") {
    return 0;
  }
  return Number.parseInt(x, 10);
}
