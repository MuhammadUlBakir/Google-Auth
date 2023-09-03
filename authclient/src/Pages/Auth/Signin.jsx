import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [email, Setemail] = useState("");
  const [pass, Setpass] = useState("");
  const [hide, Sethide] = useState(false);
  const navigate = useNavigate();
  //------------------------------
  const Redirect = async () => {
    window.open('http://localhost:8000/api/google', '_self');
  }
  //----------------------
  const SessionAuth = () => {
    const Userid = Cookies.get('Usrid');
    if (Userid) {
      Sethide(true);
    }
  }
  //-----------------------
  const VerifyUser = async () => {
        try {
        if (email && pass) {
          const SigninUser = await axios.post("/api/signin", { email, pass });
          if (SigninUser.data.success === true && SigninUser.data.status === 200) {
            Cookies.set("Usertoken", SigninUser.data.token);
            alert("Signin Successfully");
            navigate("/priv2")
          }
        } else {
          alert("Plz Fill All Fields")
        }
      } catch (err) {
        console.log(err);
      }
  }
  //---------------------------
  useEffect(() => {
    SessionAuth();
},[])
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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize : "50px"}}>Sign In</p>
                <form className="mx-1 mx-md-4">
                 
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} placeholder='Enter Your Email' onChange={(e) =>  Setemail(e.target.value)} value={email} type="email" id="form3Example3c" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} placeholder='Enter Your Password' type="password" id="form3Example4c" value={pass} onChange={(e) => Setpass(e.target.value) } className="form-control" />
                    </div>
                  </div>
                
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                                              </div>
                                               {hide === false ? <> <div onClick={Redirect} className='btn btn-white' style={{width : "400px" , height : "50px"  , marginTop : "-40px" , borderRadius : "10px"}}><img style={{height : 40 , paddingBottom : "7px" , padding : "3px"}} src={'https://th.bing.com/th/id/R.c7b4479a6440ad40410994966731d077?rik=MC1QAdisk40%2bHg&pid=ImgRaw&r=0'} /></div></> : ""}
                                          
                                              
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-md mb-5 mt-4" onClick={VerifyUser}>Signin</button>
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

export default Signin