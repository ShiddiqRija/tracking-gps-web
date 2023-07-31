import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifData, setNotifData] = useState([]);

    const updateNotification = (value) => {
        setNotifData((prevData) => [...prevData, value]);
    };

    useEffect(() => {
        const channel = Echo.channel("device-notification");
        channel.listen("DeviceNotificationEvent", function (data) {
            updateNotification(data.data[0]);
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ notifData, updateNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
