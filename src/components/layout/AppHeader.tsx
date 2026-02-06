"use client";

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ScrollArea} from '@/components/ui/scroll-area';
import {mockNotifications} from '@/data/mockData';
import {cn} from '@/lib/utils';
import {Notification, NotificationType} from '@/types';
import {formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react';
import {ReactNode, useState} from 'react';

interface AppHeaderProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const notificationIcons: Record<NotificationType, typeof Bell> = {
  task_assigned: Clock,
  task_updated: AlertCircle,
  comment_mention: MessageSquare,
  due_date_reminder: Clock,
  task_completed: CheckCircle2,
};

export default function AppHeader({title, description, children}: AppHeaderProps) {
  const [notifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 border-b border-border bg-card px-6 flex items-center justify-between gap-4">
      {/* Title & Description */}
      <div className="flex-1 min-w-0">
        {title && <h1 className="text-xl font-semibold text-foreground truncate">{title}</h1>}
        {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
      </div>

      {/* Actions & Notifications */}
      <div className="flex items-center gap-3">
        {children}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notificações</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Marcar todas como lidas
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  Nenhuma notificação
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = notificationIcons[notification.type];
                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        'flex items-start gap-3 p-3 cursor-pointer',
                        !notification.read && 'bg-accent/50'
                      )}
                    >
                      <div className={cn(
                        'mt-0.5 p-1.5 rounded-full',
                        notification.read ? 'bg-muted' : 'bg-primary/10'
                      )}>
                        <Icon className={cn(
                          'w-4 h-4',
                          notification.read ? 'text-muted-foreground' : 'text-primary'
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'text-sm',
                          !notification.read && 'font-medium'
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(notification.createdAt, {
                            addSuffix: true,
                            locale: ptBR
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </DropdownMenuItem>
                  );
                })
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
