import { usePage } from "@inertiajs/react";
import SettingIndex from "../SettingIndex";
import ModalUserForm from "./Partials/ModalUserForm";
import { useState } from "react";
import Button from "@/Components/Atom/Button";
import UserTable from "./Partials/UserTable";
import axios from "axios";

export default function Index({ auth }) {
    const { users } = usePage().props;
    const [user, setUser] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const addUser = () => {
        setModalTitle("Add User");
        setIsModalOpen(true);
        setIsEdit(false);
    };

    const editUser = async (id) => {
        const { data } = await axios.get(route("user.edit", { id: id }));

        setUser(data);
        setModalTitle("Edit User");
        setIsModalOpen(true);
        setIsEdit(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEdit(false);
    };

    return (
        <SettingIndex auth={auth} title="Users">
            <div className="flex-1 px-4 py-5 sm:px-6 ls:px-8 bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3>User List</h3>
                    <Button primary onClick={addUser}>
                        + Add User
                    </Button>
                </div>

                <ModalUserForm
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    modalTitle={modalTitle}
                    user={user}
                    isEdit={isEdit}
                />

                <UserTable users={users} editUser={editUser} />
            </div>
        </SettingIndex>
    );
}
