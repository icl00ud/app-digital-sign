const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const dotenv = require('dotenv');

const expenseRoutes = require('./src/routes/expense.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
dotenv.config()

// Configuração do multer para armazenar os arquivos em disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/api/expenses', upload.single('file'), expenseRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});