let quotes;
let currentQuote = '',
  currentAuthor = '';
let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];


const getQuotes = async () => {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotes = JSON.parse(jsonQuotes);
        console.log('quotes');
        console.log(quotes);
        // return quotesData.quotes.forEach(quote => quotes.push(quote));
      }
    }
  });
}


function getRandomQuote() {
  return quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
}

function getQuote() {

  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;


  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

  $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');

  $(".quote").animate({
      opacity: 0
    },
    500,
    function () {
      $(this).animate({
        opacity: 1
      }, 500);
      $('#text').text(randomQuote.quote);
    }
  );

  $(".author").animate({
      opacity: 0
    },
    500,
    function () {
      $(this).animate({
        opacity: 1
      }, 500);
      $('#author').html(randomQuote.author);
    }
  );



  let color = Math.floor(Math.random() * colors.length);


  $('html body').css({
    'background-color': colors[color],
    'color': colors[color]
  });


  $('.quote-button').css({
    'background-color': colors[color]
  });
  $('.button').css({
    'color': colors[color]
  });


  // $('.button').css({
  //   'color': colors[color]
  // });
  // $("html body").animate({
  //     backgroundColor: colors[color],
  //     color: colors[color]
  //   },
  //   1000
  // );
  // $(".button").animate({
  //     backgroundColor: colors[color]
  //   },
  //   1000
  // );

}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
})