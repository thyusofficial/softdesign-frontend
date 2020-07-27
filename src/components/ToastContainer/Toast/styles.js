import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)`
  position: relative;

  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + & {
    margin-top: 8px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']};

  > svg {
    align-self: center;
  }

  div {
    flex: 1;
    margin: 0 12px;

    p {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  button {
    border: 0;
    background: transparent;
    align-self: flex-start;
    color: inherit;
  }
`;
