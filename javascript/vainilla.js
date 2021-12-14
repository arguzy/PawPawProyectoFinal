

//creo las variables que voy a usar
let message = [];
//llamo dentro del documento por id al boton que quiero usar
const buttonForm = document.getElementById('btnForm');

/*
le ingreso un evento con una funcion flecha, en la que tomo los valores 
por id's de los inputs del formulario y luego los instancio por una matriz. 
eso lo pusheo al array, le hago un return de la instancia que quiero del array
*/
buttonForm.addEventListener('click' , () => {

    let fullName = document.getElementById('fullnameContact').value;
    let phone = parseFloat(document.getElementById('phoneContact').value);
    let email = document.getElementById('emailContact').value;
    let petName = document.getElementById('namePetContact').value;
    let theQuestion = document.getElementById('consultationContact').value;

    class obtainMessage {
        constructor(fullName, phone, email, petName, theQuestion){
        this.fullName = fullName
        this.phone = phone
        this.email = email
        this.petName = petName
        this.theQuestion = theQuestion
    }
    
}
    message.push(new obtainMessage(fullName, phone, email, petName, theQuestion))
    console.log(message[0])
    return printReceived(message[0]);
});

// remuevo el boton e imprimo el nuevo dom sobre el otro
function printReceived(message){
    buttonForm.parentNode.removeChild(buttonForm);
    let postQuestion = document.getElementById('newMessage');
    postQuestion.innerHTML=
    `
    <div class="third__label">
        <h3 class="third__lead">Se ha ingresado la siguiente consulta:</h3>
        <div class="seventh__framingForms">
        <p class="third__post">Por el dueño: ${message.fullName} </p>
        <p class="third__post">El teléfono indicado fue ${message.phone} y la casilla de correo ${message.email}</p>
        <p class="third__post">Su mascota es: ${message.petName}</p>
        <p class="third__post">Su consulta fue: ${message.theQuestion}</p>
        <p class="third__post">Pronto nos pondremos en contacto, muchas gracias</p>
        </div>
    </div>
    
    `


}
