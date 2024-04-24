function renderTemplate(name, typo, images, t) {
  // Erstelle HTML-Element und füge es zum pokekontent-Container hinzu
  let pokeCard = document.createElement('div');
  pokeCard.id = name;
  pokeCard.className = 'pokeCard';
  pokeCard.innerHTML = `
      <div class="FormateCard" onclick="PopUp(${t})">
      <div><img class="mimgh" src="${images}" alt="" srcset=""></div>
      <div class="mei">
      <div>${name.charAt(0).toUpperCase() + name.slice(1)}</div>
      <div class="mas">${typo}</div>
      </div>
      </div>
  `;

  // Füge die Hintergrundfarbe basierend auf dem Pokémon-Typ hinzu
  if (toggleIf == 0 && ColorBasedOnType.Colors.hasOwnProperty(onetype[t])) {
    let color = ColorBasedOnType.Colors[onetype[t]];
    pokeCard.style.backgroundColor = color;
  }
  else if (toggleIf == 1 && ColorBasedOnType.Colors.hasOwnProperty(newOneType[t])) {
    let newColor = ColorBasedOnType.Colors[newOneType[t]];
    pokeCard.style.backgroundColor = newColor;

  }
  document.getElementById('pokekontent').appendChild(pokeCard);

}

function PoPUpTemplate(t) {
  document.getElementById('PopUp').innerHTML = `
  <div class="pos">
    <div id="cold" class="mai" onclick="closePopUp()">
      <div id="zui" class="set" onclick="popUpCloseDeactivated(event)">
         <div class="FirstHalf">
          <div id="defnames${t}" class="PopUpName">${names[t]}</div>
          <div id="images${t}" class="centerImg"><img class="PokImg" src="${ImagesOfPokemon[t]}" alt="" srcset=""></div>
          <div class="StyleSection">
              <p onclick="stats(${t})" class="maet">Stats</p>
              <p onclick="movesOfPokemon(${t})" class="maet">Moves</p>
          </div>
          </div>
          <div class="LeftRightStyle">
              <span onclick="swipeLeft(${t})"><img class="LeftRightIcons" src="./img/left.svg" alt="" srcset=""></span>
              <span onclick="swipeRight(${t})"><img class="LeftRightIcons" src="./img/right.svg" alt="" srcset=""></span>
          </div>    
          <div class="SecHalf">
          <div id="ViewSec${t}" class="centerChart">
            <p></p>
          </div>
         
          </div>
      </div>
     </div>
  </div>
  `;

  if (ColorBasedOnType.Colors.hasOwnProperty(onetype[t])) {
    let color = ColorBasedOnType.Colors[onetype[t]];
    document.getElementById('zui').style.backgroundColor = color;
  }

  if (toggleIf == 1 && ColorBasedOnType.Colors.hasOwnProperty(newOneType[t])) {
    document.getElementById(`defnames${t}`).innerHTML = `${SearchOrder[t]}`;
    document.getElementById(`images${t}`).innerHTML = `<img class="PokImg" src="${filteredImages[t]}" alt="" srcset="">`;
    let filtcolor = ColorBasedOnType.Colors[newOneType[t]];
    document.getElementById('zui').style.backgroundColor = filtcolor;
  }
}

function NoneSearchStats(ctx, i) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: filteredStatNames[i],
      datasets: [{
        label: '',
        data: filteredBaseStats[i],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)',
          'rgba(54, 162, 235)',
          'rgba(153, 102, 255)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function SearchStats(ctx, i) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: namesOfStats[i],
      datasets: [{
        label: '',
        data: baseStats[i],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)',
          'rgba(54, 162, 235)',
          'rgba(153, 102, 255)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
