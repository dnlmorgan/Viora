import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    return (
        <div className="flex justify-between items-center p-4">
            {/* Logo */}
            <div className="flex gap-2 items-center">
                <Image src={'/logo.png'} alt="logo" width={65} height={65} />
                <h2 className="text-2xl font-bold">Viora</h2>
            </div>

            {/* Menu Options */}
            <div className="flex gap-5 items-center">
                {menuOptions.map((menu, index) => (
                    <Link key={index} href={menu.path}>
                        <h2 className="text-lg hover:scale-105 transition-all">{menu.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started Button */}
            <Button>Get Started</Button>


        </div>
    )
}

export default Header;