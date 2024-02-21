import { Group } from "./components/Group";
import { SliderUI } from "./components/Slider";
import { SwitchUI } from "./components/Switch";
import { ToastUI } from "./components/Toast";

export const App = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <div className="p-4">
        <SwitchUI />
      </div>
      <div className="p-4">
        <Group />
      </div>
      <div className="p-4">
        <SliderUI />
      </div>
      <div className="p-4">
        <ToastUI />
      </div>
    </div>
  );
}
