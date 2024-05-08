$(document).ready(function() {
 const totalImagesPerCategory = 25;
 const gridSize = 5 * 5;
 const totalMatchesNeeded = 25;

 let images = [];
 let matchesFound = 0;
 let usedImages = [];

 function loadImages() {
  const categories = ["animals", "birds", "fish"];
  images = [];
  const selectedIndexes = new Set();
  while (selectedIndexes.size < gridSize) {
   const categoryIndex = Math.floor(Math.random() * categories.length);
   const selectedCategory = categories[categoryIndex];
   const randomImageIndex = Math.floor(Math.random() * totalImagesPerCategory) + 1;
   const imagePath = `Image/${selectedCategory}/${randomImageIndex}.jpg`;
   if (!selectedIndexes.has(randomImageIndex)) {
    images.push(imagePath);
    selectedIndexes.add(randomImageIndex);
   }
  }
  images = shuffle(images);
 }

 function generateGameBoard() {
  const gameBoard = $("#game-board");
  gameBoard.empty();
  for (let i = 0; i < gridSize; i++) {
   const imgIndex = i % images.length;
   const imgSrc = images[imgIndex];
   const block = $("<div></div>").addClass("game-block").css("background-image", `url(${imgSrc})`);
   gameBoard.append(block);
  }
  gameBoard.css("grid-template-columns", `repeat(${Math.sqrt(gridSize)}, 1fr)`);
 }

 function generateCurrentImage() {
  const currentImageContainer = $("#current-image");
  currentImageContainer.empty();

  let imgSrc;
  do {
   imgSrc = images[Math.floor(Math.random() * images.length)];
  } while (usedImages.includes(imgSrc));
  usedImages.push(imgSrc);

  const img = $("<img>").attr("src", imgSrc).addClass("current-image");
  currentImageContainer.append(img);
 }

 function checkMatch() {
  matchesFound++;
  if (matchesFound === totalMatchesNeeded) {
   alert("Вітаємо! Ви завершили гру!");
   location.reload();
  } else {
   generateCurrentImage();
  }
 }

 function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
 }

 $(document).on("click", "#restart-button", function() {
  location.reload();
 });

 $(document).on("dragstart", ".game-block", function(event) {
  event.originalEvent.dataTransfer.setData("text/plain", $(this).css("background-image"));
 });

 $(document).on("drop", ".game-block", function(event) {
  event.preventDefault();
  const draggedImageSrc = event.originalEvent.dataTransfer.getData("text/plain");
  const targetImageSrc = $(this).css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
  if (draggedImageSrc === targetImageSrc) {
   $(this).fadeOut("fast", function() {
    $(this).remove();
    checkMatch();
   });
  }
 });

 $(document).on("dragover", ".game-block", function(event) {
  event.preventDefault();
 });

 loadImages();
 generateGameBoard();
 generateCurrentImage();
});