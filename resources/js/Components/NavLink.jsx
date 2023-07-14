import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, title = '', ...props }) {
    return (
        <Link
            {...props}
            className={
                'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold items-center hover:text-black hover:bg-blue-200 ' +
                (active
                    ? 'text-blue-600 '
                    : 'text-gray-500 ') +
                className
            }
        >
            {children}
            <span className="absolute left-48 bg-white font-semibold whitespace-pre text-gray-800 rounded-md drop-shadow-lg w-0 px-0 py-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-24 group-hover:duration-300 group-hover:w-fit">{title}</span>
        </Link>
    );
}
