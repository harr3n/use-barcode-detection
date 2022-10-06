import { useState, useEffect } from "react";

export const useUserMedia = (constraints: any) => {
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [state, setState] = useState<"pending" | "error" | "resolved">(
    "pending"
  );
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        setState("resolved");
      } catch (e) {
        console.log(e);
        setState("error");
        setError(e);
        setStream(undefined);
      }
    };

    if (!stream) {
      setState("pending");
      enableStream();
    } else {
      return () => {
        stream.getTracks().forEach((track) => {
          track.stop();
          stream.removeTrack(track);
        });
      };
    }
  }, [stream, constraints]);

  return { stream, state, error };
};
