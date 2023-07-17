import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DropdownUser from '@/Components/DropdownUser';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <div className="cursor-pointer duration-500 hover:rotate-[360deg]">
                        <div className="relative">
                            <div className="relative space-y-1 h-10 w-10 md:h-11 md:w-11">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul role="list" className="flex flex-col items-center space-y-1 mt-4">
                        <li>
                            <NavLink 
                                href={route('tracking')} 
                                active={route().current('tracking')} 
                                title='Tracking'
                            >
                                <PinDropOutlinedIcon />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                href={route('devices.index')} 
                                active={route().current('devices.index')} 
                                title='Devices'
                            >
                                <WatchOutlinedIcon />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                href={route('messages')} 
                                active={route().current('messages')} 
                                title='Messages'
                            >
                                <ChatBubbleOutlineOutlinedIcon />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <ul role="list" className="flex flex-col items-center space-y-1 mb-4">
                        <li>
                            <span id="notification-cover" className="cursor-pointer group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold items-center hover:text-black hover:bg-blue-200 text-gray-500 ">
                                <NotificationsNoneOutlinedIcon />
                                <span className="absolute left-48 bg-white font-semibold whitespace-pre text-gray-800 rounded-md drop-shadow-lg w-0 px-0 py-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-24 group-hover:duration-300 group-hover:w-fit">Notification</span>
                            </span >
                        </li>
                    </ul>

                    <div className=" hover:opacity-75 transition">
                        <DropdownUser>
                            <DropdownUser.Trigger>
                                <div className="relative inline-block rounded-full overflow-hidden cursor-pointer h-9 w-9 md:h-11 md:w-11">
                                    <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt="Avatar" className="rounded-circle" />
                                </div>
                                <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
                            </DropdownUser.Trigger>

                            <DropdownUser.Content>
                                <DropdownUser.Link href={route('profile.edit')}>Profile</DropdownUser.Link>
                                <DropdownUser.Link className="text-rose-500" href={route('logout')} method="post" as="button">Log Out</DropdownUser.Link>
                            </DropdownUser.Content>
                        </DropdownUser>
                    </div>
                </nav>
            </div>

            <div className="hidden lg:block lg:pl-20 h-screen">
                {children}
            </div>
            <Toaster />
        </>
    );
}
