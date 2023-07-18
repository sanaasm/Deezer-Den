//new Glide('.glide').mount()

var searches = [];
let appId = "54521986645452198664";
const cleanSearch = (searchTerm) => {
  let str = searchTerm.replace(/ /g, "-");
  return str;
};

const clearSearch = () => {
  $("#search-results").empty();
};

//Working on api,
// atm has a 2nd parameter to check search type later this type variable will be decided by the val of the dropdown.
const display = async () => {
  console.log("start search");
  clearSearch();

  var searchParamsArr = document.location.search.split("&");
  console.log(searchParamsArr);
  // Get the query and format values
  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();
  console.log(query, format);


  // const st = cleanSearch(searchTerm);
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

  console.log(url);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "444d2ddda8mshf9bee96999e82f2p1c6386jsn9d2170e8e31d",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  console.log(response);
  const result = await response.json();
  console.log(result);

  let searchs = result["data"];
  console.log(searchs);

  let cardData = [];
  let formatValue = format;

  console.log(formatValue);
  if (formatValue === "artist") {
    let artistId = searchs[0]["artist"]["id"];
    console.log(artistId);
    // result.filter();

    let artistMatches = searchs.filter((data) => {
      return data["artist"]["id"] === artistId;
    });

    console.log(artistMatches);
    artistMatches.forEach(async (element) => {
      $("#search-results").append(
        await getCardElement(
          element["title"],
          element["title_short"],
          element["artist"]["picture"],
          element["link"]
        )
      );
    });
  } else if (formatValue === "album") {
    let albumId = searchs[0]["album"]["id"];
    console.log(albumId);
    let albumMatches = searchs.filter((data) => {
      return data["album"]["id"] === albumId;
    });
    console.log(albumMatches);
    albumMatches.forEach(async (element) => {
      $("#search-results").append(
        await getCardElement(
          element["title"],
          element["title_short"],
          element["album"]["cover"],
          element["link"]
        )
      );
    });
  } else {
    searchs.forEach(async (element) => {
      $("#search-results").append(
        await getCardElement(
          element["title"],
          element["title_short"],
          element["album"]["cover"],
          element["link"]
        )
      );
    });
  }

};

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

// get url strip
// get format Strip

// search takes the two values
display();
