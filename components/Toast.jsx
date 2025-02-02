import React, { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";

const Toast = ({ message = "Notification", onClose = () => {} }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed z-50 top-4 right-4
        transform transition-all duration-300 ease-in-out
        ${isLeaving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {message}
        </p>
        <button
          onClick={handleClose}
          className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
