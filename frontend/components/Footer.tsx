
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
   <footer className='border-t border-gray-200'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
      <div className='text-center text-sm text-gray-500'>
        <p>
          &copy; {currentYear} Food Waste Management System. All rights reserved.
        </p>
      </div>
    </div>
   </footer>
  )
}

export default Footer
