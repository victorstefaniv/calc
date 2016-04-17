var buttonHeight=18.8,
	buttonWidth=18,
	maxDisplayLength=20, 
	//memoryString, 
	memory=[], 
	display, 
	wasPoint=wasDigit=wasOperator=wasResult=wasMinus=firstZero=false, 
	start=true,
	body=document.getElementsByTagName('body')[0],
	calc=body.appendChild(document.createElement('div')),
	calcDisplay=calc.appendChild(document.createElement('div'));

document.getElementsByTagName('head')[0].appendChild(document.createElement('title'));
document.getElementsByTagName('title')[0].appendChild(document.createTextNode('Калькулятор'));
body.style.padding=0;
body.style.margin=0;

calc.setAttribute('id','calc');	
calc.style.position='relative';
calc.style.margin='0 auto';
calc.style.padding='1vh';
calc.style.paddingBottom='0';

calc.style.backgroundColor="green";
calc.style.height=99+'vh';

calcDisplay.style.position='float';
calcDisplay.style.padding='0';
calcDisplay.setAttribute('id','calcDisplay');
calcDisplay.style.backgroundColor="gray";
calcDisplay.style.fontFamily='Digital-7';
calcDisplay.style.fontSize=buttonHeight+'vh';
calcDisplay.style.height=buttonHeight+'vh';
calcDisplay.style.textAlign='right';
calcDisplay.innerHTML=0;
calcDisplay.style.marginBottom='1vh';
function setButton(buttonName,float,clearFloat, rightMargin) {
	var createdButton=document.createElement('button');
	createdButton.setAttribute('id',buttonName);
	calc.appendChild(createdButton);
	document.getElementById(buttonName).appendChild(document.createTextNode(buttonName));
	createdButton.style.position='float';
	createdButton.style.float=float;
	createdButton.style.clear=clearFloat;
	createdButton.style.marginRight=rightMargin;
	createdButton.style.marginBottom='1vh';
	createdButton.style.height=buttonHeight+'vh';
	createdButton.style.width=buttonWidth+'%';
}
function multilpy(memoryString) {
	var memory=memoryString.split(''), operandOne=[], operandTwo=[], result;
	for (var i=0; i<memory.length; i++) {
		if (memory[i]=='*') {
			var k=i-1, j=i+1;
			while (memory[k]!='+' && memory[k]!='*' && memory[k]!='/' && memory[k]!=null && memory[k]!=undefined) {
				operandOne.unshift(memory[k]);
				k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (memory[j]!='+' && memory[j]!='*' && memory[j]!='/' && memory[j]!=null && memory[j]!=undefined) {
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
			while (memory[k]!='+' && memory[k]!='*' && memory[k]!='/' && memory[k]!=null && memory[k]!=undefined) {
				operandOne.unshift(memory[k]);
				k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (memory[j]!='+' && memory[j]!='*' && memory[j]!='/' && memory[j]!=null && memory[j]!=undefined) {
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
			while (memory[k]!='+' && memory[k]!='*' && memory[k]!='/' && memory[k]!=null && memory[k]!=undefined) {
					operandOne.unshift(memory[k]);
					k--;
				if (memory[k]=='-' && k>0) {
					break;
				}
			}
			while (memory[j]!='+' && memory[j]!='*' && memory[j]!='/' && memory[j]!=null && memory[j]!=undefined) {
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
			while (memory[k]!='+' && memory[k]!='-' && memory[k]!='*' && memory[k]!='/' && memory[k]!=null && memory[k]!=undefined) {
				operandOne.unshift(memory[k]);
				k--;
			}
			while (memory[j]!='+' && memory[j]!='-' && memory[j]!='*' && memory[j]!='/' && memory[j]!=null && memory[j]!=undefined) {
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
	if((this.innerHTML=='+' || 
		this.innerHTML=='*' || 
		this.innerHTML=='/' 	)    && 
		calcDisplay.innerHTML.length<maxDisplayLength) {
		if (!start		&& 
			wasDigit 		) {
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
	if((this.innerHTML=='1' ||
		this.innerHTML=='2' ||
		this.innerHTML=='3' ||
		this.innerHTML=='4' ||
		this.innerHTML=='5' ||
		this.innerHTML=='6' ||
		this.innerHTML=='7' ||
		this.innerHTML=='8' ||
		this.innerHTML=='9'		) &&
		calcDisplay.innerHTML.length<maxDisplayLength) {
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
setButton(7, 'left', 'none', '2.5%');
setButton(8, 'left', 'none', '2.5%');
setButton(9, 'left', 'none', '2.5%');
setButton('/', 'left', 'none', '2.5%');
setButton('clear', 'left', 'none', '0');
setButton(4, 'left', 'both', '2.5%');
setButton(5, 'left', 'none', '2.5%');
setButton(6, 'left', 'none', '2.5%');
setButton('*', 'left', 'none', '2.5%');
setButton(1, 'left', 'both', '2.5%');
setButton(2, 'left', 'none', '2.5%');
setButton(3, 'left', 'none', '2.5%');
setButton('-', 'left', 'none', '2.5%');
setButton(0, 'left', 'both', '2.5%');
setButton('.', 'left', 'none', '2.5%');
setButton('=', 'left', 'none', '2.5%');
setButton('+', 'left', 'none', '2.5%');
for (i=0; i<17;i++) {
	document.getElementsByTagName('button')[i].addEventListener('click',display,false);
}
