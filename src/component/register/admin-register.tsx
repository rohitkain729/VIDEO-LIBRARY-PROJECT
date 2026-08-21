import { useFormik } from "formik";
import { AdminRegister } from "../../contract/Adminl-Register";

export function AdminRegisterForm(){

  const AdminRegisterformik = useFormik<AdminRegister>({
     initialValues: {
       UserId: '',
       Password:'',
       UserName:'',
       Email:'',
       Age:0,
       Country:'',
       Mobile:''

     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
    return (
        <div className="container d-flex flex-column w-25 bg-light p-4 rounded-3 w-50">
          <h3 className="m-2 text-black fw-bold">Admin Register</h3>
          <form onSubmit={AdminRegisterformik.handleSubmit}>
          <dl className="row row-cols-2">
            <div className="col">
            <dt className="form-label">UserId</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.UserId}
         /> </dd>

            </div>
            <div>

         <dt className="form-label">UserName</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.UserName}
         /> </dd>
            </div>
            <div>

            <dt className="form-label">Password</dt>
            <dd> <input type="password" className="form-control" id="Password"
         name="Password"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.Password}
         /> </dd>
            </div>
            <div>

         <dt className="form-label">Email</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.Email}
         /> </dd>
            </div>
<div>

<dt className="form-label">Mobile</dt>
            <dd> <input className="form-control" type="text"  id="UserId"
         name="UserId"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.Mobile}
         /> </dd>
</div>

<div className="col">

  
</div>

<div className="col">

         <dt className="form-label">Age</dt>
            <dd> <input className="form-control w-50" type="text"  id="UserId"
         name="UserId"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.Age}
         /> </dd>

         </div>

<div className="col">


         <dt className="form-label">Country</dt>
            <dd> 
         
         <select name="UserId" id="UserId" className="form-select"
         onChange={AdminRegisterformik.handleChange}
         onBlur={AdminRegisterformik.handleBlur}
         value={AdminRegisterformik.values.UserId}>
         <option>Country</option>
         <option>India</option>
         <option>America</option>
         <option>Dubai</option>
         <option>China</option>
         </select>
          </dd>

         </div>
          </dl>
          <button type="submit" className="btn btn-success w-25">Save</button>
          </form>
        </div>
      
    );
}