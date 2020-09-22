
document.getElementById("BurguersLink").addEventListener("click", function () {renderFood("Burguers");} );
document.getElementById("Tacos").addEventListener("click", function () {renderFood("Tacos");} );
document.getElementById("Salads").addEventListener("click", function () {renderFood("Salads");} );
document.getElementById("Desserts").addEventListener("click", function () {renderFood("Desserts");} );
document.getElementById("Drinks & Sides").addEventListener("click", function () {renderFood("Drinks and Sides");} );
document.getElementById("img-navbar").addEventListener("click", function () {showOrder();} );

document.getElementById("modalContinueAdding").addEventListener("click", function () {continueAdding();} );
document.getElementById("modalCancelOrder").addEventListener("click", function () {dropOrderTable();} );
document.getElementById("confirmOrder").addEventListener("click", function () {confirmOrderResult();} );


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
    let container = document.getElementById("foodCards")
    container.innerHTML = ''

    comida.map(plato => {
        


        htmlSegment=   `<div class="col-3">
                        <div class="card border-left-primary shadow h-100" id="card${cont}">
                            <img src="${plato.image}"  class="card-img-top rounded imgcard" alt="img${cont}">
                            <div class="card-body">
                                <h5 class="card-title">${plato.name}</h5>
                                <p class="card-text">${plato.description}</p>
                                <p class="card-text"><strong>$ ${plato.price}</strong></p>
                                <a href="#" class="btn btn-dark" id="cardButton${cont}">Add to Cart</a>
                            </div>
                        </div>
                    </div>`
                    
        
        container.innerHTML += htmlSegment

        

        cont ++
        
    })

    document.getElementById("nombreComida").innerText = tipoComida

    for(let i = 1 ; i<cont ; i++) {
        document.getElementById("cardButton"+i).addEventListener("click", function () {modifyCartNumber(i);} );
    }


}

function modifyCartNumber(cont){
    
    
    elementos = document.getElementById("card"+cont).childNodes[3].childNodes

    let table = document.getElementById("oderDetailTable");
    let rows = table.rows

    descT = elementos[1].innerText
    priceT = parseFloat(elementos[5].innerText.split(" ")[1])
    qtyT = 1
    AmountT = qtyT*priceT

    let row
    
    if(rows.length == 1) {
        row = table.insertRow(rows.length)
            
        row.insertCell(0).innerHTML = rows.length-1;
        row.insertCell(1).innerHTML = qtyT;
        row.insertCell(2).innerHTML = descT;
        row.insertCell(3).innerHTML = priceT;
        row.insertCell(4).innerHTML = AmountT;
    } else{
        let ward = -1
        for(let j = 1; j<rows.length; j++) {
            if(rows[j].cells[2].innerHTML == descT) {
                ward = j
            }
        }
        if(ward == -1) {
            row = table.insertRow(rows.length)
            
            row.insertCell(0).innerHTML = rows.length-1;
            row.insertCell(1).innerHTML = qtyT;
            row.insertCell(2).innerHTML = descT;
            row.insertCell(3).innerHTML = priceT;
            row.insertCell(4).innerHTML = AmountT;
        }else {
            let modifyRow = rows[ward]
            let cantidad = parseInt(modifyRow.cells[1].innerHTML) + 1
            modifyRow.cells[4].innerHTML = cantidad*priceT
            modifyRow.cells[1].innerHTML = cantidad
        }
    }

    cartString = document.getElementById("cartText").innerText
    cartNumber = rows.length-1;
    document.getElementById("cartText").innerHTML ="<img src=\"carrito.png\"  id=\"img-navbar\" alt=\"carrito\">" +cartNumber + " Items"
    document.getElementById("img-navbar").addEventListener("click", function () {showOrder();} );

    let totalCash = 0
    for(let k = 1; k<rows.length; k++){
        totalCash += parseFloat(rows[k].cells[4].innerHTML)
    }
    document.getElementById("totalaccount").innerHTML = `<p><strong>Total: $ ${totalCash}</strong></p>`
    document.getElementById("oderDetailTable").className = "table table-striped"

}

function continueAdding() {
    document.getElementById("foodDetail").className = "d-block"
    document.getElementById("oderDetailSection").className ="d-none"

}

function dropOrderTable() {
    table = document.getElementById("oderDetailTable")
    while(table.rows.length!=1){
        table.deleteRow(table.rows.length-1)
    }
    document.getElementById("cartText").innerHTML ="<img src=\"carrito.png\"  id=\"img-navbar\"  alt=\"carrito\">" +0 + " Items"
    document.getElementById("img-navbar").addEventListener("click", function () {showOrder();} );
    document.getElementById("totalaccount").innerHTML = `<p><strong>Total: $ 0</strong></p>`
}

function confirmOrderResult() {
    table = document.getElementById("oderDetailTable")
    rows = table.rows
    let array = []
    for(let i = 1; i<rows.length; i++) {
        let subArray = ({
            "item": parseInt(rows[i].cells[0].innerHTML),
            
            "quantity": parseInt(rows[i].cells[1].innerHTML),
            
            "description": rows[i].cells[2].innerHTML,
            
            "unity Price": parseFloat(rows[i].cells[3].innerHTML)
        })  
        array.push(subArray)
        
    }
    console.log(array)
}


function showOrder() {
    document.getElementById("foodDetail").className = "d-none"
    document.getElementById("oderDetailSection").className ="d-block"
}