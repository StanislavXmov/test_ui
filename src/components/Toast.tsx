import * as Toast from '@radix-ui/react-toast';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

export const ToastUI = () => {
  const [toasts, setToasts] = useState<{id: string, message: string}[]>([]);

  return (
    <div className="flex self-start p-4">
      <button
        className="w-28 rounded bg-gray-800 px-3 py-1 text-sm font-semibold text-white"
        onClick={() => setToasts([...toasts, {message: `${window.crypto.randomUUID().substring(0, 10)}!`, id: window.crypto.randomUUID()}])}
      >
        Notify
      </button>

      <Toast.Provider>
        <AnimatePresence mode='popLayout'>
          {toasts.map(toast => (
            <Toast.Root
              key={toast.id}
              duration={2000}
              className='flex items-center justify-between rounded bg-slate-200 border border-gray-600 px-6 py-4 text-sm font-medium'
              onOpenChange={() => {
                setToasts(toasts.filter(t => t.id !== toast.id))
              }}
              asChild
              forceMount
            >
              <motion.li
                initial={{x: -300}}
                animate={{x: 0}}
                exit={{opacity: 0, zIndex: -1, transition: {duration: 0.2}}}
                transition={{type: 'spring', bounce: 0, duration: 0.6}}
                layout
              >
                <Toast.Description className='text-gray-600' >{toast.message}</Toast.Description>
                <Toast.Close className='text-gray-600 hover:text-gray-400'>
                  &times;
                </Toast.Close>
              </motion.li>
            </Toast.Root>
          ))}
        </AnimatePresence>
        <Toast.Viewport className='fixed left-4 top-4 w-60 flex flex-col-reverse gap-3' />
      </Toast.Provider>
    </div>
  );
}
