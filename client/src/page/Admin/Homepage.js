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
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

import Spinner from "react-bootstrap/Spinner";
import './Homepage.css';
import Slidebar from '../../components/SildeBar_Admin';

const Home = () => {
    const [apiData, setApiData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddStuModal, setShowAddStuModal] = useState(false);

    const params = useParams();
    const location = useLocation()

     const openAddStuModal = () => {
      setShowAddStuModal(true);
    };
    const closeAddStuModal = () => {
      setShowAddStuModal(false);
    };

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

    useEffect(() => {
      fetchData();
    return () => {};
    }, []);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const DeleteNews = async (news_id) => {
      setLoading(true);
      console.log(news_id);
  
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/admin/news/deletenews/" + params.id + "/" + news_id;
        const response = await axios.delete(apiUrl);
  
        if (response.status === 200) {
          console.log(response);
          fetchData();
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    const ResetStatusStu = async () => {
      setLoading(true);
  
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/admin/dormstudents/resetstatus/" + params.id;
        const response = await axios.put(apiUrl);
  
        if (response.status === 200) {
          console.log(response);
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
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
                <div className="col-md-3 text-end">
                  <Link to={`/add_news_admin/${params.id}`}>
                    <button type="button" className="btn btn-outline-primary me-2" >เพิ่มข่าว</button>
                  </Link>
                  <button type="button" className="btn btn-outline-primary me-2" onClick={openAddStuModal} >คืนค่าสถานะ</button>
                </div>
              </Col>
            </div>

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
                  <form onSubmit={(e) => { e.preventDefault(); DeleteNews(news.news_id); }}>
                    <button type="submit" className="btn btn-outline-primary me-2 setmargin"><i className="fa fa-solid fa-trash fa-2x"/></button>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            ))}
            </home>
          </div>

          {/* Inside the modal Add Student */}
        <Modal show={showAddStuModal} onHide={closeAddStuModal}>
          <Modal.Header closeButton>
            <Modal.Title>แน่ใจที่จะคืนค่าสถานะนักศึกษา</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <modell>
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(ResetStatusStu)}>
              <button type="submit" className="btn btn-primary w-100 py-2 setbutton">ใช่</button>
              <button type="button" className="btn btn-primary w-100 py-2 setbutton" onClick={closeAddStuModal}>ไม่</button>
            </form>
            </main>
            </modell>
          </Modal.Body>
        </Modal>

        </homepage>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </body>
    );
}

export default Home;