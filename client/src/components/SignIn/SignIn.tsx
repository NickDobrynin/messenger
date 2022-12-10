import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {Wrapper, Title, Label, Input, Error, Button, Text} from '../../common/FormParts';
import {Transition} from 'react-transition-group';
import useTransitionError from '../../hooks/useTransitionError';
import {useMutation} from '@apollo/client';
import {ServerError} from '../../common/FormParts/FormParts';
import React from 'react';
import SIGN_IN from '../../apollo/api/signIn';

interface IProps {
  isAuth: boolean;
  setIsAuth: (bool: boolean) => void;
}

interface IValues {
  username: string;
  password: string;
}

const SignIn: React.FC<IProps> = ({isAuth, setIsAuth}) => {
  const [signIn, {loading, error}] = useMutation(SIGN_IN);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values: IValues) => {
      try {
        const response = await signIn({
          variables: {
            user: {
              username: values.username,
              password: values.password
            }
          },
          fetchPolicy: 'no-cache'
        });

        localStorage.setItem('token', response.data.signIn.access_token);
        setIsAuth(true);
      } catch (e) {}
    },
    validate: values => {
      let errors = {} as IValues;

      if (!values.username) {
        errors.username = 'Это обязательное поле';
      } else if (values.username.length < 4) {
        errors.username = 'Логин должен содержать не менее 4 символов';
      } else if (values.username.length > 10) {
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
      <Title>Вход</Title>
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
        <Button type="submit" disabled={loading}>вход</Button>
      </form>
      <Text>Еще нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link></Text>
    </Wrapper>
  );
};

export default SignIn;