import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    //----------------------
    const [checktoken, Setchecktoken] = useState(false);
    const navigate = useNavigate();
    //----------------------
    const Checktoken = async () => {
        try {
            const token = Cookies.get("Usertoken");
            if (token) {
                Setchecktoken(true);
            }
        } catch (error) {
            console.log(error)
        }
    };
    const Logout = async () => {
        try {
            const logout = await axios.get("/api/logout");
            if (logout.data.success === true && logout.data.status === 200) {
              Cookies.remove("Usertoken");
              Cookies.remove("Usrid");
                Setchecktoken(false)
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    //------------------------
    useEffect(() => {
        Checktoken();
    },[])
  return (
    <>
      <nav className="navbar navbar-light bg-light">
              <div style={{
            display: "flex",
            justifyContent: "center",
                  marginRight: "1000px",
                  marginLeft: "200px",
            
          }}>
                  <Link to={"/"}><h4 >Home</h4></Link>
                  <div style={{ marginLeft: "20px" }}>{checktoken === true ? <Link to={"/priv2"}><h4>PrivPage</h4></Link> : ""}</div>
                   
              </div>
       
           {checktoken === true ? <>   <form
          className="form-inline"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "100px",
                  }}
          onSubmit={(e) => e.preventDefault()}        
        >
          <button
            className="btn btn-outline-danger"
            style={{ marginRight: "10px" }}
            onClick={Logout}
          >
            Logout
          </button>
          
        </form></> : <>   <form
          className="form-inline"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "100px",
                      }}
                      onSubmit={(e) => e.preventDefault()}
        >
          <button
            className="btn btn-outline-success"
            style={{ marginRight: "10px" }}
                          type="submit"
                          onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button className="btn btn-outline-success" type="submit" onClick={() => navigate("/signin")}>
            Signin
          </button>
        </form></>}
      </nav>
    </>
  );
};

export default Nav;
