import React, { useState, useContext } from "react";
import { useNavigate, Link} from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { login, register } from "../services/api";
import { decodeToken } from '../utils/jwtDecode'; // Import the decodeToken function
import "./css/Login.css"
import "bootstrap/dist/css/bootstrap.min.css";


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
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        // Register flow
        await register(username, password, role);
        setAlert({
          message: "Registration successful",
          variant: "success",
          value: true,
        });
      } else {
        // Login flow
        const { data } = await login(username, password);

        // Decode the token to extract the user data
        const token = data.token;
        const user = decodeToken(token); // Decode the JWT to extract user information

        if (!user) {
          throw new Error("Failed to decode token");
        }

        // Pass the user information to the AuthContext
        loginUser(user, token);
        // console.log(user);
        localStorage.setItem('token', token); // Store the token

        // Redirect based on user role
        if (user.role === "instructor") {
          navigate("/instructor-dashboard");
        } else if (user.role === "student") {
          navigate("/classes");
        }

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
        <h2 className="text-center ">{isRegister ? "Register" : "Login"}</h2>
        <Form onSubmit={handleSubmit}>
          {/* <Row className="mb-2"> */}
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
          {/* </Row> */}
          {/* <Row className=""> */}
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
          {/* </Row> */}
          {isRegister && (
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
                    {/* <option value="admin">Admin</option> */}
                  </Form.Control>
                </Form.Group>
              </Col>
          )}
          {/* <Row className="text-end mb-3"> */}
            <Col>
              {!isRegister && (
                <span>
                  <Link to="/Forgotpassword">Forgot Password?</Link>
                </span>
              )}
            </Col>
          {/* </Row> */}
          {/* <Row> */}
            <Col className="mb-2 register-btn">
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button type="submit" className="btn btn-primary btn-block">
                  {isRegister ? "Register" : "Login"}
                </Button>
              )}
            </Col>
        <div className="mt-3 text-center switchbtn">
          <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
            Switch to {isRegister ? "Login" : "Register"}
          </Button>
        </div>

          {/* </Row> */}
        </Form>
      </Container>
    </div>
  );
};

export default Auth;
