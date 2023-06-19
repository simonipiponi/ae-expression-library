
```javascript
function autoPos(L, sPosX, sPosY) {
    // description: effectively parents layer to whichever corner of input layer
    // property target: transform>position
    // usage:  autoPos(layer = L, x = "middle", y = "middle");
    let p = L.toComp([0,0,0]),
        r = L.sourceRectAtTime(time);
    switch(sPosX) {
            case "left":
                x = p[0]+r.left;
                break;
            case "middle":
                x = p[0]+r.left+(r.width/2);
                break;
            case "right":
                x = p[0]+r.left+r.width;
                break;
    }	
    switch(sPosY) {
            case "top":
                y = p[1]+r.top;
                break;
            case "middle":
                y = p[1]+r.top+(r.height/2);
                break;
            case "bottom":
                y = p[1]+r.top+r.height;
                break;
    }	
    return [x,y];
}
```
