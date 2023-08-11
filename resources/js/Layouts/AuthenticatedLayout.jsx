import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import DropdownUser from "@/Components/DropdownUser";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Notification from "@/Components/Notification";
import { useNotification } from "@/Components/Context/NotificationContext";

export default function Authenticated({ user, header, children }) {
    const { notifData } = useNotification();
    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 duration-500 hover:rotate-[360deg]" />
                    </Link>
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1 mt-4"
                    >
                        <li>
                            <NavLink
                                href={route("positions.index")}
                                active={route().current("positions.index")}
                                title="Tracking"
                            >
                                <PinDropOutlinedIcon />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("devices.index")}
                                active={route().current("devices.index")}
                                title="Devices"
                            >
                                <WatchOutlinedIcon />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("messages.index")}
                                active={route().current("messages.index")}
                                title="Messages"
                            >
                                <ChatBubbleOutlineOutlinedIcon />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1 mb-4"
                    >
                        <li>
                            <span
                                onClick={openNotification}
                                className="cursor-pointer group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold items-center hover:text-black hover:bg-blue-200 text-gray-500 "
                            >
                                <NotificationsNoneOutlinedIcon />
                                <span className="absolute left-48 bg-white font-semibold whitespace-pre text-gray-800 rounded-md drop-shadow-lg w-0 px-0 py-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-24 group-hover:duration-300 group-hover:w-fit">
                                    Notification
                                </span>
                            </span>
                        </li>
                    </ul>

                    <div>
                        <DropdownUser>
                            <DropdownUser.Trigger>
                                <div className="relative inline-block rounded-full overflow-hidden cursor-pointer h-9 w-9 md:h-11 md:w-11">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user.name}`}
                                        alt="Avatar"
                                        className="rounded-circle"
                                    />
                                </div>
                                <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
                            </DropdownUser.Trigger>

                            <DropdownUser.Content>
                                <DropdownUser.Link href={route("profile.edit")}>
                                    Profile
                                </DropdownUser.Link>
                                <DropdownUser.Link
                                    href={route("location.index")}
                                >
                                    Settings
                                </DropdownUser.Link>
                                <DropdownUser.Link
                                    className="text-rose-500"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </DropdownUser.Link>
                            </DropdownUser.Content>
                        </DropdownUser>
                    </div>
                </nav>
            </div>

            <Notification show={isNotificationOpen} onClose={closeNotification}>
                <h2 className="px-4 py-4 font-semibold border-b-[1px]">
                    Notification
                </h2>

                <ul role="list" className="py-1 mt-3">
                    {notifData.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 border-y cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex">
                                <div className="font-semibold">
                                    {item.attributes.message.split(" at ")[0]}
                                </div>
                            </div>
                            <div className="flex py-1">
                                <div className="font-light text-gray-600 text-sm">
                                    {item.attributes.message.split(" at ")[1]}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Notification>

            <div className="hidden lg:block lg:pl-20 h-screen">{children}</div>
            <Toaster />
        </>
    );
}
