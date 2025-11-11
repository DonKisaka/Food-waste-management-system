import { Button } from "@/components/ui/button"
import Link from "next/link"

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 border border-indigo-100">
              Sustainable Waste Management
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Food Waste Management
              <span className="block text-indigo-600 mt-2">Made Simple</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Track donations, manage collection centers, and facilitate sustainable waste processing for a cleaner environment.
            </p>
            
            <div className="mt-10">
              <Link href="/signup">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default HomePage

