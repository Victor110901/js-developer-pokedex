const content = document.getElementById('content');
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
var offset = 0;
var limit = 9;

async function loadPokemonItens(offset, limit) {
    pokemonAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((convertPokemonToLi)).join('')
        pokemonList.innerHTML += newHtml
    },2000 )
}

function convertPokemonToLi(pokemon) {
    return ` 
    <a class="pokemon-info" href="#${pokemon.name}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img
                    class="${pokemon.name}"
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"
                />
            </div>
        </li>
    </a>
  `
}

async function pokemonsAttributes() {
    pokemonAPI.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(window.location.hash)
        if (window.location.hash == '') {
            location.reload(true)
        }

        const pokemonFilter = pokemons.filter(function (el) {
            return `#${el.name}` == window.location.hash
        });

        console.log(pokemonFilter);

        const attributes = pokemonFilter.map((convertPokemonToLiAttributes)).join('')
        content.innerHTML = attributes
    },2000 )
}

function convertPokemonToLiAttributes(pokemon) {
    return ` 
    <section class="contentAttributes pokemon ${pokemon.type} pokemonAttributes">
            <a class="returnInicial" href=""><i class="fa-solid fa-arrow-left"></i></a>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div>
                <ul class="types displayFlex">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ul>
            </div>
            <div class="imgPokemon">
                <img
                    class="${pokemon.name}"
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"
                />
            </div>
            <div class="attacks">
                <ul>
                    attacks: ${pokemon.attacks.map((attacks) => ` <li>${attacks}</li>`).join('')}
                </ul>
            </div>
            <div class="attributes">
                <ul>
                    <div>    
                        ${pokemon.statsNames.map((statsNames) => `<li>${statsNames}</li>`).join('')}
                    </div>
                    <div class="statsNumbers">
                        ${pokemon.statsNumbers.map((statsNumbers) => `<li>${statsNumbers}</li>`).join('')}
                    </div>
                </ul>
            </div>
    </section>
  `
}

window.addEventListener("hashchange", pokemonsAttributes);

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})