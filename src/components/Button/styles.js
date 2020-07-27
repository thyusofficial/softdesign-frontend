import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  width: 100%;
  color: #312e38;
  height: 56px;
  border-radius: 10px;
  border: 0;
  font-weight: 500;
  margin-top: 12px;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
