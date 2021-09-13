/*
Format Text Layer As Money
Author: Simon Heimbuchner, 2021

Description:
Formats a text layer's source text as money, including decimals, thousands punctuation, added prefix and suffix, and font size selection
(e.g. "4,5" -> +4,5 Tsd. €, "5000" -> -5.000$, "55.55" -> +55,55%)
*/

function setNumberFormat(txt) {
    // adds decimals and thousands punctuation 
    // input: number as str, int or float (e.g. 40000.40)
    // output: str (e.g. 40.000,40)

    // requires:
    let decimalsMenu = effect("Nachkommastellen")(1).value; // dropdown

    // decimals
    let decimalsDelimiter = ",";
    let txtDecimals = parseFloat(txt).toFixed(decimalsMenu-1).toString().replace(/\./g, decimalsDelimiter);
    txtDecimals.indexOf(decimalsDelimiter) != -1 ? txtDecimals = decimalsDelimiter + txtDecimals.split(decimalsDelimiter)[1] : txtDecimals = "";

    // punctuation
    let punctuationDelimiter = ".",
        newtxt = "";
    txt = parseInt(txt).toFixed(0).toString().split("").reverse().join("");
    for (let i = 0; i < txt.length; i++) {
        if (i!=0 && i % 3 == 0)  newtxt += punctuationDelimiter;
        newtxt += txt[i];
    }
    let txtPunctuation = newtxt.split("").reverse().join("");
    txt = txtPunctuation + txtDecimals;
    return txt;
}

function setPrefix(txt) {
	// input: text string // output: text string

	// requires:
	let prMenu = effect("Präfix")(1).value; // dropdown with prArr contents
	let customStr = thisComp.layer("prefix").text.sourceText; // text layer with custom prefix

	let prArr = ["","-","+",customStr];
	let prStr = prArr[prMenu-1];
	return prStr + txt;
}
function setThousands(txt) {
	// input: text string // output: text string + thousands abbreviation

	// requires:
	let znMenu = effect("Zahlennamen")(1).value; // dropdown with znArr contents
	let customStr = thisComp.layer("zahlennamen").text.sourceText; // text layer with custom thousands text

	let znArr = ["", " Tsd.", " Mio.", " Mrd.", " " + customStr];
	let znStr = znArr[znMenu-1];
	return txt + znStr;
}
function setCurrency(txt) {
	// input: text string // output: text string + currency

    // requires:
	let whMenu = effect("Waehrung")(1).value; // dropdown with whArr contents
	let customStr = thisComp.layer("suffix").text.sourceText; // text layer with custom currency
	
	let whArr = ["", " €", " %", " " + customStr]
	txt = txt + whArr[whMenu-1]
	return txt;
}
function setNumber() {
	// input: none // output: animated number as float
	
	// requires:
	number = effect("Zahl")(1); // slider
	an = effect("Zahl Animation")(1); // slider, animate from 0-100%
	
	let txt = an/100*number;
	return txt;
}
function setStyle(txt) {
	// input: text string
	
	// requires:
	let fsMenu = effect("Schriftgröße")(1).value; // dropdown with fsArr contents
	
	let fsArr = [83,170,233]; // font sizes
	let fs = fsArr[fsMenu-1];
	return text.sourceText.createStyle().setFontSize(fs).setLeading(fs*1.05).setText(txt)
}

// run all the functions
let txt = setNumber();
txt = setNumberFormat(txt);
txt = setThousands(txt);
txt = setCurrency(txt);
txt = setPrefix(txt);
txt = setStyle(txt);

txt