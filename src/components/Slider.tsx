import * as Slider from '@radix-ui/react-slider';
import OffIcon from './assets/off.svg?react';
import OnIcon from './assets/on.svg?react';
import { FormEvent, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(value, min));
const roundToStep = (value: number, step: number) => {
  const inverseStep = 1 / step;
  return Math.round(value * inverseStep) / inverseStep;
}

export const SliderUI = ({
  value = 50,
  onValueChange = () => {},
  name,
  min = 0,
  max = 100,
  step = 1,
}: {
  value?: number;
  onValueChange?: (value: number) => void;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const [isUsePointer, setIsUsePointer] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [stash, setStash] = useState({clientX: 0, internalValue});

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(internalValue);
  }

  const updateValue = (value: number) => {
    setInternalValue(value);
    onValueChange(value);
  }

  return (
    <div className='mx-auto w-[320px]'>
      <form 
        className='space-y-8 rounded'
        onSubmit={submitHandler}
      >
        <p className='text-sm font-medium text-gray-800'>Settings</p>

        <div className='group flex items-center gap-3 transition-[margin] hover:-mx-3 duration-[350ms] *:duration-[350ms] hover:cursor-grab active:cursor-grabbing touch-none select-none'>
          <OffIcon className='size-5 transition group-hover:scale-125' />
          <Slider.Root 
            value={[internalValue]}
            defaultValue={[50]}
            onValueCommit={([v]) => {
              updateValue(v);
            }}
            min={min}
            max={max}
            step={step}
            name={name}
            className='flex relative h-1.5 transition-[height] group-hover:h-4 items-center grow'
            onPointerDown={(e) => {
              setStash({
                clientX: e.clientX,
                internalValue
              });
              setIsUsePointer(true);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) {
                const diffInPixels = e.clientX - stash.clientX;
                const sliderWidth = e.currentTarget.clientWidth;
                const pixelsPerUnit = (max - min) / sliderWidth;
                const diffInUnits = diffInPixels * pixelsPerUnit;
                const newValue = stash.internalValue + diffInUnits;
                const clampedValue = clamp(newValue, min, max);
                const steppedValue = roundToStep(clampedValue, step);

                updateValue(steppedValue);
              }
            }}
            onBlur={() => setIsUsePointer(false)}
          >
            <Slider.Track
            className={`
            ${isUsePointer ? '' : 'group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-gray-500'}
            relative grow h-full bg-gray-700 rounded-full overflow-hidden `} 
            >
              <Slider.Range className='absolute h-full bg-gray-100 group-hover:bg-white transition' />
            </Slider.Track>
            <Slider.Thumb/>
          </Slider.Root>
          <OnIcon className='size-5 transition group-hover:scale-125' />
        </div>
        
        {/* <input type="range" name="slider" className='w-full' /> */}
        
        <div>
          <button
            type="submit"
            className='rounded bg-gray-800 px-3 py-1 text-sm font-semibold text-white'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
