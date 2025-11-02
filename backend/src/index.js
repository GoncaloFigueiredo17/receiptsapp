import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Servidor Node.js ativo 🚀" });
});

//receber os ingredientes do utilizador e ir buscar receitas com base nos ingredientes
app.post("/recipes",async(req,res) => {
    const { ingredientes } = req.body; // guardar os ingredientes numa variável

    const query = encodeURIComponent(ingredientes.split(",")[0].trim());
    try{
      const receitas = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );
      const data = await receitas.json();
      res.json(data);
      }catch (err) {
        res.status(500).json({error : "Erro em obter receitas"});
      }    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));