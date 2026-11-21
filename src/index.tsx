/* @refresh reload */
import { render } from "@solidjs/web";
import { App } from "./App.tsx";

import "./index.css";
import "./styles/components.css";
import "./styles/fonts.css";
import "./styles/style-black-and-red.css";
import "./styles/style-vilainous.css";

render(() => <App />, document.getElementById("root")!);
