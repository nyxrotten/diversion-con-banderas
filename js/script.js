const countriesList = document.getElementById("countries-list");
const ulDOM = document.createElement("ul");
const close = document.getElementById("close");
const liDOM = document.createElement("li");
const show = document.getElementById("show");

const getFlags = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3/all");
    if (!response.ok) {
      throw new Error("Error de API", response.status);
    }
    const data = await response.json();

    //Crear los objetos con los elementos clave-valor necesarios

    const paises = data.map((pais) => ({
      nombre: pais.name.common,
      bandera: pais.flags[1],
      capital: pais.capital,
      poblacion: pais.population,
      circulacion: pais.car.side,
    }));

    //Ordenar alfabeticamente

    paises.sort(function (a, b) {
      if (a.nombre < b.nombre) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      }
      return 0;
    });

    //Añadir un ul dentro del div con class countriesList

    countriesList.append(ulDOM);

    //Crear las cajitas con la banera y el nombre del país

    paises.forEach((pais) => {
      const liDOM = document.createElement("li");
      liDOM.innerHTML = `<img class="bandera" src="${pais.bandera}">
    <h2 class="nombrePais">${pais.nombre}</h2>`;

      ulDOM.append(liDOM);

      /* OTRA MANERA DE HACERLO:
    
    ulDOM.innerHTML += `
      <li class="paisInfo">
          <img class="bandera" src="${pais.bandera}">
          <h2 class="nombrePais">${pais.nombre}</h2>
      </li>
      ` */
      liDOM.classList.add('liDOM')
      liDOM.addEventListener("click", () => {
        show.innerHTML = `<div id ="caja">
          <section id="izq">
          <img src="${pais.bandera}">
          <button id="close">Close</button>
          </section>
          <section id="der">
            <ul id="ulPaisIndividual">
              <li class="liPaisIndividual">${pais.nombre}</li>
              <li class="liPaisIndividual"><i class="fa-solid fa-landmark"></i> Capital: ${pais.capital}</li>
              <li class="liPaisIndividual"><i class="fa-solid fa-person"></i> Population: ${pais.poblacion}</li>
              <li class="liPaisIndividual"><i class="fa-solid fa-car"></i> Driving side: ${pais.circulacion}</li>
            </ul>
          </section>
      </div>`;
        show.classList.remove("hidden");

        let boton = document.getElementById("close");
        boton.addEventListener("click", () => {
          show.classList.add("hidden");
        });
      });
    });
  } catch (error) {
    console.log("Error", error);
  }
};

getFlags();
