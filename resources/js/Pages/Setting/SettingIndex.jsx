import { Head, router, useForm, usePage } from "@inertiajs/react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingNavLink from "@/Components/SettingNavLink";

export default function SettingIndex({ auth, title = '', children }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={title} />

            <div className="flex h-screen">
                <div className="w-2/12 bg-white">
                    <div className="px-4 py-5 sm:px-6 ls:px-8">
                        <h1>Setting Menu</h1>

                    </div>
                    <ul role="list" className="flex flex-col items-start space-y-1 mt-4">
                        <SettingNavLink
                            href={route('location.index')}
                            active={route().current('location.index')}
                        >
                            Tracking Location
                        </SettingNavLink>
                        <SettingNavLink
                            href={route('wifi.index')}
                            active={route().current('wifi.index')}
                        >
                            Wifi Location
                        </SettingNavLink>
                    </ul>
                </div>

                {children}
            </div>

        </AuthenticatedLayout>
    )
}