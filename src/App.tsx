import { Group } from "./components/Group";
import { SwitchUI } from "./components/Switch";

export const App = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <div className="p-4">
        <SwitchUI />
      </div>
      <div className="p-4">
        <Group />
      </div>
    </div>
  );
}
