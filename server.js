const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const { mergePdfs } = require('./merge');

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', []), async (req, res, next) => {
  try {
    console.log(req.files);
    let mergedPdfPath = await mergePdfs(
      req.files
    );
    const filename = path.basename(mergedPdfPath);
    res.redirect(`/static/${filename}`);
  } catch (error) {
    console.error(`PDF merging failed: ${error}`);
    res.status(500).send('<h1>Error is showing. Beacuse you have not uploaded the PDF file on the side. Upload the PDF file first, only then the error will not occur. And the extension of the file should be .pdf <br>Thanks...</h1>');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
