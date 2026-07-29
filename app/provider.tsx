'use client'

import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
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
    const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return;

    const name = user?.fullName ?? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    const imageUrl = user?.imageUrl ?? "";

    const saveUser = async () => {
      const result = await createUser({
        email,
        imageUrl,
        name,
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