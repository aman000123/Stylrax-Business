import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
