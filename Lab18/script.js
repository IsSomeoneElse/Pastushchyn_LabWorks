$(document).ready(function() {
 var sizes = ['12px', '14px', '18px', '22px', '24px'];

 function getRandomSize() {
  return sizes[Math.floor(Math.random() * sizes.length)];
 }

 function generateRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
 }

 function numberClicked() {
  var selectedNumber = parseInt($(this).text());
  if (selectedNumber === clickedNumbers.length + 1) {
   $(this).css("color", "#F0FFFF");
   clickedNumbers.push(selectedNumber);
   if (clickedNumbers.length === 25) {
    var timeTaken = 60 - parseInt(timeDisplay.text());
    attempts.push(timeTaken);
    updateLeaderboard();
    alert("Ви виграли! Вітаємо!");
    clearInterval(timerInterval);
    location.reload();
   }
  } else {
   alert("Не вірне число! Спробуйте ще раз.");
  }
 }

 function shuffleNumbers() {
  var numbers = [];
  for (var i = 1; i <= 25; i++) {
   numbers.push(i);
  }
  for (var i = numbers.length - 1; i > 0; i--) {
   var j = Math.floor(Math.random() * (i + 1));
   [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
 }

 function updateLeaderboard() {
  var leaderboardTable = $("#leaderboard-table");
  leaderboardTable.empty();
  leaderboardTable.append("<tr><th>Гра</th><th>Час залишку</th></tr>");
  for (var i = 0; i < attempts.length; i++) {
   var row = $("<tr>");
   var time = attempts[i];
   row.append("<td>Спроба " + (i + 1) + "</td>");
   row.append("<td>" + time + " с</td>");
   leaderboardTable.append(row);
  }
  var bestTime = Math.min(...attempts);
  $("td:contains('" + bestTime + " с')").parent().css("background-color", "yellow");
 }

 var gameBoard = $("#game-board");
 var clickedNumbers = [];
 var attempts = [];
 var shuffledNumbers = shuffleNumbers();
 for (var i = 0; i < 25; i++) {
  var number = shuffledNumbers[i];
  var numberBlock = $("<div>").text(number).addClass("number-block");
  numberBlock.css({
   fontSize: getRandomSize(),
   color: generateRandomColor()
  });
  numberBlock.click(numberClicked);
  gameBoard.append(numberBlock);
 }

 var timeDisplay = $("#time-remaining");
 var timerInterval = setInterval(function() {
  var timeLeft = parseInt(timeDisplay.text());
  timeLeft--;
  if (timeLeft < 0) {
   clearInterval(timerInterval);
   alert("Час вичерпано! Гра завершена.");
  } else {
   timeDisplay.text(timeLeft);
  }
 }, 1000);

 $("#restart-button").click(function() {
  location.reload();
 });
});