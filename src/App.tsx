import {ReactRunner} from "@chub-ai/stages-ts";
import {Stage} from "./Stage.tsx";
import {TestStageRunner} from "./TestRunner.tsx";

function App() {
  const isDev = import.meta.env.MODE === 'development';
  console.info(`Running in ${import.meta.env.MODE}`);

  return isDev ? <TestStageRunner factory={ (data: any) => new Stage(data) }/> :
      <ReactRunner factory={(data: any) => new Stage(data)} />;
}

export default App
