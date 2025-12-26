"use client";

import { useState } from "react";
import { ToggleButton, SaveButton } from "./SharedUI";

export default function NotificationsTab({ onNotify }) {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulating a save delay
        setTimeout(() => {
            setLoading(false);
            onNotify("Notification preferences updated!");
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div>
                <h2 className="text-xl font-black text-slate-800">Alert Preferences</h2>
                <p className="text-sm text-slate-500 font-medium">
                    Control how and when you receive updates about cleaning activities.
                </p>
            </div>

            <div className="space-y-3">
                <ToggleButton
                    label="Email Activity Summaries"
                    description="Receive daily reports of cleaning tasks for your assigned zones."
                    active
                />
                <ToggleButton
                    label="Push Notifications"
                    description="Get real-time alerts on your mobile device when a task is completed."
                />
                <ToggleButton
                    label="Urgent Cleaning Reminders"
                    description="Alerts sent when a high-priority zone hasn't been cleaned in 24h."
                    active
                />
                <ToggleButton
                    label="System Updates"
                    description="Be notified about new features and scheduled portal maintenance."
                />
            </div>

            <SaveButton onClick={handleSave} loading={loading} />
        </div>
    );
}