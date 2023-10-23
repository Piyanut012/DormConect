import React from "react";
import { Col, Container, Row, } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "./Room_info.css";
import Slidebar from '../../components/SildeBar_Dorm';

const Home = () => {
    const [apiData, setApiData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddBillModal, setShowAddBillModal] = useState(false);
    const params = useParams();
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image

    const location = useLocation();

    const openAddBillModal = () => {
      setShowAddBillModal(true);
    };

    const closeAddBillModal = () => {
      setShowAddBillModal(false);
      reset();
    };

    const fetchData = async () => {
      try {
        console.log(params.id);
        const apiUrl = process.env.REACT_APP_API_ROOT + "/bills_room/" + params.roomid;
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

    //2.form handling and saving
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //add bill
  const saveForm = async (data) => {
    setLoading(true);

    data.water = parseInt(data.water, 10);
    data.electricity = parseInt(data.electricity, 10);
    data.room = parseInt(data.room, 10);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/addbill/" + params.roomid;
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log(response);
        closeAddBillModal();
        reset();
        fetchData();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  //Check bill
  const checkbill = async (bill_id) => {
    setLoading(true);
    console.log(bill_id);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/updatebill/" + bill_id;
      const response = await axios.put(apiUrl);

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
        <roominfo>
          <div className="py-4 setz">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
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
                <li><a href="#" className="nav-link px-2">ห้อง {params.roomid}</a></li>
              </ul>
              <div className="col-md-3 text-end option">
                {/* <Link to={`/rooms_dorm/${params.id}/room_info/${params.roomid}/add_bill`}> */}
                  <button type="button" class="btn btn-outline-primary btn-option me-2" onClick={openAddBillModal} >เพิ่มบิล</button>
                {/* </Link> */}
                <button type="button" class="btn btn-outline-primary btn-option me-2">Sign-up</button>
              </div>
            </header>
          </div>
            <div className="container px-4 py-5" id="hanging-icons">
              <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                {/* reports */}
                {apiData && Array.isArray(apiData) &&
                  apiData.map((bills, index) => {
                  if (bills.status !== "PAID") {
                    return (
                      <Col
                        id={`report_${bills.bill_id}`}
                        className={`col d-flex align-items-start report ${bills.status === 'UNPAID' ? 'status-unpaid' : bills.status === 'VERIFYING' ? 'status-verifying' : bills.status === 'PAID' ? 'status-paid' : ''}`}
                        key={index}
                      >
                        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-receipt seticon" viewBox="0 0 16 16">
                          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        </div>
                        <Col>
                          <h3 className="fs-2 text-body-emphasis">ยอดรวม</h3>
                          <p>{bills.water + bills.electricity + bills.room}</p>
                          <Col xs="12" className="py-3">
                            <label className="setx">ใบเสร็จ</label>
                            <img src={`${process.env.REACT_APP_API_ROOT}/${bills.receipt}`} className="d-block mx-lg-auto" alt="None" width={50} height={75} loading="lazy"
                            onClick={() => setSelectedImage(`${process.env.REACT_APP_API_ROOT}/${bills.receipt}`)} // Open image in modal
                            style={{ cursor: "pointer" }}
                            />

                            {bills.status === 'VERIFYING' && (
                              <form onSubmit={(e) => { e.preventDefault(); checkbill(bills.bill_id); }}>
                                <Col className="col-md-3 text-end">
                                  <button type="submit" className="btn btn-outline-primary me-2" >ถูกต้อง</button>
                                </Col>
                              </form>
                            )}

                          </Col>
                        </Col>
                      </Col>
                    );
                  }
                  return null;
                }) 
              }
              </div>
            </div>
          </div>
          {/* Modal for displaying the image in full screen */}
          {selectedImage && (
          <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} size="lg">
          <Modal.Body>
            <img
              src={selectedImage}
              alt="Bill Receipt"
              className="img-fluid sizex"
            />
          </Modal.Body>
        </Modal>
        )}
        {/* Inside the modal */}
        <Modal show={showAddBillModal} onHide={closeAddBillModal}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มบิล</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <modell>
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(saveForm)}>
            <Col className="form-floating">
              <input
                defaultValue=""
                type="number"
                className={`${errors.water && "error"} form-control setinput`}
                {...register("water", {
                  required: { value: true, message: "Title is required." },
                })}
              />
              <label htmlFor="floatingInput">น้ำ</label>
            </Col>
            <Col className="form-floating">
              <input
                defaultValue=""
                type="number"
                className={`${errors.electricity && "error"} form-control setinput`}
                {...register("electricity", {
                  required: { value: true, message: "Title is required." },
                })}
              />
              <label htmlFor="floatingInput">ไฟ</label>
            </Col>
            <Col className="form-floating">
              <input
                defaultValue=""
                type="number"
                className={`${errors.room && "error"} form-control setinput`}
                {...register("room", {
                  required: { value: true, message: "Title is required." },
                })}
              />
              <label htmlFor="floatingInput">ห้อง</label>
            </Col>
              <button type="submit" className="btn btn-primary w-100 py-2 setbutton">Add</button>
              <button type="button" className="btn btn-primary w-100 py-2 setbutton" onClick={closeAddBillModal}>Cancel</button>
            </form>
            </main>
            </modell>
          </Modal.Body>
        </Modal>
        </roominfo>
      </body>
    );
}

export default Home;
