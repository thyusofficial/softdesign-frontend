import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValitaionErrors';

import logoImg from '../../assets/logo.svg';

import { SimpleInput } from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

function SignIn() {
  const formRef = useRef(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data) => {
      formRef.current.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação.',
          description: 'Ocorreu um erro ao fazer login, verifique os dados.',
        });
      }
    },
    [signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="SoftDesign" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Faça seu logon</h2>
          <SimpleInput name="email" placeholder="E-mail" icon={FiMail} />
          <SimpleInput
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
    </Container>
  );
}

export default SignIn;
