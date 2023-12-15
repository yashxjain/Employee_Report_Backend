const mongoose = require("mongoose");
const PresModel = require("../models/report.model");
const { htmlToPDF } = require("../helpers/pdfConversion/convertToPDF");
const {
  DownloadReportTemplate,
} = require("../helpers/pdfConversion/PdfTemplateHtml");
const nodemailer = require("nodemailer");
const fs = require("fs");
const pdf = require("html-pdf-node");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jyash5332@gmail.com",
    pass: "cxrc kaea zokx sgqo",
  },
});

const postPres = async (req, res) => {
  let data = req.body;

  try {
    const newInvoice = await PresModel(data);
    await newInvoice.save();

    // Generate the PDF
    const template = DownloadReportTemplate(data); // Assuming DownloadReportTemplate is defined
    const options = { format: "A4" };
    const pdfBuffer = await pdf.generatePdf({ content: template }, options);

    // Save the PDF to a file
    const pdfFileName = `report.pdf`;
    fs.writeFileSync(pdfFileName, pdfBuffer);

    // Send the PDF via email
    const mailOptions = {
      from: "jyash5332@gmail.com",
      to: "yash.gdscbu@gmail.com",
      subject: "Report PDF",
      text: "Attached is the report PDF.",
      attachments: [
        {
          filename: "report.pdf",
          path: pdfFileName,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({
        status: 200,
        message: "report saved and emailed",
        pdfUrl: pdfFileName,
        
      });
    } catch (emailError) {
      console.error(emailError);
      res.status(500).json({
        status: 500,
        message: "Error sending email",
        body: emailError,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: "Internal server error", body: error });
  }
};

module.exports = {
  postPres,
};
