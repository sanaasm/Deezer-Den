//new Glide('.glide').mount()

var searches = [];
let appId = "54521986645452198664";
const cleanSearch = (searchTerm) => {
  let str = searchTerm.replace(/ /g, "-");
  return str;
};

//Working on api,
// atm has a 2nd parameter to check search type later this type variable will be decided by the val of the dropdown.
const search = async (searchTerm, type) => {
  const artistUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${cleanSearch(
    searchTerm
  )}`;

  const trackUrl = `https://deezerdevs-deezer.p.rapidapi.com/track/${cleanSearch(
    searchTerm
  )}`;

  const albumUrl = `https://deezerdevs-deezer.p.rapidapi.com/album/${cleanSearch(
    searchTerm
  )}`;

  // cant reassign const url. AND CONST IS NEEDED FOR FETCH.
let wrapperUrl
  switch (type) {
    case "artist":
      wrapperUrl = artistUrl;
      break;
    case "album":
      wrapperUrl = albumUrl;
      break;
    case "track":
      wrapperUrl = trackUrl;
      break;

    default:
      break;
  }

  const url = wrapperUrl;


  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "444d2ddda8mshf9bee96999e82f2p1c6386jsn9d2170e8e31d",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      try {
        response = await fetch(trackUrl, options);
        result = await response.json();
        if (!response.ok) {
          try {
            response = await fetch(albumUrl, options);
            result = await response.json();
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    console.log(result);
    // ATM it appends to the row container class, however it does not use the columns.
    $(".row.container").append(await getCardElement(result));
  } catch (error) {
    console.error(error);
  }
};

const getCardElement = async (data) => {
  console.log(data);
  let element = $(`<div class="card">
  <a href="">
      <h2>Card Name</h2>
      <img src="" alt="card image">
  </a>
  
</div>`);
  element.find("h2").text(data["name"]);
  element.find(`img`).attr("src", data["picture"]);
  element.find(`a`).attr("href", data["link"]);
  element.find(`a`).css("color", "inherit");
  element.find(`a`).css("text-decoration", "inherit");
  console.log(element);
  return element;
};

let startSearch = () => {
  let st = cleanSearch($("#search").val());
  console.log(st);
  search(st,'album');
};

$("#search-button").on("click", startSearch);
