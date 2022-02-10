import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
    this._displayList()
  }

  createCar(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newCar = Object.fromEntries(formData);
    fetch("https://wagon-garage-api.herokuapp.com/joz84-auto/cars", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newCar)
    })
      .then(response => response.json())
      .then((data) => {
        this.carsListTarget.innerHTML = "";
        this._displayList()
      })
  }

  _carCards(car) {
    const card = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`
        this.carsListTarget.insertAdjacentHTML("beforeend", card)
  }

  _displayList() {
    fetch("https://wagon-garage-api.herokuapp.com/joz84-auto/cars")
    .then(response => response.json())
    .then((data)=> {
      console.dir(data)
      data.forEach((car) => {
        this._carCards(car)
      })
    })
  }
}
