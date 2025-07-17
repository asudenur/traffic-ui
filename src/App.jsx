import React, { useState } from "react";
import { TrafficProvider, useTraffic } from "./context/TrafficContext";
import Modal from "./components/Modal";
import AlgorithmStatus from "./components/AlgorithmStatus";
import JunctionType from "./components/JunctionType";
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
          <button
            onClick={() => setModalOpen(true)}
            style={{
              position: 'fixed', top: 24, right: 32, zIndex: 3000,
              background: 'linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)',
              color: 'white', border: 'none', borderRadius: 8,
              fontWeight: 600, fontSize: 15, padding: '10px 22px',
              boxShadow: '0 2px 8px rgba(49,130,206,0.08)', cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >Ayarları Değiştir</button>
          <div className="junction-root">
            <div style={{
              marginTop: 24,
              marginBottom: 12,
              background: '#f4f6f8',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
              padding: 8,
              minWidth: 180,
              color: '#2d3748',
              fontWeight: 500,
              fontSize: 15,
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
              marginLeft: 60 
            }}>
              <JunctionType type={JUNCTION_TYPES.find(j => j.value === junctionType)?.label} />
              <AlgorithmStatus algorithm={algorithm} />
            </div>
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
