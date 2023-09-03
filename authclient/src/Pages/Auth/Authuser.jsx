import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Authuser = () => {
    const [pass, Setpass] = useState("");
    //------------------------
    const navigate = useNavigate();
    //------------------------
    const CheckUser = async () => {
        if (!pass) {
           alert("Plz Fill All Fields")
        } else {
            const token = Cookies.get("Usertoken");
            try {
                const Verify = await axios.post("/api/authuser", { pass, token });
                if (Verify.data.success === true && Verify.data.status === 200) {
                    navigate("/priv2")
                } else {
                    alert("Password Does not Match");
                    Setpass("");
                }
            } catch (error) {
                console.log(error);
            }
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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize : "50px"}}>User Password</p>
                <form className="mx-1 mx-md-4" onSubmit={(e) => e.preventDefault()}>
                 
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input style={{borderRadius : "9px"}} placeholder='Enter Your Password' value={pass} onChange={(e) => Setpass(e.target.value)} type="password" id="form3Example3c" className="form-control" />
                    </div>
                  </div>
                                              <div style={{marginLeft : "20px"}}>
                                                  <button className='btn btn-secondary' onClick={CheckUser}>Check</button>
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

export default Authuser