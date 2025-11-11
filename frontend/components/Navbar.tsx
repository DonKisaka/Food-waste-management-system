import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/foodlogo.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
