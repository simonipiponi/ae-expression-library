// get expression Library
    // eval(footage("expressionLibrary.txt").sourceText); // get expression library


    // autoPos(layer = L, x = "middle", y = "middle");
function autoPos(L, sPosX, sPosY) {
    // input: Layer object, X ["top","middle","right"], Y ["top","middle","bottom"]
    // property target: position
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

    // autoPosRect(x = "middle", y = "top");
function autoPosRect(sPosX, sPosY) {
    // input: X ["top","middle","right"], Y ["top","middle","bottom"]
    // property target: rectangle position
    let s = thisProperty.propertyGroup().size;

    switch(sPosX) {
            case "left":
                x = s[0]/2;
                break;
            case "middle":
                x = s[0]/2-s[0]/2;
                break;
            case "right":
                x = s[0]/2*-1;
                break;
    }	
    switch(sPosY) {
            case "top":
                y = s[1]/2;
                break;
            case "middle":
                y = s[1]/2-s[1]/2;
                break;
            case "bottom":
                y = s[1]/2*-1;
                break;
    }	
    return [x, y]
}