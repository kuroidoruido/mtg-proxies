import './App.css'
import { CardConfigurator } from './components/card-configurator';
import { CardPreview } from './components/card-preview'
import { ProvideStore } from './services/store';

export function App() {
  return (
    <ProvideStore>
      <CardPreview />
      <CardConfigurator />
    </ProvideStore>
  )
}
