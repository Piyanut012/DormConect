import React from "react";
import { Col, Container, Row, } from "react-bootstrap";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import './Homepage.css';
import Slidebar from '../../components/SildeBar_Dorm';

const Home = () => {
    const [apiData, setApiData] = useState(false);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const location = useLocation()

    useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/news/" + params.id;
        const response = await axios.get(apiUrl);

        if (response.status === 200){
          setApiData(response?.data);
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
          <homepage>
            <div className="py-4">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <home>
            <div className="container">
              <Col className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                  <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <svg className="bi" width={40} height={32} role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
                  </a>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="#" className="nav-link px-2">DormConnect</a></li>
                </ul>
                {/* <div className="col-md-3 text-end">
                  <Link to={`/add_news_admin/${params.id}`}>
                    <button type="button" className="btn btn-outline-primary me-2" >Add News</button>
                  </Link>
                </div> */}
              </Col>
            </div>

            {/* New */}
            {/* {apiData &&
                apiData.map((news, index) => (
            <Col className="container col-xxl-8 px-4 py-5">
              <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                  <img src={`${process.env.REACT_APP_API_ROOT}/${news.image}`} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width={700} height={500} loading="lazy" />
                </div>
                <div className="col-lg-6">
                  <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3"> {news.title}</h1> 
                  <p className="lead">{news.description}</p>                            
                </div>
              </div>
            </Col>
            ))} */}

            {/* New */}
            {apiData &&
                apiData.map((news, index) => (
            <MDBContainer className="py-5">
              <MDBRow className="gx-5 g-5 py-5">
                <MDBCol md="6" className="mb-4">
                  <MDBRipple
                    className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
                    rippleTag="div"
                    rippleColor="light"
                  >
                    <img
                      src={`${process.env.REACT_APP_API_ROOT}/${news.image}`}
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6" className="mb-4">
                  <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">
                    News of the day
                  </span>
                  <h4>
                    <strong>{news.title}</strong>
                  </h4>
                  <p className="text-muted">
                    {news.description}
                  </p>
                  <MDBBtn>Read More</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            ))}
            </home>
          </div>
        </homepage>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
    );
}

export default Home;