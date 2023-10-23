import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    // console.log(data);

    data.file = data.image[0];
    data.image = null;

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.status === 201) {
        console.log(response);
        navigate("/");
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
    <>
      <Container>
        <h1>Add a New Post</h1>
        <form onSubmit={handleSubmit(saveForm)}>
          <Row>
            <Col xs="12" className="py-3">

              {/* <label>Post Title</label>
              <input
                defaultValue=""
                className={`${errors.title && "error"}`}
                placeholder="Please enter title"
                {...register("title", {
                  required: { value: true, message: "Title is required." },
                  min: {
                    value: 3,
                    message: "Title should be minimum 3 characters.",
                  },
                })}
              />
              {errors.title && (
                <div className="error">{errors.title.message}</div>
              )} */}

              <label>Select an option</label>
              <select
                className={`${errors.title && "error"}`}
                {...register("title", {
                  required: { value: true, message: "Title is required." },
                })}
              >
                <option value="" disabled selected>
                  Please select an option
                </option>
                <option value="0-150,000">0-150,000</option>
                <option value="150,001-250,000">150,001-250,000</option>
                <option value="250,001-360,000">250,001-360,000</option>
                <option value="360,000 ขึ้นไป">360,000 ขึ้นไป</option>
              </select>
              {errors.title && (
                <div className="error">{errors.title.message}</div>
              )}

            </Col>
            <Col xs="12" className="py-3">
              <label>Post Content</label>
              <input
                defaultValue=""
                className={`${errors.post && "error"}`}
                placeholder="Please enter content"
                {...register("post", {
                  required: {
                    value: true,
                    message: "Post Content is required.",
                  },
                })}
              />
              {errors.post && (
                <div className="error">{errors.post.message}</div>
              )}
            </Col>
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
          </Row>
        </form>
      </Container>
    </>
  );
};

export default Add;
