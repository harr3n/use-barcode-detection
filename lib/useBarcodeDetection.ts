import { useEffect, useRef } from "react";
import { useUserMedia } from "./useUserMedia";

const DEFAULT_USER_MEDIA_CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: "environment",
  },
};

type BarcodeDetectionOptions = {
  onDetected: (barcodes: string[]) => void;
  active: boolean;
  constraints?: any;
  formats?: string[];
  interval?: number;
  onError?: (e: unknown) => void;
};

const useBarcodeDetection = ({
  constraints = DEFAULT_USER_MEDIA_CONSTRAINTS,
  formats,
  active,
  interval = 500,
  onError = () => {},
  onDetected,
}: BarcodeDetectionOptions) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { stream, state } = useUserMedia(constraints);

  useEffect(() => {
    if (stream && ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (!stream || !ref.current || !active || state !== "resolved") return;

    if (!("BarcodeDetector" in window)) {
      console.log("Barcode Detector is not supported by this browser.");
      return;
    }

    // @ts-ignore
    const barcodeDetector = new BarcodeDetector({
      formats,
    });

    const id = setInterval(async () => {
      try {
        if (!ref.current?.readyState || ref.current?.readyState < 4) return;

        const barcodes = await barcodeDetector.detect(ref.current);
        if (!barcodes.length) return;

        // Sometimes the same barcode is scanned more than once
        // so we need to remove duplicates from the result array:
        const results = [...new Set(barcodes.map((b: any) => b.rawValue))];
        onDetected(results as string[]);
      } catch (e) {
        console.error(e);
        onError(e);
      }
    }, interval);

    return () => clearInterval(id);
  }, [stream, active, ref, formats, interval, onDetected, onError, state]);

  return {
    stream,
    ref,
  };
};

export default useBarcodeDetection;
