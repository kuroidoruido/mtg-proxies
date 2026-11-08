import { deepClone } from "@anthonypena/fp";
import { useStore, type CardConfig } from "../services/store";
import { For, Show } from "solid-js";
import { preformat } from "../services/text-formatter";

import "./card-preview.css";

type Proxy = Omit<CardConfig, "count"> & { copy?: true };

export function CardPreview() {
  const [store] = useStore();
  const proxies = (): Proxy[] => {
    if (store.cards.some((c) => c.focus)) {
      return store.cards.filter((c) => c.focus);
    }

    return store.cards.flatMap(({ count, ...proxy }) =>
      new Array(count)
        .fill(null)
        .map((_, index) =>
          deepClone(index === 0 ? proxy : { ...proxy, copy: true }),
        ),
    );
  };
  return (
    <section class="card-preview">
      <For each={proxies()}>{(proxy) => <ProxyCard proxy={proxy} />}</For>
    </section>
  );
}

interface ProxyCardProps {
  proxy: Proxy;
}

export function ProxyCard(props: ProxyCardProps) {
  return (
    <article
      classList={{ proxy: true, copy: props.proxy.copy ?? false }}
      attr:data-style={props.proxy.style}
    >
      <div class="color-container">
        <For each={props.proxy.color}>
          {(c) => <span attr:data-color={c}></span>}
        </For>
      </div>
      <header>{props.proxy.name}</header>
      <img src={props.proxy.image} />
      <main>
        <div class="type">
          {props.proxy.type} : {props.proxy.kind}
        </div>
        <div
          class="text"
          attr:data-align={props.proxy.textAlign}
          innerHTML={preformat(props.proxy.text)}
        ></div>
      </main>
      <footer>
        <PowerAndToughness
          hasPowerAndToughness={props.proxy.hasPowerAndToughness}
          power={props.proxy.power}
          toughness={props.proxy.toughness}
        />
      </footer>
    </article>
  );
}

function PowerAndToughness(props: {
  hasPowerAndToughness: boolean;
  power: string;
  toughness: string;
}) {
  return (
    <Show when={props.hasPowerAndToughness} fallback={<></>}>
      {props.power}/{props.toughness}
    </Show>
  );
}
