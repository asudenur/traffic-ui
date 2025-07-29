import { useState } from "react";
import { TrafficProvider, useTraffic } from "./context/TrafficContext";
import Modal from "./components/Modal";
import JunctionArea from "./components/JunctionArea";
import Sidebar from "./components/Sidebar";
import JUNCTION_TYPES from './data/junctionTypes';
import ALGORITHMS from './data/algorithms';
import './App.css';

function MainContent({ modalOpen, setModalOpen, junctionType, setJunctionType }) {
  const { algorithm } = useTraffic();
  return (
    <div className="App">
      { !modalOpen && <Sidebar /> }
      <Modal isOpen={modalOpen}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0, fontSize: 28, color: "#22577a", fontWeight: 700 }}>Trafik Kavşağı Simülasyonu</h2>
          <div style={{ color: "#4a5568", fontSize: 16, marginTop: 8 }}>
            Lütfen kavşak tipi ve algoritma seçimini yaparak simülasyona başlayın.
          </div>
        </div>
        <form onSubmit={e => { e.preventDefault(); setModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: 500, color: '#22577a', fontSize: 14, marginBottom: 4, display: "block" }}>Kavşak Tipi</label>
            <select value={junctionType} onChange={e => setJunctionType(e.target.value)}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #cbd5e1',
                fontSize: 16, background: "#f7fafc", marginTop: 2, color: '#222'
              }}>
              {JUNCTION_TYPES.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
            </select>
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: 500, color: '#22577a', fontSize: 14, marginBottom: 4, display: "block" }}>Algoritma Seçimi</label>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #cbd5e1',
                fontSize: 16, background: "#f7fafc", marginTop: 2, color: '#222'
              }}>
              {ALGORITHMS.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
            </select>
          </div>
          <button type="submit" style={{
            padding: '14px 0',
            background: 'linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            marginTop: 8,
            transition: 'background 0.2s'
          }}>Simülasyonu Başlat</button>
        </form>
      </Modal>
      {!modalOpen && (
        <>
          <div style={{
            position: 'fixed',
            top: 22,
            right: 10,
            zIndex: 2999,
            background: 'rgba(30,32,40,0.92)',
            color: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 16px #0007',
            padding: '18px 28px',
            minWidth: 180,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 17,
            border: '1.5px solid #7ec850',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            pointerEvents: 'none',
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>Kavşak Tipi: <span style={{ color: '#7ec850' }}>{JUNCTION_TYPES.find(j => j.value === junctionType)?.label}</span></div>
            <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: 0.2 }}>Algoritma: <span style={{ color: '#7ec850' }}>{ALGORITHMS.find(j => j.value === algorithm)?.label}</span></div>
          </div>
          <div className="junction-root">
            <JunctionArea />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [junctionType, setJunctionType] = useState('4-fazli');
  return (
    <TrafficProvider>
      <MainContent modalOpen={modalOpen} setModalOpen={setModalOpen} junctionType={junctionType} setJunctionType={setJunctionType} />
    </TrafficProvider>
  );
}

export default App;
