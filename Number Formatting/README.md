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

## Set Number Format

<details>
<summary>Required Effects</summary>

* Dropdown Control "Commas": `0, 1, 2, 3, 4`
* Dropdown Control "Decimals": `Yes, No`

</details>

```javascript
function setNumberFormat(txt) {
    // adds decimals and thousands punctuation 
    // input: number as str, int or float (e.g. 40000.40)
    // output: str (e.g. 40.000,40)

    // requires:
    let decimalsMenu = effect("Commas")(1).value; // dropdown

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
```

## Set Prefix

<details>
<summary>Required Effects</summary>

* Dropdown Control "Prefix": `None, String1, String2, Set in Expression`

</details>
```javascript
// input: text string // output: text string

// requires:
let prMenu = effect("Prefix")(1).value; // dropdown with prArr contents
let customStr = "";

let prArr = ["","str1","str2",customStr];
let prStr = prArr[prMenu-1];
return prStr + txt;
```


