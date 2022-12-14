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



// --------------------------- LOGIN --------------------------------
document.getElementById("btn_login").onclick=function(){
    alert("aaaaaaaa")
    let user = document.getElementById("userLogin").value;
    let password = document.getElementById("passwordLogin").value;
    var usuarioEntrada = listaUsuarios.RecorrerMenu(usuario,contrasenia);
    if (usuarioEntrada != null){
        console.log("1")
       // if(usuarioEntrada.rol == "Administrador"){
            //document.getElementById("Login").style.display="none";
            //document.getElementById("Index").style.display="none";
            //document.getElementById("Administracion").style.display="block";
      //  }
       // else if(usuarioEntrada.rol == "Usuario"){
            //document.getElementById("Login").style.display="none";
            //document.getElementById("Index").style.display="none";
            //document.getElementById("Administracion").style.display="none";
            //document.getElementById("PaginaUsuario").style.display="block";
     //   }
    }else{
        console.log("2")
        alert("Usuario o contraseña incorrectos");
    }
    //listaUsuarios.graficarUsuarios();
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