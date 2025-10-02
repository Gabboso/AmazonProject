class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor (carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed;
    this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  // methods

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
  }
  isNormal (speed) {
    return speed > 0 && speed < 200;
  }
  go () {
    if (this.isNormal(this.speed + 5)) {
      this.speed += 5;
    }
  }
  brake () {
    if (this.isNormal(this.speed - 5)) {
      this.speed -= 5;
    }
  }
  isCarMoving () {
    return this.speed != 0;
  }
  openTrunk () {
    if (!this.isCarMoving()) this.isTrunkOpen = true;
  }
  closeTrunk () {
    this.isTrunkOpen = false;
  }

}


class RaceCar extends Car {
  acceleration;

  constructor (carDetails) {
    super(carDetails);
    this.speed = 0;
    this.isTrunkOpen = false;
    this.acceleration = carDetails.acceleration;
  }
  
  isNormal (speed) {
    return speed > 0 && speed < 300;
  }

  go() {
    if (this.isNormal(this.speed + 5)) {
      this.speed += this.acceleration;
    }
  }
  openTrunk () {};
  closeTrunk () {};

}



export const raceCar = new RaceCar(
  {
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
  }
)


export const cars = [
  {
    brand: 'Toyota',
    model: 'Corolla',
    speed: 0,
    isTrunkOpen: false
  },
  {
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0,
    isTrunkOpen: false
  }
].map((carDetails) =>{
  return new Car(carDetails);
})



