"use client";

import {ReactNode, useState} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  headerAction?: ReactNode;
  title?: string;
  description?: string;
  // Deprecated props kept optional to avoid breaking temporarily if referenced elsewhere (unlikely) but we will clean them up.
  onSearch?: any; // To be removed
  onNewTask?: any; // To be removed
}

export default function DashboardLayout({children, headerAction, title, description}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title={title} description={description}>
          {headerAction}
        </AppHeader>
        <main className="flex-1 overflow-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
