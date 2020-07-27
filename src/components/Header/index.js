import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { FiPower, FiPlusCircle, FiBookOpen, FiSave, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValitaionErrors';
import { SimpleInput, TextArea } from '../Input';
import Button from '../Button';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Container, HeaderContent, Profile, AddBookModal } from './styles';
import api from '../../services/api';

function Header({ updateBooks }) {
  const { signOut, user } = useAuth();
  const [bookFormIsOpen, setBookFormIsOpen] = useState(false);
  const formRef = useRef(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data) => {
      formRef.current.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O Título é obrigatório.'),
          description: Yup.string().required('A descrição é obrigatória.'),
          price: Yup.number().required(),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/books', {
          name: data.name,
          description: data.description,
          price: data.price,
        });
        setBookFormIsOpen(false);
        updateBooks();
        addToast({
          type: 'success',
          title: 'Cadastro feito com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description:
            'Ocorreu um erro ao cadastrar, verifique as informações.',
        });
      }
    },
    [addToast, updateBooks]
  );

  return (
    <Container>
      <HeaderContent>
        <img src={logoImg} alt="SoftDesign" />

        <Profile>
          <img
            src="https://api.adorable.io/avatars/285/abott@adorable.png"
            alt="Avatar "
          />

          <div>
            <span>Bem vindo</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>

        <button type="button" onClick={() => setBookFormIsOpen(true)}>
          <FiPlusCircle />
        </button>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
        {bookFormIsOpen && (
          <AddBookModal>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <button type="button" onClick={() => setBookFormIsOpen(false)}>
                <FiX />
              </button>
              <SimpleInput name="name" placeholder="Título" icon={FiBookOpen} />

              <SimpleInput
                name="price"
                type="text"
                placeholder="Preço"
                icon={FiBookOpen}
              />

              <TextArea name="description" />

              <Button type="submit" onClick={() => formRef.current.submitForm}>
                Cadastrar <FiSave />
              </Button>
            </Form>
          </AddBookModal>
        )}
      </HeaderContent>
    </Container>
  );
}

Header.propTypes = {
  updateBooks: PropTypes.func,
};

Header.defaultProps = {
  updateBooks: () => {},
};

export default Header;
