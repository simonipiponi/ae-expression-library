
### Retime Keyframes To Layer In and Out

Set up two keyframes each: One pair for fading in, one pair for fading out. Apply this expression to the Property. This will automatically move the keyframes to the In- and Out-Points of the Layer. 
Handy for templates or project with a lot of duplicating and retiming layers.
>Overrides easing with Easy Ease.

<sub>Any Property</sub>

```javascript

// Retimes first two keyframes to inPoint of layer, and vice versa for outPoint
// property: any

// change the targeted keyframe indexes 
let kIn = [1,2], kOut = [3,4];
	
let inD=key(kIn[1]).time-key(kIn[0]).time, 
		outD= key(kOut[1]).time-key(kOut[0]).time, 
		o;
	
time<inPoint+inD ? 
	o = ease(time,inPoint,inPoint+inD,key(kIn[0]).value,key(kIn[1]).value) : 
	o = ease(time,outPoint-outD,outPoint,key(kOut[0]).value,key(kOut[1]).value);
o; // output
```

![Comp 6](https://github.com/simonheimbuchner/ae-expression-library/assets/20266941/df2df3b1-cab0-4894-998e-db3446d67f8e)


### Custom Line Breaks in Text Layer (When using Monospace Font)

When dealing with Text Boxes in After Effects, lines can break visually, but won't actually break in code. Which means that a Text Box text can't be split by `\r`, which for some presets is quite useful. Also, Text Boxes can't be resized programatically. This adds a Text Box functionality to an ordinary string of text—with a couple of variables you could hook up to Sliders.
Works only with Monospace Fonts, since the width is determined by the number of characters.

```javascript
// custom line break 

posterizeTime(0); // only calculate once

// line break behaviour
const  	amountOfLines = 99, // how many line breaks are possible
		breakTolerance = 5, // how far to look for whitespaces
		positionToBreakAt = effect("Slider Control")("Slider"), // after how many characters to break
		L = thisLayer; // what layer's sourceText to reference

let str = L.text.sourceText,
	strArray = str.split("");
for(k=0;k<amountOfLines-1;k++){
	let breakPosition;
	for (i=0;i<strArray.length; i++) {
		if(i>(positionToBreakAt*(k+1)-breakTolerance) && strArray[i]==" ") {
			breakPosition = i;
			break;				
		}
	}
	strArray.splice(breakPosition+1,0,"\r");
}
strArray.join("").trim();
}
strArray.join("").trim();

```
