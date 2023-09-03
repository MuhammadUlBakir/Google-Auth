import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
const Priv1 = () => {
  //---------------
  const [Loading, Setloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const Authuser = async () => {
    try {
      if (id) {
        const Check = await axios.post("/api/checkuser", { userid: id });
        if (Check && Check.data.userdata) {
          Cookies.set("Usertoken", Check.data.userdata.token);
          setTimeout(() => Setloading(true), 5000);
          if (!Check.data.userdata.password) {
            setTimeout(() => navigate('/password'), 8000);
          } else {
            navigate('/authuser')
          }
        } else {
          navigate("/signin");
        }
      } else {
        navigate("/signin")
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Authuser();
  }, []);
  //---------------
  const Logout = async () => {
    try {
      const logout = await axios.get("/api/logout");
      console.log(logout.data);
      if (logout.data.success === true && logout.data.status === 200) {
        navigate("/signin");
      } else {
        alert("Plz Try Again");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-center">
        {Loading === false ? <h2 className="text-danger">Loading...</h2> : <h2 className="text-success">Verified</h2>}
        <button onClick={Logout} >out</button>
      </div>
    </>
  );
};

export default Priv1;
