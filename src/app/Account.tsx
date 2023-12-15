import { useGlobalState } from './GlobalStateContext';
import { getUser } from './Networking/user';
import LoginIcon from '@mui/icons-material/Login';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Input } from './Input';
import BadgeIcon from '@mui/icons-material/Badge';
import PasswordIcon from '@mui/icons-material/Password';

export function Account() {
    const { user, setUser, isLoggedIn } = useGlobalState();
    getUser().then((user) => setUser(user));

    const [isOpen, setIsOpen] = useState(false)

    const [isRegistering, setIsRegistering] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function showRegister() {
        setIsRegistering(true)
    }

    function hideRegister() {
        setIsRegistering(false)
    }

    return (
        <div className="p-4 bg-gray rounded">
            <button className='flex w-full justify-between items-center' onClick={openModal}>
                <p className='font-einaBold'>Login</p>
                <LoginIcon className='text-sm' />
            </button>
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
                        <div className="fixed inset-0 bg-black/25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-einaSemi"
                            >
                                Login
                            </Dialog.Title>
                            <div className="mt-2 flex flex-col gap-3 items-start">
                                <Input icon={<BadgeIcon />} placeholder='Username' type='text' />
                                <Input icon={<PasswordIcon />} placeholder='Password' type='password' />
                                <button onClick={() => {
                                    closeModal()
                                    showRegister()
                                }}>
                                    Do not have an account? Register.
                                </button>
                            </div>
                            
                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                                >
                                Login
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isRegistering} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={hideRegister}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-einaSemi"
                            >
                                Login
                            </Dialog.Title>
                            <div className="mt-2 flex flex-col gap-3 items-start">
                                <Input icon={<BadgeIcon />} placeholder='Username' type='text' />
                                <Input icon={<PasswordIcon />} placeholder='Password' type='password' />
                            </div>
                            
                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={hideRegister}
                                >
                                Register
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}