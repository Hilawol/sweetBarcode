import React ,{useEffect,useState,useRef} from 'react'
import './scanner.css';
import {Html5Qrcode} from "html5-qrcode";

function Scanner() {

  const [scanOn,setScanOn] =  useState(false);
  const [scannedCode,setScannedCode] = useState(null);
  const readerRef = useRef(null);
  

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    readerRef.current = html5QrCode;
    console.log(readerRef)
  }, [])

  const qrCodeSuccessCallback = (decodedText, decodedResult) =>{

    console.log("scanned:"+decodedText +" "+ decodedResult);
    setScannedCode(decodedText);

  }

  const onStartScan = ()=>{
    setScanOn(true);
    console.log("Start scan clicked ");
  
    // If you want to prefer back camera
    const config = { fps: 10, qrbox: { width: '80%', height: '10%' } };
    readerRef.current.start({ facingMode: "environment" },{}, qrCodeSuccessCallback);
  }

  const stopScan = () =>{
    if (scanOn) {

      readerRef.current.stop().then((ignore) => {
        // QR Code scanning is stopped.
      }).catch((err) => {
        setScannedCode(err)
        // Stop failed, handle it.
      });

      setScanOn(false);
    }
  }

  return (
    <div className="main">
      <div ref={readerRef} id="reader" width="600px"></div>
      <div className="code">Scanned: {scannedCode}</div>
      <button className="btn" onClick = {onStartScan}>Scan</button>
      <button className="btn" onClick = {stopScan}>Stop Scan</button>
    </div>
  )
}

export default Scanner
