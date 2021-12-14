//creo las variables voy a usar
let preOrder = [];
let finalOrder = [];


//---------------------------------------------------------------------------------

//arranca todo con el llamado a la función que obtiene del storge lo que el usuario seleccionó.
checkStorage()


function checkStorage(){
let requestOfOrder = JSON.parse(sessionStorage.getItem("orderOnProcess"));
console.log(requestOfOrder)
if(requestOfOrder != null){
    requestOfOrder.forEach(element => {
        preOrder.push(element);       
    });
    for (let i = 0; i < preOrder.length; i++) {
        newOrderToPrint(preOrder[i]);
    }
    totalFinal(preOrder)
    removeNodes()
}
}


//imprime cada producto del array
function newOrderToPrint(selected) {
    $("#tableSummary").append(
        `   <tr class="fifth__tableRow" id="${selected.itemId}">
                    <td data-label="Imagen" class="fifth__dataTable"><img class="fifth__imgProd" src="${selected.itemImage}"></td>
                    <td data-label="Nombre" class="fifth__dataTable"><p id="fifth__name">${selected.itemName}</p></td>
                    <td data-label="Precio" class="fifth__dataTable"><p class="fifth__price">$${selected.itemPrice}</p></td>
                    <td data-label="Cantidad" class="fifth__dataTable"><p class="fifth__units">${selected.itemUnits}</p></td>
                    <td data-label="Subtotal" class="fifth__dataTable"><p class="fifth__subtotal">${selected.itemSubtotal}</p></td>
                    <td data-label="Canasta" class="fifth__dataTable"><button type="button" class="fifth__trash">Quitar</button></td>
                    </tr>`
    )


};


//se usa para dar evento click al boton "quitar", que el usuario ve en la tabla
function removeNodes() {
    $(".fifth__trash").on("click", (e) => {
        e.stopPropagation();
        let selected = e.target.parentNode.parentNode.id;
        e.target.parentNode.parentNode.remove();

        let arrayFiltered = preOrder.filter(element => element.itemId != selected)
        preOrder = arrayFiltered;
        totalFinal(preOrder);
        if(preOrder[0] == undefined){
            sessionStorage.removeItem("orderOnProcess");
            window.location = "productos.html";
        }

    })
}

//imprime en el foot de la tabla el valor final que debe pagar el usuario
function totalFinal(preOrder) {

    const total = preOrder.map(obj => obj.itemSubtotal).reduce((preValue, currentValue) => preValue + currentValue, 0);

    if (total > 0) {
        $("#tablePreOrderFoot").html(
            `<tr id="amountTotal">
                td></td>
                <td>Total de la compra: $ </td>
                <td>${total}</td>
                </tr>`
        )
        basketCounter()
    }
    else {
        $("#amountTotal").remove();
        basketCounter()
    }
}

//-------------------------- Paso a volver a seleccionar elementos nuevos en el carrito de compra


//el evento queda declarado y abierto para que el usuario al volver a la pagina de carrito se pushee el array como esta (por si borro algo, ya vuelve modificado//
$("#backToProducts").click(()=>{
    sessionStorage.setItem( "orderOnProcess" , JSON.stringify(preOrder))
});

//-------------------------- Paso a finalizar compra

//el evento queda declarado desde que se inicia. Con esta función se obtiene del storage session los datos que el usuario a logueado o creado. 
$("#paymentMethods").click(()=>{
    
    let userData = JSON.parse(sessionStorage.getItem("userLogged"));
    
    goToMethods();
    finalizePurchase();

    if(userData != null){ 
        return printUserData(userData);
    };
})

//------------------- siguiente paso seleccionar los medios de pagos

//imprime el formulario para seleccionar los metodos de pago
function goToMethods() {
    $("#ToPurchase").html(
        `
        <div class="seventh__message seventh__framing ">
                <h5 class="seventh__lead">Información de Pago</h5>
                
                <div class="seventh__profile">
                
                <div>
                <label for="nameOfUser" class="seventh__label">
                <p class="seventh__par">Nombre y Apellido</p>
                </label>
                <input class="seventh__input" type="text" id="nameOfUser" name="nameOfUser" required
                placeholder="Nombre/s y Apellido/s">
                <span class="seventh__line"></span>
                </div>
                        
                        <div >
                        <label class="seventh__label" for="emailSign">
                        <p class="seventh__par">Casilla de Correo</p>
                        </label>
                        <input class="seventh__input" type="email" id="emailSign" name="emailSign"
                        placeholder="E-mail" autocomplete="off" required>
                        <span class="seventh__line"></span>
                        </div>

                        <div >
                        <label for="addressSign" class="seventh__label">
                            <p class="seventh__par">Domicilio</p>
                            </label>
                            <input class="seventh__input" type="text" id="addressSign" name="addressSign"
                            autocomplete="on" required placeholder="Domicilio">
                            <span class="seventh__line"></span>
                            </div>
                            
                        <div >
                        <label class="seventh__label" for="postalSign">
                        <p class="seventh__par">Código de Correo Postal</p>
                        </label>
                        <input class="seventh__input" type="number" id="postalSign" name="postalSign" max="9999"
                        autocomplete="on" required placeholder="Cod.Post. ej: 1431">
                        <span class="seventh__line"></span>
                    </div>
                    
                    <div id="choiceMethods">
                    <input type="checkbox" name="paymeth" value="banckCBU" id="ckbx_1">
                    <label class="seventh__label" for="ckbx_1">Transferencia Bancaria</label> <br/>

                    <input type="checkbox" name="paymeth" value="cash" id="ckbx_2">
                    <label class="seventh__label" for="ckbx_2">Paga al Momento de la Entrega</label> <br/>
                    </div>
                    </div>
                    
                
                <div id="btnLogSign">
                <button class="seventh__btnSend" type="button" id="sendMethods"> Realizar Pago </button>
                </div>
            </div>
            </div>`
    ); 
}


//si el usuario estaba previamente logueado toma los datos y los imprime directamente en el input perteneciente

function printUserData(user){
    let firstName = `${user.name.first}`;
    let lastName = `${user.name.last}`;
    let fullname = firstName.concat(" ", lastName);
    $("#nameOfUser").val(`${fullname}`);
    $("#emailSign").val(`${user.email}`);
    let street = `${user.location.street.name}`;
    let number = `${user.location.street.number}`;
    let fullLocation = street.concat(" ", number);
    $("#addressSign").val(`${fullLocation}`)
    $("#postalSign").val(`${user.location.postcode}`)
 }


//Con esta funcion totamos los datos ingresados por el usuario en los inputs
 function finalizePurchase(){
     $("#sendMethods").click(()=>{
    
    
    let inputFullname = $("#nameOfUser").val();
    let inputEmail = $("#emailSign").val();
    let inputFullAddress = $("#addressSign").val();
    let inputPostalCode = $("#postalSign").val();
    let inputChoiceMethods = "";
    let checkboxes = $("#choiceMethods").find("input[type=checkbox]");
    
    //FUNDAMENTAL MÉTODO EQ() PARA INDICARLE CUAL DE LOS DOS DOM CHECKBOXES FUE TILDADO
    for (let i = 0; i < checkboxes.length; i++) {
    
        if(checkboxes.eq(i).is(":checked")){
        inputChoiceMethods += checkboxes.eq(i).val() + "\n";
    
            }    
        }
    
        const infoForOrder = {
            orderFullname : inputFullname,
            orderEmail : inputEmail,
            orderFullAddress : inputFullAddress,
            orderPostalCode : inputPostalCode,
            orderchosenMethod : inputChoiceMethods 
         }

        if (inputFullname != "" && inputFullname != "" &&
        inputEmail != "" && inputFullAddress != "" && inputPostalCode != "" && inputChoiceMethods != "") { 
            if ($("#ckbx_1").is(":checked") && $("#ckbx_2").is(":checked")){
            alert("Debes Seleccionar un sólo medio de pago")
            } else {
        
            finalOrder.push(infoForOrder);    
        
            printResult();
            removeLastOrder();
            }
        
        } else{ alert("Falta ingresar información")}
    
    })
}

//con esta función informamos al usuario que el proceso se ha finalizado imprimiendo DOM con ese mensaje
function printResult() {
    $(".eighth").html(
        `
        <div class="eighth__banner">
        <h5 class="eighth__textBanner" id="">Gracias por su compra</h5>
        <p class="eighth__textBanner">Si lo desea puede volver a la página de productos y realizar otra compra haciendo <a class="eighth__btnBanner" href="productos.html" id="removePurchaseRequest">click aquí</a></p>
        </div>
        `)
}

//con esta función removemos del session storage el array, una vez que se apreta en el último elemento del array
function removeLastOrder(){
    $("#removePurchaseRequest").click(()=> {

        sessionStorage.removeItem("orderOnProcess");
        });
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