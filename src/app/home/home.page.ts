import { Component } from '@angular/core';
import * as HashMap from 'hashmap';
import { ApiService } from '../api.service';

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

  nada;
  pareja;
  doblePareja;
  trio;
  escalera;
  color;
  full;
  poker;
  escaleraColor;
  escaleraReal;

  s1;
  c1;
  s2;
  c2;
  s3;
  c3;
  s4;
  c4;




  constructor(private apiService: ApiService) { }

  play() {

    this.generarBaraja();


    this.reparte();
    this.reparte();

    this.card1 = this.desvelarCarta(this.mano[0])
    this.card2 = this.desvelarCarta(this.mano[1])

    this.disabled1 = true;
    this.disabled2 = false;
    this.disabled3 = false;

    if (this.mano[0].length == 2) {
      this.s1 = Number(this.mano[0][0])
      this.c1 = Number(this.mano[0][1])
    } else {
      this.s1 = Number(this.mano[0][0])
      this.c1 = Number(this.mano[0][1] + this.mano[0][2])
    }

    if (this.mano[1].length == 2) {
      this.s2 = Number(this.mano[1][0])
      this.c2 = Number(this.mano[1][1])
    } else {
      this.s2 = Number(this.mano[1][0])
      this.c2 = Number(this.mano[1][1] + this.mano[1][2])
    }

    this.apiService.modelo2cartas(this.s1, this.c1, this.s2, this.c2)
      .subscribe(data => {
        this.nada = String((data.nothing)*100) + "%"
        this.pareja = String((data.one_pair)*100) + "%"
        this.doblePareja = String((data.two_pairs)*100) + "%"
        this.trio = String((data.trio)*100) + "%"
        this.escalera = String((data.straight)*100) + "%"
        this.color = String((data.flush)*100) + "%"
        this.full = String((data.full)*100) + "%"
        this.poker = String((data.poker)*100) + "%"
        this.escaleraColor = String((data.straight_flush)*100) + "%"
        this.escaleraReal= String((data.royal_flush)*100) + "%"

        console.log(this.pareja)

      })



    console.log(this.mano[0]);
    console.log(this.mano[1]);



  }

  next() {
    if (this.mano.length == 2) {

      this.reparte();
      this.card3 = this.desvelarCarta(this.mano[2])

      if (this.mano[2].length == 2) {
        this.s3 = Number(this.mano[2][0])
        this.c3 = Number(this.mano[2][1])
      } else {
        this.s3 = Number(this.mano[2][0])
        this.c3 = Number(this.mano[2][1] + this.mano[2][2])
      }
  
      this.apiService.modelo3cartas(this.s1, this.c1, this.s2, this.c2, this.s3, this.c3)
        .subscribe(data => {
          this.nada = String((data.nothing)*100) + "%"
          this.pareja = String((data.one_pair)*100) + "%"
          this.doblePareja = String((data.two_pairs)*100) + "%"
          this.trio = String((data.trio)*100) + "%"
          this.escalera = String((data.straight)*100) + "%"
          this.color = String((data.flush)*100) + "%"
          this.full = String((data.full)*100) + "%"
          this.poker = String((data.poker)*100) + "%"
          this.escaleraColor = String((data.straight_flush)*100) + "%"
          this.escaleraReal= String((data.royal_flush)*100) + "%"
  
          console.log(this.pareja)
  
        })

    } else if (this.mano.length == 3) {

      this.reparte();
      this.card4 = this.desvelarCarta(this.mano[3])

      if (this.mano[3].length == 2) {
        this.s4 = Number(this.mano[3][0])
        this.c4 = Number(this.mano[3][1])
      } else {
        this.s4 = Number(this.mano[3][0])
        this.c4 = Number(this.mano[3][1] + this.mano[3][2])
      }
  
      this.apiService.modelo4cartas(this.s1, this.c1, this.s2, this.c2, this.s3, this.c3, this.s4, this.c4)
        .subscribe(data => {
          this.nada = String((data.nothing)*100) + "%"
          this.pareja = String((data.one_pair)*100) + "%"
          this.doblePareja = String((data.two_pairs)*100) + "%"
          this.trio = String((data.trio)*100) + "%"
          this.escalera = String((data.straight)*100) + "%"
          this.color = String((data.flush)*100) + "%"
          this.full = String((data.full)*100) + "%"
          this.poker = String((data.poker)*100) + "%"
          this.escaleraColor = String((data.straight_flush)*100) + "%"
          this.escaleraReal= String((data.royal_flush)*100) + "%"
  
          console.log(this.pareja)
  
        })


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
