import { Component } from '@angular/core';
import * as HashMap from 'hashmap';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  baraja = []
  mano = []

  disabled1 = false
  disabled2 = true
  disabled3 = true


  card1: string = "../../assets/cards/back.png"
  card2: string = "../../assets/cards/back.png"
  card3: string = "../../assets/cards/back.png"
  card4: string = "../../assets/cards/back.png"
  card5: string = "../../assets/cards/back.png"




  constructor() { }

  play() {

    this.generarBaraja();


    this.reparte();
    this.reparte();

    this.card1 = this.desvelarCarta(this.mano[0])
    this.card2 = this.desvelarCarta(this.mano[1])

    this.disabled1 = true;
    this.disabled2 = false;
    this.disabled3 = false;



    console.log(this.mano[0]);
    console.log(this.mano[1]);



  }

  next() {
    if (this.mano.length == 2) {

      this.reparte();
      this.card3 = this.desvelarCarta(this.mano[2])

    } else if (this.mano.length == 3) {

      this.reparte();
      this.card4 = this.desvelarCarta(this.mano[3])

    } else if (this.mano.length == 4) {

      this.reparte();
      this.card5 = this.desvelarCarta(this.mano[4])

      this.disabled1 = true;
      this.disabled2 = true;
      this.disabled3 = false;

    } else {
      console.log("finish")
    }


  }

  stop() {
    this.mano = [];
    this.baraja = [];

    this.card1 = "../../assets/cards/back.png"
    this.card2 = "../../assets/cards/back.png"
    this.card3 = "../../assets/cards/back.png"
    this.card4 = "../../assets/cards/back.png"
    this.card5 = "../../assets/cards/back.png"

    this.disabled1 = false;
    this.disabled2 = true;
    this.disabled3 = true;

  }

  desvelarCarta(card: string) {

    let result;

    if (card.length != 3) {
      result = "../../assets/cards/" + card[0] + "_" + card[1] + ".png"
    } else {
      result = "../../assets/cards/" + card[0] + "_" + card[1] + card[2] + ".png"
    }

    return result

  }

  generarBaraja() {
    this.baraja = []

    for (let i = 1; i < 5; i++) {
      var firstNumber = i;

      for (let j = 1; j < 14; j++) {
        var cardNumber: string = firstNumber.toString() + j.toString()
        this.baraja.push(cardNumber)

      }

    }
  }

  reparte() {

    let random = this.randomIntFromInterval(0, this.baraja.length - 1)
    let card = this.baraja[random]

    this.mano.push(card)

    this.baraja.splice(random, 1)

  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
