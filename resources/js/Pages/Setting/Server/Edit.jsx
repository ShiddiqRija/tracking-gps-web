import SettingIndex from "../SettingIndex";
import UpdateAppLocation from "./Partials/UpdateAppLocationForm";

export default function Edit({ auth }) {
    return (
        <SettingIndex
            auth={auth}
            title="App Location"
        >
            <div className="flex-1 px-4 py-5 sm:px-6 ls:px-8 bg-gray-100">

                <div className="flex justify-center">
                    <div className="w-3/12 bg-white rounded-lg px-4 py-4">

                    <UpdateAppLocation className="max-w-full" />
                    </div>
                </div>
            </div>
        </SettingIndex>
    )
}