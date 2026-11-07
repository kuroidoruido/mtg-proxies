import { deepClone } from "@anthonypena/fp";
import { useStore, type CardConfig } from "../services/store";
import { For, Show } from "solid-js";
import { preformat } from "../services/text-formatter";

type Proxy = Omit<CardConfig, "count">;

export function CardPreview() {
  const [store] = useStore();
  const proxies = (): Proxy[] =>
    store.cards.flatMap(({ count, ...proxy }) =>
      new Array(count).fill(null).map(() => deepClone(proxy)),
    );
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
    <article class={"proxy"} attr:data-style={props.proxy.style}>
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
          power={props.proxy.power}
          toughness={props.proxy.toughness}
        />
      </footer>
    </article>
  );
}

function PowerAndToughness(props: {
  power: number | "*";
  toughness: number | "*";
}) {
  return (
    <Show
      when={shouldBeVisible(props.power) || shouldBeVisible(props.toughness)}
      fallback={<></>}
    >
      <Show when={shouldBeVisible(props.power)} fallback={<></>}>
        {props.power}
      </Show>
      /
      <Show when={shouldBeVisible(props.toughness)} fallback={<></>}>
        {props.toughness}
      </Show>
    </Show>
  );
  function shouldBeVisible(x: number | "*"): boolean {
    return x === "*" || x >= 0;
  }
}
