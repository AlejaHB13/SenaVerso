import Link from 'next/link'

function Navbar() {
    return (
        <nav className="bg-white p-4">
            <div className="flex justify-between container mx-auto">
                <Link href="/">
                 <h1 className="px-3 py-1">
                    <img src="/logo2.png" alt="SeñaVerso" className="h-10 w-auto" />
                 </h1>
                </Link>
                <ul className="flex dap-x-2">
                <li className="px-3 py-1 text-black">
                        <Link href="/register">Registrarse</Link>
                    </li>
                    <li className="px-3 py-1 text-black">
                    <Link href="/login">Iniciar sesión</Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar