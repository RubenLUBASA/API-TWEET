const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'Token manquant' });
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint pour ajouter un tweet
app.post('/tweets', verifyToken, [
  check('content').isLength({ min: 1 }).withMessage('Le contenu du tweet ne peut pas être vide'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { content, user_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO tweets (content, user_id) VALUES ($1, $2) RETURNING *', [content, user_id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pour supprimer un tweet
app.delete('/tweets/:id', verifyToken, async (req, res) => {
  // ... (code de suppression de tweet)
});

// Endpoint d'authentification
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Vérification des informations d'identification dans la base de données
  // Génération du token JWT
  const token = jwt.sign({ username }, 'your_secret_key');
  res.json({ token });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});