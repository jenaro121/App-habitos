// Listener para recibir notificaciones PUSH del sistema
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    
    const title = data.title || '⏰ Recordatorio';
    const options = {
        body: data.body || '¡Es hora de cumplir con tu hábito!',
        icon: 'https://img.icons8.com/emoji/192/sparkles-emoji.png',
        badge: 'https://img.icons8.com/emoji/192/sparkles-emoji.png',
        vibrate: [100, 50, 100],
        data: {
            url: self.registration.scope
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Listener al hacer clic en la notificación
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (let client of clientList) {
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
