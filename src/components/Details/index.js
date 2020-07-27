import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef } from 'react';
import { FiTrash2, FiInfo, FiBookOpen, FiX, FiSave } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../Button';
import { SimpleInput, TextArea } from '../Input';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValitaionErrors';
import { Container, Content } from './styles';

function Details({ data, updateBooks }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const formRef = useRef(null);
  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/books/${data.id}`);
      updateBooks();
      addToast({
        type: 'success',
        title: 'Livro deletado com sucesso!',
      });
    } catch (error) {}
  }, [addToast, data.id, updateBooks]);

  const handleSubmit = useCallback(
    async (updateData) => {
      formRef.current.setErrors({});

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O Título é obrigatório.'),
          description: Yup.string().required('A descrição é obrigatória.'),
          price: Yup.number().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put(`/books/${data.id}`, {
          name: updateData.name,
          description: updateData.description,
          price: updateData.price,
        });

        setDetailsOpen(false);
        updateBooks();
        addToast({
          type: 'success',
          title: 'Livro editado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na edição.',
          description: 'Ocorreu um erro ao editar, verifique as informações.',
        });
      }
    },
    [addToast, data, updateBooks]
  );

  return (
    <Container>
      <button type="button" onClick={() => setDetailsOpen(true)}>
        <FiInfo />
      </button>
      {detailsOpen && (
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: data.name,
              price: data.price,
              description: data.description,
            }}
            onSubmit={handleSubmit}
          >
            <button type="button" onClick={() => setDetailsOpen(false)}>
              <FiX />
            </button>

            <img src={data.image_url} alt="Book" />

            <SimpleInput
              name="name"
              placeholder="Título"
              icon={FiBookOpen}
              disabled={data.take}
            />

            <SimpleInput
              name="price"
              type="text"
              placeholder="Preço"
              icon={FiBookOpen}
              disabled={data.take}
            />

            <TextArea name="description" disabled={data.take} />

            {!data.take && (
              <>
                <Button type="button" action={handleDelete}>
                  DELETAR
                  <FiTrash2 />
                </Button>
                <Button
                  type="submit"
                  action={() => formRef.current.submitForm()}
                >
                  SALVAR ALTERAÇÕES
                  <FiSave />
                </Button>
              </>
            )}
          </Form>
        </Content>
      )}
    </Container>
  );
}

Details.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    take: PropTypes.bool,
  }),
  updateBooks: PropTypes.func,
};

Details.defaultProps = {
  data: {
    description: '',
    id: null,
    image_url: '',
    name: '',
    price: '',
    take: false,
  },
  updateBooks: PropTypes.func,
};

export default Details;
