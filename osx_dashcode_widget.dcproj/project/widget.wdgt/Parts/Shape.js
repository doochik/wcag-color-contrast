/* 
 This file was generated by Dashcode and is covered by the 
 license.txt included in the project.  You may edit this file, 
 however it is recommended to first turn off the Dashcode 
 code generator otherwise the changes will be lost.
 */

// Note: Properties and methods beginning with underbar ("_") are considered private and subject to change in future Dashcode releases.

function CreateShape(elementOrID, spec)
{
    var shapeElement = elementOrID;
    if (elementOrID.nodeType != Node.ELEMENT_NODE) {
        shapeElement = document.getElementById(elementOrID);
    }
	if (!shapeElement.loaded) {
		shapeElement.loaded = true;
        // when cloning template, get size from original
        var styleElement = shapeElement;
        if (spec.originalID) {
            styleElement = document.getElementById(spec.originalID);
        }
		var prefix = "Parts/Images/" + styleElement.id + "_";
		var height = dashcode.getElementHeight(styleElement) || 20;
		var leftImageWidth = spec.leftImageWidth || 0;
		var rightImageWidth = spec.rightImageWidth || 0;
        var leftImage = spec.noBackground ? "" : prefix + "left.png";
        var middleImage = spec.noBackground ? "" : prefix + "middle.png";
        var rightImage = spec.noBackground ? "" : prefix + "right.png";
		shapeElement.object = new Shape(shapeElement, height, leftImageWidth, rightImageWidth, leftImage, middleImage, rightImage);
		
		return shapeElement.object;
	}
}

function Shape(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight)
{
	this._init(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight);
}

Shape.prototype.remove = function()
{
	var parent = this._container.parentNode;
	parent.removeChild(this._container);
}

Shape.prototype._init = function(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight)
{
    if (shape) {
        this.element = shape;
        this._imgLeftPath = imgLeft;
        this._imgMiddlePath = imgMiddle;
        this._imgRightPath = imgRight;

        var style = null;
        var element = null;

        while (shape.firstChild) {
            shape.removeChild(shape.firstChild);
        }
        var container = document.createElement("div");
        this._container = container;

        shape.appendChild(container);
        
        // Create the inner elements	
        var element = document.createElement("div");
        var style = element.style;
        style.position = "absolute";
        style.display = "inline-block";
        style.height = height + "px";
        style.width = leftImageWidth + "px";
        if (this._imgLeftPath && this._imgLeftPath.length) {
            style.background = "url(" + this._imgLeftPath + ") no-repeat top left";
        } else {
            style.background = "";
        }
        container.appendChild(element);
        
        element = document.createElement("div");
        style = element.style;
        style.position = "absolute";
        style.display = "inline-block";
        style.backgroundRepeat = "repeat-x";
        style.lineHeight = height + "px";
        style.height = height + "px";
        style.left = leftImageWidth + "px";
        style.right = rightImageWidth + "px";
        style.overflow = "hidden";
        style.width = "auto";
        style.whiteSpace = "nowrap";
        if (this._imgMiddlePath && this._imgMiddlePath.length) {
            style.backgroundImage = "url(" + this._imgMiddlePath + ")";
        } else {
            style.backgroundImage = "";
        }
        container.appendChild(element);
        
        element = document.createElement("div");
        style = element.style;
        style.position = "absolute";
        style.display = "inline-block";
        style.height = height + "px";
        style.width = rightImageWidth + "px";
        style.right = 0 + "px";
        if (this._imgRightPath && this._imgRightPath.length) {
            style.background = "url(" + this._imgRightPath + ") no-repeat top left";
        } else {
            style.background = "";
        }
        container.appendChild(element);

        style = container.style;
        style.left = 0;
        style.right = 0;
        style.width = "auto";
        style.height = height + "px";
    }
}

Shape.prototype._updateImages = function(height, leftImageWidth, rightImageWidth)
{
	this._container.style.height = height + "px";
	
	var leftDiv = this._container.children[0];
	leftDiv.style.height = height + "px";
	leftDiv.style.width = leftImageWidth + "px";
    if (this._imgLeftPath && this._imgLeftPath.length) {
        leftDiv.style.background = "url(" + this._imgLeftPath + ") no-repeat top left";
    } else {
        leftDiv.style.background = "";
    }
	
	var middleDiv = this._container.children[1];
	middleDiv.style.height = height + "px";
	middleDiv.style.left = leftImageWidth + "px";
	middleDiv.style.right = rightImageWidth + "px";
    if (this._imgMiddlePath && this._imgMiddlePath.length) {
        middleDiv.style.backgroundImage = "url(" + this._imgMiddlePath + ")";
    } else {
        middleDiv.style.backgroundImage = "";
    }
	
	var rightDiv = this._container.children[2];
	rightDiv.style.height = height + "px";
	rightDiv.style.width = rightImageWidth + "px";
	rightDiv.style.right = 0 + "px";
    if (this._imgRightPath && this._imgRightPath.length) {
        rightDiv.style.background = "url(" + this._imgRightPath + ") no-repeat top left";
    } else {
        rightDiv.style.background = "";
    }
}
