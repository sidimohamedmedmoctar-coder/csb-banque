import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: ReactNode;
  /** Un rôle (string) ou une liste — l'utilisateur doit en posséder AU MOINS UN */
  requireRole?: string | string[];
}

export default function ProtectedRoute({ children, requireRole }: Props) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requireRole) {
    const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
    const allowed = roles.some((r) => hasRole(r));
    if (!allowed) return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
