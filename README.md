
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
