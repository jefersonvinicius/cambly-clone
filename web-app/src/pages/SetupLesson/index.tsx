import Button from "components/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Video,
  VideoControlButton,
  VideoControls,
  VideoLessonContainer,
  VideoOffOverlay,
} from "./styles";
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

function getWebcam() {
  return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
}

function useVideoDevicesAvailable() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices.filter((d) => d.kind === "videoinput"));
    });
  }, []);

  return devices;
}

function useStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    getWebcam().then((result) => {
      setStream(result);
    });
  }, []);

  return stream;
}

function stopTrack(track: MediaStreamTrack) {
  track.stop();
}

export default function SetupLesson() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMicrophoneOff, setIsMicrophoneOff] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const videoDevices = useVideoDevicesAvailable();
  const stream = useStream();

  useEffect(() => {
    if (stream) {
      const video = videoRef.current!;
      video.srcObject = stream;
      video.play();
      setIsReady(true);
    }
  }, [stream]);

  async function handleToggleCameraOff() {
    if (isCameraOff) {
      setIsCameraOff(false);
      console.log(stream?.getTracks);
    } else {
      stream?.getVideoTracks().forEach(stopTrack);
      setIsCameraOff(true);
    }
  }

  function handleToggleAudio() {
    if (isMicrophoneOff) {
      setIsMicrophoneOff(false);
      console.log(stream?.getTracks);
    } else {
      stream?.getAudioTracks().forEach(stopTrack);
      setIsMicrophoneOff(true);
    }
  }

  return (
    <div>
      <VideoLessonContainer>
        <Video ref={videoRef} />
        {/* {isCameraOff && <VideoOffOverlay />} */}
        <VideoControls>
          <VideoControlButton onClick={handleToggleCameraOff}>
            {isCameraOff ? <BsCameraVideoFill /> : <BsFillCameraVideoOffFill />}
          </VideoControlButton>
          <VideoControlButton onClick={handleToggleAudio}>
            {isMicrophoneOff ? <BiMicrophone /> : <BiMicrophoneOff />}
          </VideoControlButton>
        </VideoControls>
      </VideoLessonContainer>
      <Button disabled={!isReady}>Iniciar Lição</Button>
      <div>
        {videoDevices.map((d) => JSON.stringify(d, null, 2)).join("\n")}
      </div>
    </div>
  );
}
