const URLAPI = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=00";

const getPokemons = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      writePokemons(json.results), pagination(json.next,json.previous);
    })
    .catch((error) => {
      console.log("Error in Pokemon api: ", error);
    });
};

const writePokemons = (data) => {
  let html = "";
  let c=0;
  data.forEach((e) => {
    let url = e.url;
    c++;
    let draw = getInfoPokemon(url, c);
    html += `<div class="card-body">`;
    html += `<h5 class="card-header">${e.name}</h5>`;
    html += `<div class="card h-100" id="load${c}">
    ${draw}
    `;
    html += `</div>`;
    html += `</div>`;
    html += "</div>";
    console.log(draw);
  });
  document.getElementById("content").innerHTML = html;
};

const getInfoPokemon = (api, c) => {
  let html = "";
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      let h = json.height;
      let w = json.weight;
      let img = json.sprites.other.dream_world.front_default;
      let id=json.id;
      html+=`<div class="idPoke">#${id}</div>`
      html += `<img src="${img}" class="card-img-top" alt="...">`;
      html += '<div class="card-body">';
      html += `<h5 class="card-title">Height: ${h}</h5>`;
      html += `<h5 class="card-title">Weight: ${w}</h5>`;
      html += "</div>";
      html += "</div>";
      document.getElementById(`load${c}`).innerHTML = html;
    })
    .catch((error) => console.log("Error in the image api: ", error));
};

const pagination=(n,p)=>{
  let html="";
  html+=`
  <li class="page-item ${p==null?"disabled":""}"><a class="page-link btn btn-dark" onclick="getPokemons('${p}')"> Prev </a> </li>
  <li class="page-item ${n==null?"disabled":""}"><a class="page-link btn btn-dark" onclick="getPokemons('${n}')"> Next </a> </li>
  `;
  document.getElementById("pagination").innerHTML=html;
};

getPokemons(URLAPI);
