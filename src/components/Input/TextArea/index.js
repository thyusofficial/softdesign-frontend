import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

function TextArea({ name, disabled, rest }) {
  const textAreaRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <textarea
        defaultValue={defaultValue}
        ref={textAreaRef}
        name={name}
        disabled={disabled}
        {...rest}
      />
    </Container>
  );
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

TextArea.defaultProps = {
  disabled: false,
};

export default TextArea;
