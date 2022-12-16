var time = new Date();
console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

//document.getElementById("NavBar2").style.display="none";
// --------------------------- USUARIOS --------------------------------
class User{
    constructor(dpi, name, username, password, phone, admin){
        this.dpi = dpi;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.next = null;
    }
}

class listUsers{
    constructor(){
        this.head = null;
        this.last = null;
        this.size = null;
    }

    addUser(dpi, name, username, password, phone, admin){
        var newUser = new User(dpi, name, username, password, phone, admin);
        this.size++;
        if(this.head == null){
            this.head = newUser;
            this.last = newUser;
        }else{
            this.last.next = newUser;
            this.last = newUser;
            this.last.next = this.head.next;
        }
    }

    findUser(user){
        var tmp = this.head;
        if(tmp != null){
            for(var i = 0; i < this.size; i++){
                if(tmp.username == user){
                    return tmp
                }
                tmp = tmp.next;
            }
        }
        return null;
    }

    findUserLogin(user, pass){
        let tmp = this.head;
        if(tmp != null){
            for(var i = 0; i < this.size; i++){
                if(tmp.username == user && tmp.password == pass){
                    return tmp;
                }
                tmp = tmp.next;
            }
        }
        return null;
    }

    printUsers(){
        let tmp = this.head;
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                console.log(tmp);
                tmp = tmp.next;
            }
        }
    }


}


// --------------------------- PLAYLIST --------------------------------
class nodePlaylist{
    constructor(song){
        this.song = song;
        this.next = null;
        this.prev = null;
    }
}

class doubleListPlaylist{
    constructor(){
        this.head = null;
        this.last = null;
        this.size = null;
    }

    addToPlaylist(song){
        this.size++;
        if(this.head == null){
            var newNode = new nodePlaylist(song);
            newNode.next = newNode.prev = newNode;
            this.head = newNode;
            return;
        }

        var lastest = this.head.prev;
        var newNode = new nodePlaylist(song);
        newNode.next = this.head;
        this.head.prev = newNode;
        newNode.prev = lastest;
        lastest.next = newNode;
    }

    printPlaylist(){
        let tmp = this.head;
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                console.log(tmp);
                tmp = tmp.next;
            }
        }
    }

}


// --------------------------- CANCIONES --------------------------------
class Song{
    constructor(artist, name, duration, gender){
        this.artist = artist;
        this.name = name;
        this.duration = duration;
        this.gender = gender;
        this.next = null;
    }
}

class ListSong{
    constructor(){
        this.head = null; 
        this.last = null;
        this.size = null;
    }

    addSong(artist, name, duration, gender){
        var newUser = new Song(artist, name, duration, gender);
        this.size++;
        if(this.head == null){
            this.head = newUser;
            this.last = newUser;
        }else{
            this.last.next = newUser;
            this.last = newUser;
            this.last.next = this.head.next;
        }
    }

    printSongs(){
        let tmp = this.head;
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                console.log(tmp);
                tmp = tmp.next;
            }
        }
    }


}

// --------------------------- AMIGOS --------------------------------
class Friend{
    constructor(friend){
        this.friend = friend;
        this.next = null;
    }
}

class stackFriend{
    constructor(){
        this.head = null;
        this.size = null;
    }

    push(friend){
        var newFriend = new Friend(friend);
        this.size++;
        if(this.head){
            newFriend.next = this.head;
            this.head = newFriend;
        }else{
            this.head = newFriend;
        }
    }

    pop(){
        if(this.head != null){
            this.size--;
            var tmp = this.head;
            this.head = tmp.next;
            return tmp.friend;
        }else{
            return null;
        }
    }

    printStack(){
        var tmp = this.head;
        while(tmp!=null){
            console.log(tmp.Friend.name);
            tmp = tmp.next;
        }
    }
}

// --------------------------- BLOQUEOS --------------------------------
class Block{
    constructor(friend){
        this.friend = friend;
        this.next = null;
    }
}

class queueBlock{
    constructor(){
        this.head = null;
        this.last = null;
        this.size = null;
    }

    enqueue(friend){
        var tmp = this.head;
        
    }
}


//------------------------------ ARTISTAS + CANCIONES -------------------
class NodoCabeza{
    constructor(name, age, country){
        this.name = name;
        this.age = age;
        this.country = country;
        this.next = null;
        this.down = null;
    }
}

class NodoValor{
    constructor(artist, name, duration, gender){
        this.artist = artist;
        this.name = name;
        this.duration = duration;
        this.gender = gender;
        this.next = null;
    }
}


class Listadelistas{
    constructor(){
        this.head = null;
    }
    //metodos de insertar
    InsertarCabeceras(name, age, country){
        var temporal = new NodoCabeza(name, age, country);
        temporal.next = this.head;
        this.head = temporal;
    }

    InsertarValores(artist, name, duration, gender){
        var temporalcabeza = this.head;
        //recorrer toda la lista de cabezas 
        while(temporalcabeza != null){
            if(temporalcabeza.name == artist){
                var nuevacancion = new NodoValor(artist, name, duration, gender);
                var iniciocanciones = temporalcabeza.down
                temporalcabeza.down = nuevacancion
                nuevacancion.next = iniciocanciones
                break
            }
            temporalcabeza= temporalcabeza.next
        }
        if(temporalcabeza == null){
            console.log("No se encontro el cabecera en la lista "+ artist)
        }

    }

    mostrarCabeceras(){
        var temporal = this.head;
        console.log("*********** Cabeceras *********");
        while (temporal != null){
            console.log(temporal.name);
            temporal = temporal.next;
        }
    }

    MostrarValores(artist){
        var temporal = this.head
        while (temporal != null){
            if(temporal.name == artist){
                console.log("*********** Cabecera "+ artist +" *********")        
                var temporalcanciones = temporal.down
                while(temporalcanciones != null){
                    console.log(temporalcanciones.name)
                    temporalcanciones = temporalcanciones.next
                }
                return
            }
            temporal = temporal.next
        }
        if(temporal == null){
            console.log("No se pudo encontrar el cabeza solicitado "+_value)
        }
    }
}

//----------------------------VARIABLES GLOBALES------------------------
var Users = new listUsers();
var Album = new Listadelistas();





//-----------------Admin Auxiliar---------------------------------------
Users.addUser(2654568452521, "Oscar Armin", "EDD", "123", "+502 (123) 123-4567", true)


Users.printUsers();

// --------------------------- LOGIN --------------------------------
document.getElementById('btn_login').onclick=function(){
    console.log("Intento de Inicio de Sesión");
    var user = document.getElementById('userLogin').value;
    //console.log(user)
    var password = document.getElementById('passwordLogin').value;
    //console.log(password)
    var usuarioEntrada = Users.findUserLogin(user,password);
    //console.log(usuarioEntrada);
    //console.log(check);
    //console.log(usuarioEntrada);
    if (usuarioEntrada != null){
       if(document.getElementById('checkAdm').checked == true && usuarioEntrada!=null){
            console.log("Intento de Inicio de Sesión Exitoso");
           // alert("Ingreso como Administrador: " + usuarioEntrada.username);
            document.getElementById('NavBar1').style.display="none";
            document.getElementById('NavBar2').style.display="block";
            document.getElementById('NavBar3').style.display="none";
            document.getElementById('Index').style.display="none";
            document.getElementById('Login').style.display="none";
            document.getElementById('Register').style.display="none";
            document.getElementById('Admin').style.display="block";
            document.getElementById('User').style.display="none";

            console.log("Comprobación")
            
            //document.getElementById("NarBar3").style.display="none";
            //document.getElementById("Administracion").style.display="block";
        }else{
            alert("Ingreso de Usuario: " + usuarioEntrada.username);
            document.getElementById('NavBar1').style.display="none";
            document.getElementById('NavBar2').style.display="none";
            document.getElementById('NavBar3').style.display="block";
            document.getElementById('Index').style.display="none";
            document.getElementById('Login').style.display="none";
            document.getElementById('Register').style.display="none";
            document.getElementById('Admin').style.display="none";
            document.getElementById('User').style.display="block";
            //document.getElementById("Login").style.display="none";
            //document.getElementById("Index").style.display="none";
            //document.getElementById("Administracion").style.display="none";
            //document.getElementById("PaginaUsuario").style.display="block";
       }
    }else{
        
        alert("Usuario o contraseña incorrectos");
        document.getElementById("userLogin").value="";
        document.getElementById("passwordLogin").value="";
        console.log("Intento de Inicio de Sesión Fallido");
    }
    //listaUsuarios.graficarUsuarios();
}

document.getElementById("btn_gotoregister").onclick=function(){
    document.getElementById('NavBar1').style.display="block";
    document.getElementById('NavBar2').style.display="none";
    document.getElementById('NavBar3').style.display="none";
    document.getElementById('Index').style.display="none";
    document.getElementById('Login').style.display="none";
    document.getElementById('Register').style.display="block";
    document.getElementById('Admin').style.display="none";
    document.getElementById('User').style.display="none";
}

document.getElementById("btn_cancelRegister").onclick=function(){
    document.getElementById('NavBar1').style.display="block";
    document.getElementById('NavBar2').style.display="none";
    document.getElementById('NavBar3').style.display="none";
    document.getElementById('Index').style.display="none";
    document.getElementById('Login').style.display="block";
    document.getElementById('Register').style.display="none";
    document.getElementById('Admin').style.display="none";
    document.getElementById('User').style.display="none";
}

document.getElementById("btn_register").onclick=function(){
    var usernameR = document.getElementById('usernameR').value;
    var fullnameR = document.getElementById('fullnameR').value;
    var dpiR = document.getElementById('dpiR').value;
    var phoneR = document.getElementById('phoneR').value;
    var pswR = document.getElementById('pswR').value;

    Users.addUser(dpiR, fullnameR, usernameR, pswR, phoneR, false);

    alert('Usuario ' + usernameR + ' creado exitosamente.');
     

    document.getElementById('NavBar1').style.display="block";
    document.getElementById('NavBar2').style.display="none";
    document.getElementById('NavBar3').style.display="none";
    document.getElementById('Index').style.display="none";
    document.getElementById('Login').style.display="block";
    document.getElementById('Register').style.display="none";
    document.getElementById('Admin').style.display="none";
    document.getElementById('User').style.display="none";

    Users.printUsers();
}

function leerArchivoUsuario(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        loadUsers(contenido);
    };
    lector.readAsText(archivo);
}



function loadUsers(content){
    var datos = JSON.parse(content);
    for (var i = 0; i < datos.length; i++) {
       // listaUsuarios.InsertarUsuario(datos[i].dpi,datos[i].nombre_completo,datos[i].nombre_usuario,datos[i].correo,datos[i].rol,datos[i].contrasenia,datos[i].telefono);
    }
   // listaUsuarios.graficarUsuarios();
    alert("Usuarios cargados"); 
}



