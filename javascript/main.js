// Iniciamos declarando variables
let productsDataBase = [];
let preOrder = [];


//_______________________________________________________________________________________________________________

// función para chequear en sessionStorage si hay un array de productos precargado, se imprime o se pushea al array  preOrder corazon de todo el algoritmo
checkprevious();

function checkprevious(){
let requestOfOrder = JSON.parse(sessionStorage.getItem("orderOnProcess"));
if(requestOfOrder != null){
    requestOfOrder.forEach(element => {
        preOrder.push(element);
              
    });
    for (let i = 0; i < preOrder.length; i++) {
        newOrderToPrint(preOrder[i]);
        basketCounter() 
    }
    removeNodes()
    toContinueProcess ()
    
}
}

//______________________________________________________________________________________________________

// API, con un evento READY para ejecutarse una vez cargado el documento
$(document).ready(function () {
    //creo la variable con el metodo para pedir la api de localización
    let geoLoc = navigator.geolocation.getCurrentPosition(showPosition);
});
// con los datos obtenidos creo dos variables más para separar la latitud y la longitud, retorno implisito a getToWeat, para continuar con el algoritmo
function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getToWeat(lat, long);
}

//Con un ajax, se llama a la API de openweathermap, para conocer que ciudad es
function getToWeat(lat, long) {

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=77f7124cdb54c76fc595ac6911da9bfe`,
        type: "GET",
        data: {
            appid: '77f7124cdb54c76fc595ac6911da9bfe',
            dataType: 'jsonp',
            units: 'metric',
            lang: 'es'
        },
        success: (data) => {
            localPoint(data);

        }
    });

}

// la función asincrona que espera la promesa que constata que lugar tiene esa latitud y longitud
const localPoint = async (data) => {

    try {
        const validate = await Promise.all([
            contrastPosition(data)
        ])

        enableProducts(true);

    } catch (error) {

        enableProducts(false);

        alert(error);
    }

}

// la función promesa que nos devuelve un resolve si el lugar es en buenos aires y sino un reject con el mensaje para el error que se anuncia al usuario con un alert

const contrastPosition = (data) => {

    let localPosition = data.name
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localPosition == "Buenos Aires") {

                resolve(localPosition)

            } else {

                reject(`No hay productos comestibles disponibles, en tu zona`);
            }

        }, 100);
    });
}


// la función instanciadora de los objetos
function cardItem(category, imagItem, descriptionImag, firstImag, secondImag, id, named, price, stock, subtotal, units) {
    this.category = category;
    this.imagItem = imagItem;
    this.descriptionImag = descriptionImag;
    this.firstImag = firstImag;
    this.secondImag = secondImag;
    this.id = id;
    this.named = named;
    this.price = price;
    this.stock = stock;
    this.subtotal = subtotal;
    this.units = units
}

// esta funcion filtra con el true o con el falfe que retorna la funcion promesa, que fproductos se van a terminar imprimiendo en el DOM
function enableProducts(valuePosition) {
    
    if (valuePosition == true) {

        productsDataBase.push(new cardItem("food", "media/prdts/alimento/item-carrito-alimento1.png", "alimento para perro", 'media/prdts/alimento/item-carrito-alimento1.png', 'media/prdts/alimento/item-carrito-alimento1.png', "es12", "Eukanuba Small -12meses", 300, 1000, 0, 0));
        productsDataBase.push(new cardItem("food", "media/prdts/alimento/item-carrito-alimento2.png", "alimento para perro", 'media/prdts/alimento/item-carrito-alimento2.png', 'media/prdts/alimento/item-carrito-alimento2.png', "es1", "Eukanuba Small +1año", 300, 2000, 0, 0));
        productsDataBase.push(new cardItem("food", "media/prdts/alimento/item-carrito-alimento3.png", "alimento para perro", 'media/prdts/alimento/item-carrito-alimento3.png', 'media/prdts/alimento/item-carrito-alimento3.png', "em12", "Eukanuba Medium -12meses", 350, 1000, 0, 0));
        productsDataBase.push(new cardItem("food", "media/prdts/alimento/item-carrito-alimento4.png", "alimento para perro", 'media/prdts/alimento/item-carrito-alimento4.png', 'media/prdts/alimento/item-carrito-alimento4.png', "em1", "Eukanuba Medium +1año", 350, 2000, 0, 0));
        
        nonEdibleProducts();

        for (let i = 0; i < productsDataBase.length; i++) {
            fullProducts(i, productsDataBase[i]);
        }

        processToBuy();

        countersButtons();

    } else if (valuePosition == false) {
        $("#OutOfCover").removeAttr("for").css("text-decoration" , "line-through");
        nonEdibleProducts();

        for (let i = 0; i < productsDataBase.length; i++) {
            fullProducts(i, productsDataBase[i]);
        }

        processToBuy();
        countersButtons();

    }
}

//los productos que siempre se imprimen
function nonEdibleProducts() {
    productsDataBase.push(new cardItem("pots", "media/prdts/bowl/item-carrito-bowl1.png", "tazón para perro", 'media/prdts/bowl/item-carrito-bowl2.png', 'media/prdts/bowl/item-carrito-bowl1.png', "zdb1", "ZeeDog B-Metal", 700, 5, 0, 0));
    productsDataBase.push(new cardItem("pots", "media/prdts/bowl/item-carrito-bowl3.png", "tazón para perro", 'media/prdts/bowl/item-carrito-bowl4.png', 'media/prdts/bowl/item-carrito-bowl3.png', "zdb2", "ZeeDog B-Standart", 600, 1500, 0, 0));
    productsDataBase.push(new cardItem("pots", "media/prdts/bowl/item-carrito-bowl5.png", "tazón para perro", 'media/prdts/bowl/item-carrito-bowl6.png', 'media/prdts/bowl/item-carrito-bowl5.png', "zdb3", "ZeeDog B-Multi", 3000, 2000, 0, 0));
    productsDataBase.push(new cardItem("pots", "media/prdts/bowl/item-carrito-bowl7.png", "tazón para perro", 'media/prdts/bowl/item-carrito-bowl8.png', 'media/prdts/bowl/item-carrito-bowl7.png', "zdb4", "ZeeDog B-Expand", 500, 2500, 0, 0));

    productsDataBase.push(new cardItem("clothe", "media/prdts/ropa/item-carrito-ropa1.png", "ropa para perro", 'media/prdts/ropa/item-carrito-ropa2.png', 'media/prdts/ropa/item-carrito-ropa1.png', "zdbp", "ZeeDog R-Buzo", 800, 1000, 0, 0));
    productsDataBase.push(new cardItem("clothe", "media/prdts/ropa/item-carrito-ropa3.png", "ropa para perro", 'media/prdts/ropa/item-carrito-ropa4.png', 'media/prdts/ropa/item-carrito-ropa3.png', "zdbb", "ZeeDog R-Remera", 800, 1000, 0, 0));
    productsDataBase.push(new cardItem("clothe", "media/prdts/ropa/item-carrito-ropa5.png", "ropa para perro", 'media/prdts/ropa/item-carrito-ropa6.png', 'media/prdts/ropa/item-carrito-ropa5.png', "zdi", "ZeeDog R-Imper", 1500, 500, 0, 0));
    productsDataBase.push(new cardItem("clothe", "media/prdts/ropa/item-carrito-ropa7.png", "ropa para perro", 'media/prdts/ropa/item-carrito-ropa8.png', 'media/prdts/ropa/item-carrito-ropa7.png', "zdc", "ZeeDog R-Capa", 2600, 250, 0, 0));

    productsDataBase.push(new cardItem("belt", "media/prdts/correa/item-carrito-correa1.png", "correa para perros", 'media/prdts/correa/item-carrito-correa2.png', 'media/prdts/correa/item-carrito-correa1.png', "zddib", "ZeeDog C-Dibujos", 1000, 2000, 0, 0));
    productsDataBase.push(new cardItem("belt", "media/prdts/correa/item-carrito-correa3.png", "correa para perros", 'media/prdts/correa/item-carrito-correa4.png', 'media/prdts/correa/item-carrito-correa3.png', "zdneg", "ZeeDog C-Negra", 2500, 500, 0, 0));
    productsDataBase.push(new cardItem("belt", "media/prdts/correa/item-carrito-correa5.png", "correa para perros", 'media/prdts/correa/item-carrito-correa6.png', 'media/prdts/correa/item-carrito-correa5.png', "zdcel", "ZeeDog C-Celeste", 2400, 750, 0, 0));
    productsDataBase.push(new cardItem("belt", "media/prdts/correa/item-carrito-correa7.png", "correa para perros", 'media/prdts/correa/item-carrito-correa8.png', 'media/prdts/correa/item-carrito-correa7.png', "zdml", "ZeeDog C-ManosLibres", 2200, 1500, 0, 0));

    productsDataBase.push(new cardItem("pretals", "media/prdts/pretal/item-carrito-pretal1.png", "pretal para perros", 'media/prdts/pretal/item-carrito-pretal2.png', 'media/prdts/pretal/item-carrito-pretal1.png', "zdps", "ZeeDog P-Fuego", 1800, 1000, 0, 0));
    productsDataBase.push(new cardItem("pretals", "media/prdts/pretal/item-carrito-pretal3.png", "pretal para perros", 'media/prdts/pretal/item-carrito-pretal4.png', 'media/prdts/pretal/item-carrito-pretal3.png', "zdpc", "ZeeDog P-Tigre", 1800, 1000, 0, 0));
    productsDataBase.push(new cardItem("pretals", "media/prdts/pretal/item-carrito-pretal5.png", "pretal para perros", 'media/prdts/pretal/item-carrito-pretal6.png', 'media/prdts/pretal/item-carrito-pretal5.png', "zdpb", "ZeeDog P-Bicolor", 2400, 750, 0, 0));
    productsDataBase.push(new cardItem("pretals", "media/prdts/pretal/item-carrito-pretal7.png", "pretal para perros", 'media/prdts/pretal/item-carrito-pretal8.png', 'media/prdts/pretal/item-carrito-pretal7.png', "zdph", "ZeeDog P-Control", 2400, 750, 0, 0));

    productsDataBase.push(new cardItem("toys", "media/prdts/toys/item-carrito-toy1.png", "juguete para perro", 'media/prdts/toys/item-carrito-toy2.png', 'media/prdts/toys/item-carrito-toy1.png', "zdm", "ZeeDog J-Mordillo", 1200, 1500, 0, 0));
    productsDataBase.push(new cardItem("toys", "media/prdts/toys/item-carrito-toy3.png", "juguete para perro", 'media/prdts/toys/item-carrito-toy4.png', 'media/prdts/toys/item-carrito-toy3.png', "zdq", "ZeeDog J-Quebrados", 2400, 1000, 0, 0));
    productsDataBase.push(new cardItem("toys", "media/prdts/toys/item-carrito-toy5.png", "juguete para perro", 'media/prdts/toys/item-carrito-toy6.png', 'media/prdts/toys/item-carrito-toy5.png', "zdhel", "ZeeDog J-Helado", 2900, 750, 0, 0));
    productsDataBase.push(new cardItem("toys", "media/prdts/toys/item-carrito-toy7.png", "juguete para perro", 'media/prdts/toys/item-carrito-toy8.png', 'media/prdts/toys/item-carrito-toy7.png', "zdbs", "ZeeDog J-BananaSnack", 1000, 2000, 0, 0));

}

//esta función imprime cada card de la función instanciadora en el DOM
function fullProducts(i, instance) {

    $("#catalog").append(
        ` <div class="quarter__prod" data-category=${instance.category}>
                        <img src="${instance.imagItem}"
                        onmouseover="this.src='${instance.firstImag}';"
                        onmouseout="this.src='${instance.secondImag}';"
                        alt="${instance.descriptionImag}" class="quarter__pic">
                        <div class="quarter__brand">
                        <h3 class="quarter__item nameItem">${instance.named}</h3>
                        <span class="quarter__code">Código:<p class="idItem">${instance.id}</p></span>
                            </div>
                            <div class="quarter__price">
                            <span class="quarter__amount" >PRECIO $<p class="priceItem">${instance.price}</p></span>
                            </div>
                            <div class="quarter__purchaser">
                            <button class="quarter__buy">COMPRA!</button>
                                <span class="quarter__summation"><p  class="subtotalItem" id="subtotalPicked${i}">${instance.subtotal}</p></span>
                                <div class="quarter__numerator">
                                <button class="quarter__counter">-</button>
                                <span class="quarter__num"><p class="unitsItem" id="unitsPicked${i}">${instance.units}</p></span>
                                <button class="quarter__counter">+</button>
                                </div>
                                <span class="querter__stock" id="stockPicked${i}" hidden>${instance.stock}</span>
                                </div>
                            </div>`
    )
}


// esta funcion instancia en un array consumible por el algoritmo, a las card pintadas en el dom, que se obtienen como consecuencia del evento click de comprar en todos los botones con la clase quarter__buy
function processToBuy() {
    $(".quarter__buy").click(function addCartShop(e) {
        e.stopPropagation();
        let nodeButton = e.target;
        let nodeCard = nodeButton.parentNode.parentNode;
        let productImage = nodeCard.children[0].src;
        let productName = nodeCard.children[1].children[0].textContent;
        let productIdItem = nodeCard.children[1].children[1].children[0].textContent;
        let productPrice = parseInt(nodeCard.children[2].children[0].children[0].textContent);
        let productSubtotal = parseInt(nodeCard.children[3].children[1].children[0].textContent);
        let productUnits = parseInt(nodeCard.children[3].children[2].children[1].textContent);
        let productStock = parseInt(nodeCard.children[3].children[3].textContent);

        $("#btnToShopKart").addClass("visualChange");
        setTimeout(() => {
            $("#btnToShopKart").removeClass("visualChange");
        }, 1000);

        const productSelected = {

            itemImage: productImage,
            itemName: productName,
            itemId: productIdItem,
            itemPrice: productPrice,
            itemUnits: productUnits,
            itemSubtotal: productSubtotal,
            itemStock: productStock
        }
        arrayRegister(productSelected), totalFinal(preOrder) , toContinueProcess ();
    })
}



// esta funcion encargada de distribuir en el algoritmo, que click no puede ser compra, que click es compra y se pushea al array o altera al array, y que parte se imprime o se re imprime. FUNDAMENTAL EL MÉTODO FIND
function arrayRegister(productSelected) {
    if (productSelected.itemUnits == 0) {
        return alert(`Debes seleccionar una cantidad de producto, en este producto nuestro stock es: ${productSelected.itemStock} unidades `);
    } else {

        if (preOrder.length <= 0) {
            preOrder.push(productSelected);
            newOrderToPrint(preOrder[0]);
            removeNodes()

        } else if (preOrder.length >= 1) {
            let idFollow = preOrder.find(elemento => elemento.itemId == productSelected.itemId)
            if (idFollow == undefined) {
                preOrder.push(productSelected);
                newOrderToPrint(productSelected);
                removeNodes(productSelected)

            } else {
                for (let i = 0; i < preOrder.length; i++) {
                    if (preOrder[i].itemId == productSelected.itemId) {
                        let stockCheck = preOrder[i].itemUnits + productSelected.itemUnits;
                        if (stockCheck <= preOrder[i].itemStock) {
                            preOrder[i].itemUnits = preOrder[i].itemUnits + productSelected.itemUnits;
                            preOrder[i].itemSubtotal = preOrder[i].itemUnits * preOrder[i].itemPrice;
                            changeOrderPrinted(preOrder[i]);
                            removeNodes()
                        } else { alert("no disponemos de tanto stock, puedes solicitar hasta " + preOrder[i].itemStock) }
                    }
                }
            }
        }
    }
}

// imprime en la tabla sobre un nodo previo del carrito, el producto existente con nuevas condiciones de cantidad
function changeOrderPrinted(selected) {
    $(`#${selected.itemId}`).html(
        `<td data-label="Imagen" class="fifth__dataTable"><img class="fifth__imgProd" nowrap src="${selected.itemImage}"></td>
                <td data-label="Nombre" nowrap class="fifth__dataTable"><p id="fifth__name">${selected.itemName}</p></td>
                <td data-label="Precio" nowrap class="fifth__dataTable"><p class="fifth__price">$${selected.itemPrice}</p></td>
                <td data-label="Cantidad" nowrap class="fifth__dataTable"><p class="fifth__units">${selected.itemUnits}</p></td>
                <td data-label="Subtotal" nowrap class="fifth__dataTable"><p class="fifth__subtotal">${selected.itemSubtotal}</p></td>
                <td data-label="Canasta" nowrap class="fifth__dataTable"><button type="button" class="fifth__trash">Quitar</button></td>
                `
    )

}

// imprime dom en la tabla como nuevos elementos cada producto que se trae con el evento click sobre el boton de compra
function newOrderToPrint(selected) {
    $("#tablePreOrder").append(
        `   <tr class="fifth__tableRow" id="${selected.itemId}">
                    <td data-label="Producto" class="fifth__dataTable"><img class="fifth__imgProd" src="${selected.itemImage}"></td>
                    <td data-label="Nombre" class="fifth__dataTable"><p id="fifth__name">${selected.itemName}</p></td>
                    <td data-label="Precio" class="fifth__dataTable"><p class="fifth__price">$${selected.itemPrice}</p></td>
                    <td data-label="Cantidad" class="fifth__dataTable"><p class="fifth__units">${selected.itemUnits}</p></td>
                    <td data-label="Subtotal" class="fifth__dataTable"><p class="fifth__subtotal">${selected.itemSubtotal}</p></td>
                    <td data-label="Canasta" class="fifth__dataTable"><button type="button" class="fifth__trash">Quitar</button></td>
                    </tr>`
    )


};

// remueve nodos de los productos impresos ante el click en el boton quitar de la canasta
function removeNodes() {
    $(".fifth__trash").on("click", (e) => {
        e.stopPropagation();
        let selected = e.target.parentNode.parentNode.id;
        e.target.parentNode.parentNode.remove();

        let arrayFiltered = preOrder.filter(element => element.itemId != selected)
        preOrder = arrayFiltered;
        totalFinal(preOrder);

        toContinueProcess ()
        closePopUpShop()
    })
}

// imprime el total final con la suma de todos los sub totales. FUNDAMENTAL EL METODO "MAP", CONVINADO CON "REDUCE"
function totalFinal(preOrder) {

    const total = preOrder.map(obj => obj.itemSubtotal).reduce((preValue, currentValue) => preValue + currentValue, 0);

    if (total > 0) {
        $("#tablePreOrderFoot").html(
            `<tr id="amountTotal">
                td></td>
                <td>Total de la compra</td>
                <td>$${total}</td>
                </tr>`
        )
        basketCounter()
    }
    else {
        $("#amountTotal").remove();
        basketCounter()
    }
}

// la funcion encargada de los botones contadores de las unidades que muestran en la car cada unidad y cada subtotal al momento
function countersButtons() {
    $(".quarter__counter").click(function selectUnits(e) {
        e.stopPropagation();
        let nodeCount = e.target;
        let nodeCountParent = nodeCount.parentNode.parentNode.parentNode;
        let idSelected = nodeCountParent.children[1].children[1].children[0].textContent;
        let btnCount = e.target.textContent

        for (let i = 0; i < productsDataBase.length; i++) {


            if (idSelected == productsDataBase[i].id) {

                if (btnCount == "+") {

                    if (productsDataBase[i].units < productsDataBase[i].stock) {
                        productsDataBase[i].units = productsDataBase[i].units + 1;
                        productsDataBase[i].subtotal = productsDataBase[i].units * productsDataBase[i].price;
                        updateDisplay(i, productsDataBase[i].units, productsDataBase[i].subtotal, productsDataBase[i].stock);
                        return
                    }
                } else if (btnCount == "-") {
                    if (productsDataBase[i].units > 1) {
                        productsDataBase[i].units = productsDataBase[i].units - 1;
                        productsDataBase[i].subtotal = productsDataBase[i].units * productsDataBase[i].price;
                        updateDisplay(i, productsDataBase[i].units, productsDataBase[i].subtotal, productsDataBase[i].stock);
                        return
                    }
                }
            }
        }
    });
}

// esta es la impresora de las modificaciones de los botones contadores
function updateDisplay(i, newUnits, newSubtotal) {
    $(`#subtotalPicked${i}`).html(`${newSubtotal}`);
    $(`#unitsPicked${i}`).html(`${newUnits}`);
}

//Cierre automatico, al quitar el último producto del carrito
function toContinueProcess (){

    if(preOrder.length<= 0){
        $("#toSummaryBuy").css("display", "none");
    } else if(preOrder.length >= 1){
        $("#toSummaryBuy").css("display","initial" );
        
    }
}

//Esta funcion tiene la tarea de abrir o impedir la apertura, del popUp con la vista previa del carrito en caso de estar vacío
$("#btnToShopKart").click(()=>{
    if(preOrder[0] != undefined){
    $(".fifth__overlay").css("display" , "initial");
    $("#closeShopKart").click(()=>{
        $(".fifth__overlay").css("display" , "none")});
    } else{
        alert("El carrito esta vacío")
    }
    })

// esta función pushea el array al storage session al momento del click en el boton pagar
$("#toSummaryBuy").click(()=>{
        sessionStorage.setItem( "orderOnProcess" , JSON.stringify(preOrder))
    
});

//funcion para cerrar el popUP del carrito
function closePopUpShop(){
    if(preOrder[0] == undefined){
        $(".fifth__overlay").css("display" , "none")}
}

//imprime el numero de unidades de los productos seleccionados, en la barra nav, al lado del icono carrito
function basketCounter(){
    if(preOrder[0] == undefined){
    $(".btnsHeadSet__counter").remove()
    } else {
    let totalUnits = preOrder.map(obj => obj.itemUnits).reduce((preValue, currentValue) => preValue + currentValue, 0);

    $("#counterArray").html(`<p class="btnsHeadSet__counter">${totalUnits}<p>`);
}
}



