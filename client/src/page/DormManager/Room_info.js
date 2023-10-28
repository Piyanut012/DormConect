import React from "react";
import { Col, Container, Row, } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "./Room_info.css";
import Slidebar from '../../components/SildeBar_Dorm';

const Room_info = () => {
    const [apiData_Bills, setApiData_Bills] = useState(false);
    const [apiData_Stu, setApiData_Stu] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddBillModal, setShowAddBillModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const [showAddStudentButton, setShowAddStudentButton] = useState(false); // New state for the "Add Student" button
    const [showAddStuModal, setShowAddStuModal] = useState(false);

    const location = useLocation();
    const params = useParams();

    //Bill
    const openAddBillModal = () => {
      setShowAddBillModal(true);
    };
    const closeAddBillModal = () => {
      setShowAddBillModal(false);
      reset();
    };

    //Student
    const openAddStuModal = () => {
      setShowAddStuModal(true);
    };
    const closeAddStuModal = () => {
      setShowAddStuModal(false);
      reset();
    };

    const [billForm, setBillForm] = useState({
      water: "",
      electricity: "",
      room: "",
    });
  
    // Form states and functions for Add Student modal
    const [studentForm, setStudentForm] = useState({
      student_id: "",
    });

    //get Stundent in room
    const fetchData_Stu = async () => {
      try {
        console.log(params.id);
        const apiUrl = process.env.REACT_APP_API_ROOT + "/billing/manager/occupants/" + params.roomid;
        const response = await axios.get(apiUrl);

        if (response.status === 200){
            setApiData_Stu(response?.data);
        }

        setLoading(false);
      }catch (error){
        setLoading(false);
        console.log(error.response);
      }
    };

    //get Bills in room
    const fetchData_Bills = async () => {
      try {
        console.log(params.id);
        const apiUrl = process.env.REACT_APP_API_ROOT + "/bills_room/" + params.roomid;
        const response = await axios.get(apiUrl);

        if (response.status === 200){
            setApiData_Bills(response?.data);
        }

        setLoading(false);
      }catch (error){
        setLoading(false);
        console.log(error.response);
      }
    };
    useEffect(() => {
      fetchData_Stu();
      fetchData_Bills();
    return () => {};
    }, []);

    useEffect(() => {
      // Update the visibility of the "Add Student" button based on apiData_Stu
      setShowAddStudentButton(apiData_Stu.length > 0 && apiData_Stu);
    }, [apiData_Stu]);

    //2.form handling and saving
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Add Bill form submission
  const handleAddBillSubmit = async (e) => {
    setLoading(true);

    // Extract the data from the billForm state
    const data = {
      water: parseInt(billForm.water, 10),
      electricity: parseInt(billForm.electricity, 10),
      room: parseInt(billForm.room, 10),
    };

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/addbill/" + params.roomid;
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        closeAddBillModal();
        resetBillForm(); // Reset the form
        fetchData_Bills();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  // Handle Add Student form submission
  const handleAddStudentSubmit = async (e) => {
    setLoading(true);

    // Extract the data from the studentForm state
    const data = {
      student_id: parseInt(studentForm.student_id, 10),
    };

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/add_student/" + params.roomid;
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        closeAddStuModal();
        resetStudentForm(); // Reset the form
        fetchData_Stu();
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
        fetchData_Bills();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };


  // Reset the Add Bill form
  const resetBillForm = () => {
    setBillForm({
      water: "",
      electricity: "",
      room: "",
    });
  };

  // Reset the Add Student form
  const resetStudentForm = () => {
    setStudentForm({
      student_id: "",
    });
  };

  console.log(apiData_Bills);
  console.log(apiData_Stu);
    
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
          <div className="py-4">
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
                {(!showAddStudentButton || apiData_Stu.length < 2) && (
                  <button type="button" className="btn btn-outline-primary btn-option me-2" onClick={openAddStuModal}>
                    เพิ่มนักศึกษา
                  </button>
                )}
                {showAddStudentButton && (
                  <button type="button" className="btn btn-outline-primary btn-option me-2" onClick={openAddBillModal}>
                    เพิ่มบิล
                  </button>
                )}
              </div>
            </header>
          </div>
          <div className="container px-4 py-5" id="hanging-icons">
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            {/* info_stu */}
                {apiData_Stu && Array.isArray(apiData_Stu) &&
                  apiData_Stu.map((Stu, index) => {
                  if (Stu.year !== 0) {
                    return (
                  <MDBCol lg="6" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                      <MDBRow className="g-0">
                        <MDBCol md="4" className="gradient-custom text-center "
                          style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                          <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                          <MDBTypography tag="h5">{Stu.firstname} {Stu.lastname}</MDBTypography>
                          <MDBCardText>{Stu.student_id}</MDBCardText>
                          <MDBIcon far icon="edit mb-5" />
                        </MDBCol>
                        <MDBCol md="8">
                          <MDBCardBody className="p-4">
                            <MDBTypography tag="h6">Information</MDBTypography>
                            <hr className="mt-0 mb-4" />
                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Email</MDBTypography>
                                <MDBCardText className="text-muted">{Stu.email}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Phone</MDBTypography>
                                <MDBCardText className="text-muted">{Stu.phone}</MDBCardText>
                              </MDBCol>
                            </MDBRow>

                            {/* <MDBTypography tag="h6">Information</MDBTypography> */}
                            <hr className="mt-0 mb-4" />
                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Faculty</MDBTypography>
                                <MDBCardText className="text-muted">{Stu.faculty}</MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Year</MDBTypography>
                                <MDBCardText className="text-muted">{Stu.year}</MDBCardText>
                              </MDBCol>
                            </MDBRow>

                            <div className="d-flex justify-content-start">
                              <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                              <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                              <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                            </div>
                          </MDBCardBody>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                  );
                }
                return null;
                   }) 
                  }
                </div>
                {/* </MDBRow>
              </MDBContainer>
            </section> */}

              <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                {/* bills */}
                {apiData_Bills && Array.isArray(apiData_Bills) &&
                  apiData_Bills.map((bills, index) => {
                    const date = new Date(bills.bill_date);
                    const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(date); // Get the month name
                    if (bills.status !== "PAID") {
                    return (
                      <Col
                        id={`report_${bills.bill_id}`}
                        className={`col d-flex align-items-start report ${bills.status === 'UNPAID' ? 'status-unpaid' 
                        : bills.status === 'VERIFYING' ? 'status-verifying' : bills.status === 'PAID' ? 'status-paid' : ''}`}
                        key={index}
                      >
                        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-receipt seticon" viewBox="0 0 16 16">
                          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        </div>
                        <Col>
                          <h3 className="fs-2 text-body-emphasis">{monthName}</h3>
                          <p>ยอดรวม {bills.water + bills.electricity + bills.room}</p>
                          <Col xs="12" className="py-3">
                            <label className="setx">ใบเสร็จ</label>
                            <img src={`${process.env.REACT_APP_API_ROOT}/${bills.receipt}`} className="d-block mx-lg-auto" 
                            alt="None" width={50} height={75} loading="lazy"
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
        {/* Inside the modal Add bill*/}
        <Modal show={showAddBillModal} onHide={closeAddBillModal}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มบิล</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <modell>
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(handleAddBillSubmit)}>
            <Col className="form-floating">
              <input
                type="number"
                className={`${errors.water && "error"} form-control setinput`}
                value={billForm.water}
                onChange={(e) =>
                  setBillForm({ ...billForm, water: e.target.value })
                }
              />
              <label htmlFor="floatingInput">น้ำ</label>
            </Col>
            <Col className="form-floating">
              <input
                type="number"
                className={`${errors.electricity && "error"} form-control setinput`}
                value={billForm.electricity}
                onChange={(e) =>
                  setBillForm({ ...billForm, electricity: e.target.value })
                }
              />
              <label htmlFor="floatingInput">ไฟ</label>
            </Col>
            <Col className="form-floating">
              <input
                type="number"
                className={`${errors.room && "error"} form-control setinput`}
                value={billForm.room}
                onChange={(e) =>
                  setBillForm({ ...billForm, room: e.target.value })
                }
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
        {/* Inside the modal Add Student */}
        <Modal show={showAddStuModal} onHide={closeAddStuModal}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มนักศึกษา</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <modell>
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(handleAddStudentSubmit)}>
            <Col className="form-floating">
              <input
                type="number"
                className={`${errors.student_id && "error"} form-control setinput`}
                value={studentForm.student_id}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, student_id: e.target.value })
                }
              />
              <label htmlFor="floatingInput">รหัสนักศึกษา</label>
            </Col>
              <button type="submit" className="btn btn-primary w-100 py-2 setbutton">Add</button>
              <button type="button" className="btn btn-primary w-100 py-2 setbutton" onClick={closeAddStuModal}>Cancel</button>
            </form>
            </main>
            </modell>
          </Modal.Body>
        </Modal>
        </roominfo>
      </body>
    );
}

export default Room_info;
