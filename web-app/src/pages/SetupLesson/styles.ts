import styled, { css } from "styled-components";

const videoSize = css`
  width: 300px;
  height: 300px;
`;

export const VideoLessonContainer = styled.div`
  position: relative;
`;

export const VideoOffOverlay = styled.div`
  position: absolute;
  top: 0;
  background-color: #000;
  ${videoSize}
`;

export const Video = styled.video`
  ${videoSize}
`;

export const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 30px;
`;

export const VideoControlButton = styled.button``;
