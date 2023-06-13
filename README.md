# ae-expression-library

This repository is a collection of After Effects Expressions.
You are free to use, adapt, whatever.

### Retime Keyframes To Layer In and Out

Set up two keyframes each: One pair for fading in, one pair for fading out. Apply this expression to the Property. This will automatically move the keyframes to the In- and Out-Points of the Layer.

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
