import React from "react";
import { Col, Container, Row, } from "react-bootstrap";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate,  useParams} from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import "./Signup.css";

const Signup = () => {
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

    data.building_id = parseInt(data.building_id, 10);

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/apply/" + params.id;
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log(response);
        navigate("/", {
          state: "Saved successfully",
        });
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
          <signup>
            <div className="py-4">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" /> */}
              <main className="form-signin w-100 m-auto">

                <form onSubmit={handleSubmit(saveForm)}>
                  <h1 className="h3 mb-3= fw-normal">DormConncect</h1>

                  <select type="building_id" 
                  className={`${errors.building_id && "error"} form-select`}aria-label="Default select example"
                  {...register("building_id", {
                    required: { value: true, message: "Title is required." },
                  })}
                  >
                    <option value={0} disabled selected>เลือกอาคาร</option>
                    <option value={1}>1 (พัดลมชาย)</option>
                    <option value={2}>2 (พัดลมหญิง)</option>
                    <option value={3}>3 (แอร์ชาย)</option>
                    <option value={4}>4 (แอร์หญิง)</option>
                    <option value={5}>5 (แอร์ต่างชาติ)</option>
                  </select>

                  <select type="Income" 
                  className={`${errors.income && "error"} form-select`}aria-label="Default select example"
                  {...register("income", {
                    required: { value: true, message: "Title is required." },
                  })}
                  >
                    <option value="" disabled selected>ช่วงรายได้ครอบครัวต่อปี</option>
                    <option value="0-150,000">0-150,000</option>
                    <option value="150,001-250,000">150,001-250,000</option>
                    <option value="250,001-360,000">250,001-360,000</option>
                    <option value="360,000 ขึ้นไป">360,000 ขึ้นไป</option>
                  </select>

                  <select type="Distance" 
                  className={`${errors.distance && "error"} form-select`}aria-label="Default select example"
                  {...register("distance", {
                    required: { value: true, message: "Title is required." },
                  })}
                  >
                    <option value="" disabled selected>ระยะทางจากบ้านถึงสถาบัน</option>
                    <option value="0-50">0-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-150">101-150</option>
                    <option value="150+">150 ขึ้นไป</option>
                  </select>

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
                    <label htmlFor="floatingTextarea2">เหตุผลและความจำเป็นในการเข้าพัก</label>
                  </div>

                  <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      ข้าพเจ้าขอรับรองว่า ข้อความข้างต้นเป็นความจริงทุกประการ หากปรากฎเป็นความเท็จข้าพเจ้าขอรับผิดตามกฏระเบียบสถาบัน
                    </label>
                  </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sing Up</button>
                </form>

              </main>
          </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
        </signup>
      </body>
    );
}

export default Signup;