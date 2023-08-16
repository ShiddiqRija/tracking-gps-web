import Button from "@/Components/Atom/Button";
import InputError from "@/Components/Atom/InputError";
import InputLabel from "@/Components/Atom/InputLabel";
import TextInput from "@/Components/Atom/TextInput";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ModalUserForm({
    isModalOpen,
    closeModal,
    modalTitle,
    user,
    isEdit = false,
}) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            id: "",
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Inserting user...");

        if (data.id == "") {
            post(route("user.store"), {
                preserveScroll: true,
                onStart: () => toastId,
                onSuccess: () => {
                    toast.success("User saved!", { id: toastId });
                    closeModal();
                    reset();
                },
                onError: () => {
                    toast.error("Could not save.", { id: toastId });
                    reset("password", "password_confirmation");
                },
            });
        } else {
            put(route("user.update", { id: data.id }), {
                preserveScroll: true,
                onStart: () => toastId,
                onSuccess: () => {
                    toast.success("User updated!", { id: toastId });
                    closeModal();
                    reset();
                },
                onError: (error) => {
                    toast.error("Could not save.", { id: toastId });
                    reset("password", "password_confirmation");
                },
            });
        }
    };

    const close = () => {
        reset();
        clearErrors();
        closeModal();
    };

    useEffect(() => {
        if (isEdit) {
            setData({
                id: user.id,
                name: user.name,
                email: user.email,
                password: "",
                password_confirmation: "",
            });
        }
    }, [isEdit, user]);

    return (
        <Modal show={isModalOpen} maxWidth="sm" onClose={close}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                    {modalTitle}
                </h2>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                        placeholder="Name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="your@email.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="mt-1 block w-full"
                        placeholder="password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button danger onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        type="submit"
                        className="ml-3"
                        disabled={processing}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
