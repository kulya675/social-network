import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'antd';
import styled from 'styled-components';
import jm from '../../common/JM.svg';
import sn from '../../common/SN.svg';
import logo from '../../common/logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    margin-left: 50px;
    margin-top: 30px;
  }
  min-height: 79vh;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fff;
`;

const Main = styled.div`
  background: url(${jm}), url(${sn});
  background-repeat: no-repeat, no-repeat;
  background-position: top, bottom;
  min-height: 79vh;
  min-width: 500px;
  margin: 30px auto 0;
`;

const FormArea = styled.form`
  margin: 100px 0;
  border-radius: 15px;
  background: #111111;
  padding: 76px 75px 80px 72px;
`;

const InputsArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 181px;
`;

const SearchInpit = styled(Input)`
  background-color: rgba(0, 125, 215, 0);
  width: 360px;
  margin: 15px 20px;
  padding-bottom: 5px;
  border: none;
  border-bottom: 1px solid #ffb11b;
  outline: none;
  color: aliceblue;
  font-size: 14px;
  line-height: 17px;
  &:not(:first-child) {
    margin-top: 33px;
  }
`;

const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonSingInUpTxt = styled.button`
  background-color: rgba(0, 125, 215, 0);
  padding: 0;
  border: none;
  border-bottom: ${(props) => (props.selected ? '2px solid #FFB11B' : 'none')};

  box-shadow: none;
  p {
    color: white;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  &:hover {
    cursor: pointer;
  }
`;

// eslint-disable-next-line no-unused-vars
const ButtonLeft = styled.button`
  background-color: rgba(0, 125, 215, 0);
  border: none;
  border-bottom: ${(props) => (props.selected ? '2px solid #FFB11B' : 'none')};
  box-shadow: none;
  margin-right: 35px;
  padding-bottom: 2px;
  p {
    color: white;
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const SubmitArea = styled.div`
  margin-top: 66px;
  display: flex;
  justify-content: center;

  a {
    font-size: 14px;
    letter-spacing: 0.05em;
    color: #959595;
    align-self: flex-start;
    margin-left: 35px;
    text-decoration: none;
  }
  button {
    background-color: #ffb11b;
    border: none;
    max-width: 351px;
    width: 100%;
    height: 60px;
    border-radius: 4px;
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.05em;
    }
  }
`;

const ForgetPasswordArea = styled.div`
  margin-top: 28px;
`;

const TxtLink = styled.a`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.05em;
  color: #959595;
  text-decoration: none;
`;

const Login = () => {
  const [value, setValue] = useState(true);
  const [border, setBorder] = useState({
    first: true,
    second: false,
  });

  const regForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      activeName: 'Active',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Введите не менее 3 символов')
        .max(15, 'Имя не должно превышать 15 символов')
        .required('Заполните поле!'),
      lastName: Yup.string()
        .min(3, 'Введите не менее 3 символов')
        .max(20, 'Фамилия не должна превышать 20 символов')
        .required('Заполните поле!'),
      email: Yup.string().email('Не валидный email').required('Заполните поле!'),
      password: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Заполните поле!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Заполните поле!'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const selectRegistration = () => {
    setBorder({
      first: false,
      second: true,
    });
    setValue(false);
  };
  const selectLogin = () => {
    setBorder({
      first: true,
      second: false,
    });
    setValue(true);
  };
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <Main>
        {value === true && (
          <FormArea>
            <ButtonsArea>
              <ButtonSingInUpTxt selected={border.first} onClick={() => selectLogin()}>
                <p>Вход</p>
              </ButtonSingInUpTxt>
              <ButtonSingInUpTxt selected={border.second} onClick={() => selectRegistration()}>
                <p>Регистрация</p>
              </ButtonSingInUpTxt>
            </ButtonsArea>
            <InputsArea>
              <SearchInpit
                id="email"
                name="email"
                placeholder="Введите ваш e-mail"
                nostyle="false"
              />
              <SearchInpit
                id="password"
                name="password"
                placeholder="Введите ваш пароль"
                nostyle="true"
              />
            </InputsArea>
            <SubmitArea>
              <button type="button">
                <p>ВОЙТИ</p>
              </button>
            </SubmitArea>
            <ForgetPasswordArea>
              <TxtLink href="/">Забыли пароль?</TxtLink>
            </ForgetPasswordArea>
          </FormArea>
        )}

        {value === false && (
          <FormArea onSubmit={regForm.handleSubmit}>
            <ButtonsArea>
              <ButtonSingInUpTxt selected={border.first} onClick={() => selectLogin()}>
                <p>Вход</p>
              </ButtonSingInUpTxt>
              <ButtonSingInUpTxt selected={border.second} onClick={() => selectRegistration()}>
                <p>Регистрация</p>
              </ButtonSingInUpTxt>
            </ButtonsArea>
            <InputsArea>
              <SearchInpit
                id="firstName"
                name="firstName"
                placeholder="Введите ваше имя"
                nostyle="false"
                value={regForm.values.firstName}
                onChange={regForm.handleChange}
              />
              {regForm.errors.firstName && regForm.touched.firstName && (
                <p style={{ color: 'red' }}>{regForm.errors.firstName}</p>
              )}
              <SearchInpit
                id="lastName"
                name="lastName"
                placeholder="Введите вашу фамилию"
                nostyle="false"
                value={regForm.values.lastName}
                onChange={regForm.handleChange}
              />
              {regForm.errors.lastName && regForm.touched.lastName && (
                <p style={{ color: 'red' }}>{regForm.errors.lastName}</p>
              )}
              <SearchInpit
                id="email"
                name="email"
                placeholder="Введите ваш e-mail"
                nostyle="true"
                value={regForm.values.email}
                onChange={regForm.handleChange}
              />
              {regForm.errors.email && regForm.touched.email && (
                <p style={{ color: 'red' }}>{regForm.errors.email}</p>
              )}
              <SearchInpit
                type="password"
                id="password"
                name="password"
                placeholder="Придумайте ваш пароль"
                nostyle="false"
                value={regForm.values.password}
                onChange={regForm.handleChange}
              />
              {regForm.errors.password && regForm.touched.password && (
                <p style={{ color: 'red' }}>{regForm.errors.password}</p>
              )}
              <SearchInpit
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Повторите ваш пароль"
                nostyle="true"
                value={regForm.values.confirm_password}
                onChange={regForm.handleChange}
              />
              {regForm.errors.confirm_password && regForm.touched.confirm_password && (
                <p style={{ color: 'red' }}>{regForm.errors.confirm_password}</p>
              )}
            </InputsArea>
            <SubmitArea>
              <button type="submit">
                <p>ЗАРЕГИСТРИРОВАТЬСЯ</p>
              </button>
            </SubmitArea>
          </FormArea>
        )}
      </Main>
    </Wrapper>
  );
};

export default Login;
