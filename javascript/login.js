//Creo las variables que voy a ir usando en el algoritmo.
let newUser = [];
let user = [];



//---------------------------------------------------------------------------------------------------------

//Iniciamos chequeando que el Session Storage
checkSession();

function checkSession(){
    //esta función crea una variable y con método json, de por medio, consulta si hay un array en el sessionStorage, que tenga el Key: userLogged
    let requestForlog = JSON.parse(sessionStorage.getItem( "userLogged"));
    //le retorno una función con la variable en el argumento
    return checkProcess(requestForlog) , userProcessOn();

}

// En esta función le indico, con un IF, si tengo un "userLogged", entonces se remueve del DOM el icono para loguear usuarios y se imprime sobre él, un ancor con icono de Login Out, y se retorna una función llamada logOutUser, que continúa con el proceso de destruir sessión. 
//luego el ELSE, es básicamente "no tengo usuario", es decir, sin usuario logueado, se imprime 3 links y se retornan 3 funciones, cada una para cada link de trabajo sea Loguearse, crear un usuario o recuperar una contraseña.
function checkProcess(userLogged){
if (userLogged != undefined){
    //quito al icono de login para que tenga espacio el de logOut
    $("a").remove("#btnForUsers");
    // imprimo el nuevo nodo de DOM
    $("#iconLog").html(
    `<a class="userLogIn" href="#" id="btnLogOut"><i class="fa fa-sign-out" aria-hidden="true"></i></a>`
     );
     //retorno la función que lleva el algorimo a poder destruir la sesión
     return logOutUser();
    } else {
        $(".seventh__subject").html(
            `
        <div class="seventh__framming">
        <div class="seventh__head">
        <button type="reset" class="seventh__btnClose" id="exitPopUp"><i
        class="fa fa-times-circle-o"></i></button></div>
        
        <div class="seventh__framingForms">
                             
        <h5 class="seventh__lead seventh__padding"><a href="#"  id="ToLogin" >Iniciar Sesión</a></h5>
        
        <h5 class="seventh__lead seventh__padding"><a href="#"  id="signinMember" >Crear Usuario</a></h5>
        
        <p class="seventh__recover seventh__padding">¿Has olvidado su contraseña o usuario? Has <a href="#" id="sendNewPass">click aquí</a></p>
        
        <div class="seventh__framingForms">
        </div>                   `
            ); 
            }
            // el retorno con tres funciones que permiten trabajar 3 opciones al usuario
            return   loginOn()  ,  signOn() , recoverOn();

}








//-----------------------------------------------------------------------------------------------------
// Como el primer caso del if es: "tengo un usuario", el algoritmo prosigo con ese caso. DESTRUCCION DE USUARIO
function logOutUser(){
    // se le indica un evento click que trae una función flecha
    $("#btnLogOut").click(()=> {
        //con esto borro la key, que lleva el array con los datos del usuario
        sessionStorage.removeItem("userLogged");
        //creo el ancor, como primer hijo en la div, con el icono de logo de usuario
        $("#iconLog").html(
            `<a class="userLogIn" href="#" id="btnForUsers" ><i class="fa fa-user" ></i></a>`
            );
            //remuevo el ancor que tiene el icono log out. 
            $("a").remove("#btnLogOut");
            //emito un alert al usuario de que se destruye la sesión iniciada
            alert("Has cerrado la sesión");
            //y se retorna con la función que constata si hay usuario, para que corra el ELSE.
            return checkSession();
        });
}







//---------------------------------------------------------------------------------------------------------------------------------

//En esta función se agrega un evento, al click en el boton para iniciar sesión.
function loginOn() {
    $("#ToLogin").click(()=>{ 
        
        //se remueve todos los nodos que no forman parte de este paso del algoritmo y se imprime el formulario con el que puede iniciar sesión el usuario 
        $(".seventh__lead").remove()
        $(".seventh__recover").remove()
        $(".seventh__subject").html(
            `
        <div class="seventh__framming">
        <div class="seventh__head">
            <button type="reset" class="seventh__btnClose" id="exitPopUp"><i
            class="fa fa-times-circle-o"></i></button>
        </div>
        <div class="seventh__profile">
        <form>
            <div class="seventh__framingForms">
            
                <div>
                    <label for="nickOfUser" class="seventh__label">
                    <p class="seventh__par" id="nickname">Apodo del Usuario</p>
                    </label>
                    <input class="seventh__input" type="text" id="nickOfUser"   name="nickOfUser"
                    autocomplete="on" required placeholder="Apodo o Nickname">
                </div>
        
                <div>
                    <label for="password" class="seventh__label">
                    <p class="seventh__par">Contraseña</p>
                    </label>
                    <input class="seventh__input" type="password" name="password"       minlength="8"     maxlength="16" autocomplete="on" 
                    required placeholder="Contraseña" id="password"><span class             ="seventh__lookup"> 
                    <i id="takeALook" class="fa fa-low-vision"></i></span>
                </div>
        
                <div id="btnLogSign">
                    <button class="seventh__btnSend" type="button" id="btnLogin"> Enviar </button>
                </div>
        
                </div>
            </form>

        </div>

        

        </div>
        `
        );
        // estas funciones llevan un algoritmo que permite al usuario ver lo que esta escribiendo dentro del imput de contraseña
        lookOnPass("takeALook","password");
        // se retornan dos funciones, la primera le permite continuar con el loguin, la segunda abortar y cerrar el popUP
        return confirmTologin(), btnCloseOn();
    });
    }

// esta función tiene la primer API, su función es buscar contenido y devolverlo, comprobando si el input tiene un similar en ese espacio almacenado en la web
function confirmTologin(){

    $("#btnLogin").click( ()=>{
            //declara las variables de las que se piden dato.
            
            // PARA TESTEAR RÁPIDO //
            //let DOMinputUser ="claudia.cruz@example.com";
            //let DOMinputpass = "lickme";
            
            
            
            let DOMinputUser =$("#nickOfUser").val();
            let DOMinputpass =$("#password").val();
            
            // se declara la api, se ingresa la URL de donde se obienten los datos, se informa que clase de datos va a obtener, se informa que ante el resultado positivo, se realiza un for each para instanciar los usuarios de la base de datos en el array, y se le pide retornar con la función searching, con dos argumentos el nombre de usuario y el pass ingresado
            $.ajax({
            url: 'https://randomuser.me/api/?nat=ES&results=10&seed=a1',
            dataType: 'json',
            success: (data) => {
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ESTO NO SE HACE, ESTO SE HIZO PORQUE LA URL DE LA API QUE ENCONTRÉ A LA CONSULTA DIRECTA A VECES LA CRASHEABA y A VECES NO!!!!!!!!!!!!!!!!!!
                data.results.forEach(element => {
                    user.push(element);
                });
             return searching(DOMinputUser , DOMinputpass);
            }
        });
    });
}
// searching es una función asincronica que espera la ejecusión de una función que le devuelve en promesa de ser cumplida. Con try la envía a la función promesa findUser con los argumentos usuario y pass. Si findUser emite resolve, se hace correr la función goToProfile. Con catch nos devuelve el error por un alert (el error viene del reject que tiene la promise). 
const searching = async (localUser, password) => {
    // let loading = true
    try {
        const validate = await Promise.all([
            findUser(localUser, password)
        ])
        goToProfile(validate);

    } catch (error) {
        
        alert(error);
    } finally {
        console.log("CORRIO BIEN");
        //   loading = false;
    }

}
//en findUser, creo dos variables para que se constaten. El pass y el Nick (o el email - que va  porque me vivo olvidando los nicks, que ya no deberían existir-). Lo interesante de esta función es que devuelve la promesa con un set time Out que tiene la opción de obtener el resultado o no.
const findUser = (usernameInput, passInput) => {
    let userValid = user.find(item => item.email == usernameInput || item.login.username === usernameInput);
    let passValid = user.find(item => item.login.password == passInput);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userValid && passValid) {

                resolve(userValid, passValid)

            } else {

                reject(`No se encontro el usuario ${usernameInput} o la constraseña ingresada no es correcto`);
            }

        }, 2000);
    });
}
//Esta función ya con todo el usuario validado, lo que hace es modificar el popUp removiendo nodos e imprimiendo un mensaje simple que todo procedió correctamente. Con el agregado que mete en el session storage al perfil de usuario, con el objetivo de ser usado a la hora de pagar los productos
function goToProfile(dataUser){
    $(".seventh__lead").remove()
    $(".seventh__recover").remove()
    $("#btnLogSign").remove()

    
    $(".seventh__profile").html(
    `<div class="seventh__forLogSign">
    <p class="seventh__lead" > El usuario: ${dataUser[0].name.first} ${dataUser[0].name.last} ha iniciado cesión!</p>
    </div>`);
    //esto lo puse por un concepto de seguridad, a la hora de codear no quiero que alguien haga console.log(user) y le salga un array con todos los usuarios. No debería hacer un for each e instanciar el grupo de usuarios que tiene la URL en mi código, porque en pequeñas bases de datos corre, pero en grandes no, rompería toda la pagina.
    return user = dataUser , sessionStorage.setItem( "userLogged" , JSON.stringify(user[0])), 
    //con el lamado a la función CheckSession cierro el circuito.
    checkSession();

}







//----------------------------------------------------------------------------------------------------------------------------------
// Esta función lleva al algoritmo por el camino de creación del usuario. Remueve nodos innecesarios para este proceso, imprime varios inputs de formulario, les da interacción visual con las funciones lookOnPass y se retorna para continuar el camino de creación del usuario o se pueda abortar el proceso
function signOn(){
    $("#signinMember").click( ()=>{
        $(".seventh__lead").remove()
        $(".seventh__recover").remove()
        $(".seventh__subject").html(
                `
            <div class="seventh__framming">
            <div class="seventh__head">
            <button type="reset" class="seventh__btnClose" id="exitPopUp"><i
            class="fa fa-times-circle-o"></i></button>
            </div>
            
            
            <div class="seventh__profile">
            <form>
                <div class="seventh__framingForms">
                
                    <div>
                        <label for="nameOfUser" class="seventh__label">
                        <p class="seventh__par">Nombre y Apellido</p>
                        </label>
                        <input class="seventh__input" type="text" id="nameOfUser"           name="nameOfUser" required
                        placeholder="Nombre/s y Apellido/s">
                    </div>
                
                    <div>
                        <label for="nickOfUser" class="seventh__label">
                        <p class="seventh__par" id="nickname">Apodo del Usuario</p>
                        </label>
                        <input class="seventh__input" type="text" id="nickOfUser"       name="nickOfUser"
                        autocomplete="on" required placeholder="Apodo o Nickname">
                    </div>
                
                    <div>
                        <label for="password" class="seventh__label">
                        <p class="seventh__par">Contraseña</p>
                        </label>
                        <input class="seventh__input" type="password"   name="password"       minlength="8" maxlength="16"    autocomplete="on"
                        required placeholder="Contraseña" id="password"><span   class         ="seventh__lookup"> 
                        <i id="takeALook" class="fa fa-low-vision"></i></span>
                    </div>
                
                    <div>
                        <label for="repass" class="seventh__label">
                        <p class="seventh__par">Confirmar Contraseña</p>
                        </label>
                        <input class="seventh__input" type="password" name="repass"         minlength="8" maxlength="16" autocomplete="on"
                        required placeholder="Confirmar Contraseña" id="repass"><span   class     ="seventh__lookup"> 
                        <i id="takeAOtherLook" class="fa fa-low-vision"></i></span>
                    </div>
                
                    <div>
                        <label class="seventh__label" for="emailSign">
                        <p class="seventh__par">Casilla de Correo</p>
                        </label>
                        <input class="seventh__input" type="email" id="emailSign"       name="emailSign"
                        placeholder="E-mail" autocomplete="on" required>
                    </div>
                
                    <div>
                        <label for="addressSign" class="seventh__label">
                        <p class="seventh__par">Domicilio</p>
                        </label>
                        <input class="seventh__input" type="text" id="addressSign"      name="addressSign"
                        autocomplete="on" required placeholder="Domicilio">
                    
                    </div>
                
                    <div>
                        <label class="seventh__label" for="postalSign">
                        <p class="seventh__par">Código Postal</p>
                        </label>
                        <input class="seventh__input" type="number" id="postalSign" name="postalSign" max="9999"
                        autocomplete="on" required placeholder="Cod.Post. ej: 1431">
                    </div>
                
                    <div id="btnLogSign">
                        <button class="seventh__btnSend" type="button" id="btnSign"> Crear </button>
                    </div>
                
                </div>
                </div>
                </div>
                </form>
            
            
            </div>

                `
        )
        lookOnPass("takeALook","password");
        lookOnPass("takeAOtherLook","repass");
        return toCreateUser(), btnCloseOn();
})}

// Esta función toma los datos del formulario, los instancia, y luego los pushea en un array, se retorna una función para terminar de informar al usuario que ha creado un perfil. 
function toCreateUser(){
    $("#btnSign").on("click" , signUser);

    function signUser() {
       let inputFullName = $("#nameOfUser").val()
       let fragmentFullName = inputFullName.split(' ');
       let DOMinputFirst = fragmentFullName[0];
       let DOMinputLast = fragmentFullName[1];
       let DOMinputNickname = $("#nickOfUser").val()
       let DOMinputPass = $("#password").val()
       let DOMinputRePass = $("#repass").val()
       let DOMinputEmail = $("#emailSign").val()
       let inputFullLocation = $("#addressSign").val()
       let fragmentFullLocation = inputFullLocation.split(' ');
       let DOMinputStreetName = fragmentFullLocation[0];
       let DOMinputStreetNumber = fragmentFullLocation[1];
       let DOMinputCodePost = $("#postalSign").val()
    
       //esto no se hace acá pero como el boton no es SUBMIT, es necesario.
       if(DOMinputFirst.length < 3 || DOMinputNickname.length < 3 || DOMinputPass != DOMinputRePass || DOMinputEmail.length < 7 || inputFullLocation.length < 7 || DOMinputCodePost.length < 4 ){
        alert("hay datos mal ingresados");
    } else {
       const userCreator = {
           name: {
               first: DOMinputFirst,
               last: DOMinputLast,
            },
            
            email : DOMinputEmail,
            location: {
                street: {
                name: DOMinputStreetName,
                number : DOMinputStreetNumber,
                postcode: DOMinputCodePost,
                }
            },
            login: {
                password : DOMinputPass,
                username: DOMinputNickname,
            }
        }
        newUser.push(userCreator);
        return profileCreated(newUser);
        }

    }
}

// con esta función se crea la vista para que el usuario sepa que se ha creado correctamente el usuario. Remueve nodos innecesarios, imprime contenido del array del nuevo usuario y lo lleva al session storage
function profileCreated(user){
        
    
    $("#btnLogSign").remove()

    
    $(".seventh__profile").html(
    `<div class="seventh__forLogSign">
    <p class="seventh__lead"> Usted ${user[0].name.first} ${user[0].name.last} ha creado un usario!</p>
    </div>`)

    return sessionStorage.setItem( "userLogged" , JSON.stringify(user[0])) , checkSession();
    
}


//--------------------------------------------------------------------------------------------------
// recover es practicamente igual que crear el usuario solo que sin el trabajo de storage al final



function recoverOn(){
    
    $("#sendNewPass").click( ()=>{ 
        $(".seventh__lead").remove()
        $(".seventh__subject").html( 
            `
            <div class="seventh__framming">
            <div class="seventh__head">
                <button type="reset" class="seventh__btnClose" id="exitPopUp"><i
                class="fa fa-times-circle-o"></i></button>
            </div>
            <div class="seventh__profile">
            <form>
                <div class="seventh__framingForms">
                <div>
                    <label class="seventh__label" for="emailSign">
                    <p class="seventh__par">Para recuperar tú contraseña ingresa un correo de usuario</p>
                    </label>
                    <input class="seventh__input" type="email" id="emailSign"       name="emailSign"
                    placeholder="E-mail" autocomplete="on" required>
                </div>
                </form>
                <div id="btnLogSign">
                <button class="seventh__btnSend" type="button" id="btnRecover">Recumerar</button> 
            </div>
    
            </div>
        </form>
    </div>
                
                `
        )
        confirmRecoverPass() , btnCloseOn();

    })
}

function confirmRecoverPass(){

    $("#btnRecover").on("click" , checkEmail);
    
        function checkEmail() {
           let inputEmail = $("#emailSign").val();
           
           
           //USAR PARA TESTEO RÁPIDO
           //let inputEmail ="claudia.cruz@example.com";
           
           $.ajax({
            url: 'https://randomuser.me/api/?nat=ES&results=10&seed=a1',
            dataType: 'json',
            success: (data) => {
                data.results.forEach(element => {
                    user.push(element);
                });
             return toSearchEmail(inputEmail);
            }
        })
    }
}  
//función asincronica que espera la ejecusión de una función que le devuelve en promesa de ser cumplida el chequeo en la api de que haya un correo igual al ingresado
const toSearchEmail = async (inputEmail) => {

    try {
        const emailverified = await Promise.all([
            findEmail(inputEmail)
        ])
        toConcludeRecover(inputEmail);

    } catch (error) {
        alert(error);

    } finally {
        console.log("CORRIO BIEN");
        
    }

}

const findEmail = (inputEmail) => {

    let emailValid = user.find(item => item.email == inputEmail);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (emailValid) {

                resolve(emailValid);

            } else {

                reject(`No se encontro usuario con un correo ${emailValid} así`);
            }

        }, 2000);
    });
}

function toConcludeRecover(dataUser){
    
    $(".seventh__recover").remove()
    $("#btnLogSign").remove()

    
    $(".seventh__profile").html(
    `<div class="seventh__forLogSign">
    <p class="seventh__lead" >Se ha enviado un correo con la contraseña al usuario que tiene esta casilla: ${dataUser}!</p>
    </div>`);


    btnCloseOn();

}


//----------------------------------------------------------------------------------------------------------
//Con estas 2 función el PopUp se "abre y se "cierra".
function userProcessOn(){
    $("#btnForUsers").click( ()=>{
            $("#btnForUsers").addClass("userless");
            $(".seventh").addClass("bringON");
            btnCloseOn();
    })
}

function btnCloseOn(){
    $("#exitPopUp").click(()=>{ $(".seventh").removeClass("bringON" , "turnOFF")
    $("#btnForUsers").removeClass("userless")
    checkSession();
});
    
}

btnCloseOn();


// con estas funciones se remueve un attr para un evento mouseUp y mousedown
function lookOnPass(ancor , input){
    $(`#${ancor}`).mousedown(()=>{
        $(`#${input}`).removeAttr("type"), console.log("hola")
    })
    
    $(`#${ancor}`).mouseup(()=>{
        $(`#${input}`).attr("type", "password"), console.log("chau")
    })
    }


         