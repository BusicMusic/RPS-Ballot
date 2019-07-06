/*
Brendon Busic
Software Capstone - ECPI University
*/
/*					-----Personal Notes of Progress-----
	• 2/27/2019:
		- Completely remade the main JS
		- Made sure that the Ballot of 30 cards is randomized
		- Made sure that each of the players' hands are dealt randomly with NO duplicate indexes
		- Coded a function that compares the two cards played and returns the result
	• 3/4/2019:
		- Created the onClick functions for the player cards
		- Edited the spacing of the webpage layout
		- Created the displayMsg function that prints out the result of the round
		- Created the textArea div
		- Edited the cardBack.png and created the Rock, Paper, and Scissors cards
		- Made the first of the three cases for the user asking for cards (only works for playerHand[0])
		- Created a score table for the game that gets displayed in the text box
	• 3/5/2019
		- Fixed the table to only have one (bottom) border
		- Fixed an issue with the scrolling of the textbox and not of the table
		- Created a color scheme for the score table and added a 'loses' column
		- Created the code for changing images based on the value the user has
	• 3/6/2019
		- Edited the code to only allow the user to click on cards AFTER the game has been startd ("Play Game" button has been clicked) 
		- Edited the textArea to have a torn paper background
		- Edited the textArea to display newest items on top
		- Edited the textArea to grey out all but the most current item in the list
		- Made the computer's hand display the card they chose to play once both players select a card
			- !!RESOLVED!! Encountered an error where the game does not always choose the correct winner based on the two cards played. Error in the compareCards() and displayMsg() Functions?
		- Fixed the issue bu editing the if statements in the playCard'X'() functions
	• 3/11/2019
		- Made the other two cards that the player didn't choose flip over to the back
		- Made the card that NPC chooses flip over to the front
		- Made the other cards' function that the user would normally be able to click disabled to avoid confusion
		- Removed the image decoration for images that are not clickable
		- Decided to table the advanced Tie Breaking due to complexity and lack of simplification
		- Made it clearer who won and that you had to press the Play Game button to play again after the first round (maybe make it on a timer after the round has been decided?)
	• 3/12/2019
		- Worked on changing the color of the player's hands' background based on the result of the round
	• 3/13/2019
		- Decided the changing colors was a bit much for the game, so I ditched it
		- Stuck with changing the opacity of the cards that were not played
		- Changed the JavaScript to have one playUserCard function that uses 'this.id' instead of having three functions for playing card 1, 2, and 3
	• 3/18/2019
		- Fixed the bugs in the new playCard function
		- Removed the tieBreaker function entirely
		- Finished creating the GUI of the bidding area
		- Started working on creating the bidding area JavaScript
		- Moved the paper background to the ENTIRE game area instead of JUST the game text area on the right
		- Moved the Draw Cards button to below the players hand
	• 3/19/2019
		- Changed the font style for the playArea to 'Finger Paint'
	• 3/20/2019
		- Finished re-styling the buttons to match the new paper background of the game area
		- Removed the temp-borders of the website and added box-shadows to the game areas
		- Created the functions for the bidding buttons
		- Made the current bid and the player money areas change when the buttons are pressed
		- Created a function that changed the color of the player's money based on its value
		- Fixed an error where the add buttons didn't work correctly; I had my greater than symbols backwards
*Function to flash colors of div elements when they update*
	• 3/25/2019
		- Worked on the function to update the bidding area message that tells the play who won what amount of money
			= Bug in the function that changes the opacity of the older messages; the list.childNodes.length starts at 3 for some reason (SHOULD start at ZERO)
		- 
*/
function hideNavCol(){
	if (document.getElementById("options").style.display!="none"){
		document.getElementById("options").style.display='none';
		document.getElementById("hideNavCol").value='Show the Side Menu';
	}
	else{
		document.getElementById("options").style.display='block';
		document.getElementById("hideNavCol").value='Hide the Side Menu';
	}
}
function hideOverview(){
	if (document.getElementById("overview").style.display!="none"){
		document.getElementById("overview").style.display='none';
		document.getElementById("hideDesc").value='Show the Instructions';
	}
	else{
		document.getElementById("overview").style.display='block';
		document.getElementById("hideDesc").value='Hide the Instructions';
	}
}

{//Setting up initial global variables
	var Cards= [30];
	var playerHand= [3]; 
	var npcHand= [3];
	var roundNum= 0;
	var playerWins= 0, npcWins= 0, ties= 0;
	var result="?"
	
	var playerTotalMoney= 0;
	var npcTotalMoney= 0;
	var userBidAmount= 0;
	var npcBidAmount=0;
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
	/*
	console.log(npcHand[0]);
	console.log(npcHand[1]);
	console.log(npcHand[2]);
	*/
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
		f[x].src="Website_Resources/cardBack1.png"
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
	giveStartingMoney();
	document.getElementById("minus50").disabled=false;
	document.getElementById("minus250").disabled=false;
	document.getElementById("add50").disabled=false;
	document.getElementById("add250").disabled=false;
	colorChange(playerTotalMoney, document.getElementById("userMons"));
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
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
	//var newItemText= document.createTextNode("You played: "+ playerValue+ ". NPC Played: "+ npcValue+ ". Result of Round "+ roundNum+ ": "+ result);
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
		
	//console.log("result: "+ result+ ". playerValue: "+ playerValue+ ". npcCardValue: "+ npcValue);
	
	displayNpcCards(npcValue);
}
function displayNpcCards(npcValue){
	var npcValue= npcValue;
	var npcCardFront= document.getElementById("npcCard"+((npcHand.indexOf(npcValue))+1));
	
	if (npcValue=="Rock")
		npcCardFront.src="Website_Resources/rock.png";
	if (npcValue=="Paper")
		npcCardFront.src="Website_Resources/paper.png";
	if (npcValue=="Scissors")
		npcCardFront.src="Website_Resources/scissors.png";
}
function playCard(playedCard){
	var playedCard= playedCard;
	console.log (playedCard);
	var clickedCard= document.getElementById(playedCard).src;
	//console.log("clickedCard=" +clickedCard);
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
		//console.log(cards[x]);
		if (cards[x]!=playedCard)
			document.getElementById(cards[x]).src=("Website_Resources/cardBack1.png");
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
	//establishBids();
}

//function for changing the card opacity and background colors
function changeGameScene(result){
	var result= result;
	//var d= document.getElementById("npcCards");
	//var e= document.getElementById("playerCards");
	var f= document.getElementsByClassName("cards");
	
	for (var x=0; x<6; x++){
		//console.log(f[x].src);
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
		document.getElementById("userCard1").src="Website_Resources/rock.png";
	else if (playerHand[0]=="Paper")
		document.getElementById("userCard1").src="Website_Resources/paper.png";
	else if (playerHand[0]=="Scissors")
		document.getElementById("userCard1").src="Website_Resources/scissors.png";
	else
		document.getElementById("userCard1").src="Website_Resources/cardBack1.png";
	
	if (playerHand[1]=="Rock")
		document.getElementById("userCard2").src="Website_Resources/rock.png";
	else if (playerHand[1]=="Paper")
		document.getElementById("userCard2").src="Website_Resources/paper.png";
	else if (playerHand[1]=="Scissors")
		document.getElementById("userCard2").src="Website_Resources/scissors.png";
	else
		document.getElementById("userCard2").src="Website_Resources/cardBack1.png";
	
	if (playerHand[2]=="Rock")
		document.getElementById("userCard3").src="Website_Resources/rock.png";
	else if (playerHand[2]=="Paper")
		document.getElementById("userCard3").src="Website_Resources/paper.png";
	else if (playerHand[2]=="Scissors")
		document.getElementById("userCard3").src="Website_Resources/scissors.png";
	else
		document.getElementById("userCard3").src="Website_Resources/cardBack1.png";
}

//Part Three: Bidding Scripts
function giveStartingMoney(){
	playerTotalMoney= 5000;
	npcTotalMoney= 5000;
	bidAmount= 0;
	updateBid(userBidAmount, npcBidAmount, playerTotalMoney, npcTotalMoney);
}
function minus50(){
	if (userBidAmount>=50){
		userBidAmount-=50;
		playerTotalMoney+=50;
	}
}
function minus250(){
	if (userBidAmount>=250){
		userBidAmount-=250;
		playerTotalMoney+=250;
	}
}
function add50(){
	if (playerTotalMoney>=50){
		userBidAmount+=50;
		playerTotalMoney-=50;
	}
}
function add250(){
	if (playerTotalMoney>=250){
		userBidAmount= userBidAmount + 250;
		playerTotalMoney= playerTotalMoney - 250;
	}
	colorChange(playerTotalMoney, document.getElementById("userMons"));
		
	npcTotalMoney= 5000- getNpcBid(userBidAmount);
	console.log("npcTotalMoney: "+ npcTotalMoney);
	colorChange(npcTotalMoney, document.getElementById("npcMons"));
	updateBid(userBidAmount, npcBidAmount, playerTotalMoney, npcTotalMoney);
}

function updateBid(userBidAmount, npcBidAmount, playerTotalMoney, npcTotalMoney){
	var userBidAmount= userBidAmount;
	var npcBidAmount= npcBidAmount;
	var playerTotalMoney= playerTotalMoney;
	var npcTotalMoney= npcTotalMoney;
	document.getElementById("userBidAmount").innerHTML=("Your Bid: $"+ bidAmount);
	document.getElementById("userMons").innerHTML=("$"+ playerTotalMoney);
	document.getElementById("npcBidAmount").innerHTML=("NPC Bid: $"+ npcBidAmount);
	document.getElementById("npcMons").innerHTML=("$"+ npcTotalMoney);	
}
function getNpcBid(userBid){
	var rng=(RNG(4));
	var npcBid;
	switch (rng){
		case 1:
			if (userBid>50)
				npcBid=(userBid-50);
			else
				npcBid+=50;
			break;
		case 2:
			if (userBid>250)
				npcBid=(userBid-250);
			else
				npcBid+=250;
			break;
		case 3:
			if (npcBid<=npcTotalMoney)
				npcBid=(userBid+50);
			else
				npcBid-=50;
			break;
		case 4:
			if (npcBid<=npcTotalMoney)
				npcBid=(userBid+250);
			else
				npcBid-=250;
			break;
		default:
			window.alert=("NPC Bidding Error!!");
			break;
	}
	while ((npcBid<=0)||(npcBid>=5000))
		getNpcBid(userBidAmount);
	return npcBid;
}/*
function updateBidMsg(result){
	var newItem1= document.createElement("Li");
	var listText;
	var list1= document.getElementById("biddingInfo");
		//console.log((list1.childNodes).length);
	
	if (result=="Win"){
		var moneyAmount= 1;
		listText="You have recieved: $"+ moneyAmount+ ".";
		//playerWon();
	}
	else if (result=="Lose"){
		var moneyAmount= -1;
		listText="NPC has recieved: $"+ moneyAmount+ ".";
		//npcWon();
	}
	else if(result=="Tie"){
		var moneyAmount= 0;
		listText="Due to a Tie, both players will recieve their respective bids back.";
		//noWins();
	}
		
	var newItemText1= document.createTextNode(listText);
	newItem1.appendChild(newItemText1);
	list1.insertBefore(newItem1, list1.childNodes[0]);
	//console.log((list1.childNodes).length);
	if ((list1.childNodes.length)>1){
		for (var e=1; e<((list1.childNodes).length); e++){
			//list1.childNodes[e].classList.add("olderListItems");
		}
	}
}
*/
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
	else if (totalCash=="0"){
		console.log(totalCashText+" == 0");
	}
	else{
		window.alert("totalCash Error in colorChange  |  "+ totalCashText+ totalCash);
	}
	//console.log(totalCash+ " | "+ totalCashText.innerHTML);
}

function establishBids(){
	//use bidAmount for the user bid value
	
	
}