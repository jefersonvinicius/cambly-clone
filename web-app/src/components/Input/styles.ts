import styled from 'styled-components';
import { Colors } from '../../config/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #999;
  border-radius: 5px;
  position: relative;

  & > label {
    position: absolute;
    top: -5px;
    left: 10px;
    font-size: 10px;
    color: #999;
    background-color: #fff;
    padding: 0 3px;
  }

  & > input {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline-color: ${Colors.Primary};
  }
`;
