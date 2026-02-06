"use client";

import {useAuth} from '@/contexts/AuthContext';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {ReactNode, useEffect} from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
  const {isAuthenticated, isLoading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
