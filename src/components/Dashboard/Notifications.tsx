
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

type NotificationType = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: '1',
      title: 'New Critical Incident',
      description: 'AI system #A238 showing anomalous behavior',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Incident Status Updated',
      description: 'Incident #2831 changed to "Investigating"',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'Alert Resolved',
      description: 'Training data corruption issue has been fixed',
      time: '3 hours ago',
      read: true
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marked as read",
      duration: 2000,
    });
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute h-2 w-2 bg-primary rounded-full top-2 right-2 animate-pulse"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-card border-border/50">
        <div className="flex items-center justify-between p-3 border-b border-border/50">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-primary hover:text-primary/80"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div key={notification.id} onClick={() => markAsRead(notification.id)}>
                  <div className={`p-3 hover:bg-accent/50 cursor-pointer transition-colors ${!notification.read ? 'bg-accent/20' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <span className="h-2 w-2 bg-primary rounded-full mt-1.5"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  <Separator className="bg-border/30" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
