import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { loginAction } from '../actions/loginAction'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40vh;
`;

const StyledButton = styled.button`
  background-color: #005a87;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1% 0%;
  transition-duration: 0.8s;
  &:hover {
    background-color: #4caf50;
    color: white;
  }
`;

const SigninForm = (props) => {
  const { values, /*submit,*/ inputChange } = props;
  const history = useHistory();

  useEffect(() => {
    if (props.userId) {
      history.push(`/dashboard/${props.userId}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId])


  const onSubmit = async (evt) => {
    evt.preventDefault();
    // submit();
    const newInputObject = {
      username: values.username,
      password: values.password,
    };
    props.loginAction(newInputObject);
  };

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <StyledDiv>
        <h2>Sign in</h2>
        <div className="form-group">
          <label>
            <input
              value={values.username}
              onChange={onInputChange}
              type="text"
              name="username"
              placeholder="username"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              value={values.password}
              onChange={onInputChange}
              type="password"
              name="password"
              placeholder="password"
            />
          </label>
        </div>
        <StyledButton>Login</StyledButton>
      </StyledDiv>
    </form>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps, { loginAction })(SigninForm);
