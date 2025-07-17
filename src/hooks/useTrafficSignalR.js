import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export default function useTrafficSignalR(onTrafficUpdate) {
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5185/trafficHub") //backend ile iletişim
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveTrafficState", (state) => {
      console.log("SignalR trafik verisi", state);
      onTrafficUpdate(state);
    });

    connection.start()
      .then(() => {
        console.log("SignalR bağlantısı başlatıldı");
      })
      .catch((err) => {
        console.error("SignalR bağlantısı kurulamadı", err);
    });
    
    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [onTrafficUpdate]);

  // Algoritma değişikliğini backend'e gönderen fonksiyon
  const sendAlgorithmChange = (algorithm) => {
    if (connectionRef.current) {
      connectionRef.current.invoke("ChangeAlgorithm", algorithm)
        .catch(err => console.error("SignalR invoke error:", err));
    }
  };

  // sendAlgorithmChange fonksiyonunu döndür
  return { sendAlgorithmChange };
} 