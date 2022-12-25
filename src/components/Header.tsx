import Link from "next/link"
export const Header=()=>{
    return (
        <>
            <header >
            <div>
                <nav className=" relative container">
                    <Link className=" relative text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium" href='/' >Home</Link>
                    <Link className=" relative text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium"  href='/events' >Events</Link>
                    <Link className="relative text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium" href='/about-us'>About us</Link>
                </nav>
            </div>
            </header>
        </>
    )
}