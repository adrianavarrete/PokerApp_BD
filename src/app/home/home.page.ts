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

  nadaColor: string;
  parejaColor: string;
  dobleParejaColor: string;
  trioColor: string;
  escalera_Color: string;
  colorColor: string;
  fullColor: string;
  pokerColor: string;
  escaleraColorColor: string;
  escaleraRealColor: string;




  constructor(private apiService: ApiService) {
    this.nadaColor = "dark"
    this.parejaColor = "dark"
    this.dobleParejaColor = "dark"
    this.trioColor = "dark"
    this.escalera_Color = "dark"
    this.colorColor = "dark"
    this.fullColor = "dark"
    this.pokerColor = "dark"
    this.escaleraColorColor = "dark"
    this.escaleraRealColor = "dark"

   }

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
        this.nada = this.probabilidad(data.nothing)
        this.nadaColor = this.changeColor(this.nada)
        this.pareja = this.probabilidad(data.one_pair)
        this.parejaColor = this.changeColor(this.pareja)
        this.doblePareja = this.probabilidad(data.two_pairs)
        this.dobleParejaColor = this.changeColor(this.doblePareja)
        this.trio = this.probabilidad(data.trio)
        this.trioColor = this.changeColor(this.trio)
        this.escalera = this.probabilidad(data.straight)
        this.escalera_Color = this.changeColor(this.escalera)
        this.color = this.probabilidad(data.flush)
        this.colorColor = this.changeColor(this.color)
        this.full = this.probabilidad(data.full)
        this.fullColor = this.changeColor(this.full)
        this.poker = this.probabilidad(data.poker)
        this.pokerColor = this.changeColor(this.poker)
        this.escaleraColor = this.probabilidad(data.straight_flush)
        this.escaleraColorColor = this.changeColor(this.escaleraColor)
        this.escaleraReal = this.probabilidad(data.royal_flush)
        this.escaleraRealColor = this.changeColor(this.escaleraReal)

        console.log(data)

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
          this.nada = this.probabilidad(data.nothing)
          this.nadaColor = this.changeColor(this.nada)
          this.pareja = this.probabilidad(data.one_pair)
          this.parejaColor = this.changeColor(this.pareja)
          this.doblePareja = this.probabilidad(data.two_pairs)
          this.dobleParejaColor = this.changeColor(this.doblePareja)
          this.trio = this.probabilidad(data.trio)
          this.trioColor = this.changeColor(this.trio)
          this.escalera = this.probabilidad(data.straight)
          this.escalera_Color = this.changeColor(this.escalera)
          this.color = this.probabilidad(data.flush)
          this.colorColor = this.changeColor(this.color)
          this.full = this.probabilidad(data.full)
          this.fullColor = this.changeColor(this.full)
          this.poker = this.probabilidad(data.poker)
          this.pokerColor = this.changeColor(this.poker)
          this.escaleraColor = this.probabilidad(data.straight_flush)
          this.escaleraColorColor = this.changeColor(this.escaleraColor)
          this.escaleraReal = this.probabilidad(data.royal_flush)
          this.escaleraRealColor = this.changeColor(this.escaleraReal)

          console.log(data)


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
          this.nada = this.probabilidad(data.nothing)
          this.nadaColor = this.changeColor(this.nada)
          this.pareja = this.probabilidad(data.one_pair)
          this.parejaColor = this.changeColor(this.pareja)
          this.doblePareja = this.probabilidad(data.two_pairs)
          this.dobleParejaColor = this.changeColor(this.doblePareja)
          this.trio = this.probabilidad(data.trio)
          this.trioColor = this.changeColor(this.trio)
          this.escalera = this.probabilidad(data.straight)
          this.escalera_Color = this.changeColor(this.escalera)
          this.color = this.probabilidad(data.flush)
          this.colorColor = this.changeColor(this.color)
          this.full = this.probabilidad(data.full)
          this.fullColor = this.changeColor(this.full)
          this.poker = this.probabilidad(data.poker)
          this.pokerColor = this.changeColor(this.poker)
          this.escaleraColor = this.probabilidad(data.straight_flush)
          this.escaleraColorColor = this.changeColor(this.escaleraColor)
          this.escaleraReal = this.probabilidad(data.royal_flush)
          this.escaleraRealColor = this.changeColor(this.escaleraReal)

          console.log(data)


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

    this.nada = ""
    this.pareja = ""
    this.doblePareja = ""
    this.trio = ""
    this.escalera = ""
    this.color = ""
    this.full = ""
    this.poker = ""
    this.escaleraColor = ""
    this.escaleraReal = ""

    this.nadaColor = "dark"
    this.parejaColor = "dark"
    this.dobleParejaColor = "dark"
    this.trioColor = "dark"
    this.escalera_Color = "dark"
    this.colorColor = "dark"
    this.fullColor = "dark"
    this.pokerColor = "dark"
    this.escaleraColorColor = "dark"
    this.escaleraRealColor = "dark"


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

  probabilidad(dato) {

    if (dato > 0 && dato <= 0.25) {
      return "Muy poco probable"
    } else if (dato > 0.25 && dato <= 0.5) {
      return "Poco probable"
    } else if (dato > 0.5 && dato <= 0.75) {
      return "Probable"
    } else if (dato > 0.75 && dato <= 1) {
      return "Muy probable"
    } else {
      return "-"
    }

  }

  changeColor(probabilidad) {
    if (probabilidad == "Muy poco probable") {
      return "danger"
    } else if (probabilidad == "Poco probable") {
      return "warning"

    } else if (probabilidad == "Probable") {
      return "secondary"

    } else if (probabilidad == "Muy probable") {
      return "success"

    }else{
      return "dark"
    }

  }

}
