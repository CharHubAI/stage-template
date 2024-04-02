import {ExtensionRunner} from "chub-extensions-ts";
import {ChubExtension} from "./ChubExtension.tsx";
import {TestExtensionRunner} from "./TestRunner.tsx";

function App() {
  const isDev = import.meta.env.MODE === 'development';
  console.info(`Running in ${import.meta.env.MODE}`);

  return isDev ? <TestExtensionRunner factory={ (data: any) => new ChubExtension(data) }/> :
      <ExtensionRunner factory={(data: any) => new ChubExtension(data)} />;
}

export default App
