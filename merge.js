const PDFMerger = require('pdf-merger-js');
// const fs = require('fs');
const path = require('path');

const merger = new PDFMerger();

const mergePdfs = async (files) => {
  try {
    console.log("Merging PDFs...");
    console.log("File paths:",files);

    for(const file of files) {
      mainfile=path.join(__dirname, file.path),
      console.log(" file added successfully:", mainfile);
      await merger.add(mainfile)
    }

    const timestamp = new Date().getTime();
    const filePath = `public/${timestamp}.pdf`;
    await merger.save(filePath); 

    console.log("PDFs merged successfully!");
    
    await merger.reset();

    return filePath; 
    
  } 
  catch (error) {
    console.error(`PDF merging failed: ${error}`);
    throw new Error(`PDF merging failed: ${error.message}`);
  }

};

module.exports = { mergePdfs };