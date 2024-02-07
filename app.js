const express = require('express');
const app = express();
app.use(express.json());


app.get('/tweets', (req, res) => {
  res.json({ message: 'Récupération de tous les tweets' });
});

app.get('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  res.json({ message: `Récupération du tweet avec l'identifiant ${tweetId}` });
});

app.post('/tweets', (req, res) => {
  const newTweet = req.body;
  res.json({ message: 'Ajout d\'un nouveau tweet' });
});

app.put('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  const updatedTweet = req.body;
  res.json({ message: `Mise à jour du tweet avec l'identifiant ${tweetId}` });
});

app.delete('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  res.json({ message: `Suppression du tweet avec l'identifiant ${tweetId}` });
});

app.patch('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  const updatedFields = req.body;
  res.json({ message: `Mise à jour partielle du tweet avec l'identifiant ${tweetId}` });
});
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});