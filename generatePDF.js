/**
 * Created by sesha on 3/24/17.
 */

// This is the working code to generate
var PDFDocument = require ('pdfkit');
var fs = require('fs');
var doc = new PDFDocument();




var bill = {
        "balancedue" : 105,
        "subTotal" : 210 ,
        "total" : "105",
        "receiptNumber" : "A0123IHDF233",
        "policyNumber" : "PL23425635",
        "LifeInsured"  : "John Smith",
        "policyHolder": "John S Smith",
        "addrLine1" : "525 Newbury st",
        "addrLine2" : "apt 3",
        "addrCity" : "New York",
        "addrState" : "MA",
        "addrZip" : "02215",
        "dueDate" : "03.12.2017",
        "coverageAmount" : "100,000",
        "coveragePeriod" : "03/02/2015 to 03/01/2020",
        "beneficiaryName" :	"Amanda	Smith",
        "agentName" : "Paul George"
};



generatePDF(bill);

function generatePDF(bill) {

// Output file name here

    var fileName = bill.policyNumber + "56srdtu.pdf";
    doc.pipe(fs.createWriteStream(fileName));



// Contents
    var H1 = 14;
    var H2 = 11;

    var LOGO = 'imagesAndFonts/logo.png';

    var FONT = 'imagesAndFonts/GillSans.ttf';
    var FONT_BOLD = 'imagesAndFonts/GillSans-Bold.ttf';
    var FONT_ITALIC = 'imagesAndFonts/GillSans-Italic.ttf';
    var FONT_SEMIBOLD = "imagesAndFonts/GillSans-SemiBold.ttf";

//content in the Pdf
    doc
        .image(LOGO, 0, 0, {"width" : "240"});



    doc
        .font(FONT)
        .fontSize(H2)
        .text( "Bill to:", 300,25);


    doc
        .font(FONT_BOLD)
        .fontSize(H1)
        .text("Balance Due $"+bill.balancedue,{"align":"right"});



    doc
        .font(FONT)
        .fontSize(H2)
        .text(bill.LifeInsured, 300)
        .text("Due Date:"+bill.dueDate,doc.x,doc.y-12,{"align":"right"})
        .text(bill.addrLine1,doc.x,doc.y+3);


    if(bill.addrLine2){
        doc
            .font(FONT)
            .fontSize(H2)
            .text(bill.addrLine2)
    }

    doc
        .font(FONT)
        .fontSize(H2)
        .text(bill.addrState)
        .text(bill.addrZip);




// Receipt number section
    var receiptNumber = "Receipt Number  :" + bill.receiptNumber;
    var policyNumber = "Policy Number     :" + bill.policyNumber;
    var lifeInsured =  "Life Insured          :" + bill.policyHolder;
    var policyHolder = "Poicy Holder        :" + bill.policyHolder;
    var addrLine1AndLine2 = "                            " +bill.addrLine1 + ", " + bill.addrLine2;
    var addrCityAndState = "                            " +bill.addrCity + ", " +bill.addrState;
    var addrZip = "                            " +bill.addrZip;


    doc
        .moveDown()
        .font(FONT)
        .fontSize(H2)
        .text(receiptNumber)
        .text(policyNumber)
        .text(lifeInsured)
        .text(policyHolder)
        .font(FONT_ITALIC)
        .text(addrLine1AndLine2)
        .text(addrCityAndState)
        .text(addrZip);



    doc
        .font(FONT_SEMIBOLD)
        .fontSize(H1+5)
        .text("TERM LIFE POLICY", 10, 260)
        .moveDown()
        .moveDown()
        .font(FONT)
        .fontSize(H2)
        .text("          Item                                                                                                                                                Amount");

    doc
        .lineWidth(1.5)
        .lineCap('round')
        .strokeColor("#ccc")
        .moveTo(10, 345)
        .lineTo(600, 345)
        .stroke();

    var termLifeInsurance = "Term Life Insurance :" + bill.policyNumber;
    var amt = "$"+bill.balancedue;

    doc
        .font(FONT)
        .fontSize(H2)
        .text(termLifeInsurance,doc.x, 350)
        .font(FONT_SEMIBOLD)
        .text(amt,{"align":"right"} );

    doc
        .font(FONT)
        .fontSize(H2)
        .text("DESCRIPTION", doc.x+50, doc.y+20);


    var coverageAmt = "Coverage Amount         :"   + "$" + bill.coverageAmount;
    var coveragePeriod = "Coverage Period           :" + bill.coveragePeriod;
    var beneName = "Beneficiary Name          :" + bill.beneficiaryName;
    var agentName = "Agent Name                 :" + bill.agentName;
    var subTotal = "Subtotal :" + " $" + bill.subTotal;
    var total = "Total :" + " $" + bill.total;

    doc
        .font(FONT)
        .fontSize(H2)
        .text(coverageAmt)
        .text(coveragePeriod)
        .text(beneName)
        .text(agentName)
        .moveDown()
        .moveDown()
        .moveDown()
        .moveDown()
        .moveDown()
        .text(subTotal, {"align" : "right"})
        .text(total, {"align" : "right"})


// payment options
    var option1 = "-"+"Customer iOS app (Automatic payment subscription)";
    var option2 = "-"+"Pay your insurance bill by credit card, ATM debit card, Paypal or Apple Pay using Customer iOS App";
    var option3 = "-"+"Mail: Pay using a check or money order payable to 'New York Life Insurance'";
    var option4 = "Terms:Please review our Privacy Notice, which also governs your visit to our website, to understand our practices";
    var note = "**Note: Kindly pay the bill within due date to avoid policy lapse";
    doc
        .moveDown()
        .moveDown()
        .moveDown()
        .moveDown()
        .font(FONT)
        .fontSize(H2)
        .text("PAYMENT OPTIONS:", doc.x-50, doc.y, {"align" : "left"})
        .font(FONT_ITALIC)
        .text(option1)
        .text(option2)
        .text(option3)
        .text(option4)
        .moveDown()
        .moveDown()
        .font(FONT)
        .text(note);



    doc.end();


}



