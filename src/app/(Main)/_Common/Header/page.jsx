import Link from "next/link";
import SmallNav from "./SmallNav";


const Header = () => {
    const nav = [
        { id: 1, name: "Features", path: "/Features" },
        { id: 2, name: "Community", path: "/Community" },
        { id: 3, name: "Resources", path: "/Resources" },
    ]
    return (
        <div className="relative bg-white text-black flex justify-between p-3" >
            <div className="flex gap-3 md:gap-5 items-center">
                <SmallNav nav={nav}/>
                <p className="text-2xl text-blue-600 font-bold">Dev hub</p>
                <div className="hidden md:flex gap-4 items-center">
                    {
                        nav.map(nav => {
                            return (
                                <div key={nav.id} className="text-sm">
                                    <Link href={`/${nav.path}`}>{nav.name}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <Link href={"/Login"} className="cursor-pointer ">Sign in</Link>
                <Link href={"/SignUp"} className="bg-blue-600 px-3 py-2 rounded-sm text-white">Get started</Link>
            </div>
        </div>
    );
};

export default Header;