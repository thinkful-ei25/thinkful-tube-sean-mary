'use strict'; 

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'; 
const key = 'AIzaSyA9QNhgEjdZ6beCZulcwHDUdTWcItmG3c4'; 

function getDataFromApi(search, callback){
  const query = { q: `${search}`, key : key, part :'snippet'}; 
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function render(result){ 
  return `<img src=${result}></img>`; 
}

function displayTubeData(data){ 
  const results = data.items.map((item) => render(item.snippet.thumbnails.high.url));
  $('#tubeContainer').html(results);
  console.log(data);
}

function watchSubmit() { 
  $('#formInput').submit(function(event){ 
    event.preventDefault(); 
    const val = $('#search').val(); 
    console.log(val);
    getDataFromApi(val, displayTubeData); 
  }); 

}

$(watchSubmit); 
