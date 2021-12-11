import Button from "components/Button";
import styled from "styled-components";

export const Container = styled.section`
  border: 1px solid rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImageBox = styled.div`
  position: relative;
  margin-right: 10px;
`;

export const AvatarImage = styled.img`
  width: 100px;
  border-radius: 8px;
`;

export const NameText = styled.h4``;

export const BioText = styled.p`
  font-weight: 300;
  color: rgb(119, 119, 119);
  font-size: 14px;
  margin: 10px 0;
`;

type IndicatorProps = {
  color: string;
};
export const Indicator = styled.div<IndicatorProps>`
  background-color: ${(props) => props.color};
  position: absolute;
  bottom: -3px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 4px;
  border: solid 2px #fff;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CallButton = styled(Button)`
  margin-left: 10px;
`;
