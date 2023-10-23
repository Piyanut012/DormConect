import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import "./Check_late.css";
import Slidebar from '../../components/SildeBar_Secur';

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    // console.log(data);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/report/" + params.id;
      const response = await axios.post(apiUrl, data);

      if (response.status === 201) {
        console.log(response);
        navigate(`/homepage/${params.id}`);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  if (loading) {
    return (
      <>
        <Container className="spinner">
          <Spinner animation="grow" />
        </Container>
      </>
    );
  }

  return (
    <body>
      <Slidebar/>
      <checklate>
        <div className="py-4 setz">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div className="container">
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
              <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                <svg className="bi" width={40} height={32} role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
              </a>
            </div>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2">เช็คสาย</a></li>
            </ul>
          </header>
        </div>
        {/* แจ้ง */}
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit(saveForm)}>
              <Col className="form-floating">
                <input
                  defaultValue=""
                  className={`${errors.username && "error"} form-control`}
                  placeholder="Please enter title"
                  {...register("username")}
                />
                <label htmlFor="floatingInput">ID</label>
              </Col>
              <div className="form-floating">
                    <textarea 
                    defaultValue=""
                    className= {`${errors.reason && "error"} form-control`}
                    placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}
                    {...register("reason", {
                      required: {
                        value: true,
                        message: "Post Content is required.",
                      },
                    })}
                    />
                    <label htmlFor="floatingTextarea2">เหตุผล</label>
                </div>
              <Col>
                <button className="btn btn-primary w-100 py-2 " type="submit">บันทึก</button>
              </Col>
          </form>
        </main>
        </div>
        </checklate>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
  );
};

export default Edit;