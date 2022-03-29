
class Mascota {
 constructor(nombre, edad, raza, horas, dueño) {
    this.nombre = nombre
    this.edad = edad
    this.raza = raza 
    this.horas = parseFloat(horas)
    this.dueño = dueño
 }
}
let clientes = []
fetch('clientes.json')
.then(promesa => promesa.json())
.then(data => {
    clientes = data
    localStorage.setItem("clientes", JSON.stringify(clientes))
})

function total (horas) {
    if (horas >= 8) {
        return horas * 200 + 200
    }
    else {
        return horas * 200
    }
}
let transicionUser = document.getElementById('fila')
let transicionUserReg = document.getElementById('filaReg')
let loguearse = document.getElementById('login')
        loguearse.addEventListener('submit', (e) => {
            e.preventDefault()
            JSON.parse(localStorage.getItem("clientes"))
            let nombreLog = document.getElementById('nameLog')
            let nombreMascotaLog = document.getElementById('petnameLog')
            let razaLog = document.getElementById('raceLog')
            let edadLog = document.getElementById('ageLog')
            let verLog = clientes.find((el) => el.dueño == nombreLog.value && el.nombre == nombreMascotaLog.value)
            console.log(verLog)
            console.log(Object.keys(clientes).length) //no se porque no puedo usar clientes.lenght pero si indexOf no me queda claro si es array o no
            console.log(clientes.indexOf(verLog))
                if (verLog == undefined) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Verifique sus datos e intente nuevamente',
                        showConfirmButton: true,
                      })
                }               
                if (verLog.raza == razaLog.value && verLog.edad == edadLog.value) {
                    transicionUser.innerHTML = `
                    <div class="alert alert-success mt-5 text-center" role="alert">
                        Bienvenido
                    </div>
                    <div>  
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${nombreLog.value}</h5>
                                <p class="card-text">${razaLog.value} llamado/a ${nombreMascotaLog.value} de ${edadLog.value} años</p>
                            </div>
                        </div>
                    </div>`
                if (!(verLog.horas === 0 )) {
                   transicionUser.innerHTML += `
                        <div class="alert alert-secondary mt-5 text-center" role="alert">
                            Su mascota ha estado ${verLog.horas} horas, por lo que usted debe ${total(verLog.horas)} pesos
                        </div>
                        <div>
                            <span class="h2 text-center d-block mt-5">otros clientes</span>
                        </div>`}
                if (!(clientes.lenght === 0)) {
                        clientes.splice((clientes.indexOf(verLog)),1)
                        transicionUser.innerHTML += 
                                    `<div class="d-flex justify-content-around mt-3" id="displayClientes"></div>`
                        let displayClientes = document.getElementById('displayClientes')
                        clientes.forEach((cliente, indice) => {
                            displayClientes.innerHTML +=
                            `<div class="card d-flex  p-3" id="cliente${indice}" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${cliente.dueño}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">y su mascota ${cliente.nombre}</h6>
                                </div>
                            </div>
                          </div`
                        
                        });
                    }
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Verifique sus datos e intente nuevamente',
                        showConfirmButton: true,
                      })
                } 
            })
    
let registrarse = document.getElementById('register')

        registrarse.addEventListener('submit', (e) => {
            e.preventDefault()
            let nombre = document.getElementById('name')
            let nombreMascota = document.getElementById('petname')
            let raza = document.getElementById('race')
            let edad = document.getElementById('age')  
            if (nombre.value   == "" || nombreMascota.value  == "" || raza.value  == "" || edad.value  == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Ha habido un error con sus datos',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
            else { 
                    let cliente = new Mascota(`${nombreMascota.value}`, `${edad.value}`, `${raza.value}`,0,`${nombre.value}`)
                    let filaReg= document.getElementById('filaReg')
                    clientes.push(cliente)
                    localStorage.setItem("clientes", JSON.stringify(clientes)) 
                    filaReg.innerHTML= ""
                    Swal.fire({
                        icon: 'success',
                        title: 'Felicitaciones',
                        text: 'Se ha registrado exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }  
        })
            
