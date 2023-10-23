import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import "./Add_News.css";

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
      <report>
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
              <li><a href="#" className="nav-link px-2">เพิ่มข่าว</a></li>
            </ul>
          </header>
        </div>
        {/* แจ้ง */}
        <form onSubmit={handleSubmit(saveForm)}>
          <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="form-floating">
                    <textarea 
                    defaultValue=""
                    className= {`${errors.description && "error"} form-control`}
                    placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Post Content is required.",
                      },
                    })}
                    />
                <label htmlFor="floatingTextarea2">รายละเอียด</label>
              </div>
              <Col xs="12" className="py-3">
                <label>Image</label>
                <input
                  type="file"
                  className={`${errors.image && "error"}`}
                  placeholder="Please enter content"
                  {...register("image")}
                />
              </Col>

              <button className="btn btn-primary w-100 py-2" type="submit">เพิ่ม</button>
            </div>
          </div>
        </form>
        </div>
        </report>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
  );
};

export default Edit;