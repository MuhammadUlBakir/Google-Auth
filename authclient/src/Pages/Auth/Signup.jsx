import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [data, Setdata] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const navigate = useNavigate();
  //------------------
  const Inputval = (e) => {
    const { name, value } = e.target;
    Setdata((pre) => {
      return { ...pre, [name]: value }
    })
  };
  //------------------
  const Saveuser = async () => {
    try {
      const { username, email, password, cpassword } = data;
      if (!username || !email || !password || !cpassword) {
      alert("plz fill all fields")
      } else {
        if (password === cpassword) {
          const Adduser = await axios.post("/api/Adduser", { data });
          if (Adduser.data.success === true && Adduser.data.status === 201) {
            Cookies.set("Usrid", Adduser.data.userid);
            navigate("/signin")
          }
        } else {
          alert("Password Does not Match");
      }
    }
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <>
            <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize : "50px"}}>Sign up</p>
                <form className="mx-1 mx-md-4">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} onChange={Inputval} value={data.username} name='username' placeholder='Enter Your Username' type="text" id="form3Example1c" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} onChange={Inputval} value={data.email} name='email' placeholder='Enter Your Email' type="email" id="form3Example3c" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} onChange={Inputval} value={data.password} name='password' placeholder='Enter Your Password' type="password" id="form3Example4c" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} onChange={Inputval} value={data.cpassword} name='cpassword' placeholder='Enter Your Confirm Password' type="password" id="form3Example4cd" className="form-control" />
                    </div>
                  </div>
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                                              </div>
                                              {/* <div className="form-check d-flex justify-content-center mb-1"> */}
                                                <div onClick={() => window.open('http://localhost:8000/api/google', '_self')} className='btn btn-white' style={{width : "400px" , height : "50px"  , marginTop : "-40px" , borderRadius : "10px"}}><img style={{height : 40 , paddingBottom : "7px" , padding : "3px"}} src={'https://th.bing.com/th/id/R.c7b4479a6440ad40410994966731d077?rik=MC1QAdisk40%2bHg&pid=ImgRaw&r=0'} /></div>
                                              {/* </div> */}
                                              
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-md mb-5 mt-4" onClick={Saveuser}>Register</button>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
     
      </>
    )
}

export default Signup