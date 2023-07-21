import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext();

const DropdownUser = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div className="hover:opacity-75 transition" onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute left-20 z-50 bottom-2 w-36 rounded-md`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 bg-white drop-shadow-lg`}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-blue-200 hover:rounded-md focus:outline-none focus:bg-blue-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

DropdownUser.Trigger = Trigger;
DropdownUser.Content = Content;
DropdownUser.Link = DropdownLink;

export default DropdownUser;
