import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { login, register } from "../services/api";
import { Link } from "react-router-dom";
import "./css/Login.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    variant: "",
    value: false,
  });

  const { login: loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(username, password, role);
        setAlert({
          message: "Registration successful",
          variant: "success",
          value: true,
        });
      } else {
        const { data } = await login(username, password);
        loginUser(data);
        setAlert({
          message: "Login successful",
          variant: "success",
          value: true,
        });
      }
    } catch (error) {
      setAlert({
        message: error.response?.data || "An error occurred",
        variant: "danger",
        value: true,
      });
    }
    setLoading(false);
  };

  return (
    <div className="login-box">
      <Container className="LoginContainer">
        {alert.value && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ value: false })}
            dismissible
          >
            <Alert.Heading>{alert.message}</Alert.Heading>
          </Alert>
        )}
        <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>
          {isRegister && (
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row className="text-end mb-3">
            <Col>
              {!isRegister && (
                <span>
                  <Link to="/Forgotpassword">Forgot Password?</Link>
                </span>
              )}
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button type="submit" className="btn btn-primary btn-block">
                  {isRegister ? "Register" : "Login"}
                </Button>
              )}
            </Col>
          </Row>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
            Switch to {isRegister ? "Login" : "Register"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
