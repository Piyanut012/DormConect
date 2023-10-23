import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";

import "./Add_bill.css";
import Slidebar from '../../components/SildeBar_Stu';


const Add = () => {
  const [apiData, setApiData] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/reports_stu/" + params.id;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setApiData(response?.data?.reports);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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
      <addbill>
        <div className="py-4 setz">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}
        <div className="container">
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
              <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                <svg className="bi" width={40} height={32} role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
              </a>
            </div>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2">เพิ่มบิล</a></li>
            </ul>
          </header>
        </div>
        <main className="form-signin w-100 m-auto">

          <form onSubmit={handleSubmit(saveForm)}>

          <Col className="form-floating">
            <input
              defaultValue=""
              className={`${errors.username && "error"} form-control`}
              placeholder="Please enter title"
              {...register("username")}
            />
            <label htmlFor="floatingInput">ห้อง</label>
          </Col>

          <Col className="form-floating">
            <input
              defaultValue=""
              className={`${errors.username && "error"} form-control`}
              placeholder="Please enter title"
              {...register("username")}
            />
            <label htmlFor="floatingInput">ไฟ</label>
          </Col>

          <Col className="form-floating">
            <input
              defaultValue=""
              className={`${errors.username && "error"} form-control`}
              placeholder="Please enter title"
              {...register("username")}
            />
            <label htmlFor="floatingInput">น้ำ</label>
          </Col>

          <button className="btn btn-primary w-100 py-2 setbutton" type="submit">เพิ่ม</button>
          </form>

          </main>
        

        </div>
        </addbill>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
  );
};

export default Add;
