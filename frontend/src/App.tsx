import React from 'react';
import logo from './logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {API_URL} from "./api"

function App() {
  const [message, setMessage] = useState("A ligar ao backend...");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Erro ao ligar ao backend 😢"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{message}</h1>
    </div>
  );
}
export default App;
