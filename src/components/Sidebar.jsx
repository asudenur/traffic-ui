import React, { useState } from "react";
import { useTraffic } from "../context/TrafficContext";
import ALGORITHMS from "../data/algorithms";

export default function Sidebar() {
  const { algorithm, setAlgorithm } = useTraffic();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: open ? 240 : 56,
        background: open ? 'linear-gradient(135deg, #f3f4f6 0%, #e2e8f0 100%)' : 'transparent',
        color: '#222',
        zIndex: 2000,
        transition: 'width 0.25s cubic-bezier(.4,2,.6,1), background 0.18s',
        boxShadow: open ? '2px 0 12px rgba(0,0,0,0.07)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 0,
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: 'none',
          color: open ? '#222' : '#444',
          fontSize: 32,
          cursor: 'pointer',
          margin: '18px 0 0 12px',
          padding: 0,
          outline: 'none',
          boxShadow: 'none',
        }}
        aria-label={open ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        <svg width="32" height="32" viewBox="0 0 28 28">
          <rect y="5" width="28" height="3" rx="1.5" fill={open ? '#222' : '#444'} />
          <rect y="12" width="28" height="3" rx="1.5" fill={open ? '#222' : '#444'} />
          <rect y="19" width="28" height="3" rx="1.5" fill={open ? '#222' : '#444'} />
        </svg>
      </button>
      {open && (
        <div style={{ width: '100%', marginTop: 36, paddingLeft: 18 }}>
          <div style={{
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 18,
            letterSpacing: 1,
            textAlign: 'center',
            color: '#222'
          }}>
            Algoritma Seç
          </div>
          {ALGORITHMS.map(a => (
            <button
              key={a.value}
              onClick={() => setAlgorithm(a.value)}
              style={{
                width: '95%',
                background: algorithm === a.value
                  ? 'linear-gradient(90deg, #e0e7ef 0%, #cbd5e1 100%)'
                  : 'rgba(0,0,0,0.03)',
                color: '#222',
                border: algorithm === a.value ? '2px solid #a0aec0' : '1px solid #e2e8f0',
                borderRadius: 18,
                padding: '14px 10px',
                marginBottom: 14,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: algorithm === a.value ? '0 2px 8px rgba(160,174,192,0.10)' : 'none',
                transition: 'background 0.18s, box-shadow 0.18s, border 0.18s',
                outline: 'none',
                letterSpacing: 0.5,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 