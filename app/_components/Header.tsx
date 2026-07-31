'use client'

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const menuOptions = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Pricing",
        path: "/pricing"
    },
    {
        name: "Contact",
        path: "/contact"
    }
];  

function Header() {
    const { user, isLoaded, isSignedIn } = useUser();

    return (
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto border-b border-border/40">
            {/* Logo */}
            <Link href="/" className="flex gap-2 items-center hover:opacity-90 transition-opacity">
                <Image src={'/logo.png'} alt="logo" width={50} height={50} className="object-contain" />
                <h2 className="text-2xl font-bold tracking-tight">Viora</h2>
            </Link>

            {/* Menu Options */}
            <div className="flex gap-6 items-center">
                {menuOptions.map((menu, index) => (
                    <Link key={index} href={menu.path}>
                        <h2 className="text-base font-medium text-muted-foreground hover:text-foreground hover:scale-105 transition-all">{menu.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-3 items-center">
                {isLoaded && !isSignedIn && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button>Get Started</Button>
                        </SignUpButton>
                    </>
                )}
                {isLoaded && isSignedIn && (
                    <>
                        <Link href={'/create-new-trip'}>
                            <Button>Create New Trip</Button>
                        </Link>
                        <UserButton />
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;