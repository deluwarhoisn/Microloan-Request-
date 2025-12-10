import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center text-center">
    <h1 className="text-6xl font-bold text-red-600">404</h1>
    <p className="text-xl text-gray-600 mt-4">Page not found</p>
    <Link to="/" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
      Go Home
    </Link>
  </div>
);

export default PageNotFound;
