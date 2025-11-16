import React, { useEffect, useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, Trash2, Check } from "lucide-react";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load read notifications from localStorage
  const getReadNotificationsFromStorage = () => {
    return JSON.parse(localStorage.getItem("readNotifications") || "[]");
  };

  const setReadNotificationsInStorage = (ids) => {
    localStorage.setItem("readNotifications", JSON.stringify(ids));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const krushiSetu = JSON.parse(localStorage.getItem("krushiSetu"));
        const farmerId = krushiSetu?.farmer?.farmer_id;

        if (!farmerId) {
          setError("Farmer ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch notifications from backend
        const notifResponse = await fetch(
          `http://localhost:3001/api/farmers/notifications?farmer_id=${farmerId}`
        );
        if (!notifResponse.ok) throw new Error(`HTTP Error: ${notifResponse.status}`);
        const notifData = await notifResponse.json();

        // Fetch applications
        const appResponse = await fetch(
          `http://localhost:3001/api/farmers/applications?farmer_id=${farmerId}`
        );
        if (!appResponse.ok) throw new Error(`HTTP Error: ${appResponse.status}`);
        const appData = await appResponse.json();

        const readNotifications = getReadNotificationsFromStorage();

        // Transform backend notifications
        const backendNotifications = notifData.notifications?.map((n) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          type: n.type || "info",
          created_at: n.created_at,
          read: n.is_read === 1 || readNotifications.includes(n.id),
        })) || [];

        // Transform application notifications (only approved or rejected)
        const applicationNotifications = appData.applications?.map((app) => {
          if (app.status === "approved" || app.status === "rejected") {
            return {
              id: `app-${app.application_id}`,
              title: `Application ${app.status.toUpperCase()}`,
              message: `Your application for ${app.scheme_name} has been ${app.status}.`,
              type: app.status === "approved" ? "success" : "warning",
              created_at: app.updated_at || app.reviewed_at || new Date().toISOString(),
              read: readNotifications.includes(`app-${app.application_id}`),
            };
          }
          return null;
        }).filter(Boolean);

        // Merge all notifications
        setNotifications([...backendNotifications, ...applicationNotifications]);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 🔄 Mark single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((note) => (note.id === id ? { ...note, read: true } : note))
    );

    const readNotifications = getReadNotificationsFromStorage();
    if (!readNotifications.includes(id)) {
      readNotifications.push(id);
      setReadNotificationsInStorage(readNotifications);
    }
  };

  // ✅ Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((note) => ({ ...note, read: true })));
    const allIds = notifications.map((note) => note.id);
    setReadNotificationsInStorage(allIds);
  };

  // ❌ Delete notification locally
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
    const readNotifications = getReadNotificationsFromStorage().filter((nid) => nid !== id);
    setReadNotificationsInStorage(readNotifications);
  };

  // 🧩 Icons per type
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case "success":
        return "from-green-50 to-emerald-50 border-green-200";
      case "warning":
        return "from-yellow-50 to-orange-50 border-yellow-200";
      case "info":
        return "from-blue-50 to-cyan-50 border-blue-200";
      default:
        return "from-gray-50 to-slate-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-center text-red-600 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-white/80 mt-1">Stay updated with your applications</p>
              </div>
            </div>

            {unreadCount > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                  <span className="text-white font-semibold">
                    {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-medium hover:bg-yellow-300 hover:text-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`bg-gradient-to-br ${getGradient(note.type)} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                  !note.read ? "ring-2 ring-green-400 ring-offset-2" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          note.type === "success"
                            ? "bg-green-100"
                            : note.type === "warning"
                            ? "bg-yellow-100"
                            : note.type === "info"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        } group-hover:scale-110 transition-transform duration-300`}
                      >
                        {getIcon(note.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
                            {note.title}
                            {!note.read && (
                              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                NEW
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">{note.message}</p>
                          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {new Date(note.created_at).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {!note.read && (
                            <button
                              onClick={() => markAsRead(note.id)}
                              className="p-2 rounded-lg bg-white hover:bg-green-100 text-green-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                              title="Mark as read"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(note.id)}
                            className="p-2 rounded-lg bg-white hover:bg-red-100 text-red-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                            title="Delete notification"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};
