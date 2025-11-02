import React from 'react';
import logo from './logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {API_URL} from "./api"

function App() {
  const [message, setMessage] = useState("Mensagem utilitaria");
  const [ingredientes,setIngredientes] = useState("")
  const [receitas,setReceitas] = useState<any[]>([]);

  useEffect(() => {
     fetch(API_URL)
     .then(res => res.json())
     .then(data => setMessage(data.message))
     .catch(() => setMessage("Erro ao ligar ao backend"));
  }, []);

  const fetchRecipes = async() => {
    const res = await fetch("http://localhost:5000/recipes",{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({ingredientes})
    });
    const data = await res.json()
    setReceitas(data.meals || [])
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Sugestão de refeições</h1>

      <input 
        type='text' 
        placeholder='Ex: frango, couves, feijões...' 
        value={ingredientes} 
        onChange={(e) => setIngredientes(e.target.value)}>  
      </input>

      <button onClick={fetchRecipes}>Procurar receitas</button>

      <div style={{ marginTop: "20px" }}>


          {receitas.map((r) => (
            <div key={r.idMeal} style={{ marginBottom: "30px" }}>
              <h3>{r.strMeal}</h3>
              <img src={r.strMealThumb} alt={r.strMeal} width="250" />
            </div>
          ))}
      </div>

    </div>
  );
}
export default App;
