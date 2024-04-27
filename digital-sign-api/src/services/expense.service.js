const expenseRepository = require('../repositories/expense.repository');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PDFDocument, PDFName, PDFHexString } = require('pdf-lib');

const getAllExpenses = async () => {
    try {
        return await expenseRepository.getAllExpenses();
    } catch (error) {
        throw new Error('Erro ao buscar as despesas.');
    }
};

const getAllEmployeeExpensesByUserId = async (userId) => {
    try {
        return await expenseRepository.getAllEmployeeExpensesByUserId(userId);
    } catch (error) {
        throw new Error('Erro ao buscar as despesas.');
    }
}

const getAllManagerExpensesByUserId = async (userId) => {
    try {
        return await expenseRepository.getAllManagerExpensesByUserId(userId);
    } catch (error) {
        throw new Error('Erro ao buscar as despesas.');
    }
}

const createExpense = async (expenseData, file) => {
    try {
        await expenseRepository.createExpense(expenseData, file);

        return;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar a despesa.');
    }
};

const deleteExpense = async (expenseId) => {
    try {
        await expenseRepository.deleteExpense(expenseId);
    } catch (error) {
        throw new Error('Erro ao deletar a despesa.');
    }
};

const signExpense = async (req) => {
    try {
        // Obtenha o PDF da despesa
        const id_file = req.id_file;
        const manager = await expenseRepository.getManagerByExpenseId(id_file);
        const pdfBase64 = await expenseRepository.getExpenseFile(id_file);

        // Decodifique o PDF base64 para bytes
        const pdfBytes = Buffer.from(pdfBase64, 'base64');

        // Carregue o PDF para manipulação
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Gerar uma chave privada e pública usando OpenSSL
        const privateKeyPath = process.env.PRIVATE_KEY_PATH;
        const publicKeyPath = process.env.PUBLIC_KEY_PATH;
        execSync(`openssl genpkey -algorithm RSA -outform PEM -out ${privateKeyPath}`);
        execSync(`openssl rsa -pubout -in ${privateKeyPath} -out ${publicKeyPath}`);

        // Assinar o PDF usando OpenSSL
        const pdfPath = process.env.PDF_PATH;
        const signaturePath = process.env.SIGNATURE_PATH;
        fs.writeFileSync(pdfPath, pdfBytes);
        const signatureHex = await signPdfWithOpenSSL(pdfPath, privateKeyPath, signaturePath);

        // Adicione a assinatura digital ao PDF
        const signerName = manager.name;
        const pageToSign = 0; // Página do PDF onde a assinatura será inserida

        // Obtenha a página para assinar
        const page = pdfDoc.getPages()[pageToSign];

        // Adicione a assinatura como uma anotação de texto na página
        const textSize = 10;
        const textWidth = signerName.length * textSize * 0.6;
        const textHeight = textSize;
        const textX = 100;
        const textY = 100;
        const text = `Assinado por: ${signerName}`;
        page.drawText(text, { x: textX, y: textY, size: textSize });

        // Salvar o PDF assinado
        const signedPdfBytes = await pdfDoc.save();

        // Salvar o PDF assinado na pasta /uploads
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const signedPdfPath = path.join(uploadDir, `signed_expense_${id_file}.pdf`);
        fs.writeFileSync(signedPdfPath, signedPdfBytes);

        // Retornar o caminho do PDF assinado
        return signedPdfPath;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao assinar a despesa.');
    }
};

const signPdfWithOpenSSL = async (pdfPath, privateKeyPath, signaturePath) => {
    try {
        // Assinar o PDF usando OpenSSL
        execSync(`openssl dgst -sha256 -sign ${privateKeyPath} -out ${signaturePath} ${pdfPath}`);

        // Ler a assinatura DER do arquivo
        const derSignature = fs.readFileSync(signaturePath);

        // Converter a assinatura DER para hexadecimal
        const signatureHex = derSignature.toString('hex');

        return signatureHex;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao assinar o PDF.');
    }
};

module.exports = {
    getAllExpenses,
    getAllEmployeeExpensesByUserId,
    createExpense,
    getAllManagerExpensesByUserId,
    signExpense,
    deleteExpense
};