'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
