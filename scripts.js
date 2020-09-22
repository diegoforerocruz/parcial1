function reder() {
    
    let dishURL = document.getElementById("file-selector").value
    console.log(dishURL)
    let dishName = document.getElementById("inputDishName").value
    let dishDesc = document.getElementById("inputDishDescription").value
    let dishPrice = document.getElementById("inputDishPrice").value
    if( dishURL!=''&&dishURL!=null && dishName!=''&&dishName!=null && dishDesc!=''&&dishDesc!=null && dishPrice!=''&&dishPrice!=null ){
            let html = ''
            html=   `<div class="col-xl-4 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 ">
                            <img src="${dishURL}" class="card-img-top rounded" alt="img1">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col-12 align-self-start mr-2">
                                        <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">${dishName}</div>
                                            <div class="text-sm mb-3 mr-3">
                                                ${dishDesc}
                                            </div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">$${dishPrice}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
            let container = document.getElementById("menuList")
            container.innerHTML += html     
    }  
}
async function getEvents() {
    let url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'

    try {
        let res = await fetch(url)
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

async function renderFood(tipoComida) {
    let eventos = await getEvents()
    let comida
    eventos.map(evento => {
        let obj = (evento.name)
        if(obj == tipoComida) {
            comida = evento.products
        }
        
    })
        

    let html = ''
    let cont = 1
    let htmlSegment = ''

    comida.map(plato => {
        html=   `<div class="col-xl-4 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 ">
                            <img src="${plato.image}" class="card-img-top rounded" alt="img1">
                            <div class="card-body">
                                <h5 class="card-title">${plato.name}</h5>
                                <p class="card-text">${plato.description}</p>
                                <p class="card-text"><strong>${plato.price}</strong></p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>`
        cont ++
        html += htmlSegment

    })

    let container = document.getElementById("eventsTableBody")
    container.innerHTML = html

}