import { useFormik } from "formik";
import { UserRegister } from "../../contract/User-Register";

export function UserRegisterForm(){

  const UserRegisterformik = useFormik<UserRegister>({
     initialValues: {
       UserId: '',
       Password:'',
       UserName:'',
       Email:'',
       Age:0,
       Mobile:'',
       CreatedAt:'',

     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
    return (
        <div className="container d-flex flex-column w-25 bg-light p-4 rounded-3 w-50">
          <h3 className="m-2 text-black fw-bold">User Register</h3>
          <form onSubmit={UserRegisterformik.handleSubmit}>
          <dl className="row row-cols-2">
            <div className="col">
            <dt className="form-label">UserId</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.UserId}
         /> </dd>

            </div>
            <div>

         <dt className="form-label">UserName</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.UserName}
         /> </dd>
            </div>
            <div>

            <dt className="form-label">Password</dt>
            <dd> <input type="password" className="form-control" id="Password"
         name="Password"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.Password}
         /> </dd>
            </div>
            <div>

         <dt className="form-label">Email</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.Email}
         /> </dd>
            </div>
<div>

<dt className="form-label">Mobile</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.Mobile}
         /> </dd>
</div>

<div className="col">

  
</div>

<div className="col">

         <dt className="form-label">Age</dt>
            <dd> <input className="form-control w-50" type="text"  id="UserId"
         name="UserId"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.Age}
         /> </dd>

         </div>

       <div className="col">
         <dt className="form-label">Date</dt>
            <dd> 

        <input className="form-control w-50" type="datetime-local"  id="CreatedAt"
         name="CreatedAt"
         onChange={UserRegisterformik.handleChange}
         onBlur={UserRegisterformik.handleBlur}
         value={UserRegisterformik.values.CreatedAt}
         />
          </dd>

         </div>
          </dl>
          <button type="submit" className="btn btn-success w-25">Save</button>
          </form>
        </div>
      
    );
}