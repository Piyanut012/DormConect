import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";

import "./Report.css";
import Slidebar from '../../components/SildeBar_Stu';


const Report = () => {
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
      <reportstu>
        <div className="py-4">
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
              <li><a href="#" className="nav-link px-2">แจ้งปัญหา</a></li>
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
                <label htmlFor="floatingTextarea2">ปัญหาที่พบ</label>
              </div>
              <button className="btn btn-primary w-100 py-2" type="submit">แจ้ง</button>
            </div>
          </div>
        </form>
        
        <div className="container px-4 py-5" id="hanging-icons">
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
              {/* reports */}
              {apiData && 
                apiData.map((reports, index) => {
                if (reports.status !== "555") {
                  return (
                    <Col
                      id={`report_${reports.room_id}`}
                      className={`col d-flex align-items-start report ${reports.status === 'ONGOING' ? 'status-ongoing' 
                      : reports.status === 'RECEIVED' ? 'status-received' : reports.status === 'COMPLETED' ? 'status-completed' : ''}`}
                      key={index}
                    >
                      <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-exclamation-square seticon" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                      </svg>
                      </div>
                      <Col>
                        <h3 className="fs-2 text-body-emphasis">{reports.room_id}</h3>
                        <p>{reports.description}</p>
                      </Col>
                    </Col>
                  );
                }
                return null; // Return null for report cards with status "COMPLETED" to hide them
              })
            }
            </div>
          </div>

        </div>
        </reportstu>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
  );
};

export default Report;
