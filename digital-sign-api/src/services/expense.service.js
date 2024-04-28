const expenseRepository = require('../repositories/expense.repository');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

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
        const id_file = req.id_file;
        const manager = await expenseRepository.getManagerByExpenseId(id_file);
        const pdfReceipt = await expenseRepository.getExpenseFile(id_file);

        const pdfBytes = Buffer.from(pdfReceipt.file, 'base64');
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
        await signPdfWithOpenSSL(pdfPath, privateKeyPath, signaturePath);

        // Adicionar a assinatura digital a todas as páginas do PDF
        const signerName = manager.name;
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const page = pdfDoc.getPage(i);
            const textSize = 10;
            const textX = 100;
            const textY = 100 + (textSize * 2 * i);

            const signatureText = `Assinado por: ${signerName}`;
            const signatureStyle = {
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                size: 12,
                color: rgb(0, 0, 0),
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
                x: textX,
                y: textY,
                width: signatureText.length * textSize * 0.6 + 10,
                height: textSize + 10,
            };

            drawSignature(page, signatureText, signatureStyle);
        }

        const signedPdfBytes = await pdfDoc.save();
        const filePath = path.join(__dirname, '../../uploads/', fileName);
        const signedPdfBase64 = Buffer.from(signedPdfBytes).toString('base64');
        const fileName = `${id_file}_signed.pdf`;
        fs.writeFileSync(filePath, signedPdfBase64, 'base64');

        await expenseRepository.saveSignedPdf(signedPdfBase64, pdfReceipt);

        return true;
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

const drawSignature = (page, text, style) => {
    page.drawText(text, {
        x: style.x,
        y: style.y,
        size: style.size,
        font: style.font,
        color: style.color,
    });

    page.drawRectangle({
        x: style.x - 5,
        y: style.y - 5,
        width: style.width,
        height: style.height,
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
    });
};

module.exports = {
    getAllExpenses,
    getAllEmployeeExpensesByUserId,
    createExpense,
    getAllManagerExpensesByUserId,
    signExpense,
    deleteExpense
};