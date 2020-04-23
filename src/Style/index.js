import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 70px;
  height: 85vh;
`;

export const Panel = styled.div`
  background-color: #2a2e35;
  padding: 10px 30px 30px 30px;
  border-radius: 6px;
  box-shadow: 4px 0 10px -3px #010101;
  color: #fff;
  text-align: center;
  // height: 76vh;
  // position: relative;
`;

export const Button = styled.button`
  background: #f96a1f;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  border-radius: 6px;
  font-weight: 800;
`;

export const Nav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  display: flex;
  width: 100%;
  box-shadow: 4px 0 10px -3px #010101;
  background-color: #2a2e35;
  align-items: center;
  flex-direction: row;
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  text-decoration: none;
  margin: 0 20px;
  &:last-child {
    position: inherit;
    right: 0;
  }
`;

export const Logo = styled.img`
  width: 80px;
  background-color: #fff;
  border-radius: 17px;
  border: 2px solid #f96a1f;
`;
