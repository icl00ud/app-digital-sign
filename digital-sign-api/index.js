const express = require('express');
const userRoutes = require('./src/routes/user.routes');
const expenseRoutes = require('./src/routes/expense.routes');

const app = express();
const port = 3000;

app.use(express.json());

// Rota base para employees
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});