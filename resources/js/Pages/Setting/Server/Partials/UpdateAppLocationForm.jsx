import Button from "@/Components/Atom/Button";
import InputError from "@/Components/Atom/InputError";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function UpdateAppLocation({ className = "" }) {
    const location = usePage().props.location;

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            id: location.id,
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: location.zoom,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("location.update", { id: location.id }), {
            preserveScroll: true,
            onProgress: () => toast.loading("Updating..."),
            onSuccess: () => {
                toast.success("Location updated!");
            },
            onError: () => toast.error("Could not update."),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Location Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update location information for tracking
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="latitude" value="Latitude" />

                    <TextInput
                        id="latitude"
                        className="mt-1 block w-full"
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                        required
                        isFocused
                        autoComplete="latitude"
                    />

                    <InputError className="mt-2" message={errors.latitude} />
                </div>

                <div>
                    <InputLabel htmlFor="longitude" value="Longitude" />

                    <TextInput
                        id="longitude"
                        className="mt-1 block w-full"
                        value={data.longitude}
                        onChange={(e) => setData("longitude", e.target.value)}
                        required
                        autoComplete="longitude"
                    />

                    <InputError className="mt-2" message={errors.longitude} />
                </div>

                <div>
                    <InputLabel htmlFor="zoom" value="Zoom" />

                    <TextInput
                        id="zoom"
                        className="mt-1 block w-full"
                        value={data.zoom}
                        onChange={(e) => setData("zoom", e.target.value)}
                        required
                        autoComplete="zoom"
                    />

                    <InputError className="mt-2" message={errors.zoom} />
                </div>

                <div className="flex justify-end items-center gap-4">
                    <Button primary type="submit" disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
