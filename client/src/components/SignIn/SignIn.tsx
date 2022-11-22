import {FormikHelpers, useFormik} from 'formik';
import {Link} from 'react-router-dom';
import {Wrapper, Title, Label, Input, Error, Button, Text} from '../../common/FormParts';
import {Transition} from 'react-transition-group';
import useTransitionError from '../../hooks/transitionError';

interface IValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values: IValues, {setSubmitting}: FormikHelpers<IValues>) => {
      console.log(values);
    },
    validate: values => {
      let errors = {} as IValues;

      if (!values.username) {
        errors.username = 'Это обязательное поле';
      } else if (values.username.length < 5) {
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

  return (
    <Wrapper>
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
        <Button type="submit">вход</Button>
      </form>
      <Text>Еще нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link></Text>
    </Wrapper>
  );
};

export default SignIn;