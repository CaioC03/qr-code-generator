import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    try {
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, url, { width: 300 });
      setQrCodeUrl(canvas.toDataURL());
    } catch (err) {
      console.error(err);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const reset = () => {
    setUrl('');
    setQrCodeUrl('');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="app">
      <h1>Gerador de QR Code</h1>
      <input
        type="text"
        placeholder="Digite a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="buttons">
        <button onClick={generateQRCode} disabled={!url}>Gerar</button>
        <button onClick={downloadImage} disabled={!qrCodeUrl}>Salvar</button>
        <button onClick={reset}>Resetar</button>
      </div>
      <canvas ref={canvasRef} className="qrcode-canvas"></canvas>
    </div>
  );
}

export default App;
