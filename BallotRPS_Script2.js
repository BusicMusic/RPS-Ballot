/*All images used are in no way created by me or intended to be used for profit. This is simply a non-profit project that I created for a class project in college. It turned out well so I decided to share it with the internet. Enjoy!*/

{//Setting up initial global variables
	var Cards= [30];
	var playerHand= [3]; 
	var npcHand= [3];
	var roundNum= 0;
	var playerWins= 0, npcWins= 0, ties= 0;
	var result="?"
	
	var playerTotalMoney= 5000;
	var npcTotalMoney= 5000;
	var userBidAmount= 0;
	var npcBidAmount=0;
	
	var highestCashHeld=0;
	var userWinStreak = 0;
}
function resetVariables(){
	Cards= [30];
	playerHand= [3]; 
	npcHand= [3];
	roundNum= 0;
	playerWins= 0, npcWins= 0, ties= 0;
	result="?"
	
	playerTotalMoney= 5000;
	npcTotalMoney= 5000;
	userBidAmount= 0;
	npcBidAmount=0;
	
	highestCashHeld=0;
	userWinStreak = 0;
}
//RNG Function creates a random num between 1 and Scope
function RNG(x){
	var Scope= x;
	var RNG=(Math.floor((Math.random()*Scope)+1));
	return RNG;
}
//Part One: Setting up the game and the hands
function createBallot(){
	var totRock= 0, totPaper= 0, totScissors= 0;
	
	for (var a=0; a<=29; a++){
		Cards[a]= RNG(3);
		switch (Cards[a]){
		case 1:
			Cards[a]= "Rock";
			totRock++;
			break;
		case 2:
			Cards[a]= "Paper";
			totPaper++;
			break;
		case 3:
			Cards[a]= "Scissors";
			totScissors++;
			break;
		default:
			window.alert("ERR! Cards["+ a+ "]= "+ Cards[a]);
		}
	}
	if ((totRock==totPaper)&&(totPaper==totScissors)){
		//CODE FOR HAVING ALL TOTALS EQUAL TO TEN
	}
	console.log("totRock: "+ totRock+ " | totPaper: "+ totPaper+ " | totScissors: "+ totScissors);
}
function dealHands(){
	var cardOne= (RNG(30)-1);
	var cardTwo= (RNG(30)-1);
 	var cardThree= (RNG(30)-1);	
 	var cardFour= (RNG(30)-1);
 	var cardFive= (RNG(30)-1);
 	var cardSix= (RNG(30)-1);
	
	//Making sure that no index of the Cards[] array is used twice
	while ((cardOne==cardTwo)||(cardOne==cardThree)||(cardOne==cardFour)||(cardOne==cardFive)||(cardOne==cardSix))
		cardOne= (RNG(30)-1);
	while ((cardTwo==cardOne)||(cardTwo==cardThree)||(cardTwo==cardFour)||(cardTwo==cardFive)||(cardTwo==cardSix))
		cardTwo= (RNG(30)-1);
	while ((cardThree==cardOne)||(cardThree==cardTwo)||(cardThree==cardFour)||(cardThree==cardFive)||(cardThree==cardSix))
		cardThree= (RNG(30)-1);
	while ((cardFour==cardOne)||(cardFour==cardTwo)||(cardFour==cardThree)||(cardFour==cardFive)||(cardFour==cardSix))
		cardFour= (RNG(30)-1);
	while ((cardFive==cardOne)||(cardFive==cardTwo)||(cardFive==cardThree)||(cardFive==cardFour)||(cardFive==cardSix))
		cardFive= (RNG(30)-1);
	while ((cardSix==cardOne)||(cardSix==cardTwo)||(cardSix==cardThree)||(cardSix==cardFour)||(cardSix==cardFive))
		cardSix= (RNG(30)-1);
	
	playerHand[0]= Cards[cardOne];
	playerHand[1]= Cards[cardTwo];
	playerHand[2]= Cards[cardThree];
	
	npcHand[0]= Cards[cardFour];
	npcHand[1]= Cards[cardFive];
	npcHand[2]= Cards[cardSix];
}

function startGame(){
	createBallot();
	dealHands();
	document.getElementById("gamesPlayed").innerHTML=(roundNum);
	document.getElementById("gamesWon").innerHTML=(playerWins);
	document.getElementById("gamesTied").innerHTML=(ties);
	document.getElementById("npcWins").innerHTML=(npcWins);
	
	
	document.getElementById("userCard1").setAttribute("onClick", "playCard(this.id)");
	document.getElementById("userCard2").setAttribute("onClick", "playCard(this.id)");
	document.getElementById("userCard3").setAttribute("onClick", "playCard(this.id)");
	var f= document.getElementsByClassName("cards");
	for (x=0; x<6; x++){
		f[x].src="cardBack1.png"
		f[x].style.opacity="1.0";
		if (x>2){
			f[x].onmousemove= function(){this.style.boxShadow= "inset 0px 0px 15px 2px rgba(255, 0, 0, 0.6)";}
			f[x].onmouseleave= function(){this.style.boxShadow= "none";}
		}
	}
	changeImages();
	var z= document.getElementById("startBtn");
	z.disabled=true;
	z.style.opacity="0.5";
	document.getElementById("minus50").disabled=false;
	document.getElementById("minus250").disabled=false;
	document.getElementById("add50").disabled=false;
	document.getElementById("add250").disabled=false;
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
}

//Part Two: Allowing both sides to play cards
//Function to compare cards and find the winner - more efficient than typing this up multiple times
function compareCards(cardValue1, cardValue2){
	var card1= cardValue1;
	var card2= cardValue2;
	var ans="?";
	
	if ((card1=="Rock")&&(card2=="Rock")){ans= "Tie";}
	else if ((card1=="Rock")&&(card2=="Paper")){ans="Lose";}
	else if ((card1=="Rock")&&(card2=="Scissors")){ans="Win";}
	
	else if ((card1=="Paper")&&(card2=="Rock")){ans= "Win";}
	else if ((card1=="Paper")&&(card2=="Paper")){ans="Tie";}
	else if ((card1=="Paper")&&(card2=="Scissors")){ans="Lose";}
	
	else if ((card1=="Scissors")&&(card2=="Rock")){ans= "Lose";}
	else if ((card1=="Scissors")&&(card2=="Paper")){ans="Win";}
	else if ((card1=="Scissors")&&(card2=="Scissors")){ans="Tie";}
	
	else{ans="ERROR!";}
		
	roundNum++;
	return ans;
}

function displayMsg(userChosenCard, npcChosenCard, result){
	var playerValue= userChosenCard;
	var npcValue= npcChosenCard;
	var result= result;
	
	var newItem= document.createElement("Li");
	var newItemText= document.createTextNode("Result of Round "+ roundNum+ ": "+ result);
	newItem.appendChild(newItemText);
	
	var list= document.getElementById("gameResultsArea");
	list.insertBefore(newItem, list.childNodes[0]);
	
	if ((list.childNodes.length)>1){
		for (var e=1; e<(list.childNodes.length); e++)
			list.childNodes[e].classList.add("olderListItems");
	}
	
	document.getElementById("gamesPlayed").innerHTML=(roundNum);
	document.getElementById("gamesWon").innerHTML=(playerWins);
	document.getElementById("gamesTied").innerHTML=(ties);
	document.getElementById("npcWins").innerHTML=(npcWins);
	
	displayNpcCards(npcValue);
}
function displayNpcCards(npcValue){
	var npcValue= npcValue;
	var npcCardFront= document.getElementById("npcCard"+((npcHand.indexOf(npcValue))+1));
	
	if (npcValue=="Rock")
		npcCardFront.src="rock.png";
	if (npcValue=="Paper")
		npcCardFront.src="paper.png";
	if (npcValue=="Scissors")
		npcCardFront.src="scissors.png";
}
function playCard(playedCard){
	var playedCard= playedCard;
	console.log (playedCard);
	var clickedCard= document.getElementById(playedCard).src;
	var userChosenCard= determineCardValue(clickedCard);
	function determineCardValue(clickedCard){
		var cardSrc= clickedCard;
		console.log(cardSrc);
		if (cardSrc.indexOf("rock")>-1)
			return "Rock";
		else if (cardSrc.indexOf("paper")>-1)
			return "Paper";
		else if (cardSrc.indexOf("scissors")>-1)
			return "Scissors";
		else
			window.alert("ERROR!!");
	}
	var cards= [document.getElementById("userCard1").id, document.getElementById("userCard2").id, document.getElementById("userCard3").id];
	for (var x=0; x<3; x++){
		if (cards[x]!=playedCard)
			document.getElementById(cards[x]).src=("cardBack1.png");
	}
	
	var npcChosenCard= (npcHand[(RNG(3)-1)]);
	result= compareCards(userChosenCard, npcChosenCard);
	
	updateBidMsg(result);	
	if (result=="Win"){
		playerWins++;
		displayMsg(userChosenCard, npcChosenCard, result);
	}
	else if (result=="Lose"){
		npcWins++;
		displayMsg(userChosenCard, npcChosenCard, result);
	}
	else if (result=="Tie"){
		ties++;
		displayMsg(userChosenCard, npcChosenCard, result);
	}
	changeGameScene(result);
}

//function for changing the card opacity and background colors
function changeGameScene(result){
	var result= result;
	var f= document.getElementsByClassName("cards");
	
	for (var x=0; x<6; x++){
		if ((f[x].src=="file:///H:/SW%20Capstone/Website_Resources/cardBack1.png")||(f[x].src=="file://client/H$/SW%20Capstone/Website_Resources/cardBack1.png")||(f[x].src=="file:///C:/Users/Brendon%20Busic/Dropbox/ECPI%20Classes/SW%20Capstone/Website_Resources/cardBack1.png"))
			f[x].style.opacity="0.5";
		f[x].onmousemove= function(){this.style.boxShadow= "none";}
		f[x].onmouseleave= function(){this.style.boxShadow= "none";}
		f[x].removeAttribute("onclick");
	}	
	var z= document.getElementById("startBtn");
	z.disabled=false;
	z.style.opacity="1.0";
}

function changeImages(){
	if (playerHand[0]=="Rock")
		document.getElementById("userCard1").src="rock.png";
	else if (playerHand[0]=="Paper")
		document.getElementById("userCard1").src="paper.png";
	else if (playerHand[0]=="Scissors")
		document.getElementById("userCard1").src="scissors.png";
	else
		document.getElementById("userCard1").src="cardBack1.png";
	
	if (playerHand[1]=="Rock")
		document.getElementById("userCard2").src="rock.png";
	else if (playerHand[1]=="Paper")
		document.getElementById("userCard2").src="paper.png";
	else if (playerHand[1]=="Scissors")
		document.getElementById("userCard2").src="scissors.png";
	else
		document.getElementById("userCard2").src="cardBack1.png";
	
	if (playerHand[2]=="Rock")
		document.getElementById("userCard3").src="rock.png";
	else if (playerHand[2]=="Paper")
		document.getElementById("userCard3").src="paper.png";
	else if (playerHand[2]=="Scissors")
		document.getElementById("userCard3").src="scissors.png";
	else
		document.getElementById("userCard3").src="cardBack1.png";
}

//Part Three: Bidding Scripts
function minus50(){
	if ((userBidAmount>=50)&&(npcBidAmount>= 50)){
		userBidAmount-=50;
		playerTotalMoney+=50;
		npcBidAmount= npcBidAmount - 50;
		npcTotalMoney= npcTotalMoney + 50;
	}
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	
	updateBidValues(npcBidAmount, userBidAmount);
}
function minus250(){
	if ((userBidAmount>=250) && (npcBidAmount>=250)){
		userBidAmount-=250;
		playerTotalMoney+=250;
		npcBidAmount= npcBidAmount - 250;
		npcTotalMoney= npcTotalMoney + 250;
	}
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	
	updateBidValues(npcBidAmount, userBidAmount);
}
function add50(){
	if ((playerTotalMoney>=50) && (npcTotalMoney>=50)){
		userBidAmount= userBidAmount + 50;
		playerTotalMoney= playerTotalMoney - 50;
		
		npcBidAmount= npcBidAmount + 50;
		npcTotalMoney= npcTotalMoney - 50;
	}
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	
	updateBidValues(npcBidAmount, userBidAmount);
}
function add250(){
	if ((playerTotalMoney>=250) && (npcTotalMoney>=250)){
		userBidAmount= userBidAmount + 250;
		playerTotalMoney= playerTotalMoney - 250;
		
		npcBidAmount= npcBidAmount + 250;
		npcTotalMoney= npcTotalMoney - 250;
	}
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	
	updateBidValues(npcBidAmount, userBidAmount);
}

function colorChange(totalCash, totalCashText){
	var totalCash= totalCash;
	var totalCashText= totalCashText;
	if (totalCash<="1000"){
		totalCashText.style.textShadow=("0px 0px 5px red");
		totalCashText.style.color=("red");
	}
	else if (totalCash<="2000"){
		totalCashText.style.textShadow=("0px 0px 5px orange");
		totalCashText.style.color=("orange");
	}
	else if (totalCash<="3000"){
		totalCashText.style.textShadow=("0px 0px 5px yellow");
		totalCashText.style.color=("GoldenRod");
	}
	else if (totalCash<="5000"){
		totalCashText.style.textShadow=("0px 0px 5px green");
		totalCashText.style.color=("ForestGreen");
	}
	else if ((totalCash>"5000")&&(totalCash<"10000")){
		totalCashText.style.textShadow=("0px 0px 5px black");
		totalCashText.style.color=("white");
	}
	else if (totalCash=="10000"){
		totalCashText.style.textShadow=("0px 0px 5px black");
		totalCashText.style.color=("gold");
		
		//code for stopping and restarting the game
		var winner, roundsPlayed, winStreak;
		if (npcTotalMoney=="10000")
			winner="Computer";
		else if (playerTotalMoney=="10000")
			winner="Player";
		
		roundsPlayed= roundNum;
		
		activateWindow(winner, roundsPlayed, highestCashHeld, userWinStreak);
	}
	else{
		console.log("totalCash Error in colorChange  |  "+ totalCashText.innerHTML+ " | "+ totalCash);
	}
		totalCashText.innerHTML=("$"+totalCash);
}

function updateBidValues(npcBidAmount, userBidAmount){	
	document.getElementById("npcBidAmount").innerHTML=("NPC Bid: $"+ npcBidAmount);
	document.getElementById("userBidAmount").innerHTML=("Your Bid: $"+ userBidAmount);
}
function updateBidMsg(result){
	var newItem1= document.createElement("Li");
	var listText;
	var list1= document.getElementById("biddingInfo");
	
	if (result=="Win"){
		var moneyAmount= 1;
		listText="You have received: $"+ (userBidAmount+npcBidAmount) + ".";
		playerWon();
	}
	else if (result=="Lose"){
		var moneyAmount= -1;
		listText="NPC has received: $"+ (userBidAmount+npcBidAmount) + ".";
		npcWon();
	}
	else if(result=="Tie"){
		var moneyAmount= 0;
		listText="Due to a Tie, both players will receive their respective bids back.";
		noWins();
	}
	
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	
	var newItemText1= document.createTextNode(listText);
	newItem1.appendChild(newItemText1);
	list1.insertBefore(newItem1, list1.childNodes[0]);
	if ((list1.childNodes.length)>1){
		for (var e=1; e<((list1.childNodes).length); e++){
			//list1.childNodes[e].classList.add("olderListItems");
		}
	}
}

function npcWon(){
	npcTotalMoney= npcTotalMoney+ npcBidAmount+ userBidAmount;
	if (playerTotalMoney > highestCashHeld){
		highestCashHeld = playerTotalMoney;
	}
	npcBidAmount= 0;
	userBidAmount= 0;
	updateBidValues(npcBidAmount, userBidAmount);
	if (userWinStreak!=1)
		userWinStreak= 0;
}
function playerWon(){
	playerTotalMoney= playerTotalMoney+ npcBidAmount+ userBidAmount;
	if (playerTotalMoney > highestCashHeld){
		highestCashHeld = playerTotalMoney;
	}
	npcBidAmount= 0;
	userBidAmount= 0;
	updateBidValues(npcBidAmount, userBidAmount);
	userWinStreak++;
}
function noWins(){
	playerTotalMoney= playerTotalMoney+ userBidAmount;
	npcTotalMoney= npcTotalMoney+ npcBidAmount;
	if (playerTotalMoney > highestCashHeld){
		highestCashHeld = playerTotalMoney;
	}
	
	npcBidAmount= 0;
	userBidAmount= 0;
	updateBidValues(npcBidAmount, userBidAmount);
	if (userWinStreak!=1)
		userWinStreak= 0;
}

//Code for the popup window that notifies the user that the game has ended and prompts them to restart
function activateWindow(winner, roundsPlayed, highestCashHeld, userWinStreak){
	var overlay= document.getElementById("endGameResults");
	if (overlay.style.display=="none"){
		overlay.style.display="block";
		populateWindow(winner, roundsPlayed, highestCashHeld, userWinStreak);
	}
	else if (overlay.style.display=="block"){
		overlay.style.display="none";
	}
	
}
function populateWindow(winner, roundsPlayed, highestCashHeld, userWinStreak){
	//changing the winning player's name
	var winnerName= document.getElementById("winner")
	winnerName.innerHTML=(winner);
	if (winner=="Computer"){
		winnerName.style.textShadow=("0px 0px 5px red");
		winnerName.style.color=("gold");
		document.getElementById("lifeResult").innerHTML=("You have lost all your money, better find someone to give you a loan if you want to play again!");
		document.getElementById("resetButton").innerHTML="Get a Loan and Play Again";
	}
	else if (winner=="Player"){
		winnerName.style.textShadow=("0px 0px 5px green");
		winnerName.style.color=("gold");
		document.getElementById("lifeResult").innerHTML=("Congratulations! You have won all the money that your opponent has to offer. Time to find someone else to gamble with!");
		document.getElementById("resetButton").innerHTML="Find Another Gambler";
	}
	
	//changing the number of rounds played
	var roundsPlayedNum= document.getElementById("roundsPlayed");
	roundsPlayedNum.innerHTML=(roundsPlayed);
	
	//changing the amount of total cash the player has held during the game before reaching $0 OR $10,000
	var cashAmount= document.getElementById("highestCash");
	cashAmount.innerHTML=("$"+ highestCashHeld);
	if (highestCashHeld=="10000"){
		cashAmount.style.textShadow=("0px 0px 5px black");
		cashAmount.style.color=("gold");
	}
	
	var streak= document.getElementById("winStreak");
	streak.innerHTML=(userWinStreak);
}
function restartGame(){
	resetVariables();
	activateWindow();
	startGame();
}