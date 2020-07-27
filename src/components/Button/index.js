import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Button({ children, type, action, rest }) {
  return (
    <Container type={type} onClick={action} {...rest}>
      {children}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  type: PropTypes.string,
  action: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  action: () => {},
};

export default Button;
