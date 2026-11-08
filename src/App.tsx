import { CardConfigurator } from "./components/card-configurator";
import { CardPreview } from "./components/card-preview";
import { ProjectPanel } from "./components/project-panel";
import { ProvideStore } from "./services/store";

export function App() {
  return (
    <ProvideStore>
      <CardPreview />
      <CardConfigurator />
      <ProjectPanel />
    </ProvideStore>
  );
}
