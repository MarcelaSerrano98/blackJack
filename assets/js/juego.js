const miModulo =  (() =>{
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

   

    let puntosJugadores = [];

    /// referencias

    const btnPedir            = document.querySelector   ('#btnPedir'), 
          btnDetener          = document.querySelector   ('#btnDetener'), 
          btnNuevo            = document.querySelector   ('#btnNuevo'),
          puntosHTML          = document.querySelectorAll('small'),
          divCartasJugador    = document.querySelectorAll('.divCartas');
        

    /// esta funcion incializa el juego
    const incializarJuego = (numJugadores = 2) => {
        deck= crearDeck();

        puntosJugadores =[];
        for (let i = 0; i< numJugadores ; i++ ) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugador.forEach(elem => elem.innerHTML = '');

         btnPedir.disabled = false;
         btnDetener.disabled = false;
    }

    //esta fincion permite crear un nuevo deck
    const crearDeck = () => {

        deck = [];

        for( let i =2; i<=10; i++){
            for(let tipo of tipos) {
            deck.push(i + tipo );
            }  
        } 
        for(let tipo of tipos) {
            for(let esp of especiales) {
             deck.push(esp + tipo );
            }   
        }
        return _.shuffle(deck);
    }   

    // esta funcion permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'No hay cartas en el deck'
        }  
        return  deck.pop();
    }

    const valorCarta = (carta) => {
        const valor= carta.substring(0, carta.length -1);
            return (isNaN (valor)) ? 
                (valor === 'A') ? 11 : 10
                : valor *1;
    }

    // 0 primero jugador y el ultimo sera la compu
    const acumuladordePuntos = (carta, turno) => {
        puntosJugadores[turno]= puntosJugadores[turno ] + valorCarta(carta);
            puntosHTML[turno].innerText = puntosJugadores[turno ];
            return puntosJugadores[turno];
    }


    const crearCarta = (carta, turno) => {
        const  imgCarta= document.createElement('img');
            imgCarta.src = `assets/cartas/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugador[turno].append(imgCarta);
    }

const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] =puntosJugadores;

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana')
        } else if (puntosMinimos > 21){
            alert('Computadora gana')
        }else if (puntosComputadora > 21){
            alert('Jugador gana')
        } else if (puntosMinimos > 21 ){
            alert('Computadora gana')
        }else{
            alert('Computadora gana')
        }
    }, 100); 
}

    // turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0 ;

        do {

            const  carta = pedirCarta();
            puntosComputadora= acumuladordePuntos(carta,  puntosJugadores.length - 1);
            crearCarta(carta,  puntosJugadores.length - 1);

        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
        
        determinarGanador();
    }


    // eventos
    btnPedir.addEventListener('click',  () => {
        const  carta = pedirCarta();
        const puntosJugador = acumuladordePuntos(carta, 0)

        crearCarta(carta, 0 )


        if (puntosJugador > 21 ) {
            console.warn("Lo siento, perdiste");
            btnPedir.disabled = true;//desabilitar el boton
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        } else if (puntosJugador=== 21){
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }



    })

    btnDetener.addEventListener('click',  () => {
        
        btnPedir.disabled = true;//desabilitar el boton
        btnDetener.disabled = true;//desabilitar el boton

            turnoComputadora (puntosJugadores[0]);
        

    })

    btnNuevo.addEventListener('click',  () => {

        incializarJuego();

    })

    return {
       nuevoJuego : incializarJuego
    };

})();

