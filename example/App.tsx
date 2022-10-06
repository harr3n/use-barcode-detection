import { useState } from "react";
import useBarcodeDetection from "../lib/useBarcodeDetection";

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const onDetected = (barcodes: string[]) => {
    console.log(barcodes);
    setIsScanning(false);
  };
  const { ref } = useBarcodeDetection({
    interval: 150,
    active: isScanning,
    onDetected,
  });

  return (
    <>
      <video
        style={{ height: "500px", width: "500px", margin: "0", padding: "0" }}
        ref={ref}
        autoPlay
        playsInline
        muted
      />
      <button onClick={() => setIsScanning(!isScanning)}>
        {isScanning ? "Stop scanning" : "Start scanning"}
      </button>
    </>
  );
};

export default App;
