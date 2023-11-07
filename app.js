const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/generate', async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(text);
        res.send({ qrCodeDataUrl });
    } catch (error) {
        console.error('QR code generation error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
