import { Link } from "react-router-dom";
import "./footer.css";
import { useCookies } from "react-cookie";

export function Footer() {

  const[cookie] = useCookies(["Role","UserId","UserName"]);

  return (
    <div className="footer">

      <div className="p-3 d-flex flex-column  align-items-center">
        <span className="h5">Register Today And Have Fun</span>
        {
           (cookie.Role) ?  '':  <Link className="btn btn-success w-25 fs-6" to="/user-register">
            Register
        </Link>
        }

          
      </div>

      <div className="d-flex  justify-content-around p-3 inform">
        <div className="d-flex flex-column p-2 gap-2">
          <span className="footer-subtitle">Contact</span>
          <div className="fw-bold">
            <i className="bi bi-telephone bg-warning text-white p-1 rounded-circle"></i>{" "}
            +91-75487349349
          </div>
          <div className="fw-bold">
            <i className="bi bi-geo-alt  bg-warning text-white p-1 rounded-circle"></i>{" "}
            New Delhi
          </div>
        </div>
        <div className="d-flex flex-column">
          <span className="footer-subtitle">Follow Us</span>
          <div className="d-flex gap-2  p-2">
            <span className="fs-4">
              <i className="bi bi-linkedin"></i>
            </span>
            <span className="fs-4">
              <i className="bi bi-facebook"></i>
            </span>
            <span className="fs-4">
              <i className="bi bi-messenger"></i>
            </span>
            <span className="fs-4">
              <i className="bi bi-google"></i>
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span className="footer-subtitle">Discover</span>
          <span className="fw-bold">Latest News</span>
          <span className="fw-bold">Career</span>
          <span className="fw-bold">New Arrivals</span>
        </div>
      </div>
      <div className="d-flex justify-content-between text-white bg-dark p-2 rounded-3">
        <div>
          <span> &copy;Copyright</span>
          <span>
            <span>video-library.com</span>Allrightsreserved
          </span>
        </div>
        <div>
          <span>Privacy & Policy</span>
          <span>Terms & Condition</span>
        </div>
      </div>
    </div>
  );
}
