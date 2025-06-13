router.get("/admin", authMiddleware(["admin", "moderator"]), notificationController.getAdminNotifications);
