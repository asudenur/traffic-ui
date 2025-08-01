import { useTraffic } from "../context/TrafficContext";
import TrafficLight from "./TrafficLight";
import "./JunctionArea.css";
import Vehicle from "./Vehicle";

export default function JunctionArea() {
  const { lights } = useTraffic();

  // Gerçek araç verisi SignalR'dan gelecek
  const vehicles = []; // Şimdilik boş, SignalR'dan doldurulacak

  return (
    <div className="junction-area">
      <div className="vertical-road" />
      <div className="horizontal-road" />
      {/* Kuzey */}
      <div className="light-pos light-1">
        <TrafficLight state={lights ? lights["north"] : undefined} direction="north" />
        <div>Kuzey</div>
      </div>
      {/* Batı */}
      <div className="light-pos light-4">
        <TrafficLight state={lights ? lights["west"] : undefined} direction="west" />
        <div>Batı</div>
      </div>
      {/* Doğu */}
      <div className="light-pos light-2">
        <TrafficLight state={lights ? lights["east"] : undefined} direction="east" />
        <div>Doğu</div>
      </div>
      {/* Güney */}
      <div className="light-pos light-3">
        <TrafficLight state={lights ? lights["south"] : undefined} direction="south" />
        <div>Güney</div>
      </div>
      {/* Araçlar */}
      {vehicles.map((v) => (
        <Vehicle key={v.id} {...v} />
      ))}
    </div>
  );
} 