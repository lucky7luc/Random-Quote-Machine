let quotesArr = [];
let currentAuthor = '';
let currentQuote = '';
let randomQuote = '';

let colors = [
    "#8B4513", // Sattelbraun
    "#556B2F", // Dunkles Olivgrün
    "#4682B4", // Stahlblau
    "#708090", // Schiefergrau
    "#6B8E23", // Olivgrün
    "#2F4F4F", // Dunkles Schiefergrau
    "#8FBC8F", // Dunkles Seegrün
    "#A52A2A", // Braun
    "#D2B48C", // Bräunlich
    "#B0C4DE"  // Hellblau     
];

const fetchQuotes = async () => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
        const result = await response.json();
        quotesArr = result.quotes;
        console.log(quotesArr);
        getRandomQuotes();
    } catch (e) {
        console.log("Error fetching the quotes", e);
    }
};
fetchQuotes();

const getRandomQuotes = () => {
    const randomIndex = Math.floor(Math.random() * quotesArr.length);
    randomQuote = quotesArr[randomIndex];
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    updateUI();
    getRandomColor();
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    $("body").css("background-color", randomColor);
}


const updateUI = () => {
    $("#text").text('"' + currentQuote + '"');
    $("#author").text('- ' + currentAuthor);

    const retweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote}" - ${currentAuthor}`)}`;
    $("#tweet-quote").attr("href", retweetLink);
}

$(document).ready(function() {
    $("#new-quote").click(getRandomQuotes);
});
