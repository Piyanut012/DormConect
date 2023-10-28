import React from "react";
import { Col, Container, Row, } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "./checkinfo.css";
import Slidebar from '../../components/SildeBar_Admin';


const Checkinfo = () => {
    const [apiData, setApiData] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const params = useParams();

    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/admin/applications/" + params.id;
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
    formState: { errors },
  } = useForm();

  const saveForm = async (data, student_id, status) => {
    setLoading(true);
    console.log(student_id);

    const statusValue = status === "ACCEPTED" ? "ACCEPTED" : "REJECTED";

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/admin/applications/filter/" + student_id;
      const response = await axios.put(apiUrl, { ...data, status: statusValue });

      if (response.status === 200) {
        console.log(response);
        fetchData();
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
        <checkinfo>
          <div className="py-4">
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
        <div className="container px-4 py-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>รายได้</th>
                <th>ระยะทางจากบ้านมาสถาบัน</th>
                <th>เหตุผลและความจำเป็น</th>
                <th className="action"></th>
              </tr>
            </thead>
            <tbody>
              {apiData && Array.isArray(apiData) && apiData.map((applys, index) => (
                <tr key={index}>
                  <td>{applys.student_id}</td>
                  <td>{applys.income}</td>
                  <td>{applys.distance}</td>
                  <td>{applys.reason}</td>
                  <td>
                  <div className="button-container">
                  <form onSubmit={handleSubmit(data => saveForm(data, applys.student_id, "ACCEPTED"))}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        ผ่าน
                      </button>
                    </div>
                  </form>
                  <form onSubmit={handleSubmit(data => saveForm(data, applys.student_id, "REJECTED"))}>
                    <div className="form-group mr-2">
                      <button type="submit" className="btn btn-primary">
                        ไม่ผ่าน
                      </button>
                    </div>
                  </form>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          </div>
        </checkinfo>
      </body>
    );
}

export default Checkinfo;
