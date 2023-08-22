import { useForm } from "@inertiajs/react";
import { Snackbar } from "@mui/material";
import { toast } from "react-hot-toast";

export default function RemoveDialog({ open, endpoint, itemId, onResult }) {
    const { delete: destroy } = useForm();
    const handleRemove = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Removing user...");

        destroy(route(endpoint, { id: itemId }), {
            preserveScroll: true,
            onStart: () => toastId,
            onSuccess: () => {
                toast.success("User removed!", { id: toastId });
            },
            onError: () => {
                toast.error("Could not remove.", { id: toastId });
                onResult(null);
            },
        });
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => onResult(false)}
            message="Remove Item?"
            action={
                <button className="text-sky-500 mr-2" onClick={handleRemove}>
                    Remove
                </button>
            }
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
        />
    );
}
