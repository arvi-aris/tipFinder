var getDenominations = function(){
	return process.argv[2].split(',').map(function(value){
		return parseInt(value)
	})
};

var isDivisible = function(number1,number2){
	return (number1%number2===0);
}

var getClosestMulitple = function(number1,number2){
	var temp =  number1+(number2/2);
	temp = temp-(temp%number2);
	//console.log(number1,number2,temp)
	return temp;
};

var denominations = getDenominations();
var amount = parseInt(process.argv[3]);

var formulateTable= function(){
	var tip;
	var totalComp=[];
	for(var i=0;i<denominations.length;i++){
		if(isDivisible(amount,denominations[i])){
			totalComp.push([amount/denominations[i],denominations[i],0,0,amount,0]);
			return totalComp;
		}
		var j=(i+1)%denominations.length;
		var k=1;
		var mul = denominations[i];
		while(mul<amount){
			mainset = true;
			var set = false;
			a = amount-mul;
			l=1;
			next = denominations[j];
			while(a>0 && next<a){
				set = true;
				var paid,h,v;
					v = getClosestMulitple(a,next);
					paid = mul+v;
					if(paid>=amount) 
					{	
						if(v==a){
						tip = 0;
						h = v/next;
						}else{
							h = v/next;
							tip = v-a;
						}
						totalComp.push([mul/denominations[i],denominations[i],v/(next/l),next/l,paid,tip]);
				}
				l++;
				next = next*l;
			}	
			if(!set){
				paid = mul + next;
				tip = paid - amount;
				totalComp.push([mul/denominations[i],denominations[i],l,next,paid,tip]);
			}

			k++;	
			mul=denominations[i]*k;
		}
		if(mul>amount){
			paid = mul;
			tip = paid - amount;
			totalComp.push([mul/denominations[i],denominations[i],0,denominations[j],paid,tip]);		
		}
	}
	return totalComp;
};

var sortTable = function(totalComp){
	totalComp.sort(function(a,b){
		return a[5]-b[5];
	})
};

var findBest = function(totalComp){
	return totalComp[0];
};

totalComp = formulateTable();
sortTable(totalComp);
var solution = findBest(totalComp);
console.log("Tips : " + solution[5]);
console.log("Amount to be paid : "+solution[4])
console.log("Explanation : ")
console.log(solution[0] + " coins of " + solution[1] + " and " + solution[2] + " coins of "+solution[3]);
