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

  card1:string = "../../assets/cards/back.png"
  card2:string = "../../assets/cards/back.png"
  card3:string = "../../assets/cards/back.png"
  card4:string = "../../assets/cards/back.png"
  card5:string = "../../assets/cards/back.png"




  constructor() { }

  play() {
    
    this.mano = [];
    this.generarBaraja();


    let card1 = this.randomCard();
    let card2 = this.randomCard();

    this.card1 = this.desvelarCarta(this.mano[0])
    this.card2 = this.desvelarCarta(this.mano[1])

    

    console.log(this.mano[0]);
    console.log(this.mano[1]);

    

  }

  desvelarCarta(card: string){

    let result;
    
    if(card.length != 3){
      result = "../../assets/cards/" + card[0] + "_" + card[1] + ".png"
    }else{
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

  randomCard(){

    let random = this.randomIntFromInterval(0, this.baraja.length - 1)
    let card = this.baraja[random]

    this.mano.push(card)

    this.baraja.splice(random, 1)

    return card
  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
