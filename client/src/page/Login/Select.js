import axios from 'axios';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { Link, useLocation } from "react-router-dom";

import "./Select.css";
import logoStu from './1.png';
import logoSta from './2.jpg';

const Home = () => {

    const params = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try{
            const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
            const response = await axios.delete(apiUrl);

            if (response.status === 200){
                navigate("/", {
                    state: "Recoed deleted successfully.",
                })
            }

        }catch (error) {
            console.log(error)
        }

        console.log("Inside handledelete");
    };

  return (
    <body>
      <selec>
        <div className="py-4">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous" />
        <main className="form-signin w-100 m-auto">
          <form>
            <h1 className="h3 mb-3= fw-normal">DormConncect</h1>
            <Link to={`/login_stu`}>
              <button type="button" className="btn btn-outline-primary me-2"> 
                <img src={logoStu} className="image"  width={100} height={100} loading="lazy" />
                Student
              </button>
            </Link>
            <Link to={`/login_emp`}>
              <button type="button" className="btn btn-outline-primary me-2"> 
              <img src={logoSta} className="image"  width={100} height={100} loading="lazy" />
                Staff
              </button>
            </Link>
          </form>
        </main>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"  crossorigin="anonymous"></script>
      </selec>
    </body>
  )
}

export default Home;
