const elementById = (id) => {
const g =  document.getElementById(id);
  return g;
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const keywordValue = keyword.value;
  keyword.value =``;
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keywordValue}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showArtists(data));
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {

    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry :'sory' }</p>
    <p>Style: ${artist.strCountry ? artist.strCountry : 'no found'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums(${artist.idArtist})" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  // console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(datas => showAlbum(datas))
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = ""; 
};

const showAlbum = data => {
  const albumContainer = document.getElementById("albums");
  albumContainer.textContent =``;
data.album.forEach(item => {

  console.log(item.strAlbumThumb)
  const div = document.createElement("div");
  div.classList.add("album");
  div.innerHTML = `
      <div class="album-image-container">
        <img src="${item.strAlbumThumb}" alt=""/>
      </div>
      <div class="album-name">
        <h3>${item.strAlbum}</h3>
      </div>
      `
      albumContainer.appendChild(div);
    });  

};
