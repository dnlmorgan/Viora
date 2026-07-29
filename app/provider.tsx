'use client'

import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetails, setUserDetails] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const saveUser = async () => {
      const result = await createUser({
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl ?? "",
        name: user.fullName ?? "",
      });
      setUserDetails(result);
    };

    void saveUser();
  }, [user, createUser]);

  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
    <div>
      <Header />
      {children}
    </div>
    </UserDetailContext.Provider>
  );
}

export default Provider

export const useUserDetails = () => {
  return useContext(UserDetailContext);
}