"use client"

import { useState } from "react";
import Header from "./page";

const SmallNav = () => {
    const [openNav, setOpenNav] = useState(false);
  return (
    <div>
      <Header setOpenNav={setOpenNav} openNav={openNav}/>
    </div>
  );
};

export default SmallNav;