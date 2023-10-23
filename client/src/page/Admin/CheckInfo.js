import React from "react";
import { Col, Container, Row, } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "./checkinfo.css";
import Slidebar from '../../components/SildeBar_Admin';


const Home = () => {
    const [apiData, setApiData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittedId, setIsSubmittedId] = useState(null);

    const location = useLocation();


    useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT;
        const response = await axios.get(apiUrl);

        if (response.status === 200){
          if (response?.data.statusText === "Ok"){
            setApiData(response?.data?.blog_records);
          }
        }

        setLoading(false);
      }catch (error){
        setLoading(false);
        console.log(error.response);
      }
    };

    fetchData();
    return () => {};
    }, []);

    //2.form handling and saving
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data, id) => {
    setLoading(true);
    const recordId = id;
    // console.log(data);
    console.log(id);
    data.file = data.image[0];
    data.image = null ;

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/" + recordId;
      const response = await axios.put(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.status === 200) {
        console.log(response);
        setIsSubmitted(true);
        setIsSubmittedId(id);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      console.log("ไมม่ีข้อมูลควายๆ");
    }
  };

    console.log(apiData);
    
    if (loading) {
      return (
      <>
        <Container className="spinner">
          <Spinner animation="grow"/>
        </Container>
      </>
      );
    }

    return (
      <body>
        <Slidebar/>
        <hometest>
          <div className="py-4 setz">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          {/* Font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap" rel="stylesheet" />
          {/* Head */}
          <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
              <div className="col-md-3 mb-2 mb-md-0">
                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                  <svg className="bi" width={40} height={32} role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
                </a>
              </div>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2">เช็คข้อมูล</a></li>
              </ul>
              <div className="col-md-3 text-end">
                {/* <button type="button" class="btn btn-outline-primary me-2">Login</button>
          <button type="button" class="btn btn-primary">Sign-up</button> */}
              </div>
            </header>
          </div>
          <div className="container px-4 py-5" id="hanging-icons">
            {/* <h2 class="pb-2 border-bottom">Hanging icons</h2> */}
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
              {/* Bill */}
              {apiData && 
                apiData.map((record, index) => (
                    <Col id={`bill_${record.id}`} className={`col d-flex align-items-start bill ${isSubmitted && isSubmittedId === record.id ? "submitted" : ""}`} key={index}>
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="fs-2 text-body-emphasis">
                        <Link to={`paybill/${record.id}`}>{record.title}</Link>
                      </h3>
                      <p>{record.post}</p>
                      {/* <form onSubmit={handleSubmit(data => saveForm(data, record.id))} >
                        <Col xs="12" className="py-3">
                          <label>Image</label>
                          <input
                            type="file"
                            className={`${errors.image && "error"}`}
                            placeholder="Please enter content"
                            {...register("image")}
                          />
                        </Col>
                        <Col>
                          <button type="submit">Save</button>
                        </Col>
                      </form> */}
                      <div className="col-md-3 text-end">
                        <Link to={`/add_bill/${record.id}`}>
                          <button type="button" className="btn btn-outline-primary me-2" >Add Bill</button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
            </div>
          </div>
          </div>
        </hometest>
      </body>
    );
}

export default Home;
