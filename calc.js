var buttonHeight=18.8, buttonWidth=18, maxDisplayLength=20, 
wasPoint=wasResult=false,
calcDisplay=document.getElementById('calcDisplay');
function multiply(memory) {
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='*') {
			memory.splice(i-1,3,Number(memory[i-1])*Number(memory[i+1]));
			break;
		}
	}
	return memory;
}
function divide(memory) {
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='/' && memory[i+1]!='0') {
			memory.splice(i-1,3,Number(memory[i-1])/Number(memory[i+1]));
			break;
		}
		if (memory[i]=='/' && memory [i+1]=='0') {
			memory.splice(0,memory.length,'dividing by zero');
			break;
		}
	}
	return memory;
}
function minus(memory) {
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='-') {
			memory.splice(i-1,3,Number(memory[i-1])-Number(memory[i+1]));
			break;
		}
	}
	return memory;
}
function plus(memory) {
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='+') {
			memory.splice(i-1,3,Number(memory[i-1])+Number(memory[i+1]));
			break;
		}
	}
	return memory;
}
function nextOperation(memory) {
	var operation='none';
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='*'||memory[i]=='/') {
			operation=memory[i];
			break;
		}
	}
	if (operation=='none') {
		for (var i=0; i<memory.length; i++) {
			if (memory[i]=='+'||memory[i]=='-') {
				operation=memory[i];
				break;
			}
		}
	}
	return operation;
}
function calculate(memoryString) {
	console.log(memoryString);
	var memory=memoryString.split(/([\*\/\+\-])/);
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='') {
			memory.splice(i,3,0-memory[i+2]);
		}
	}
	console.log(memory);
	nextOperation(memory);
	while (nextOperation(memory)!='none') {
		switch (nextOperation(memory)) {
			case '*': { 
				multiply(memory); 
				break; 
			}
			case '/': {
				divide(memory);
				break;
			}
			case '-': {
				minus(memory);
				break;
			}
			case '+': {
				plus(memory);
				break;
			}
			default: break;
		}
		console.log(memory);
		nextOperation(memory);
	}
	return memory.join('');
}
function display() {
	if (this.innerHTML=='=' && /\d/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-1])) {
		var result=calculate(calcDisplay.innerHTML);
		calcDisplay.innerHTML=result;
		wasResult=true;
		wasPoint=false;
	}
	if (this.innerHTML=='clear') {
		calcDisplay.innerHTML='0';
		wasResult=false;
		wasPoint=false;
	}
	if (/[\*\+\/]/.test(this.innerHTML) && calcDisplay.innerHTML.length<maxDisplayLength && 
	    /\d/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-1]))  {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			wasResult=false;
			wasPoint=false;
	}
	if (this.innerHTML=='-' && calcDisplay.innerHTML.length<maxDisplayLength) {
			if (calcDisplay.innerHTML=='0') {
				calcDisplay.innerHTML='-';
				wasResult=false;
				wasPoint=false;
			}
			if (/[\*\+\/\d]/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-1])) {
				calcDisplay.appendChild(document.createTextNode('-'));
				wasResult=false;
				wasPoint=false;
			}
	}
	if (/\d/.test(this.innerHTML) && calcDisplay.innerHTML.length<maxDisplayLength) {
		if (!wasResult && calcDisplay.innerHTML!='0' && 
		    !(/[\*\+\/\-]/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-2]) &&
		    calcDisplay.innerHTML[calcDisplay.innerHTML.length-1]=='0')) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
		}
		if (calcDisplay.innerHTML=='0' || wasResult) {
			display=this.innerHTML;
			calcDisplay.innerHTML='';
			calcDisplay.appendChild(document.createTextNode(display));
			wasResult=false;
		}
	}
	if (this.innerHTML=='.') {
		if (calcDisplay.innerHTML.length<maxDisplayLength) {
			if (!wasResult && /\d/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-1]) && !wasPoint) {
				calcDisplay.appendChild(document.createTextNode('.'));
				wasPoint=true;
			}
			if (/[^\d\.]/.test(calcDisplay.innerHTML[calcDisplay.innerHTML.length-1])) {
				calcDisplay.appendChild(document.createTextNode('0.'));
				wasPoint=true;
			}
		}
		if (wasResult) {
			calcDisplay.innerHTML='0.';
			wasResult=false;
			wasPoint=true;
		}
	}
}
for (i=0; i<17;i++) {
	document.getElementsByTagName('button')[i].addEventListener('click',display,false);
}
