const fetchurl = 'https://arfp.eu/dataset/voyages.json';
const xhrholder= document.querySelector("#xhrholder");
const fetchholder= document.querySelector("#fetchholder");
const axiosholder =document.querySelector("#axiosholder");
const buttonxhr = document.querySelector('#xhr');
const buttonfetch = document.querySelector('#fetch');
const buttonaxios = document.querySelector('#axios');
const buttonclear = document.querySelector('#clear');

let displayholder = function (holderok,  ...holderko){
    if (holderok != null) {holderok.style.display="block";}
    holderko.forEach(holder => holder.style.display ="none" );
};


buttonxhr.addEventListener("click", function(){displayholder(xhrholder,fetchholder,axiosholder)} );
buttonfetch.addEventListener("click", function(){displayholder(fetchholder,xhrholder,axiosholder)} );
buttonaxios.addEventListener("click", function(){displayholder(axiosholder,fetchholder,xhrholder)} );
buttonclear.addEventListener("click", function(){displayholder(null, axiosholder,fetchholder,xhrholder)} );


function toHtmlArticle (item){
    const element = document.createElement('div');
    element.className="item";
    const title = document.createElement('h2');
    title.className="title";
    title.textContent=item.titre.toUpperCase();
    const contentdiv= document.createElement("div");
    contentdiv.className="content";
    const img = document.createElement("img");
    img.className = "imgarticle";
    img.src = "./resources/img/img"+ item.id + ".jpg";
    const descridiv = document.createElement("div");
    const description = document.createElement("p");
    description.className="description";
    description.textContent= item.description;
    const buttonart = document.createElement("button");
    buttonart.className="butart"
    buttonart.id="butart" + item.id;
    buttonart.textContent="Lire la suite";

    descridiv.append(description);
    descridiv.append(buttonart);
    contentdiv.append(img);
    contentdiv.append(descridiv);
    element.append(title);
    element.append(contentdiv);
    return element;
} 

function onLoadJson(array, holder) { 
    array.forEach(item => holder.append(toHtmlArticle(item))); 
}

// XHR PART
let req = new XMLHttpRequest();
req.onload =function (){    
    onLoadJson(JSON.parse(this.responseText), xhrholder);
};
req.open("GET", fetchurl,true);
req.send();

// API FETCH PART 
fetch(fetchurl)
.then(response => response.json())
.then(function(json) {
    onLoadJson(json, fetchholder);
});


// API AXIOS PART
axios({
    method: 'get',
    url: fetchurl,
    responseType: 'json'
  })
.then(response => onLoadJson(response.data, axiosholder));
    
//init
displayholder(null, axiosholder, xhrholder, fetchholder);