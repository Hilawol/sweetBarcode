import React ,{useEffect,useState,useRef} from 'react'
import './scanner.css';
import Quagga from 'quagga';

function Scanner() {

  const [scanOn,setScanOn] =  useState(false);
  const [scannedCode,setScannedCode] = useState(null);
  const readerRef = useRef(null);
  

  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: readerRef.current
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
       // Quagga.start();
    });
    Quagga.onDetected(qrCodeSuccessCallback);
    console.log(readerRef)
  }, [])

  const qrCodeSuccessCallback = (result) =>{

    console.log("scanned:"+result.codeResult.code);
    setScannedCode(result.codeResult.code);

  }

  const onStartScan = ()=>{
    Quagga.start();
    setScanOn(true);
  }

  const stopScan = () =>{
    if (scanOn) {

      Quagga.stop();      

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
