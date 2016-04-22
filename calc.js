var buttonHeight=18.8,
	buttonWidth=18,
	maxDisplayLength=20, 
	wasPoint=wasDigit=wasOperator=wasResult=wasMinus=firstZero=false, 
	start=true,
	body=document.getElementsByTagName('body')[0],
	calc=document.getElementById('calc'),
	calcDisplay=document.getElementById('calcDisplay');

function multilpy(memoryString) {
	var memory=memoryString.split(''), operandOne=[], operandTwo=[], result;
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='*') {
			var k=i-1, j=i+1;
			while (/[\d\.\-]/.test(memory[k])) {
				operandOne.unshift(memory[k]);
				k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (/[\d\.\-]/.test(memory[j])) {
				operandTwo.push(memory[j]);
				j++;
				if (memory[j]=='-' && j!=i+1) {
					break;
				}
			}
			break;
		}
	}
	result=Number(operandOne.join(''))*Number(operandTwo.join(''));
	memory.splice(k+1,j-k-1,result);
	return memory.join('');
}
function divide(memoryString) {
	var memory=memoryString.split(''), operandOne=[], operandTwo=[], result;
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='/' && i!=0) {
			var k=i-1, j=i+1;
			while (/[\d\.\-]/.test(memory[k])) {
				operandOne.unshift(memory[k]);
				k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (/[\d\.\-]/.test(memory[j])) {
				operandTwo.push(memory[j]);
				j++;
				if (memory[j]=='-' && j!=i+1) {
					break;
				}
			}
			break;
		}
	}
	result=Number(operandOne.join(''))/Number(operandTwo.join(''));
	memory.splice(k+1,j-k-1,result);
	return memory.join('');
}
function minus(memoryString) {
	var memory=memoryString.split(''), operandOne=[], operandTwo=[], result;
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='-' && i!=0) {
			var k=i-1, j=i+1;
			while (/[\d\.\-]/.test(memory[k])) {
				operandOne.unshift(memory[k]);
				k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (/[\d\.\-]/.test(memory[j])) {
				operandTwo.push(memory[j]);
				j++;
				if (memory[j]=='-' && j!=i+1) {
					break;
				}
			}
			break;
		}
	}
	result=Number(operandOne.join(''))-Number(operandTwo.join(''));
	memory.splice(k+1,j-k-1,result);
	return memory.join('');
}
function plus(memoryString) {
	var memory=memoryString.split(''), operandOne=[], operandTwo=[], result;
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='+' && i!=0) {
			var k=i-1, j=i+1;
			while (/[\d\.]/.test(memory[k])) {
				operandOne.unshift(memory[k]);
				k--;
			}
			while (/[\d\.]/.test(memory[j])) {
				operandTwo.push(memory[j]);
				j++;
			}
			break;
		}
	}
	result=Number(operandOne.join(''))+Number(operandTwo.join(''));
	memory.splice(k+1,j-k-1,result);
	return memory.join('');
}
function nextOperation(memoryString) {
	var memory=memoryString.split(''), operation='none';
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='*'||memory[i]=='/') {
			operation=memory[i];
			break;
		}
	}
	if (operation=='none') {
		for (var i=1; i<memory.length; i++) {
			if (memory[i]=='+'||memory[i]=='-') {
				operation=memory[i];
				break;
			}
		}
	}
	return operation;
}
function calculate(memoryString) {
	nextOperation(memoryString);
	while (nextOperation(memoryString)!='none') {
		switch (nextOperation(memoryString)) {
			case '*': { 
				memoryString=multilpy(memoryString); 
				break; 
			}
			case '/': {
				memoryString=divide(memoryString);
				break;
			}
			case '-': {
				memoryString=minus(memoryString);
				break;
			}
			case '+': {
				memoryString=plus(memoryString);
				break;
			}
			default: break;
		}
		nextOperation(memoryString);
	}
	return memoryString;
}
function display() {
	if (this.innerHTML=='=' && 
		wasDigit				) {
		var result=calculate(calcDisplay.innerHTML);
		calcDisplay.innerHTML=result;
		
		wasResult=true;
		wasDigit=false;
		wasPoint=false;
		wasMinus=false;
		wasOperator=false;
		start=false;
		firstZero=false;
		
	}
	if (this.innerHTML=='clear') {
		calcDisplay.innerHTML='0';
		
		wasResult=false;
		wasDigit=false;
		wasPoint=false;
		wasMinus=false;
		wasOperator=false;
		start=true;
		firstZero=false;
		
	}
	if(/[\*\+\/]/.test(this.innerHTML) && calcDisplay.innerHTML.length<maxDisplayLength) {
		if (!start && wasDigit) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=false;
			wasPoint=false;
			wasMinus=false;
			wasOperator=true;
			start=false;
			firstZero=false;
			
		}
	}
	if (this.innerHTML=='-'    && 
		calcDisplay.innerHTML.length<maxDisplayLength) {
		if (start) {
			calcDisplay.innerHTML='';
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));

			wasResult=false;
			wasDigit=false;
			wasPoint=false;
			wasMinus=true;
			wasOperator=false;
			start=false;
			firstZero=false;
			
		}
		if (!start					&& 
			(wasOperator||wasDigit)		) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=false;
			wasPoint=false;
			wasMinus=true;
			wasOperator=false;
			start=false;
			firstZero=false;
			
		}
	}
	if     (/[1-9]/.test(this.innerHTML) && calcDisplay.innerHTML.length<maxDisplayLength) {
		if (!start 		&&
			!wasResult	&&
			!firstZero		) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=false;
		}
		if (start) {
			display=this.innerHTML;
			calcDisplay.innerHTML='';
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=false;
			
		}
		
	}
	if (this.innerHTML=='0' &&
		calcDisplay.innerHTML.length<maxDisplayLength) {
		if (!start 					&&
			(wasOperator||wasMinus)		) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=true;
		}
		if (!start 					&&
			(wasDigit||wasPoint)	&&
			!firstZero					) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=false;
		}
	}
	if (this.innerHTML=='.' && 
		calcDisplay.innerHTML.length<maxDisplayLength) {
		if (start 		&&
			!wasPoint		) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=false;
			wasPoint=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=false;
		}
		if (!start 		&&
			wasDigit	&&
			!wasPoint		) {
			display=this.innerHTML;
			calcDisplay.appendChild(document.createTextNode(display));
			
			wasResult=false;
			wasDigit=false;
			wasPoint=true;
			wasMinus=false;
			wasOperator=false;
			start=false;
			firstZero=false;
		}
		
	}
}
for (i=0; i<17;i++) {
	document.getElementsByTagName('button')[i].addEventListener('click',display,false);
}
