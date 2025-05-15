import { Link } from "react-router-dom"




const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
        <p className="text-white mt-5 text-lg">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound