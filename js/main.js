var time = new Date();
console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

//document.getElementById("NavBar2").style.display="none";
// --------------------------- USUARIOS --------------------------------
class User{
    constructor(dpi, name, username, password, phone, admin, id, passwordC){
        this.dpi = dpi;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.passwordC = passwordC;
        this.next = null;
        this.id = id;
        this.friends = new stackFriend();
        this.block = new queueBlock();
        this.playlist = new doubleListPlaylist();
    }
}

class listUsers{
    constructor(){
        this.head = null;
        this.last = null;
        this.size = null;
    }

    stringToHashConversion(string) {
        for(var i = 0, hash = 0; i < string.length; i++)
        hash = Math.imul(31, hash) + string.charCodeAt(i) | 0;
        return hash;
       }

    addUser(dpi, name, username, password, phone, admin){
        this.size++;
        let encript = this.stringToHashConversion(password);
        var newUser = new User(dpi, name, username, password, phone, admin, this.size, encript);
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

    printCardUsers(){
        let tmp = this.head;
        var texto = "";
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                texto += `<div class="card" style="width: 18rem; float: left;">
                        <img src="images/music.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${tmp.name}</h5>
                            <p class="card-text">${tmp.username}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">DPI: ${tmp.dpi}</li>
                            <li class="list-group-item">Número de Teléfono: ${tmp.phone}</li>
                        </ul>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><button type="button" class="btn btn-success" onclick="addFriend('${tmp.username}')">Agregar</button></li>
                                <li class="list-group-item"><button type="button" class="btn btn-danger" onclick="blockFriend('${tmp.username}')">Bloquear</button></li>
                            </ul>
                        </div>
                    </div>`;
                tmp = tmp.next;
            }
            return texto;
        }
        return "";
    }
 

    grafica(){
        var graphUser = "digraph G { \n rankdir=\"LR\";\n";
        var nodoaux = this.head;
        
        for(let i = 0; i < this.size; i++){
            graphUser += "user" + nodoaux.id + "[label=\"" + nodoaux.username + "\"];\n";
            
            nodoaux = nodoaux.next;
        }
        nodoaux = this.head;
        for(let i = 0; i < this.size - 1; i++){
            if(nodoaux.next != null){
                graphUser += "user" + nodoaux.id + "->" + "user" + (nodoaux.id + 1) + ";\n";
            }
            nodoaux = nodoaux.next;
        }
        
        graphUser += "}";
        //console.log(graphUser);
        return graphUser;
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

    printCardPlaylist(){
        let tmp = this.head;
        let texto = "<H1>My Playlist</H1>"
        if(tmp != null){
            var genero = "Género: "
            for (var i = 0; i < this.size; i++) {
                for(let i = 0; i < tmp.song.gender.length; i++){
                    if(i == tmp.song.gender.length - 1){
                        genero += tmp.song.gender[i];
                    }else{
                        genero += tmp.song.gender[i] + ", ";
                    }
                    
                }
                texto += `<div class="card" style="width: 18rem; float: left;">
                            <img src="images/music2.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${tmp.song.name}</h5>
                                
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Artista: ${tmp.song.artist}</li>
                                <li class="list-group-item">Duración: ${tmp.song.duration} minutos</li>
                                <li class="list-group-item">${genero}</li>
                            </ul>
                        </div><br>`;
                tmp = tmp.next;
            }
        }
        return texto;
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

    printCardFriend(){
        let tmp = this.head;
        var texto = "";
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                texto += `<div class="card" style="width: 18rem; float: left;">
                        <img src="images/music.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${tmp.friend.name}</h5>
                            <p class="card-text">${tmp.friend.username}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">DPI: ${tmp.friend.dpi}</li>
                            <li class="list-group-item">Número de Teléfono: ${tmp.friend.phone}</li>
                        </ul>
                    </div>`;
                tmp = tmp.next;
            }
            return texto;
        }
        return "";
    }
}

// --------------------------- BLOQUEOS --------------------------------
class Block{
    constructor(friend){
        this.friend = friend;
        this.next = null;
        this.prev = null;
    }
}

class queueBlock{
    constructor(){
        this.head = null;
        this.last = null;
        this.size = null;
    }

    enqueue(friend){
        this.size++;
        if(this.head == null){
            this.head = this.last = new Block(friend);
        }else{
            this.last.next = new Block(friend);
            this.last.next.prev = this.last;
            this.last = this.last.next;
        }  
    }

    pop(){
        this.size--;
        if(this.head != null){
            this.head = this.head.next;
            if(this.head != null){
                this.head.prev = null;
            }
        }
    }

    printCardEnemy(){
        let tmp = this.head;
        var texto = "<H2>Usuarios Bloqueados</H2>";
        if(tmp != null){
            for (var i = 0; i < this.size; i++) {
                texto += `<div class="card" style="width: 18rem; float: left;">
                        <img src="images/music.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${tmp.friend.name}</h5>
                            <p class="card-text">${tmp.friend.username}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">DPI: ${tmp.friend.dpi}</li>
                            <li class="list-group-item">Número de Teléfono: ${tmp.friend.phone}</li>
                        </ul>
                    </div>`;
                tmp = tmp.next;
            }
            return texto;
        }
        return "";
    }
}


//------------------------------ ARTISTAS + CANCIONES -------------------
class nodoSong{
    constructor(artist, name, duration, gender, id){
        this.artist = artist;
        this.name = name;
        this.duration = duration;
        this.gender = gender;
        this.id = null;
        this.siguiente = null;
        
    }
}

class SongSimpleList{
    constructor(){
        this.size = null;
        this.primero = null;
        this.ultimo = null;
    }

    insertar(artist, name, duration, gender){
        this.size++;
        var nuevo = new nodoSong(artist, name, duration, gender, this.size);
        if(this.primero == null && this.ultimo == null){
            this.primero = nuevo;
            this.ultimo = nuevo;    
        }
        else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = this.ultimo.siguiente;
        }
    }

    returnSong(songname){
        var aux = this.primero;
        if(aux == null){
            return null
        }
        while(aux!=null){
            if(aux.name == songname){
                return aux;
            }
            aux = aux.siguiente;
        }
    }

    imprimir(){
        var aux = this.primero;
        if(aux==null){
            console.log("No existen aun elementos en la pila");
        }
        while(aux!=null){
            console.log(aux.name);
            aux = aux.siguiente;
        }
    }

    imprimirTarjetas(){
        var aux = this.primero;
        var texto = ``;
        if(aux == null){
            texto += "";
        }
        while(aux != null){
            var genero = "Género: "
            for(let i = 0; i < aux.gender.length; i++){
                if(i == aux.gender.length - 1){
                    genero += aux.gender[i];
                }else{
                    genero += aux.gender[i] + ", ";
                }
                
            }
            texto += `<div class="card" style="width: 18rem; float: left;">
                        <img src="images/music2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${aux.name}</h5>
                            
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Artista: ${aux.artist}</li>
                            <li class="list-group-item">Duración: ${aux.duration} minutos</li>
                            <li class="list-group-item">${genero}</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link"><button type="button" class="btn btn-success" onclick="addSongToPlaylist('${aux.artist}','${aux.name}')">Agregar</button></a>
                        </div>
                    </div><br>`;
            aux = aux.siguiente;
        }
        return texto;
    }

    grafica(inicio, alternador){
        var nodoaux = this.primero;
        var graphSong = "\n\n" + inicio + "->"+(nodoaux.id + alternador)+";\n";
        while(nodoaux != null){
            graphSong += (nodoaux.id + alternador) + "[label=\"" + nodoaux.name + "\"];\n";
            if(nodoaux.siguiente != null){
                graphSong += (nodoaux.id + alternador) + "->" + (nodoaux.siguiente.id + alternador) + ";\n";
            }
            nodoaux = nodoaux.siguiente;
        }
        return graphSong;
    }
}

class nodoArtista{
    constructor(name, age, country, id){
        this.name = name;
        this.age = age;
        this.country = country;
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
        this.lista = new SongSimpleList();
    }
}

class listadeListas{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = null;
    }

    insertar(name, age, country){
        this.size++;
        var nuevoNodo = new nodoArtista(name, age, country, this.size);
        if(this.primero == null && this.ultimo == null){
            this.primero = nuevoNodo; 
            this.ultimo = this.primero;
            this.primero.siguiente = this.primero; 
            this.primero.anterior = this.ultimo;
        }else{
            var auxNodo = this.primero;
            while(this.primero.siguiente != auxNodo){
                this.primero = this.primero.siguiente;
            }
            this.ultimo = nuevoNodo;
            this.primero.siguiente = this.ultimo;
            this.ultimo.anterior = this.primero;
            this.primero = auxNodo;
            this.ultimo.siguiente = this.primero;
            this.primero.anterior = this.ultimo;
        }
    }

    retornoArtist(artist){
        var aux = this.primero;
        if(aux.name == artist){
            return aux;
        }
        aux = aux.siguiente;
        while(aux != null & aux != this.primero){
            if(aux.name == artist){
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    }

    mostrarTarjetas(){
        var aux = this.primero;
        var texto = ""
        if(aux == null){
            return "<h2>No se encontraron canciones</h2>";
        }else{
            texto += aux.lista.imprimirTarjetas();
            aux = aux.siguiente;
            while(aux != null & aux != this.primero){
                texto += aux.lista.imprimirTarjetas();
                aux = aux.siguiente;
            }
        }
        
        return texto;
    }

    mostrarTarjetasConArtista(){
        var aux = this.primero;
        var cont = 0;
        var texto = ""
        if(aux == null){
            return "<h2>No se encontraron Artistas</h2>";
        }else{
            cont++;
            texto += `<table class="table">
            <thead>
              <tr>
                <th scope="col">${cont}</th>
                <th scope="col">${aux.name}</th>
                <th scope="col">${aux.age} años</th>
                <th scope="col">${aux.country}</th>
              </tr>
            </thead></table>`;
            texto += aux.lista.imprimirTarjetas();
            aux = aux.siguiente;
            while(aux != null & aux != this.primero){
                cont++;
                texto += `<table class="table">
            <thead>
              <tr>
                <th scope="col">${cont}</th>
                <th scope="col">${aux.name}</th>
                <th scope="col">${aux.age} años</th>
                <th scope="col">${aux.country}</th>
              </tr>
            </thead></table>`;
                texto += aux.lista.imprimirTarjetas();
                aux = aux.siguiente;
            }
        }
        
        return texto;
    }
    
    findSong(artist, songname){
        var aux = this.primero;
        if(aux.name == artist){
            return aux.lista.returnSong(songname);
        }
        aux = aux.siguiente;
        while(aux != null & aux != this.primero){
            if(aux.name == artist){
                return aux.lista.returnSong(songname);
            }
            aux = aux.siguiente;
        }
        return null;
    }


    insertarInterno(artist, name, duration, gender){
        var nodotemp = this.retornoArtist(artist);
        if(nodotemp != null){
            nodotemp.lista.insertar(artist, name, duration, gender);
        }
        
    }


    grafica(){
        var strGraficaUno = "digraph G { \n rankdir=\"LR\";\n"
        var nodoaux = this.primero;
        var contador = 0;
        var alternador = 101010
        if(contador == 0){ 
            strGraficaUno += contador + "[label=\"" + nodoaux.name + "\"];\n";
            //console.log(nodoaux.lista.grafica(contador,alternador))
            if(nodoaux.lista.primero != null){
                strGraficaUno += nodoaux.lista.grafica(contador, alternador)
                alternador = alternador + 114324 + Math.floor(Math.random()*9999);
            }
            nodoaux = nodoaux.siguiente;
            contador = contador + 1;
        }
        while(nodoaux != this.primero && contador != 0){
            strGraficaUno += contador + "[label=\"" + nodoaux.name + "\"];\n";
            var miau = contador-1;
            strGraficaUno += miau + "->" + contador +";\n";
            strGraficaUno += contador +"->" + miau + ";\n";
            if(nodoaux.lista.primero != null){
                strGraficaUno += nodoaux.lista.grafica(contador,alternador);
                alternador = alternador + 12342 + Math.floor(Math.random()*9999);
            }
            contador = contador + 1;
            nodoaux = nodoaux.siguiente;
        }

        //strGraficaUno += "0->"+(miau+1)+";\n";
        //strGraficaUno+=(miau+1)+"->0;\n"
        strGraficaUno+="}"
        return strGraficaUno
    } 
}


//------------------------------------ PODCAST -----------------------------------
class nodoPodcast{
    constructor(name, topic, invitados, duration){
        this.name = name;
        this.topic = topic;
        this.invitador = invitados;
        this.duration = duration;
        this.izquierda=null;
        this.derecha=null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
        this.strGraphviz = "digraph G { \n"
    }

    insertarInterno(name, topic, invitados, duration,raiz){
        if(raiz == null){
            raiz = new nodoPodcast(name, topic, invitados, duration);
        }
        else{
            if(name > raiz.name){
                raiz.derecha = this.insertarInterno(name, topic, invitados, duration, raiz.derecha);
            }else{
                raiz.izquierda = this.insertarInterno(name, topic, invitados, duration, raiz.izquierda);
            }
        }
        return raiz
    }

    insertar(name, topic, invitados, duration){
        this.raiz = this.insertarInterno(name, topic, invitados, duration, this.raiz)
    }

    anidarNodosGrafica(raiz){
        if (raiz!=null){
            this.strGraphviz+=raiz.name +"[label=\"" + raiz.name + "\"];\n"
            if(raiz.izquierda!=null){
                this.strGraphviz += raiz.name + "->" + raiz.izquierda.name + ";\n"
            }
            if(raiz.derecha!=null){
                this.strGraphviz += raiz.name + "->" + raiz.derecha.name + ";\n"
            }
            this.anidarNodosGrafica(raiz.izquierda);
            this.anidarNodosGrafica(raiz.derecha);
        }
    }

    graficar(){
        this.strGraphviz="digraph G { \n";
        this.anidarNodosGrafica(this.raiz);
        this.strGraphviz+="\n}"
        return this.strGraphviz        
    }

    anidarNodosTabla(raiz){
        if (raiz!=null){
            this.strGraphviz+=raiz.name +"[label=\"" + raiz.name + "\"];\n"
            if(raiz.izquierda!=null){
                this.strGraphviz += raiz.name + "->" + raiz.izquierda.name + ";\n"
            }
            if(raiz.derecha!=null){
                this.strGraphviz += raiz.name + "->" + raiz.derecha.name + ";\n"
            }
            this.anidarNodosGrafica(raiz.izquierda);
            this.anidarNodosGrafica(raiz.derecha);
        }
    }

    podcastTabla(){
        this.strGraphviz="digraph G { \n";
        this.anidarNodosGrafica(this.raiz);
        this.strGraphviz+="\n}"
        return this.strGraphviz        
    }

    post_orden(){
        this.post_orden_interno(this.raiz)
    }

    post_orden_interno(raiz){
        if(raiz!=null){
            this.post_orden_interno(raiz.izquierda)
            this.post_orden_interno(raiz.derecha)
        console.log(raiz.name)
        }
    }

    inorden(){
        this.inordenII(this.raiz)
    }

    inordenII(raiz){
        if(raiz!=null){
            this.inordenII(raiz.izquierda)
            console.log(raiz.name)
            this.inordenII(raiz.derecha)
        }
    }

    preorden(){
        this.preordenII(this.raiz)
    }

    preordenII(raiz){
        if(raiz!=null){
            console.log(raiz.name)
            this.preordenII(raiz.izquierda)
            this.preordenII(raiz.derecha)
        }
    }
}

// ------------------------------------------- CALENDARIO ------------------------------------
// ------------------- Composicion de los encabezados -------------------------------
class nodoTitulos{
    constructor(posfc){
        this.posfc=posfc;
        this.siguiente=null;
        this.anterior=null;
        this.interno=null;
    }
}

class listaTitulos{
    constructor(foc){
        this.foc=foc;
        this.tamaño=0;
        this.primero=null;
        this.ultimo=null;
    }

    insertarTitulo(newTitulo){
        this.tamaño=this.tamaño+1
        if(this.primero==null){
            this.ultimo=newTitulo; this.primero=newTitulo;
        }else{
        
            if(newTitulo.posfc<this.primero.posfc){
                newTitulo.siguiente = this.primero;
                this.primero.anterior = newTitulo;
                this.primero=newTitulo;
            }else if(newTitulo.posfc>this.ultimo.posfc){
                this.ultimo.siguiente=newTitulo;
                newTitulo.anterior=this.ultimo;
                this.ultimo=newTitulo;
            } else{
                var auxiliar = this.primero;
                while(auxiliar!=null){
                    if(newTitulo.posfc<auxiliar.posfc){
                        newTitulo.siguiente=auxiliar;
                        newTitulo.anterior=auxiliar.anterior;
                        auxiliar.anterior.siguiente=newTitulo;
                        auxiliar.anterior = newTitulo;
                        break;
                    }
                    else if(newTitulo.posfc>auxiliar.posfc){auxiliar=auxiliar.siguiente;}
                    else{break;}
                }
            }
        }
    }

    existenciaporposicion(posfc){
        var aux = this.primero;
        while (aux!=null){
            if(posfc==aux.posfc){
                return aux
            }
            aux=aux.siguiente;
        }
        return null
    }

}

class nodoContenido{
    constructor(x,y,contenido){
        this.contenido=contenido;
        this.x=x;
        this.y=y;
        this.izquierda=null;
        this.derecha=null;
        this.arriba=null;
        this.abajo=null;
    }
}

class matrizDispersa{
    constructor(){
        this.columnas = new listaTitulos("columnas");
        this.filas = new listaTitulos("filas");
    }

    insertar(x,y,contenido){

        var contenidoNuevo = new nodoContenido(x,y,contenido)
        var auxx = this.columnas.existenciaporposicion(x);
        var auxy = this.filas.existenciaporposicion(y);
        if (auxy==null){
            auxy= new nodoTitulos(y)
            this.filas.insertarTitulo(auxy)
        }
        if(auxx==null){
            auxx= new nodoTitulos(x)
            this.columnas.insertarTitulo(auxx)
        }

        if(auxy.interno==null){auxy.interno=contenidoNuevo;}

        else{
            if(contenidoNuevo.x<auxy.interno.x){
                contenidoNuevo.derecha = auxy.interno;
                auxy.interno.izquierda = contenidoNuevo;
                auxy.interno=contenidoNuevo;
            }
            else{
                var auxiliarNodoy = auxy.interno;
                while(auxiliarNodoy!=null){
                    if(contenidoNuevo.x < auxiliarNodoy.x){
                        contenidoNuevo.derecha = auxiliarNodoy;
                        contenidoNuevo.izquierda=auxiliarNodoy.izquierda;
                        auxiliarNodoy.izquierda.derecha=contenidoNuevo;
                        auxiliarNodoy.izquierda=contenidoNuevo;
                        break;
                    }
                    else if (contenidoNuevo.y == auxiliarNodoy.y && contenidoNuevo.x == auxiliarNodoy.x){break;}// segundo if del while
                    else{
                        if(auxiliarNodoy.derecha==null){
                            auxiliarNodoy.derecha = contenidoNuevo;
                            contenidoNuevo.izquierda=auxiliarNodoy;
                            break;
                        }
                        else{ auxiliarNodoy = auxiliarNodoy.derecha;}
                    }
                }
            }
        }
        if (auxx.interno==null){auxx.interno=contenidoNuevo;}
        else{
            if(contenidoNuevo.y<auxx.interno.y){
                contenidoNuevo.abajo=auxx.interno;
                auxx.interno.arriba=contenidoNuevo;
                auxx.interno=contenidoNuevo;
            }
            else{
                var nodoauxx=auxx.interno;
                while(nodoauxx!=null){
                    if(contenidoNuevo.y < nodoauxx.y){
                        contenidoNuevo.abajo=nodoauxx;
                        contenidoNuevo.arriba=nodoauxx.arriba;
                        nodoauxx.arriba.abajo=contenidoNuevo;
                        nodoauxx.arriba=contenidoNuevo;
                        break;
                    }
                    else if(contenidoNuevo.y==nodoauxx.y && contenidoNuevo.x == nodoauxx.x){break;}
                    else{
                        if(nodoauxx.abajo ==null){
                            nodoauxx.abajo=contenidoNuevo;
                            contenidoNuevo.arriba=nodoauxx;
                            break;
                        }
                        else{nodoauxx=nodoauxx.abajo}
                    }
                }
            }
        }
    }



    graficar(){
         var strGrafica="digraph G{ \n"
        strGrafica+="node[shape=box, width=0.5, height=0.5, fontname=\"Times New Roman\", fillcolor=\"white\", style=filled];\n"
        strGrafica+="edge[style = \"bold\"];\n";
        strGrafica+="node[label = \"0,0\" fillcolor=\"gray38\" pos = \"-1,1!\"]raiz;\n"
        strGrafica += "label = \"- Autores -\" \nfontname=\"Times New Roman\" \nfontsize=\"20pt\" \n \n"

        var auxfilas=this.filas.primero;
        var idy=0;
        while(auxfilas!=null){
            strGrafica+="\n\tnode[label = \""+auxfilas.posfc+"\" fillcolor=\"gray38\" pos=\"-1,-"+idy+"!\" shape=box]x"+auxfilas.posfc+";"
            auxfilas=auxfilas.siguiente;
            idy=idy+1;
        }

        auxfilas=this.filas.primero;
        while(auxfilas.siguiente!=null){
            strGrafica+= "\n\tx"+auxfilas.posfc+"->x"+auxfilas.siguiente.posfc+";"
            strGrafica+= "\n\tx"+auxfilas.posfc+"->x"+auxfilas.siguiente.posfc+"[dir=back];"
            auxfilas = auxfilas.siguiente
        }
        strGrafica += "\n\traiz->x"+this.filas.primero.posfc +";";


        var auxcolumnas = this.columnas.primero;
        var idx=0;
        while(auxcolumnas!=null){
            strGrafica+="\n\tnode[label = \""+auxcolumnas.posfc+"\" fillcolor=\"gray38\" pos = \""+idx+",1!\" shape=box]y"+auxcolumnas.posfc+";";
            auxcolumnas=auxcolumnas.siguiente;
            idx=idx+1;
        }

        auxcolumnas = this.columnas.primero;
        while(auxcolumnas.siguiente!=null){
            strGrafica += "\n\ty"+auxcolumnas.posfc+"->y"+auxcolumnas.siguiente.posfc+";"
            strGrafica += "\n\ty"+auxcolumnas.posfc+"->y"+auxcolumnas.siguiente.posfc+"[dir=back];"
            auxcolumnas = auxcolumnas.siguiente
        }
        strGrafica += "\n\traiz->y"+this.columnas.primero.posfc+";"

        var auxfilass = this.filas.primero;
        var idyy =0;
        while(auxfilass!=null){
            var auxB = auxfilass.interno;
            while(auxB!=null){
                var auxye = this.columnas.primero;
                var idB=0;
                while(auxye!=null){
                    if(auxye.posfc==auxB.x){break;}
                    idB=idB+1;
                    auxye=auxye.siguiente;
                }
                if(auxB.contenido!=""){
                    strGrafica += "\n\tnode[label=\""+auxB.contenido+"\" fillcolor=\"white\" pos=\""+idB+",-"+idyy+"!\" shape=box]i"+auxB.y+"_"+auxB.x+";" 
                }
                auxB=auxB.derecha;
            }
            auxB=auxfilass.interno;
            while(auxB!=null){
                if(auxB.derecha!=null){
                    strGrafica += "\n\ti"+auxB.y+"_"+auxB.x+"->i"+auxB.derecha.y+"_"+auxB.derecha.x+";"
                    strGrafica += "\n\ti"+auxB.y+"_"+auxB.x+"->i"+auxB.derecha.y+"_"+auxB.derecha.x+"[dir=back];"
                }
                auxB=auxB.derecha;
            }
            strGrafica += "\n\tx"+auxfilass.posfc+"->i"+auxfilass.interno.y+"_"+auxfilass.interno.x+";"
            strGrafica += "\n\tx"+auxfilass.posfc+"->i"+auxfilass.interno.y+"_"+auxfilass.interno.x+"[dir=back];"
            auxfilass = auxfilass.siguiente
            idyy = idyy+1
        }
        var auxColumn = this.columnas.primero;
        while(auxColumn!=null){
            var auxC = auxColumn.interno;
            while(auxC!=null){
                if(auxC.abajo!=null){
                    strGrafica += "\n\ti"+auxC.y+"_"+auxC.x+"->i"+auxC.abajo.y+"_"+auxC.abajo.x+";"
                    strGrafica += "\n\ti"+auxC.y+"_"+auxC.x+"->i"+auxC.abajo.y+"_"+auxC.abajo.x+"[dir=back];"
                }
                auxC=auxC.abajo;
            }
            strGrafica += "\n\ty"+auxColumn.posfc+"->i"+auxColumn.interno.y+"_"+auxColumn.interno.x+";"
            strGrafica += "\n\ty"+auxColumn.posfc+"->i"+auxColumn.interno.y+"_"+auxColumn.interno.x+"[dir=back];"
            auxColumn=auxColumn.siguiente;
        }
        strGrafica+="\n\n}" 
        return strGrafica;       
    }
}
 


//----------------------------VARIABLES GLOBALES------------------------
var actualUser = null;
var Users = new listUsers();
var Album = new listadeListas();
var Podcast = new ABB();
var Calendario = new matrizDispersa();



//-----------------Admin Auxiliar---------------------------------------
Users.addUser(2654568452521, "Oscar Armin", "EDD", "123", 1234567, true)


Users.printUsers();

// ------------------------------------------- LOGIN ----------------------------------------------
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
       if(document.getElementById('checkAdm').checked == true && usuarioEntrada.admin == true){
            console.log("Intento de Inicio de Sesión Exitoso");
            actualUser = usuarioEntrada;
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
        }else if(document.getElementById('checkAdm').checked == true && usuarioEntrada.admin == false){
            alert("No posee permisos para ingresar como Administrador");
            document.getElementById("userLogin").value="";
            document.getElementById("passwordLogin").value="";
            console.log("Intento de Inicio de Sesión como Administrador Fallido");
       }else{
            alert("Ingreso de Usuario: " + usuarioEntrada.username);
            actualUser = usuarioEntrada;
            document.getElementById('NavBar1').style.display="none";
            document.getElementById('NavBar2').style.display="none";
            document.getElementById('NavBar3').style.display="block";
            document.getElementById('Index').style.display="none";
            document.getElementById('Login').style.display="none";
            document.getElementById('Register').style.display="none";
            document.getElementById('Admin').style.display="none";
            document.getElementById('User').style.display="block";
            document.getElementById('MusicUser').style.display="none";
            document.getElementById('PlaylistUser').style.display="none";
            document.getElementById('ArtistUser').style.display="none";
            document.getElementById('PodcastUser').style.display="none";
            document.getElementById('FriendsUser').style.display="none";
            document.getElementById('BlockUser').style.display="none";
            //document.getElementById("Login").style.display="none";
            //document.getElementById("Index").style.display="none";
            //document.getElementById("Administracion").style.display="none";
            //document.getElementById("PaginaUsuario").style.display="block";
            document.getElementById('welcome').innerHTML = "Hola " + actualUser.name;
            document.getElementById('bienvenida').style.display="block";
            document.getElementById('bienvenida').innerHTML = `<div class="card" style="width: 18rem; float: left;">
            <img src="images/music.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${actualUser.name}</h5>
                <p class="card-text">${actualUser.username}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">DPI: ${actualUser.dpi}</li>
                <li class="list-group-item">Número de Teléfono: ${actualUser.phone}</li>
                <li class="list-group-item">Password: ${actualUser.passwordC}</li>
            </ul>
        </div>`;
       }
    }else{
        alert("Usuario o contraseña incorrectos");
        console.log("Intento de Inicio de Sesión Fallido");
    }
    document.getElementById('userLogin').value = "";
    document.getElementById('passwordLogin').value = "";
    document.getElementById('checkAdm').checked = false;
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
    document.getElementById('userLogin').value = "";
    document.getElementById('passwordLogin').value = "";
    document.getElementById('checkAdm').checked = false;
}




//------------------------------------------- REGISTRO ----------------------------------------------
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

    document.getElementById('usernameR').value = "";
    document.getElementById('fullnameR').value = "";
    document.getElementById('dpiR').value = "";
    document.getElementById('phoneR').value = "";
    document.getElementById('pswR').value = "";
    
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


//------------------------------ ADMINISTRADOR -----------------------------------
document.getElementById('masivaUsuarios').addEventListener('change', leerArchivoUsuario, false);
document.getElementById('masivaArtistas').addEventListener('change', leerArchivoArtistas, false);
document.getElementById('masivaCanciones').addEventListener('change', leerArchivoCanciones, false);
document.getElementById('masivaPodcast').addEventListener('change', leerArchivoPodcast, false);
document.getElementById('masivaCalendario').addEventListener('change', leerArchivoCalendario, false);


// ---- Carga Masiva Usuarios
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
       Users.addUser(datos[i].dpi,datos[i].name,datos[i].username,datos[i].password,datos[i].phone,datos[i].admin);
    }
   // listaUsuarios.graficarUsuarios();
   Users.printUsers();
   console.log("Total de Usuarios cargados: " + Users.size);
    alert("Usuarios cargados"); 
}

//---- Carga Masiva Artistas
function leerArchivoArtistas(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        loadArtist(contenido);
    };
    lector.readAsText(archivo);
}

function loadArtist(content){
    var datos = JSON.parse(content);
    for (var i = 0; i < datos.length; i++) {
       Album.insertar(datos[i].name,datos[i].age,datos[i].country);
    }
   // listaUsuarios.graficarUsuarios();
   //Album.mostrarCabeceras();
    alert("Artistas cargados"); 
}


//---- Carga Masiva Canciones
function leerArchivoCanciones(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        loadSong(contenido);
    };
    lector.readAsText(archivo);
}

function loadSong(content){
    var datos = JSON.parse(content);
    for (var i = 0; i < datos.length; i++) {
       Album.insertarInterno(datos[i].artist,datos[i].name,datos[i].duration, datos[i].gender);
    }
   // listaUsuarios.graficarUsuarios();
   //mostrarListaDeListas();
    alert("Canciones cargadas"); 
}

/*function mostrarListaDeListas(){
    var temporal = Album.head;
    console.log("*********** LISTA DE LISTAS *********");
    while (temporal != null){
        Album.MostrarValores(temporal.name);

        temporal = temporal.next;
    }
}*/


// ---- Carga Masiva Podcast
function leerArchivoPodcast(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        loadPodcast(contenido);
    };
    lector.readAsText(archivo);
}

function loadPodcast(content){
    var datos = JSON.parse(content);
    for (var i = 0; i < datos.length; i++) {
       Podcast.insertar(datos[i].name, datos[i].topic, datos[i].Invitados, datos[i].duration);
    }
    alert("Podcast cargados"); 
}


// -------- Carga Masiva Música Programada
function leerArchivoCalendario(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        loadCalendario(contenido);
    };
    lector.readAsText(archivo);
}

function loadCalendario(content){
    var datos = JSON.parse(content);
    for (var i = 0; i < datos.length; i++) {
        let contenido = datos[i].song + " - " + datos[i].artist;
        Calendario.insertar(datos[i].month, datos[i].day, contenido);
    }
    alert("Podcast cargados"); 
}

document.getElementById("btn_cerrarAdmin").onclick=function(){
    actualUser = null;
    document.getElementById('NavBar1').style.display="block";
    document.getElementById('NavBar2').style.display="none";
    document.getElementById('NavBar3').style.display="none";
    document.getElementById('Index').style.display="none";
    document.getElementById('Login').style.display="block";
    document.getElementById('Register').style.display="none";
    document.getElementById('Admin').style.display="none";
    document.getElementById('User').style.display="none";
}

document.getElementById('btn_usersAdmin').onclick = function(){
    var miau = Users.grafica();
    d3.select("#UsuariosAdmin").graphviz()
    .width(2000)
    .height(1050)
    .renderDot(miau)

    document.getElementById('UsuariosAdmin').style.display="block";
    document.getElementById('AlbumAdmin').style.display="none";
    document.getElementById('CalendarioAdmin').style.display="none";
    document.getElementById('PodcastAdmin').style.display="none";
}

document.getElementById('btn_albumAdmin').onclick = function(){
    var miau = Album.grafica();
    d3.select("#AlbumAdmin").graphviz()
    .width(2000)
    .height(1050)
    .renderDot(miau)

    document.getElementById('UsuariosAdmin').style.display="none";
    document.getElementById('AlbumAdmin').style.display="block";
    document.getElementById('CalendarioAdmin').style.display="none";
    document.getElementById('PodcastAdmin').style.display="none";
}

document.getElementById('btn_calendarAdmin').onclick = function(){
    var miau = Calendario.graficar()
    d3.select("#CalendarioAdmin").graphviz()
    .width(2000)
    .height(1050)
    .renderDot(miau)

    document.getElementById('UsuariosAdmin').style.display="none";
    document.getElementById('AlbumAdmin').style.display="none";
    document.getElementById('CalendarioAdmin').style.display="block";
    document.getElementById('PodcastAdmin').style.display="none";
}

document.getElementById('btn_podcastAdmin').onclick = function(){
    var miau = Podcast.graficar()
    d3.select("#PodcastAdmin").graphviz()
    .width(2000)
    .height(1050)
    .renderDot(miau)

    document.getElementById('UsuariosAdmin').style.display="none";
    document.getElementById('AlbumAdmin').style.display="none";
    document.getElementById('CalendarioAdmin').style.display="none";
    document.getElementById('PodcastAdmin').style.display="block";
}



//------------------------- USUARIOS ------------------------------
document.getElementById("btn_cerrarSesion").onclick=function(){
    actualUser = null;
    document.getElementById('NavBar1').style.display="block";
    document.getElementById('NavBar2').style.display="none";
    document.getElementById('NavBar3').style.display="none";
    document.getElementById('Index').style.display="none";
    document.getElementById('Login').style.display="block";
    document.getElementById('Register').style.display="none";
    document.getElementById('Admin').style.display="none";
    document.getElementById('User').style.display="none";
    document.getElementById('bienvenida').style.display="none";
}

document.getElementById("btn_musicaUser").onclick=function(){
    document.getElementById('MusicUser').style.display="block";
    document.getElementById('PlaylistUser').style.display="none";
    document.getElementById('ArtistUser').style.display="none";
    document.getElementById('PodcastUser').style.display="none";
    document.getElementById('FriendsUser').style.display="none";
    document.getElementById('BlockUser').style.display="none";
    document.getElementById('bienvenida').style.display="none";

    var tarjetasMusica = Album.mostrarTarjetas();   
    document.getElementById('allMusic').innerHTML = tarjetasMusica;
}

document.getElementById("btn_amigosUser").onclick=function(){
    document.getElementById('MusicUser').style.display="none";
    document.getElementById('PlaylistUser').style.display="none";
    document.getElementById('ArtistUser').style.display="none";
    document.getElementById('PodcastUser').style.display="none";
    document.getElementById('FriendsUser').style.display="block";
    document.getElementById('BlockUser').style.display="none";
    document.getElementById('bienvenida').style.display="none";

    var tarjetasUsers = Users.printCardUsers();
    document.getElementById('allUsers').innerHTML = tarjetasUsers;
}

function addSongToPlaylist(artist, namesong){
    var cancioncita = Album.findSong(artist, namesong);
    actualUser.playlist.addToPlaylist(cancioncita);
}

function blockFriend(username){
    var enemigo = Users.findUser(username);
    actualUser.block.enqueue(enemigo);
}

function addFriend(username){
    document.getElementById('allFriends').innerHTML = "";

    var amigo = Users.findUser(username);
    actualUser.friends.push(amigo);

    console.log(actualUser);

    var tarjetasFriends = actualUser.friends.printCardFriend();
    document.getElementById('allFriends').innerHTML = tarjetasFriends;
}

document.getElementById("btn_eliminarFriend").onclick=function(){
    document.getElementById('allFriends').innerHTML = "";
    actualUser.friends.pop();

    var tarjetasFriends = actualUser.friends.printCardFriend();
    document.getElementById('allFriends').innerHTML = tarjetasFriends;
}

document.getElementById("btn_playlistUser").onclick=function(){
    document.getElementById('MusicUser').style.display="none";
    document.getElementById('PlaylistUser').style.display="block";
    document.getElementById('ArtistUser').style.display="none";
    document.getElementById('PodcastUser').style.display="none";
    document.getElementById('FriendsUser').style.display="none";
    document.getElementById('BlockUser').style.display="none";
    document.getElementById('bienvenida').style.display="none";

    var tarjetasPlaylist = actualUser.playlist.printCardPlaylist();
    document.getElementById('allPlaylist').innerHTML = tarjetasPlaylist;
}

document.getElementById("btn_artistUser").onclick=function(){
    document.getElementById('MusicUser').style.display="none";
    document.getElementById('PlaylistUser').style.display="none";
    document.getElementById('ArtistUser').style.display="block";
    document.getElementById('PodcastUser').style.display="none";
    document.getElementById('FriendsUser').style.display="none";
    document.getElementById('BlockUser').style.display="none";
    document.getElementById('bienvenida').style.display="none";

    var tarjetasMusica = Album.mostrarTarjetasConArtista();  
    document.getElementById('allArtist').innerHTML = tarjetasMusica;
}

document.getElementById("btn_podcastUser").onclick=function(){
    document.getElementById('MusicUser').style.display="none";
    document.getElementById('PlaylistUser').style.display="none";
    document.getElementById('ArtistUser').style.display="none";
    document.getElementById('PodcastUser').style.display="block";
    document.getElementById('FriendsUser').style.display="none";
    document.getElementById('BlockUser').style.display="none";
    document.getElementById('bienvenida').style.display="none";

   // var tarjetasUsers = Users.printCardUsers();
    //document.getElementById('allUsers').innerHTML = tarjetasUsers;
}

document.getElementById("btn_blockUser").onclick=function(){
    document.getElementById('MusicUser').style.display="none";
    document.getElementById('PlaylistUser').style.display="none";
    document.getElementById('ArtistUser').style.display="none";
    document.getElementById('PodcastUser').style.display="none";
    document.getElementById('FriendsUser').style.display="none";
    document.getElementById('BlockUser').style.display="block";
    document.getElementById('bienvenida').style.display="none";

    var tarjetasBlock = actualUser.block.printCardEnemy();
    document.getElementById('allEnemies').innerHTML = tarjetasBlock;
}



btn_eliminarEnemy
document.getElementById("btn_eliminarEnemy").onclick=function(){
    document.getElementById('allEnemies').innerHTML = "";
    actualUser.block.pop();

    var tarjetasBlock = actualUser.block.printCardEnemy();
    document.getElementById('allEnemies').innerHTML = tarjetasBlock;
}

document.getElementById("btn_programSong").onclick=function(){
    var nameS = document.getElementById('nameS').value;
    var durationS = document.getElementById('durationS').value;
    var genderS = document.getElementById('genderS').value;
    var dayS = document.getElementById('dayS').value;
    var monthS = document.getElementById('monthS').value;

    Calendario.insertar(monthS, dayS, nameS + " - " + actualUser.name);

    alert('Canción ' + nameS + ' programada exitosamente.');
     


    document.getElementById('nameS').value = "";
    document.getElementById('durationS').value = "";
    document.getElementById('genderS').value = "";
    document.getElementById('dayS').value = "";
    document.getElementById('monthS').value = "";
}


document.getElementById("btn_addSong").onclick=function(){
    var nameS = document.getElementById('nameS').value;
    var durationS = document.getElementById('durationS').value;
    var genderS = [document.getElementById('genderS').value];

    Album.insertar(actualUser.name,0,"Guatemala");
    Album.insertarInterno(actualUser.name,nameS,durationS,genderS);

    alert('Canción ' + nameS + ' publicada exitosamente.');
     
    document.getElementById('nameS').value = "";
    document.getElementById('durationS').value = "";
    document.getElementById('genderS').value = "";
    document.getElementById('dayS').value = "";
    document.getElementById('monthS').value = "";

    document.getElementById('allMusic').innerHTML = "";
    var tarjetasMusica = Album.mostrarTarjetas();   
    document.getElementById('allMusic').innerHTML = tarjetasMusica;
}

