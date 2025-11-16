import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/authSlice';
import LoginImg from '../assets/login-img.jpg';
import SocialMediaGroup from "./SocialMediaGroup1";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState("");
  const [keepMeSigned, setKeepMeSigned] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) return setError("Email is required");

    if (!/\S+@\S+\.\S{2,}/.test(formData.email) && formData.email.includes('@'))
      return setError("Enter a valid email address");

    if (!PASSWORD_REGEX.test(formData.password))
      return setError(
        "Password must be minimum 8 characters long (consist of atleast 1 capital letter, 1 number & 1 symbol) "
      );

    setError("");
    if (keepMeSigned)
      dispatch(
        login({ username: formData.email, password: formData.password })
      );
    navigate("/home");
  };

  return (
    <Container className='login-wrapper'>
      <div className='login-box'>
        <h2 className='login-title'>Sign In</h2>

        <p className='login-subtitle'>
          New user?{' '}
          <a href='#' className='create-link'>
            Create an account
          </a>
        </p>

        {error && <div className='error-msg'>{error}</div>}

        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              name='email'
              placeholder='Username or email'
              className='login-input'
              value={formData.email || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              className='login-input'
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <div className='checkbox-row'>
            <Form.Check
              type='checkbox'
              className='custom-checkbox'
              checked={keepMeSigned}
              onChange={() => setKeepMeSigned(!keepMeSigned)}
            />
            <span className='checkbox-text'>Keep me signed in</span>
          </div>

          <Button type='submit' className='signin-btn'>
            Sign In
          </Button>
        </Form>

        <div className='divider-section'>
          <div className='line'></div>
          <span className='or-text'>Or Sign In With</span>
          <div className='line'></div>
        </div>

        <SocialMediaGroup />
      </div>
      <div className='login-img-container'>
        <img src={LoginImg} alt='' />
      </div>
    </Container>
  );
}

export default Login;
