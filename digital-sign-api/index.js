const express = require('express');
const userRoutes = require('./src/routes/user.routes');

const app = express();
const port = 3000;

app.use(express.json());

// Rota base para employees
app.use('/api/employees', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});