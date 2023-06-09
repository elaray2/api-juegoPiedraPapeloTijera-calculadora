class PokemonApp {
    constructor() {
        this.listaPokemon = document.querySelector("#listaPokemon");
        this.botonesHeader = document.querySelectorAll(".btn-header");
        this.URL = "https://pokeapi.co/api/v2/pokemon/";

        this.cargarPokemon();

        this.botonesHeader.forEach(boton => {
            boton.addEventListener("click", (event) => {
                const botonId = event.currentTarget.id;

                this.listaPokemon.innerHTML = "";

                for (let i = 1; i <= 151; i++) {
                    this.fetchPokemon(i)
                        .then(data => {
                            if (botonId === "ver-todos") {
                                this.mostrarPokemon(data);
                            } else {
                                const tipos = data.types.map(type => type.type.name);
                                if (tipos.some(tipo => tipo.includes(botonId))) {
                                    this.mostrarPokemon(data);
                                }
                            }
                        });
                }
            });
        });
    }

    cargarPokemon() {
        for (let i = 1; i <= 151; i++) {
            this.fetchPokemon(i)
                .then(data => this.mostrarPokemon(data));
        }
    }

    fetchPokemon(pokemonId) {
        const url = this.URL + pokemonId;
        return fetch(url)
            .then(response => response.json());
    }

    mostrarPokemon(poke) {
        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');

        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <details>
                <div class="pokemon-info">
                    <div class="nombre-contenedor">
                        <p class="pokemon-id">#${pokeId}</p>
                        <h2 class="pokemon-nombre">${poke.name}</h2>
                    </div>
                    <div class="pokemon-tipos">
                        ${tipos}
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${poke.height}mtr</p>
                        <p class="stat">${poke.weight}kg</p>
                    </div>
                </div>
            </details>
        `;
        this.listaPokemon.append(div);
    }
}

const app = new PokemonApp();
