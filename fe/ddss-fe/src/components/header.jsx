function Header() {
    return (
        <div className="box-border flex justify-end min-[1200px]:justify-center overflow-x-auto">
            <header className="rounded-xl border-2 border-white bg-blue-100 min-[1209px]:mx-auto mt-[3.125em] px-[3.125em] py-[1.5625em] shadow-[0.125em_0.125em_0.9375em_0_#293241] w-full min-[1209px]:w-1/4 text-right min-[1209px]:text-center">
                <nav className="box-border flex justify-end min-[1209px]:justify-center">
                    <ul className="box-border flex flex-col items-stretch justify-between min-[1209px]:flex-row min-[1209px]:space-x-4">
                        <li className="inline-block text-black hover:bg-gray-700 hover:text-cyan-50">
                            <a href="/" className="font-['Montagu_Slab'] font-light text-[0.9em]">HOME</a>
                        </li>
                        <li className="inline-block text-black hover:bg-gray-700 hover:text-cyan-50">
                            <a href="/about-us" className="font-['Montagu_Slab'] font-light text-[0.9em]">ABOUT US</a>
                        </li>
                        <li className="inline-block text-red-500 hover:bg-gray-700 hover:text-cyan-50">
                            <a href="/sign-in" className="font-['Montagu_Slab'] font-light text-[0.9em]">SIGN IN</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;