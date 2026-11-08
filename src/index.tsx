/* @refresh reload */
import { render } from "solid-js/web";
import { App } from "./App.tsx";
import "solid-devtools";

import "./index.css";
import "./styles/components.css";
import "./styles/fonts.css";
import "./styles/style-black-and-red.css";

render(() => <App />, document.getElementById("root")!);
