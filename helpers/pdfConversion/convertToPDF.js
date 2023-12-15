const pdf = require("html-pdf-node");
const fs = require("fs");
const { DownloadReportTemplate } = require("../pdfConversion/PdfTemplateHtml");

async function htmlToPDF(data, callback) {
  try {
    const template = DownloadReportTemplate(data);

    const options = { format: "A4" };

    const pdfBuffer = await pdf.generatePdf({ content: template }, options);

    // Save the PDF to a file
    const pdfFileName = `report.pdf`;
    fs.writeFileSync(pdfFileName, pdfBuffer);

    // Provide the download link
    const downloadLink = `/download/${pdfFileName}`; // Adjust the URL path as needed

    callback(null, downloadLink);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = { htmlToPDF };
