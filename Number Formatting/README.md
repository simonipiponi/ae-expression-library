# Usage
To use these expressions, copy and paste them into a Source Text Property.
Then invoke them by calling the function like so: 
```javascript
function someFormattingFunction(txt) {
  // ...
}
let txt=value;
someFormattingFunction(txt);
```
Or, if you want to chain multiple:
```javascript
function someFormattingFunction(txt) {
  // ...
}
function someOtherFormattingFunction(txt) {
  // ...
}
let txt=value;
txt=someFormattingFunction(txt);
txt=someOtherFormattingFunction(txt);
txt; // return
```
# Functions



## Set Number

<details>
<summary>Required Effects</summary>

* Slider Control "Animation": Animate from 0-100%

</details>

```javascript
function setNumber() {
  const number = effect("Zahl")(1); // required effect
  const an = effect("Zahl Animation")(1); // required effect
  let txt = an/100*number;
  return txt;
}
```

## Set Number Format

<details>
<summary>Required Effects</summary>

* Dropdown Control "Commas": `0, 1, 2, 3, 4`

</details>

```javascript
function setNumberFormat(txt) {
  const decimalsMenu = effect("Commas")(1).value; // required effect
  // decimals
  let decimalsDelimiter = ",", txtDecimals = parseFloat(txt).toFixed(decimalsMenu-1).toString().replace(/\./g, decimalsDelimiter);
  txtDecimals.indexOf(decimalsDelimiter) != -1 ? txtDecimals = decimalsDelimiter + txtDecimals.split(decimalsDelimiter)[1] : txtDecimals = "";
  // punctuation
  let punctuationDelimiter = ".",newtxt = ""; txt = parseInt(txt).toFixed(0).toString().split("").reverse().join("");
  for (let i = 0; i < txt.length; i++) { if (i!=0 && i % 3 == 0)  newtxt += punctuationDelimiter; newtxt += txt[i]; }
  let txtPunctuation = newtxt.split("").reverse().join(""); txt = txtPunctuation + txtDecimals; return txt;
}
```

## Set Prefix

<details>
<summary>Required Effects</summary>

* Dropdown Control "Prefix": `None, Minus, Plus, Set in Expression`

</details>

```javascript
function setPrefix(txt) {
  const prMenu = effect("Prefix")(1).value; // required effect
  const customStr = "custom prefix";
  const prArr = ["","-","+",customStr];
  let prStr = prArr[prMenu-1];
  return prStr + txt;
}
```

## Set Suffix

<details>
<summary>Required Effects</summary>

* Dropdown Control "Suffix": `None, Euro, Percent, Set in Expression`

</details>

```javascript
function setSuffix(txt) {
  const whMenu = effect("Waehrung")(1).value; // required effect
  const customStr = "custom suffix";
  const whArr = ["", " €", " %", " " + customStr]
  txt = txt + whArr[whMenu-1]
  return txt;
}
```



## Set Font Size By Dropdown

<details>
<summary>Required Effects</summary>

* Dropdown Control "Font Size": `Small, Medium, Big`

</details>

```javascript
function setFontSizeByDropdown(txt) {
  const fsMenu = effect("Font Size")(1).value; // required effect
  const fsArr = [83,170,233]; // font sizes
  const fs = fsArr[fsMenu-1];
  return text.sourceText.createStyle().setFontSize(fs).setLeading(fs*1.05).setText(txt)
}
```



