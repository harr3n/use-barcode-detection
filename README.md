# useBarcodeDetection

React hook for detecting barcodes.

This hook wraps the [BarcodeDetection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API) which has (very) limited support. If you know or can control what browser your users use this might be for you, but if not it's not recommended for use in production. Be sure to check the [browser compatability table](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API#browser_compatibility).

## Installation

```bash
npm i use-barcode-detection
```

## Usage

```tsx
import useBarcodeDetection from "use-barcode-detection";

const ScannerComponent = () => {
  const [isScanning, setIsScanning] = useState(false);
  const handleDetetected = (barcodes: string[]) => {
    // Handle barcode detection...
    console.log(barcodes);

    // Deactivate scanning, maybe close a modal...
    setIsScanning(false);
  };
  const { ref } = useBarcodeDetection({
    interval: 150,
    active: isScanning,
    onDetected: handleDetected,
  });

  return (
    <>
      <video ref={ref} autoPlay playsInline muted />
      <button onClick={() => setIsScanning(!isScanning)}>
        {isScanning ? "Stop scanning" : "Start scanning"}
      </button>
    </>
  );
};
```

## TODO

- Better error handling
- Add API reference
- Tests
- ...
