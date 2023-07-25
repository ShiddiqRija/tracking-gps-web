import { Link } from "@inertiajs/react";

export default function SettingNavLink({ active = false, className = '', children, ...props }) {
    return (
        <li className="w-full gap-x-3 rounded-md p-3  hover:bg-blue-200">
            <Link
                {...props}
                className={'text-sm leading-6 font-semibold items-center hover:text-black ' +
                        (active
                        ? 'text-blue-500'
                        : 'text-gray-500') }
            >
                {children}
            </Link>
        </li>
    )
}