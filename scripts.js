

    let quotesData;
    let currentQuote = '';
    let currentAuthor = '';

    const colors = [
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

    function getQuotes() {
        return $.ajax({                                         //jQuery's $.ajax Methode wird verwendet, um eine HTTP-Anfrage an die angegebene URL zu senden.
            headers: { Accept: 'application/json' },           // Akzeptiert ein json 
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            success: function (jsonQuotes){                     // success wird ausgeführt, wenn ajax anfrage erfolgreich ist
                if(typeof jsonQuotes === 'string'){
                    quotesData = JSON.parse(jsonQuotes);
                    console.log('quotesData');
                    console.log(quotesData);
                }
            }
        });
    }

    function getRandomQuote() {
        return quotesData.quotes[
            Math.floor(Math.random() * quotesData.quotes.length)
        ];
    }

    function getQuote() {
        let randomQuote = getRandomQuote();
        
        currentQuote = randomQuote.quotes;
        currentAuthor = randomQuote.author;

        $('#tweet-quote').attr(                     // Gibt dem #tweet-quote den href Attribut 
            'href',                                 // hanshtag quotes, related Parameter schlägt vor mir zu folgen. text definiert den Inhalt
            'https://twitter.com/intent/tweet?hashtags=quotes&related=LHerrmann96&text=' +  
              encodeURIComponent('"' + randomQuote.quote + '"   ' + "- " + currentAuthor)         // hier wird der Text und Author wieder gegeben
          ); 

        
        $('#text').animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').text('"' + randomQuote.quote + '"');
          });

        $("#author").animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
            $("#author").html("- " + randomQuote.author);
        });  


        let randomColor = Math.floor(Math.random() * colors.length);
       $("html body").animate(
        {
            backgroundColor: colors[randomColor],
            color: colors[randomColor]
       }, 1000
       );
       $("button").animate(
        {
            backgroundColor: colors[randomColor],
        }, 1000
       );
    }


$(document).ready(function(){
    getQuotes().then(() => {
        getQuote();
      });
    
      $('#new-quote').on('click', getQuote);
});