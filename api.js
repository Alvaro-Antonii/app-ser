//permisos para la api
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIyNTllOWI2YTdlMzBiZDMyMzM0YWI4ZTdlNDJjMCIsInN1YiI6IjY0YTJkOWIwOGUyMGM1MDEyZTg5ZTNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QPKnNiZiMRNNkRtX_6byYKs3g9z-cgs7VS7HZdqX8yA'
    }
  };

//carga el DOM
  document.addEventListener('DOMContentLoaded',e =>{
      fetchData();
  })
  let data1 = "";
  //consumo de datos de la api
  const fetchData = async () =>{
      try {
          const resp = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
          const data = await resp.json();
           data1 = data.results;
          mostrar(data1)
          console.log(data1)
          boton()
          mostrarDi(data1)
          peliReco(data1)
      } catch (error) {
          console.log(error)
      }
      
  }
 
   




  //carga todos los elementos del centro
  const contenedorPrinc = document.querySelector("#contenedor-peliculas")

  const mostrar = data =>{
    const template = document.querySelector("#template-peli").content;
    const fragment = document.createDocumentFragment();
   
    //Para cada elemento
    data.forEach(element => {
      
        template.querySelector("img").setAttribute("src","https://image.tmdb.org/t/p/w500"+element.backdrop_path);
        template.querySelector("h5").textContent = element.title;
        template.querySelector(".rank").textContent = element.vote_average;

        template.querySelector(".titulo-back").textContent = element.title;
        template.querySelector(".descrip").textContent = element.overview;        ;
        template.querySelector(".fecha-estreno").textContent = element.release_date;
        
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
      
      

    })
    contenedorPrinc.appendChild(fragment);

    

}
////////////////////banderas bot//////////////////
let cambiar = false;
let bandEst = 0 ;
let idioma;
let cambiarid = false;
//Boton para diferenciar por popularidad ////////////
const boton = () =>{
  
  const boton = document.querySelector("#entre67")
  boton.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiar = true;
      console.log("funco")
      bandEst = 1;
      mostrarDi(data1)
  })
  const boton2 = document.querySelector("#entre78")
  boton2.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiar = true; 
      console.log("funco")
      bandEst = 2;
      mostrarDi(data1)
  })

  const boton3 = document.querySelector("#entre8")
  boton3.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiar = true; 
      console.log("funco")
      bandEst = 3;
      mostrarDi(data1)
  })

  const boton4 = document.querySelector("#completa")
  boton4.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiar = false;
      cambiarid = false;  
      console.log("funco")
      mostrar(data1)
  })
  
  ///////////////////Idiomas/////////////////////////////

 

  const boton6 = document.querySelector("#en")
  boton6.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiarid = true; 
      console.log("funco")
      idioma = "en";
      mostrarIidoma(data1)
      
  })

  const boton7 = document.querySelector("#ja")
  boton7.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiarid = true; 
      console.log("funco")
      idioma = "ja";
      mostrarIidoma(data1)
      
  })

  const boton8 = document.querySelector("#ko")
  boton8.addEventListener("click", () =>{
      limpiarHtml(contenedorPrinc);
      cambiarid = true; 
      console.log("funco")
      idioma = "ko";
      mostrarIidoma(data1)
      
  })



}
/////////////////////////////////////////////////////////////////////////////

//carga dependiendo de boton estrella//////////////////////////////////////////////
  const contenedorPrincDi = document.querySelector("#contenedor-peliculas")

  const mostrarDi = data =>{
    const template = document.querySelector("#template-peli").content;
    const fragment = document.createDocumentFragment();
    let inf;
    let sup;

    if(bandEst == 1){
      inf = 6
      sup = 7
    } else if( bandEst == 2){
      inf = 7;
      sup = 8;
    } else {
      inf = 8
      sup = 10
    }
    console.log(inf , sup);
    //Para cada elemento
    if(cambiar){
      data.forEach(element => {
        if(element.vote_average >= inf && element.vote_average <=sup){
          template.querySelector("img").setAttribute("src","https://image.tmdb.org/t/p/w500"+element.backdrop_path);
          template.querySelector("h5").textContent = element.title;
          // template.querySelector("span").textContent = element.release_date;
          template.querySelector(".rank").textContent = element.vote_average;
          const clone = template.cloneNode(true);
          fragment.appendChild(clone);
        } 
        
      });
      contenedorPrincDi.appendChild(fragment);

    }
    

  }
//////////////////////////////////////////////////////////////////////////////////////


//limpiar pantalla
const limpiarHtml = (contenedor) =>{
  while(contenedor.firstChild){
      contenedor.removeChild(contenedor.firstChild);
  }
}



//////////////////Peliculas recome/////////////////////////////////////////////////////////

const contePelReco = document.querySelector("#contenedor-peliculas-prefe")
const peliReco = data =>{
  const template = document.querySelector("#template-peli-recom").content;
  const fragment = document.createDocumentFragment();

  //Para cada elemento
  data.forEach(element => {
      if(element.vote_average>=7.5){
        template.querySelector("img").setAttribute("src","https://image.tmdb.org/t/p/w500"+element.backdrop_path);
        template.querySelector("h5").textContent = element.title;
    
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
      }

  })
  contePelReco.appendChild(fragment);


}






/////////////////Filtrar por idioma////////////////////////

const contenedorPrincIdiomas = document.querySelector("#contenedor-peliculas")

const mostrarIidoma = data =>{
  const template = document.querySelector("#template-peli").content;
  const fragment = document.createDocumentFragment();
  console.log("cambiando idio")
  //Para cada elemento
  if(cambiarid){
    
    data.forEach(element => {
      if(element.original_language == idioma){
        template.querySelector("img").setAttribute("src","https://image.tmdb.org/t/p/w500"+element.backdrop_path);
        template.querySelector("h5").textContent = element.title;
        // template.querySelector("span").textContent = element.release_date;
        template.querySelector(".rank").textContent = element.vote_average;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
      }
    })

  }
  
  contenedorPrinc.appendChild(fragment);


}
//////////////////////////////////////////////////////////////////