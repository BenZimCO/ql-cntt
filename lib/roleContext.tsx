'use client';
import React, { createContext, useContext, useState } from 'react';

type Role = {
  type: 'admin' | 'unit_user';
  orgId: number | null;
  orgName: string | null;
  blockId: number | null;
  blockName: string | null;
};

type RoleCtx = {
  role: Role;
  isAdmin: boolean;
  switchToAdmin: () => void;
  switchToUnitUser: (orgId: number, orgName: string, blockId: number, blockName: string) => void;
};

const RoleContext = createContext<RoleCtx | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>({ type: 'admin', orgId: null, orgName: null, blockId: null, blockName: null });

  const switchToAdmin = () => setRole({ type: 'admin', orgId: null, orgName: null, blockId: null, blockName: null });
  const switchToUnitUser = (orgId: number, orgName: string, blockId: number, blockName: string) =>
    setRole({ type: 'unit_user', orgId, orgName, blockId, blockName });

  return (
    <RoleContext.Provider value={{ role, isAdmin: role.type === 'admin', switchToAdmin, switchToUnitUser }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}