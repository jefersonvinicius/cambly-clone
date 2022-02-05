import Button from "components/Button";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Video,
  VideoControlButton,
  VideoControls,
  VideoLessonContainer,
  VideoOffOverlay,
} from "./styles";
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

type UserStreamParams = {
  video: boolean;
  audio: boolean;
};

function getUserStream(params?: Partial<UserStreamParams>) {
  const video = params?.video ?? true;
  const audio = params?.audio ?? true;
  return navigator.mediaDevices.getUserMedia({ video, audio });
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
  const [isStartingStream, setIsStartingStream] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    getUserStream({ audio: false })
      .then((result) => {
        setStream(result);
      })
      .finally(() => {
        setIsStartingStream(false);
      });
  }, []);

  const isVideoActive = useMemo(() => {
    // console.log(stream?.getVideoTracks());
    return !!stream
      ?.getVideoTracks()
      .some((track) => track.readyState === "live");
  }, [stream]);

  const isAudioActive = useMemo(() => {
    return !!stream
      ?.getAudioTracks()
      .some((track) => track.readyState === "live");
  }, [stream]);

  const stopVideoStream = useCallback(() => {
    // setStream((draft) => {
    console.log(stream?.getVideoTracks());
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = false;
      // stream.removeTrack(track);
    });

    console.log(stream?.getVideoTracks());

    //   return draft?.clone() ?? null;
    // });
  }, [stream]);

  const startVideoStream = useCallback(async () => {
    // const streamResult = await getUserStream();
    // setStream((draft) => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = true;
    });

    // return draft?.clone() ?? null;
    // });
  }, [stream]);

  const stopAudioStream = useCallback(() => {
    setStream((draft) => {
      draft?.getAudioTracks().forEach((track) => {
        track.stop();
        draft.removeTrack(track);
      });

      return draft?.clone() ?? null;
    });
  }, []);

  const startAudioStream = useCallback(async () => {
    const streamResult = await getUserStream();
    setStream((draft) => {
      streamResult.getAudioTracks().forEach((track) => {
        draft?.addTrack(track);
      });

      return draft?.clone() ?? null;
    });
  }, []);

  return {
    stream,
    isStartingStream,
    startVideoStream,
    stopVideoStream,
    stopAudioStream,
    startAudioStream,
    isVideoActive,
    isAudioActive,
  };
}

export default function SetupLesson() {
  // const [c, setC] = useState(0);
  // const videoDevices = useVideoDevicesAvailable();
  // const {
  //   stream,
  //   isVideoActive,
  //   isAudioActive,
  //   isStartingStream,
  //   startVideoStream,
  //   stopVideoStream,
  //   startAudioStream,
  //   stopAudioStream,
  // } = useStream();

  // async function handleToggleCameraOff() {
  //   if (isVideoActive) {
  //     stopVideoStream();
  //   } else {
  //     startVideoStream();
  //   }
  // }

  // function handleToggleAudio() {
  //   if (isAudioActive) {
  //     stopAudioStream();
  //   } else {
  //     startAudioStream();
  //   }
  // }

  return (
    <div>
      <VideoLessonContainer>
        {/* <Video
          ref={(ref) => {
            if (ref && !ref.srcObject) ref.srcObject = stream;
          }}
          autoPlay
        /> */}
        {/* {!isVideoActive && <VideoOffOverlay />} */}
        {/* <VideoControls>
          <VideoControlButton onClick={handleToggleCameraOff}>
            {isVideoActive ? (
              <BsFillCameraVideoOffFill />
            ) : (
              <BsCameraVideoFill />
            )}
          </VideoControlButton>
          <VideoControlButton onClick={handleToggleAudio}>
            {isAudioActive ? <BiMicrophoneOff /> : <BiMicrophone />}
          </VideoControlButton>
        </VideoControls> */}
      </VideoLessonContainer>
      {/* <Button disabled={!isStartingStream}>Iniciar Lição</Button>
      <div>
        {videoDevices.map((d) => JSON.stringify(d, null, 2)).join("\n")}
      </div> */}
    </div>
  );
}
