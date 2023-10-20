// serve a far apparire un messaggio di errore in console log se non dichiariamo una variabile
"use strict";
campoMinato();

function campoMinato() {
    const btn = document.querySelector('button');
    let ris = document.getElementById('score');
    let msg = document.getElementById('message');
    const numBoms = 16;
    let bombs
    let gameOver;
    let score;

    btn.addEventListener('click', play);

    /**
     * Play -lancia il gioco
     */
    function play() {
        const level = document.getElementById('difficolta').value;
        gameOver = false;
        score = 0;

        //variabili bombe
        bombs = [];
        ris.classList.add('d-none');
        msg.classList.add('d-none');

        let Numsquare = selective(level);
        console.log(level + ': ' + Numsquare);
        bombs = generateBombs(Numsquare);
        console.log(bombs);

        //prendo griglia di gioco
        const result = document.getElementById('playground');

        // impedisce che l'utente ripremendo invia ricrei più celle del limite
        result.innerHTML = ``;

        //creo quadratini con la funzione e li stampo in html con i numeri sopra
        for (let i = 1; i <= Numsquare; i++) {
            let square = drawSquare(i, Numsquare);
            result.append(square);
        }
      
    }

    function risfinal(numBoms){
        const level = document.getElementById('difficolta').value;
        let Numsquare = selective(level);
        return Numsquare - numBoms;
    }

    //la funzione prende l'indice dei quadrati e il numero di quadrati da scrivere
    //poi crea dei div
    //aggiunge classe square da css
    //da dimensione ai quadratini a seconda dell'numSquare
    //stampa indice nel quadratino
    //da modifiche con funzione di click
    function drawSquare(squareIndex, numSquare) {
        const square = document.createElement('div');
        square.classList.add('square');
        const squareWith = Math.sqrt(numSquare);
        square.style.width = ` calc(100% / ${squareWith})`;
        // square.style.height =` calc(100% / ${squareWith})`;
        square.style.height = square.style.width;
        square.innerHTML = squareIndex;


        //al click sul quadratino aggiunge classe active di css e stampa in console indice del quadratino cliccato
        square.addEventListener('click', drawClick);
        gameOver = false;
        return square;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //crea array di bombe con numeri casuali
    function generateBombs(Numsquare) {
        const arrbombe = [];
        while (arrbombe.length < numBoms) {
            let bomb = getRandomNumber(1, parseInt(Numsquare));
            console.log(bomb);
            if (!arrbombe.includes(bomb)) {
                arrbombe.push(bomb);
            }
        }
        console.log(arrbombe.length);
        return arrbombe;
    }

    function drawClick() {
        if (gameOver || this.classList.contains('active')) {
            return;
        }

        this.classList.add('active');
        console.log(this.textContent);
        
       
        if (bombs.includes(parseInt(this.textContent))) {
            this.classList.add('bomb');
            this.style.color = "black";
            this.innerHTML = `<i class="fa-solid fa-bomb pulseBomb"></i>`;
            gameOver = true;
            score = 0;
            showBombs();
            msg.classList.remove('d-none');
            msg.classList.add('my-bg-white');
            msg.textContent = 'Game Over!';
            return;

        } 
        score++; 
        ris.classList.remove('d-none');
        ris.innerHTML = `<span>il tuo punteggio: ${score} </span>`;
       

            if(score=== risfinal(numBoms)){
                msg.classList.remove('d-none');
                msg.classList.add('my-bg-white');
                msg.textContent = 'Hai vinto!!!';
                gameOver=true;
                return;
            }
        


    }

    function showBombs() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const squareNumber = parseInt(square.textContent);
            if (bombs.includes(squareNumber)) {
                square.classList.add('bomb');
                square.style.color = "black";
                square.innerHTML = `<i class="fa-solid fa-bomb pulseBomb"></i>`;
            }
        });
    }

}