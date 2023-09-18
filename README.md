
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


### Dynamic Text Paragraphs (/Custom Line Breaks)

When dealing with Text Boxes in After Effects, lines can break visually, but won't actually break in code. Which means that a Text Box text can't be split by `\r`, which for some presets is quite useful. Also, Text Boxes can't be resized programatically. This adds a Text Box functionality to an ordinary string of text—with a couple of variables you could hook up to Sliders.
Works only with Monospace Fonts, since the width is determined by the number of characters.
>Works only with Monospace Fonts

<sub>Text>Sourcetext</sub>
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

```

![Comp 1](https://github.com/simonipiponi/ae-expression-library/assets/20266941/6763a197-5558-4144-bcaf-4c8bc7adccb0)




### Auto Position to Layer
Effectively parents layer to whichever corner of input layer. Ignores Scale.

<sub> Transform / Position </sub>
```javascript
function autoPos(L, sPosX, sPosY) {
    let p = L.toComp([0,0,0]),
        r = L.sourceRectAtTime(time);
    switch(sPosX) {
		case "left":	x = p[0]+r.left;break;
		case "middle":	x = p[0]+r.left+(r.width/2);break;
		case "right":	x = p[0]+r.left+r.width;break;
    }	
    switch(sPosY) {
		case "top":		y = p[1]+r.top;break;
		case "middle":	y = p[1]+r.top+(r.height/2);break;
		case "bottom":	y = p[1]+r.top+r.height;break;
    }	
    return [x,y];
}
autoPos(layer = thisComp.layer("Layer 1"), x = "left", y = "middle");
```
![Rect](https://github.com/simonheimbuchner/ae-expression-library/assets/20266941/47f0b22f-a4db-48c7-a474-2cc3e3e54d70)

### Auto Position Rectangle
Moves Anchor Point of a rectangle to one of its corners.

<sub> Shape Layer / Group / Position</sub>

```javascript
function autoPosRect(sPosX, sPosY) {
    let s = thisProperty.propertyGroup().size;
    switch(sPosX) {
		case "left":	x = s[0]/2;break;
		case "middle":	x = s[0]/2-s[0]/2;break;
		case "right":	x = s[0]/2*-1;break;
    }	
    switch(sPosY) {
		case "top":		y = s[1]/2;break;
		case "middle":	y = s[1]/2-s[1]/2;break;
		case "bottom":	y = s[1]/2*-1;break;
    }	
    return [x, y]
}
autoPosRect(x = "middle", y = "top");
```
![Rect 3](https://github.com/simonheimbuchner/ae-expression-library/assets/20266941/efa5fa94-1803-40fc-b95a-ac31c24e6768)


### Fit Footage Layer to Composition Size
Works only for Footage Layers, like Compositions, Images, Videos, Solids.

<sub> Transform / Scale </sub>

```javascript
function autoScaleToFitComp() {
	let fH = thisLayer.source.height,fW = thisLayer.source.width,
		cH = thisComp.height,cW = thisComp.width;
	// stretch width and height to comp
	let x = cW/fW*100, y = cH/fH*100;
	// fit to original aspect ration
	x>y?x=cH/fH*100:y=cW/fW*100;
	return [x,y];
}
autoScaleToFitComp()
```

![Comp 4_1](https://github.com/simonheimbuchner/ae-expression-library/assets/20266941/17f6c4ef-5c49-466f-8af2-e6fa0b28bdd4)


### Auto Size Rectangle
Sets rectangle the same size as bounding box of any Layer.

<sub> Shape Layer / Group / Size </sub>
```javascript
function autoSizeRect(L) {
    let rect    =   L.sourceRectAtTime(time),
	    padding =   [50,30];
    return [rect.width+padding[0],rect.height+padding[1]]
}
autoSizeRect(thisComp.layer("Text Layer"))
```

![Comp 5](https://github.com/simonheimbuchner/ae-expression-library/assets/20266941/337e1ee0-69b8-454c-ba93-2d30ecf16478)


