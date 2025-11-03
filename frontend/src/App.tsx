import React from 'react';
import logo from './logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { API_URL } from "./api"
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const [message, setMessage] = useState("Mensagem utilitaria");
  const [ingredientes, setIngredientes] = useState("")
  const [receitas, setReceitas] = useState<any[]>([]);


  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Erro ao ligar ao backend"));
  }, []);

  const fetchRecipes = async () => {
    const res = await fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientes })
    });
    const data = await res.json()
    setReceitas(data.meals || [])
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "monospace" }}>
      <h1>Meal sugestions</h1>

      <input
        type="text"
        placeholder="Ex: chicken, ham, cheese..."
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
        style={{
          width: "300px",
          height: "40px",
          borderRadius: "25px",
          border: "2px solid #61dafb",
          outline: "none",
          padding: "0 15px",
          fontSize: "16px",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#1b9aaa";
          e.currentTarget.style.boxShadow = "0 0 8px rgba(27, 154, 170, 0.6)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#61dafb";
          e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        }}
      />

      <button
        onClick={fetchRecipes}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#61dafb",
          fontFamily: "monospace",
          color: "#fff",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 10px rgba(97, 218, 251, 0.3)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1b5375ff";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0b7694ff";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Search Meals
      </button>

      <div style={{
        marginTop: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>
        {receitas.map((r) => ( //para cada receita, cria-se uma div com as seguintes configs 
          <div
            key={r.idMeal} //chave unica de cada elemento
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "250px",
              padding: "15px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.10)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={r.strMealThumb}
              alt={r.strMeal}
              width="100%"
              style={{ borderRadius: "30px" }}
            />
            <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{r.strMeal}</h3>
          </div>
        ))}
      </div>



    </div>
  );
}
export default App;
