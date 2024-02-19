import * as Switch from '@radix-ui/react-switch';

export const SwitchUI = () => {
  return (
    <Switch.Root className='data-[state=checked]:bg-green-300 p-px w-11 bg-gray-800 rounded-full duration-500 transition'>
      <Switch.Thumb className='block h-6 w-6 rounded-full bg-gray-200 duration-500 transition data-[state=checked]:translate-x-[18px] shadow-sm data-[state=checked]:bg-white' />
    </Switch.Root>
  );
}
