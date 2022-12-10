import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {Wrapper, Title, Label, Input, Error, Button, Text} from '../../common/FormParts';
import useTransitionError from '../../hooks/useTransitionError';
import {Transition} from 'react-transition-group';
import {useMutation} from '@apollo/client';
import {ServerError} from '../../common/FormParts/FormParts';
import React from 'react';
import SIGN_UP from '../../apollo/api/signUp';

interface IProps {
  isAuth: boolean;
  setIsAuth: (bool: boolean) => void;
}

interface IValues {
  username: string;
  password: string;
}

const SignUp: React.FC<IProps> = ({isAuth, setIsAuth}) => {
  const [signUp, {loading, error}] = useMutation(SIGN_UP);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values: IValues) => {
      try {
        const response = await signUp({
          variables: {
            user: {
              username: values.username,
              password: values.password
            }
          },
          fetchPolicy: 'no-cache'
        });
        localStorage.setItem('token', response.data.signUp.access_token);
        setIsAuth(true);
      } catch (e) {}
    },
    validate: values => {
      let errors = {} as IValues;

      if (!values.username) {
        errors.username = 'Это обязательное поле';
      } else if (values.username.length < 4) {
        errors.username = 'Логин должен содержать не менее 4 символов';
      } else if (values.username.length > 12) {
        errors.username = 'Логин должен содержать не более 10 символов';
      }

      if (!values.password) {
        errors.password = 'Это обязательное поле';
      }

      return errors;
    }
  });

  const [usernameError, usernameHasError] = useTransitionError(formik.errors.username, formik.touched.username);
  const [passwordError, passwordHasError] = useTransitionError(formik.errors.password, formik.touched.password);

  if (isAuth) return <Navigate to="/" replace />;
  return (
    <Wrapper>
      <ServerError>{error?.message}</ServerError>
      <Title>Регистрация</Title>
      <form onSubmit={formik.handleSubmit}
            style={{display: 'flex', flexDirection: 'column', maxWidth: '16rem', width: '100%'}}>
        <Label>
          <Input name="username" value={formik.values.username} onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 placeholder="Логин..."
                 type="text"/>
          <Transition in={usernameHasError} timeout={500}>
            {
              (state) => <Error className={state}>{usernameError}</Error>
            }
          </Transition>
        </Label>
        <Label>
          <Input name="password" value={formik.values.password} onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 placeholder="Пароль..."
                 type="password"/>
          <Transition in={passwordHasError} timeout={500}>
            {
              (state) => <Error className={state}>{passwordError}</Error>
            }
          </Transition>
        </Label>
        <Button type="submit" disabled={loading}>регистрация</Button>
      </form>
      <Text>Уже есть аккаунт? <Link to="/sign-in">Войти</Link></Text>
    </Wrapper>
  );
};

export default SignUp;