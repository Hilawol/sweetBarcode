import React ,{useEffect} from 'react'
import './scanner.css';
import {Html5Qrcode} from "html5-qrcode";

function Scanner() {
  
  let html5QrCode ;

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
  }, [])
 


  const qrCodeSuccessCallback = (code) =>{

    console.log("scanned:",code);

  }

  const onStartScan = ()=>{
    console.log("Start scan clicked ");
    // If you want to prefer back camera
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
   html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
  }

  const stopScan = () =>{
    html5QrCode.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      // Stop failed, handle it.
    });
  }

  return (
    <div className="main">
      <div id="reader" width="600px"></div>
      <button className="btn" onClick = {onStartScan}>Scan</button>
      <button className="btn" onClick = {stopScan}>Stop Scan</button>
    </div>
  )
}

export default Scanner
