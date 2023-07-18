//new Glide('.glide').mount()

var searches = [];
let appId = "54521986645452198664";
const cleanSearch = (searchTerm) => {
  let str = searchTerm.replace(/ /g, "-");
  return str;
};

const clearHistory = () => {
  $("#search-results").empty();
};

//Working on api,
// atm has a 2nd parameter to check search type later this type variable will be decided by the val of the dropdown.
// const search = async (searchTerm) => {
//   clearSearch();
//   console.log($("#dropdown").val());

//   // const st = cleanSearch(searchTerm);
//   const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`;

//   console.log(url);

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "444d2ddda8mshf9bee96999e82f2p1c6386jsn9d2170e8e31d",
//       "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   };

//   const response = await fetch(url, options);
//   console.log(response);
//   const result = await response.json();
//   console.log(result);

//   let searchs = result["data"];
//   console.log(searchs);

//   let cardData = [];
//   let formatValue = $("#dropdown").val();

//   console.log(formatValue);
//   if (formatValue === "artist") {
//     let artistId = searchs[0]["artist"]["id"];
//     console.log(artistId);
//     // result.filter();

//     let artistMatches = searchs.filter((data) => {
//       return data["artist"]["id"] === artistId;
//     });

//     console.log(artistMatches);
//     artistMatches.forEach(async (element) => {
//       $("#search-results").append(
//         await getCardElement(
//           element["title"],
//           element["title_short"],
//           element["artist"]["picture"],
//           element["link"]
//         )
//       );
//     });
//   } else if (formatValue === "album") {
//     let albumId = searchs[0]["album"]["id"];
//     console.log(albumId);
//     let albumMatches = searchs.filter((data) => {
//       return data["album"]["id"] === albumId;
//     });
//     console.log(albumMatches);
//     albumMatches.forEach(async (element) => {
//       $("#search-results").append(
//         await getCardElement(
//           element["title"],
//           element["title_short"],
//           element["album"]["cover"],
//           element["link"]
//         )
//       );
//     });
//   } else {
//     searchs.forEach(async (element) => {
//       $("#search-results").append(
//         await getCardElement(
//           element["title"],
//           element["title_short"],
//           element["album"]["cover"],
//           element["link"]
//         )
//       );
//     });
//   }

//   let newUrl = `searchResult.html?q=${cleanSearch(searchTerm)}&f=${formatValue}`;
//   location.assign(newUrl);
// };

// priotty of dropdown value
const getCardElement = async (name, smallName, image, link) => {
  let element = $(`<div class="card">
  <a href="">
  <img src="" alt="card image">

  <h2>Card Name</h2>
      <h3>Card Name</h3>
  </a>
  
</div>`);

  element.find("h2").text(name);
  element.find("h3").text(smallName);
  element.find(`img`).attr("src", image);
  element.find(`a`).attr("href", link);
  element.find(`a`).css("color", "inherit");
  element.find(`a`).css("text-decoration", "inherit");

  console.log(element);
  return element;
};

let startSearch = () => {
  let st = cleanSearch($("#search").val());
  console.log(st);

  let formatValue = $("#dropdown").val();

  let newUrl = `searchResult.html?q=${st}&f=${formatValue}`;
  let urlObject = { term: st, format: formatValue };
  if (!searches.includes(urlObject)) {
    searches.push(urlObject);
  }
  localStorage.setItem("searches", JSON.stringify(searches));
  location.assign(newUrl);
};

const searchHistory = () => {
  $("#search-history-container").empty();
  if (localStorage.getItem("searches")) {
    searches = JSON.parse(localStorage.getItem("searches"));
  }

  let linkHtml = `<li><a>Name</a></li>`;

  for (let index = 0; index < searches.length; index++) {
    const search = searches[index];
    let linkElement = $(linkHtml);

    let format = ": " + search["format"];
    if (format === ": null") {
      format = "";
    }
    let searchText = search["term"] + format;
    linkElement
      .find("a")
      .attr(
        "href",
        `searchResult.html?q=${search["term"]}&f=${search["format"]}`
      );

    linkElement.find("a").text(searchText);
    $("#search-history-container").append(linkElement);
  }

  // remove duplicate links
  var seenLinks = {};
  $("#search-history-container").children().each(function () {
    var link = $(this).text()
    if (seenLinks[link]) $(this).remove();
    else seenLinks[link] = true;
  });
};
searchHistory();
$("#search-button").on("click", startSearch);
