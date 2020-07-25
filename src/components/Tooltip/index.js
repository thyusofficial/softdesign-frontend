import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Tooltip({ title, className, children }) {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  );
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  className: '',
};

export default Tooltip;
