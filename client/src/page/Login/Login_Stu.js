import React from "react";
import { Col, Container, Row, } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Spinner from "react-bootstrap/Spinner";

import "./Login.css";

const Home = () => {
    const [apiData, setApiData] = useState(false);
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    // const location = useLocation();

    // useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const apiUrl = process.env.REACT_APP_API_ROOT;
    //     const response = await axios.get(apiUrl);

    //     if (response.status === 200){
    //       if (response?.data.statusText === "Ok"){
    //         setApiData(response?.data?.blog_records);
    //       }
    //     }

    //     setLoading(false);
    //   }catch (error){
    //     setLoading(false);
    //     console.log(error.response);
    //   }
    // };

    // fetchData();
    // return () => {};
    // }, []);

    // console.log(apiData);
    
    // if (loading) {
    //   return (
    //   <>
    //     <Container className="spinner">
    //       <Spinner animation="grow"/>
    //     </Container>
    //   </>
    //   );
    // }

    //2.form handling and saving

  const saveForm = async (data) => {
    // setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/login_stu";
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log(response);
        navigate(`/homepage/${response?.data.StudentID}`, {
          state: "Saved successfully",
        });
      }

      // setLoading(false);
    } catch (error) {
      // setLoading(false);
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

                {/* <form>
                  <h1 className="h3 mb-3= fw-normal">DormConncect</h1>
                  <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">ID</label>
                  </div>
                  <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <Link to={`/homepage`}>
                    <button className="btn btn-primary w-100 py-2" type="submit">Log in</button>
                  </Link>
                </form> */}

              
              <form onSubmit={handleSubmit(saveForm)}>
                  <h1 className="h3 mb-3= fw-normal">DormConncect</h1>
                  <Col className="form-floating">
                    <input
                      defaultValue=""
                      className={`${errors.username && "error"} form-control`}
                      placeholder="Please enter title"
                      {...register("username")}
                    />
                    <label htmlFor="floatingInput">ID</label>
                  </Col>
                  <Col className="form-floating">
                    <input
                      type="password"
                      defaultValue=""
                      className={`${errors.password && "error"} form-control`}
                      placeholder="Please enter content"
                      {...register("password")}
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

export default Home;