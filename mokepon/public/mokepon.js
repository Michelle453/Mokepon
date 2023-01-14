const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSelecionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

let seccionMensaje = document.getElementById("resultado")
const seccionMensajeJugador = document.getElementById("ataques-del-jugador")
const seccionMensajeEnemigo = document.getElementById("ataques-del-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotonesAtaque = document.getElementById("contenedor-botones-ataque")

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
let opcionMokepones
let inputHipodoge 
let inputCapipepo
let inputRatigueya 
let mascotaJugador
let ataquesMokepon
let botonFuego
let botonAgua 
let botonTierra 
let botones = []
let ataquesMokeponEnemigo 
let resultadoAtaqueEnemigo
let resultadoAtaqueJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png" 
let miMokepon
let alturaBuscada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 350
let jugadorId = null
let mokeponesEnemigos = []
let enemigoId = null

if(anchoDelMapa > anchoMaximoMapa){
    anchoDelMapa = anchoMaximoMapa - 20
}

alturaBuscada = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaBuscada

class Mokepon{
    constructor(nombre, foto, vidas, fotoMapa, id){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y,
            this.ancho, 
            this.alto)
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png"  ,5, "./assets/hipodoge.png")

let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png",5, "./assets/capipepo.png")

let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")

const HIPODOGE_ATAQUES = [
    { nombre: 'Agua 💧', id: 'boton-agua' },
    { nombre: 'Agua 💧', id: 'boton-agua' },
    { nombre: 'Agua 💧', id: 'boton-agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: 'Tierra 🌱', id: 'boton-tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra' },
    { nombre: 'Agua 💧', id: 'boton-agua' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: 'Fuego 🔥', id: 'boton-fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego' },
    { nombre: 'Fuego 🔥', id: 'boton-fuego' }, 
    { nombre: 'Agua 💧', id: 'boton-agua' },
    { nombre: 'Tierra 🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego(){ 
    seccionSeleccionarAtaque.style.display = "none"
    seccionReiniciar.style.display = "none"
    seccionVerMapa.style.display = "none"


    mokepones.forEach((mokepon) => {
       opcionMokepones = `
        <input type="radio" id="${mokepon.nombre}" name="mascota" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
       `
       contenedorTarjetas.innerHTML += opcionMokepones
       inputHipodoge = document.getElementById("Hipodoge")
       inputCapipepo = document.getElementById("Capipepo")
       inputRatigueya = document.getElementById("Ratigueya")
    })

    

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)
    uniserAlJuego()
}   
function uniserAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res){
           
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        jugadorId = respuesta
                    })
            }
        })
}
function aleatorio(minimo, maximo){
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo)
}


function seleccionarMascotaJugador(){
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        
    }else{
        alert("debe seleccionar su mascota");
        return 
    }
    seccionSelecionarMascota.style.display = "none"
    seccionVerMapa.style.display = "flex"
    seleccionarMokepon(mascotaJugador)

    iniciarMapa()
    extrerAtaques()
    
}
function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function extrerAtaques(){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
            break 
        }
        
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorBotonesAtaque.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    
    botones = document.querySelectorAll(".BAtaque")
    
}
function secuenciaAtaques(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent == "Fuego 🔥"){
                ataqueJugador.push("Fuego")
                boton.style.background = "#122f58"
                boton.disabled = true
            }else if(e.target.textContent == "Agua 💧"){
                ataqueJugador.push("Agua")
                
                boton.style.background = "#122f58"
                boton.disabled = true
            }else {
                ataqueJugador.push("Tierra")
                
                boton.style.background = "#122f58"
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
            
        })
    })
    
}
function enviarAtaques()
{
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
function seleccionarMascotaEnemigo(){
    //1 = Hipodoge, 2 = capipepo, 3 = ratigueya
    let mascotaAleatorio = aleatorio(0,mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaques()
}



function ataqueAleatorioEnemigo(){
    
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("Fuego")
    }else if(ataqueAleatorio == 2 || ataqueAleatorio == 4){
        ataqueEnemigo.push("Agua")
    }else{
        ataqueEnemigo.push("Tierra")
    }
    
    iniciarPelea()
}
function iniciarPelea(){
    if(ataqueJugador.length == 5){
        combate()
    }
}

function crearMensaje(){
    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    
    nuevoAtaqueDelJugador.innerHTML = resultadoAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = resultadoAtaqueEnemigo

   
    seccionMensajeJugador.appendChild(nuevoAtaqueDelJugador)
    seccionMensajeEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal){
    seccionMensaje.innerHTML = resultadoFinal
    
    seccionReiniciar.style.display = "block"

}
function resultadoAmbosOponentes(jugador, enemigo){
    resultadoAtaqueJugador = ataqueJugador[jugador]
    resultadoAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)
    for(let index = 0; index < ataqueJugador.length; index++){
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            resultadoAmbosOponentes(index,index)
            crearMensaje()
        }else if((ataqueJugador[index] == "Fuego" && ataqueEnemigo[index] == "Tierra") || (ataqueJugador[index] == "Agua" && ataqueEnemigo[index] == "Fuego") || (ataqueJugador[index] == "Tierra" && ataqueEnemigo[index] == "Agua")){
            resultadoAmbosOponentes(index,index)
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            resultadoAmbosOponentes(index,index)
            crearMensaje()
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Empate")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Ganaste")
    }else{
        crearMensajeFinal("Perdiste")
    }
}
function reiniciarJuego(){
    location.reload()
}
function pintarCanvas(){
    miMokepon.x += miMokepon.velocidadX
    miMokepon.y += miMokepon.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    miMokepon.pintarMokepon()

    enviarPosicion(miMokepon.x, miMokepon.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

    
    
    
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}
function moverDerecha(){
    miMokepon.velocidadX = 5
}
function moverIzquierda(){
    miMokepon.velocidadX = -5
}
function moverAbajo(){
    miMokepon.velocidadY = 5
}
function moverArriba(){
    miMokepon.velocidadY = -5
}
function detenerMovimiento(){
    miMokepon.velocidadX = 0
    miMokepon.velocidadY = 0
}
function sePresionoUnaTecla(event){
    switch(event.key){
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa(){
    
    miMokepon = obtenerObjetoMokepon()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMokepon(){
    for(let i = 0; i < mokepones.length; i++){
        if(mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y 
    const abajoEnemigo = enemigo.y + enemigo.alto 
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = miMokepon.y
    const abajoMascota = miMokepon.y + miMokepon.alto
    const derechaMascota = miMokepon.x + miMokepon.ancho
    const izquierdaMascota = miMokepon.x

    if((abajoMascota < arribaEnemigo) ||(arribaMascota > abajoEnemigo) || (derechaMascota < izquierdaEnemigo ) || (izquierdaMascota > derechaEnemigo)){
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    alert("Hay colision con " + enemigo.nombre)
    
    enemigoId = enemigo.id
    seccionSeleccionarAtaque.style.display = "flex"
    seccionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo()
}

window.addEventListener("load", iniciarJuego)