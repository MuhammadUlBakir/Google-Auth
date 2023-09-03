import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Password = () => {
    const [pass, Setpass] = useState("");
    const [cpass, Setcpass] = useState("");
    //------------------------
    const navigate = useNavigate();
    //------------------------
    const CreatePass = async () => {
        try {
            if (pass && cpass) {
                const token = Cookies.get("Usertoken");
                if (pass === cpass && token) {
                    const Createpass = await axios.post("/api/createpass", { pass, token });
                    if (Createpass.data.success === true && Createpass.data.status === 200) {
                        alert("PassWord Created Sucessfully");
                        Cookies.get("Usertoken" , Createpass.data.FindUser.token)
                        navigate("/priv2");
                    } else {
                        alert("PLz Try again ")
                    }
                } else {
                    alert("Password Does not Match");
             }
            } else {
                alert("Please fill all the fields");
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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize : "50px"}}>Create Password</p>
                <form className="mx-1 mx-md-4" onSubmit={(e) => e.preventDefault()}>
                 
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} placeholder='Enter Your Password' onChange={(e) => Setpass(e.target.value)} type="password" id="form3Example3c" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} placeholder='Enter Your confirm Password' type="password" onChange={(e) => Setcpass(e.target.value)} id="form3Example4c" className="form-control" />
                    </div>
                                              </div>
                                              <div style={{marginLeft : "20px"}}>
                                                  <button className='btn btn-secondary' onClick={CreatePass}>Create Passsword</button>
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

export default Password