"use client"

import Link from "next/link";
import { useState } from "react";
import { RiMenuUnfold3Line } from "react-icons/ri";


const SmallNav = ({ nav }) => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <div >
      <RiMenuUnfold3Line onClick={() => setOpenNav(!openNav)} className="cursor-pointer md:hidden text-2xl" />
      {
        openNav ?
          (<div className="absolute top-18 left-1 p-5 rounded-sm bg-white flex flex-col gap-2 items-start">
            {
              nav.map(nav => {
                return (
                  <div key={nav.id} className="text-sm">
                    <Link href={`/${nav.path}`}>{nav.name}</Link>
                  </div>
                )
              })
            }
          </div>) : (
            ""
          )
      }
    </div>
  );
};

export default SmallNav;