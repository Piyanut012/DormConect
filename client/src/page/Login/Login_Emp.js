import React from "react";
import { Col, Container, Row, } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Spinner from "react-bootstrap/Spinner";

import "./Login.css";

const Login_emp = () => {
    const [apiData, setApiData] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    //2.form handling and saving

  const saveForm = async (data) => {
    // setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/login_emp";
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log(response);
        if (response?.data.Position === "Manager"){
        navigate(`/homepage_dorm/${response?.data.EmployeeID}`, {
          state: "Saved successfully",
        });}
        else if (response?.data.Position === "Admin"){
          navigate(`/homepage_admin/${response?.data.EmployeeID}`, {
            state: "Saved successfully",
          });
        }else if (response?.data.Position === "Security"){
          navigate(`/homepage_secur/${response?.data.EmployeeID}`, {
            state: "Saved successfully",
          });
        }
      }

      // setLoading(false);
    } catch (error) {
      setError("Invalid username or password");
      console.log(error.response);
    }
  };


    return (
        <body>
          <login>
            <div className="py-4 setz">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}
              <main className="form-signin w-100 m-auto">

              <form onSubmit={handleSubmit(saveForm)}>
                  <h1 className="h3 mb-3= fw-normal">DormConncect</h1>
                  {error && <div className="error-message">{error}</div>}
                  <Col className="form-floating">
                    <input
                      defaultValue=""
                      className={`${errors.username && "error"} form-control`}
                      placeholder="Please enter title"
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Username is required.",
                        },
                      })}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </Col>
                  <Col className="form-floating">
                    <input
                      type="password"
                      defaultValue=""
                      className={`${errors.password && "error"} form-control`}
                      placeholder="Please enter content"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Username is required.",
                        },
                      })}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </Col>
                  <Col>
                    <button className="btn btn-primary w-100 py-2" type="submit">Log in</button>
                  </Col>
              </form>

              </main>
          </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
        </login>
      </body>
    );
}

export default Login_emp;