import { Link } from "react-router-dom";

export function ErrorPage(){

    return (
        <div className="bg-warning d-flex flex-column align-items-center justify-content-center" style={{width:"100%",minHeight:"100vh"}}>
           <p className="h1 mx-auto">
                You don't have permission to access this page.
            </p>
          <span className="h2 mx-auto">Wrong Request</span>
          <div className="mx-auto">
            <Link className="btn btn-primary btn-lg" to="/login">Please Try Again</Link>
          </div>
        </div>
    );
}