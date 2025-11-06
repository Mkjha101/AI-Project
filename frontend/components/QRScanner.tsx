'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QrCode, Camera, CheckCircle, XCircle, Loader } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [lastScan, setLastScan] = useState<string>('');
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const scannerIdRef = useRef(`qr-reader-${Date.now()}`);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (html5QrcodeRef.current && isScanning) {
        html5QrcodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      setError('');
      const scannerId = scannerIdRef.current;
      
      if (!html5QrcodeRef.current) {
        html5QrcodeRef.current = new Html5Qrcode(scannerId);
      }

      await html5QrcodeRef.current.start(
        { facingMode: 'environment' }, // Use back camera
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // Scanning box size
        },
        (decodedText) => {
          // Success callback
          if (decodedText !== lastScan) {
            setLastScan(decodedText);
            onScanSuccess(decodedText);
            
            // Optional: Stop scanning after successful scan
            // stopScanning();
          }
        },
        (errorMessage) => {
          // Error callback (called frequently during scanning)
          // We don't show these errors as they're normal during scanning
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to start camera';
      setError(errorMsg);
      onScanError?.(errorMsg);
      console.error('QR Scanner error:', err);
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrcodeRef.current && isScanning) {
        await html5QrcodeRef.current.stop();
        setIsScanning(false);
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <QrCode className="w-8 h-8 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">QR Code Scanner</h2>
        </div>

        {/* Scanner View */}
        <div className="relative">
          <div
            id={scannerIdRef.current}
            className="rounded-lg overflow-hidden border-2 border-gray-300"
            style={{ minHeight: isScanning ? 'auto' : '300px' }}
          />
          
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Camera Not Active</p>
                <p className="text-sm text-gray-500 mt-2">Click "Start Scanning" to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-3">
          {!isScanning ? (
            <button
              onClick={startScanning}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Start Scanning
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Stop Scanning
            </button>
          )}
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 font-medium">Scanner Error</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <p className="text-red-600 text-xs mt-2">
                  Please ensure camera permissions are granted.
                </p>
              </div>
            </div>
          </div>
        )}

        {lastScan && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-900 font-medium">Last Scanned</p>
                <p className="text-green-700 text-sm mt-1 font-mono break-all">{lastScan}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium text-sm mb-2">Instructions:</p>
          <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
            <li>Hold the QR code steady within the frame</li>
            <li>Ensure good lighting conditions</li>
            <li>Keep the QR code flat and visible</li>
            <li>Scanner will automatically detect the code</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
