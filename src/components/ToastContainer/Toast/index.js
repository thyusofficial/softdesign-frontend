import React, { useEffect } from 'react';

import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { useToast } from '../../../context/ToastContext';
import { Container } from './styles';

const icons = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  error: <FiXCircle />,
};

function Toast({ message, style }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container type={message.type} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle />
      </button>
    </Container>
  );
}

export default Toast;
