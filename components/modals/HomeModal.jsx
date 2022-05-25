import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import CrossIcon from '../icons/CrossIcon'

export default function HomeModal({
  isOpen,
  closeModal,
}) {
  return (<>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                  <button onClick={closeModal}><CrossIcon /></button>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-center text-brand-black">
                    Thank you for inviting your friend 🎉
                    {/* The invitations you sent have exceeded the daily limit 😔 */}
                    {/* Sorry, the email you input have already submitted 😔 */}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-brand-purple px-4 py-2 text-sm font-medium text-white hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 font-bold"
                    onClick={closeModal}
                  >
                    Get Coin <span><ArrowRightIcon /></span>
                  </button>

                  {/* <button
                    type='button'
                    className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md"
                    onClick={closeModal}
                  >Okay</button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>)
}