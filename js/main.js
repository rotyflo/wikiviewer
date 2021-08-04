$("#query").val("");  // Clear query on refresh

$("#query").on("keydown", function(input) {
  // if 'enter' is pressed
  if (input.keyCode === 13) {
    searchWiki($("#query").val());
  }
});

$("button").on("click", function() {
  searchWiki($("#query").val());
});

function searchWiki(query) {
  let url = `https://en.wikipedia.org/w/api.php?callback=?&action=query&format=json&explaintext&prop=extracts&generator=search&exsentences=1&exintro=1&gsrsearch=${query}`;

  $.getJSON(url, function (api) {
    let pages = api.query.pages;
    let keys = Object.keys(pages);
    let numberOfResults = Object.keys(api.query.pages).length;
    let cards = "";

    for (let i = 0; i < numberOfResults; i++) {
      let title = pages[keys[i]].title;
      let extract = pages[keys[i]].extract;
      let pageid = keys[i];

      cards += `
      <p>
        <a target="_blank" href="https://en.wikipedia.org/?curid=${pageid}">${title}</a>
        <br>
        ${extract}
      </p>
      `;
    }

    return $("#results").html(cards);
  });
}