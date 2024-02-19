import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';

let options = [
  {value: '1tb', label: '1TB SSD Storage', price: 0},
  {value: '2tb', label: '2TB SSD Storage', price: 400},
  {value: '4tb', label: '4TB SSD Storage', price: 1000},
  {value: '8tb', label: '8TB SSD Storage', price: 2200},
];

const numberFormat = new Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency', signDisplay: 'never'});

export const Group = () => {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOptions = options.find(option => option.value === selectedValue)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(selectedValue);
      }}
      className='w-80'
    >
      <RadioGroup.Root className='space-y-4' onValueChange={value => setSelectedValue(value)}>
        {options.map(option => (
          <RadioGroup.Item
            className={`flex justify-between w-full rounded-lg border p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${option.value === selectedValue ? 'border-gray-300 ring-2 ring-inset ring-gray-100' : 'border-gray-500'}`}
            key={option.value}
            type='button'
            value={option.value}
          >
            <span className='font-semibold text-gray-800'>{option.label}</span>
            {selectedOptions && selectedValue !== option.value && (
            <span 
              className='font-semibold text-gray-800'>
                {option.price > selectedOptions?.price ? '+ ' : '- '}
                {numberFormat.format(option.price - selectedOptions?.price)}
              </span>
            )}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      <div className='mt-5 text-right'>
          <button
            type='submit'
            className='rounded bg-gray-800 px-3 py-1 text-sm font-semibold text-white'
          >
            Buy
          </button>
      </div>
    </form>
  );
}
