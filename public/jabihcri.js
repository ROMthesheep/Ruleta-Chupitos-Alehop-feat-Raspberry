var estadosVasos = [];
for (let index = 0; index < 16; index++) {
  estadosVasos[index] = false;
}

console.log(estadosVasos.length);


var jugando = false;
var numeroselect = document.getElementById("numeroliq");
var counter = 0;
var sepuedepulsar = true;
var retoTimer = [];
for (let index = 0; index < 40; index++) {
  retoTimer[index] = 0;
}
console.log(retoTimer);

var numeroReto = [];
for (let index = 0; index < 40; index++) {
  numeroReto[index] = false;
}
console.log(numeroReto);

var mensajeDeReto = document.getElementById("retoOutcome");



/// LOGICA GPIO

var socket = io(); //load socket.io-client and connect to the host that serves the page

////// JUEGO EN SI


function init() {
  if (jugando == false) {
    jugando = true;
    document.getElementById("prep").classList.toggle("d-none");

    if (document.getElementById("gameover").classList.contains("d-none")) {
      document.getElementById("gameover").classList.remove("d-none");
    }
  }
}

function actualizarNumero() {
  var cantidadlicor = numeroselect.options[numeroselect.selectedIndex].value;
  var b1;
  var b2;
  var b3;
  var b4;
  var agua = 2 + Math.random() * 2;
  var tot = 0;
  console.log(cantidadlicor);
  if (cantidadlicor == 2) {
    do {
      b2 = Math.random() * 15;
      b1 = Math.random() * 15;
      tot = Math.floor(b1 + b2 + agua);
    } while (tot != 16);
    console.log(tot);
    document.getElementById("config").innerHTML =
      "Pon " +
      Math.floor(b1) +
      " vasos con el licor numero uno, " +
      Math.floor(b2) +
      " con el dos  y rellena el resto con agua.";
  }
  if (cantidadlicor == 3) {
    do {
      b2 = Math.random() * 10;
      b1 = Math.random() * 10;
      b3 = Math.random() * 10;
      tot = Math.floor(b1 + b2 + b3 + agua);
    } while (tot != 16);
    console.log(tot);
    document.getElementById("config").innerHTML =
      "Pon " +
      Math.floor(b1) +
      " vasos con el licor numero uno, " +
      Math.floor(b2) +
      " con el dos, " +
      Math.floor(b3) +
      " Con el tres y rellena el resto con agua.";
  }
  if (cantidadlicor == 4) {
    do {
      b2 = Math.random() * 6;
      b1 = Math.random() * 6;
      b3 = Math.random() * 6;
      b4 = Math.random() * 6;
      tot = Math.floor(b1 + b2 + b3 + b4 + agua);
    } while (tot != 16);
    document.getElementById("config").innerHTML =
      "Pon " +
      Math.floor(b1) +
      " vasos con el licor numero uno " +
      Math.floor(b2) +
      " con el dos, " +
      Math.floor(b3) +
      " Con el tres, " +
      Math.floor(b4) +
      " con el cuatro y rellena el resto con agua.";
  }
}

function prepdone() {
  document.getElementById("prep").classList.toggle("d-none");
  document.getElementById("botones").classList.toggle("d-none");

  for (let index = 0; index < 17; index++) {
    socket.emit("light",[index,1]);
  }
}

function vaso(numeroVaso) {
  var eventosorpresa = Math.floor(Math.random() * 100);
  
  

  if (document.getElementById(numeroVaso).classList.contains("btn-secondary")) {
    // do some stuff
  } else if (sepuedepulsar) {

    socket.emit("light",[numeroVaso,0]);

    estadosVasos[numeroVaso-1]=true;
    console.log(estadosVasos);
    // socket.emit("light", estadosVasos);

    var vaso = document.getElementById(numeroVaso);
    vaso.classList.remove("btn-dark");
    vaso.classList.remove("btn-danger");
    vaso.classList.add("btn-secondary");
    counter++;
    document.getElementById("counter").innerHTML = counter;

    if (eventosorpresa < 15) {
      eventoSorpresa(eventosorpresa);
    } else {
      document.getElementById("menu").classList.toggle("d-none");
    }

    if (numeroReto[5] == true) {
      if (retoTimer[5] > 6) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "<br>El esclavo ha roto sus cadenas. Eres libre.";
        numeroReto[5] = false;
      } else {
        retoTimer[5]++;
        console.log("se ha sumado al contador:" + retoTimer[5]);
      }
    }
    if (numeroReto[6] == true) {
      if (retoTimer[6] > 5) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Ya podeis volver a vuestra ropa normal.. a no ser...<br>";
        numeroReto[6] = false;
      } else {
        retoTimer[6]++;
      }
    }
    if (numeroReto[10] == true) {
      if (retoTimer[10] > 5) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML += "Tu voz sexy empieza a cansar. Para ya<br>";
        numeroReto[10] = false;
      } else {
        retoTimer[10]++;
      }
    }
    if (numeroReto[15] == true) {
      if (retoTimer[15] > 5) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "El holahoop se ha roto. Enoharabuena, todo lo que tocas acaba roto.<br>";
        numeroReto[15] = false;
      } else {
        retoTimer[15]++;
      }
    }
    if (numeroReto[16] == true) {
      if (retoTimer[16] > 4) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Acabar de recordar tu humanidad. Que despiste mas tonto. Puedes volver a hablar como un ser humano.<br>";
        numeroReto[16] = false;
      } else {
        retoTimer[16]++;
      }
    }
    if (numeroReto[17] == true) {
      if (retoTimer[17] > 4) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML += "Vistete que no eres mario casas.<br>";
        numeroReto[17] = false;
      } else {
        retoTimer[17]++;
      }
    }
    if (numeroReto[20] == true) {
      if (retoTimer[20] > 4) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "No estamos en la biblioteca, ya puedes hablar normal.<br>";
        numeroReto[20] = false;
      } else {
        retoTimer[20]++;
      }
    }
    if (numeroReto[22] == true) {
      if (retoTimer[22] > 5) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Puedes parar con la conga de palabras. Azucar!<br>";
        numeroReto[22] = false;
      } else {
        retoTimer[22]++;
      }
    }
    if (numeroReto[26] == true) {
      if (retoTimer[26] > 3) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Has recobrado tu individualidad, puedes negarte a las preguntas.<br>";
        numeroReto[26] = false;
      }
    } else {
      retoTimer[26]++;
    }
    if (numeroReto[29] == true) {
      if (retoTimer[29] > 5) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML += "Te han vuelto a crecer los dedos!.<br>";
        numeroReto[29] = false;
      } else {
        retoTimer[29]++;
      }
    }
    if (numeroReto[32] == true) {
      if (retoTimer[32] > 3) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Deja de soltar esos gritios, los niños del vecino estan atemorizados.<br>";
        numeroReto[32] = false;
      } else {
        retoTimer[32]++;
      }
    }
    if (numeroReto[34] == true) {
      if (retoTimer[34] > 3) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Ya puedes dejar de sonreir, estaba empezando a dar miedo.<br>";
        numeroReto[34] = false;
      } else {
        retoTimer[34]++;
      }
    }
    if (numeroReto[37] == true) {
      if (retoTimer[37] > 3) {
        mensajeDeReto.classList.toggle("d-none");
        mensajeDeReto.innerHTML +=
          "Ya puedes volver a respirar por la nariz.<br>";
        numeroReto[37] = false;
      } else {
        retoTimer[37]++;
      }
    }
    sepuedepulsar = false;
  }
}

function elBoton() {
  document.getElementById("menu").classList.toggle("d-none");
  document.getElementById("elBoton").classList.toggle("d-none");
  switch (Math.floor(Math.random() * 40)) {
    case 0:
      document.getElementById("elBotonText").innerHTML =
        "Tus orgasmos son 1000 veces mas intensos, pero solo puedes tener tres cada año.";
      break;
    case 1:
      document.getElementById("elBotonText").innerHTML =
        "Consigues seducir a la persona de tus sueños, pero jamas podras tener sexo ni intimar con él/ella.";
      break;
    case 2:
      document.getElementById("elBotonText").innerHTML =
        "Seras capaz de proteger a los tuyos de cuaqlueir peligro, pero te vuelves un asesino despiadado.";
      break;
    case 3:
      document.getElementById("elBotonText").innerHTML =
        "Tienes la oportunidad de estar con la persona mas hermosa que jamas hayas visto, pero es coprofilic@ (excitación sexual a través de las heces).";
      break;
    case 4:
      document.getElementById("elBotonText").innerHTML =
        "La persona de tus sueños estara siempre a tu lado, pero te engañara constantemente con otr@s.";
      break;
    case 5:
      document.getElementById("elBotonText").innerHTML =
        "Sabes todos los numeros de la loteria de aqui a 5 años, pero cada año que cobres el premio un jugador de los aqui presentes morira.";
      break;
    case 6:
      document.getElementById("elBotonText").innerHTML =
        "Consigues un fisico perfecto, pero tus genitales apestan permanentemente.";
      break;
    case 7:
      document.getElementById("elBotonText").innerHTML =
        "Te regalan una casa que cubre todas tus necesidades, pero pierdes un brazo.";
      break;
    case 8:
      document.getElementById("elBotonText").innerHTML =
        "Te conviertes en la persona mas lista de la historia, pero nadie te cree.";
      break;
    case 9:
      document.getElementById("elBotonText").innerHTML =
        "Puedes materializar cualquier cosa que imagines, pero cada vez que lo haces te asalta un dolor inimagible durante 10 minutos.";
      break;
    case 10:
      document.getElementById("elBotonText").innerHTML =
        "Te conviertes en un genio, pero todos se convierten en personas con capacidad intelectual reducida.";
      break;
    case 11:
      document.getElementById("elBotonText").innerHTML =
        "Consigues poderes telequineticos, pero no puedes volver a interactuar con objetos con tus manos.";
      break;
    case 12:
      document.getElementById("elBotonText").innerHTML =
        "Consigues tu trabajo de ensueño, pero jamas tendras vacaciones.";
      break;
    case 13:
      document.getElementById("elBotonText").innerHTML =
        "La persona de tus sueños estara siempre a tu lado, pero quiere más a su perro que a ti y pondra su cuidado por encima de ti.";
      break;
    case 14:
      document.getElementById("elBotonText").innerHTML =
        "Recibes todo lo que deseas, pero el jugador de tu derecha lo pierde todo.";
      break;
    case 15:
      document.getElementById("elBotonText").innerHTML =
        "Nunca estaras soltero y siempre amaras a tu pareja, pero tu pareja tiene una mania que detestas y no para de hacerla.";
      break;
    case 16:
      document.getElementById("elBotonText").innerHTML =
        "La comida te sabe 3000 veces mejor, pero solo puedes comer 3 recetas.";
      break;
    case 17:
      document.getElementById("elBotonText").innerHTML =
        "Puedes ver el futuro, pero cada vez que lo haces olvidas algo de tu pasado.";
      break;
    case 18:
      document.getElementById("elBotonText").innerHTML =
        "Vives la vida de tus sueños, pero no recuerdas nada de la actual.";
      break;
    case 19:
      document.getElementById("elBotonText").innerHTML =
        "Todas tus borracheras son la hostia, pero todas tus rescas son terribles.";
      break;
    case 20:
      document.getElementById("elBotonText").innerHTML =
        "Consigues tu coche de ensueño con todos los gastos pagados (mantenimiento, combustible, seguro...), pero jamas puedes lavarlo.";
      break;
    case 21:
      document.getElementById("elBotonText").innerHTML =
        "Consigues la habilidad de convertirte en tu animal favorito a placer, pero eres subsceptible a todas sus enfermedades.";
      break;
    case 22:
      document.getElementById("elBotonText").innerHTML =
        "Puedes conseguir tres objetos que desees, pero debes matar a un gato/perro con tus manos desnudas para completar el ritual.";
      break;
    case 23:
      document.getElementById("elBotonText").innerHTML =
        "Puedes detectar que una persona este interesada en ti, pero todos pueden saber si estas interesado en ellos.";
      break;
    case 24:
      document.getElementById("elBotonText").innerHTML =
        "Cagas oro valorado en 500 €/k, pero hacerlo te produce un dolor agudo insufrible.";
      break;
    case 25:
      document.getElementById("elBotonText").innerHTML =
        "Ligas como nadie, no hay quien se te resista, pero eres incapaz de mantener una relacion mas de un año.";
      break;
    case 26:
      document.getElementById("elBotonText").innerHTML =
        "Vives en tu casa de ensueño, pero tus padres se van contigo.";
      break;
    case 27:
      document.getElementById("elBotonText").innerHTML =
        "Consigues la pareja de tus sueños, pero su herman@ trata desesperadamente de tener sexo contigo.";
      break;
    case 28:
      document.getElementById("elBotonText").innerHTML =
        "Nunca mas tendras que comer o dormir, pero toda la comida te sabe a mierda y si decides dormir tendras horribles pesadillas.";
      break;
    case 29:
      document.getElementById("elBotonText").innerHTML =
        "Puedes volar, pero solo sabes aterrizar estrellandote.";
      break;
    case 30:
      document.getElementById("elBotonText").innerHTML =
        "Puedes viajar por todo el mundo gratis, pero es en autobus.";
      break;
    case 31:
      document.getElementById("elBotonText").innerHTML =
        "Te conviertes en dios, pero ves a todos los humanos como bacterias.";
      break;
    case 32:
      document.getElementById("elBotonText").innerHTML =
        "Consigues un fisico de 10, pero los jugadores a tus lados engordan 25 kilos y saben que es por tu culpa.";
      break;
    case 33:
      document.getElementById("elBotonText").innerHTML =
        "Tendras y daras los mejores polvos de la historia, pero solo podras hacerlo con los aqui presentes.";
      break;
    case 34:
      document.getElementById("elBotonText").innerHTML =
        "Tendras la fuerza de un titan, pero oleras como tal.";
      break;
    case 35:
      document.getElementById("elBotonText").innerHTML =
        "Puedes vivir en tu mundo de fantasi favorito, pero como el villano.";
      break;
    case 36:
      document.getElementById("elBotonText").innerHTML =
        "Puedes traer a una persona a la vida, pero pierdes 10 años de vida.";
      break;
    case 37:
      document.getElementById("elBotonText").innerHTML =
        "Tendras dinero infinito, pero no puedes compartir tu riqueza con nadie.";
      break;
    case 38:
      document.getElementById("elBotonText").innerHTML =
        "Eres todopoderoso, pero solo durante un dia al mes y el resto del mes estas tan cansado que duermes el doble de lo normal.";
      break;
    case 39:
      document.getElementById("elBotonText").innerHTML =
        "La mayoria de tu cuerpo no envejece, Salvo tu cara y lo hace al doble de velocidad.";
      break;

    default:
      break;
  }

  sepuedepulsar = true;
  mensajeDeReto.innerHTML = ".";
}

function verdad() {
  document.getElementById("menu").classList.toggle("d-none");
  document.getElementById("verdad").classList.toggle("d-none");
  var pregunta = document.getElementById("lapregunta");
  var lapregunta = Math.floor(1 + Math.random() * 80);
  switch (parseInt(lapregunta)) {
    case 1:
      pregunta.innerHTML =
        "Cuentanos de que iba el ultimo video porno que has visto.";
      break;
    case 2:
      pregunta.innerHTML = "¿Alguna vez le has robado dinero a tus padres?.";
      break;
    case 3:
      pregunta.innerHTML =
        "¿Donde es el sitio mas raro donde has tenido sexo?.";
      break;
    case 4:
      pregunta.innerHTML = "Cual es tu mayor complejo y por qué.";
      break;
    case 4:
      pregunta.innerHTML = "¿Alguna vez le has robado dinero a tus padres?.";
      break;
    case 5:
      pregunta.innerHTML =
        "¿Cual ha sido tu peor experiencia con algun cuerpo de seguridad?.";
      break;
    case 6:
      pregunta.innerHTML = "¿Cual es el sitio mas raro en el que has meado?.";
      break;
    case 7:
      pregunta.innerHTML = "¿Cual es el pedo mas inaporopiado que recuerdas?.";
      break;
    case 8:
      pregunta.innerHTML =
        "¿Que fotos sobre ti nunca desearias que existieran?.";
      break;
    case 9:
      pregunta.innerHTML =
        "¿Cual ha sido la conversacion de chat mas lamentable que has tenido?.";
      break;
    case 10:
      pregunta.innerHTML =
        "¿Que realmente esperas que tus padres jamas descubran sobre ti?.";
      break;
    case 11:
      pregunta.innerHTML =
        "¿Cambiarias de sexo durante una semana?¿y para siempre?.";
      break;
    case 12:
      pregunta.innerHTML =
        "De los presentes,¿Quien crees que seria la peor cita?.";
      break;
    case 13:
      pregunta.innerHTML =
        "De los presentes, ¿Quien esta en una relacion con alguien que no le pega?.";
      break;
    case 14:
      pregunta.innerHTML =
        "¿Que es lo mas estupido que has dicho en la intimidad de pareja?.";
      break;
    case 15:
      pregunta.innerHTML =
        "Qué prefieres, ¿estar desnudo o vestido pero todos saben en que piensas?.";
      break;
    case 16:
      pregunta.innerHTML = "¿Alguna vez has practicado besando a un espejo?.";
      break;
    case 17:
      pregunta.innerHTML = "¿Babeas al dormir?.";
      break;
    case 18:
      pregunta.innerHTML = "Marry, kill, fuck.";
      break;
    case 19:
      pregunta.innerHTML =
        "¿Quien de los aqui presentes te cae peor y por qué?.";
      break;
    case 20:
      pregunta.innerHTML =
        "¿Qué es lo que mas te molesta de el jugador de tu derecha?.";
      break;
    case 21:
      pregunta.innerHTML =
        "¿Qué es lo que mas te molesta de el jugador de tu izquierda?.";
      break;
    case 22:
      pregunta.innerHTML = "¿Alguna vez has probado el cerumen de tus oidos?.";
      break;
    case 23:
      pregunta.innerHTML = "¿mama o papa?.";
      break;
    case 24:
      pregunta.innerHTML =
        "¿prefieres ser obeso morbido para siempre o perder tus genitales?.";
      break;
    case 25:
      pregunta.innerHTML =
        "Si tuvieras que ver a todos los presentes desnudos pero pudieras evitar a uno, ¿quien seria?.";
      break;
    case 26:
      pregunta.innerHTML =
        "¿Que harias si supieras que si murieras en las siguientes 24h revivirias al dia siguiente?.";
      break;
    case 27:
      pregunta.innerHTML =
        "Si pudieras cambiar algo de tu pasado, ¿que cambiarias?.";
      break;
    case 28:
      pregunta.innerHTML = "lo de la tarta y la polla.";
      break;
    case 29:
      pregunta.innerHTML = "El juego. Si habeis perdido, bebeis.";
      break;
    case 30:
      pregunta.innerHTML = "¿Quien es la diva del grupo?.";
      break;
    case 31:
      pregunta.innerHTML =
        "Si pudieras robar una cualidad fisica de alguno de lso presentes, ¿Cual seria?.";
      break;
    case 32:
      pregunta.innerHTML =
        "Que prefieres, una relacion muy apasionada, una relacion muy poco apasionada o una relacion muy imprevisible.";
      break;
    case 33:
      pregunta.innerHTML = "¿Que es lo que mas te corta el rollo?.";
      break;
    case 34:
      pregunta.innerHTML = "¿Que es lo que mas te pone a tono?.";
      break;
    case 35:
      pregunta.innerHTML =
        "Que ha sido lo mas escandaloso/patetico que has llegado a hacer intentando ligar.";
      break;
    case 36:
      pregunta.innerHTML = "¿Tienes alguna perforacion oculta?.";
      break;
    case 37:
      pregunta.innerHTML = "¿tienes algun fetiche?.";
      break;
    case 38:
      pregunta.innerHTML = "¿Sueles dormir desnud@?.";
      break;
    case 39:
      pregunta.innerHTML =
        "¿Cual seria la edad maxima con la que saldrias con alguien?.";
      break;
    case 40:
      pregunta.innerHTML =
        "¿Que ha sido lo mas borde que has hecho en tu vida?.";
      break;
    case 41:
      pregunta.innerHTML =
        "¿Cual ha sido la mentira mas cruel que has contado?.";
      break;
    case 42:
      pregunta.innerHTML =
        "¿Que es lo mas ridiculo que has hecho estando borracho?.";
      break;
    case 43:
      pregunta.innerHTML = "¿Como fue la ultima vez que te masturbaste?.";
      break;
    case 44:
      pregunta.innerHTML =
        "¿Que es lo mas asqueroso que has tenido en tus manos desnudas?.";
      break;
    case 45:
      pregunta.innerHTML = "¿Cual es tu placer culpable?.";
      break;
    case 46:
      pregunta.innerHTML = "¿Has puesto alguna vez los cuernos a alguien?.";
      break;
    case 47:
      pregunta.innerHTML = "¿Como acabo tu anterior relacion?.";
      break;
    case 48:
      pregunta.innerHTML =
        "¿Quien te ha visto desnud@ y ojala nunca hubiera sucedido?.";
      break;
    case 49:
      pregunta.innerHTML =
        "¿Cual es la mentira mas grande que le has contado a alguno de los presentes?.";
      break;
    case 50:
      pregunta.innerHTML = "¿Que ha sido lo mas tonto que te ha hecho llorar?.";
      break;
    case 51:
      pregunta.innerHTML = "¿A que personaje de Disney te follabas?.";
      break;
    case 52:
      pregunta.innerHTML =
        "¿A quien de los presentes (que nos ea tu pareja) te follabas?.";
      break;
    case 53:
      pregunta.innerHTML = "¿Cual ha sido tu ultima gran decepcion?.";
      break;
    case 54:
      pregunta.innerHTML = "¿Cual ha sido tu ultima gran humillacion?.";
      break;
    case 55:
      pregunta.innerHTML =
        "¿Con que tema consideras que eres insufrible pero sabes que merece la pena?.";
      break;
    case 56:
      pregunta.innerHTML = "¿Que es lo mas importante en la cama?.";
      break;
    case 57:
      pregunta.innerHTML = "¿Cual es tu postira favorita?.";
      break;
    case 58:
      pregunta.innerHTML = "¿Querrias saber como vas a morir?.";
      break;
    case 59:
      pregunta.innerHTML =
        "¿Cual ha sido al forma mas humillamnte/patetica/original que te han dado calabazas?.";
      break;
    case 60:
      pregunta.innerHTML =
        "¿Cual ha sido al forma mas humillamnte/patetica/original que has dado calabazas?.";
      break;
    case 61:
      pregunta.innerHTML = "¿Cual es el cotilleo mas loco que has escuchado?.";
      break;
    case 62:
      pregunta.innerHTML = "¿cual es tu peor habito?.";
      break;
    case 63:
      pregunta.innerHTML =
        "¿Cual ha sido la peor excusa que has dado para evitar hacer algo?.";
      break;
    case 64:
      pregunta.innerHTML =
        "¿Cual ha sido la peor excusa que has dado que te dejen hacer algo?.";
      break;
    case 65:
      pregunta.innerHTML = "¿Cual ha sido el beso del que mas te arrepientes?.";
      break;
    case 66:
      pregunta.innerHTML =
        "Si pudieras elegir entre ser la persona mas feliz del mundo o la mas inteligente, ¿Cual eligirias?.";
      break;
    case 67:
      pregunta.innerHTML = "¿A que te has rebajado con tal de ligar?.";
      break;
    case 68:
      pregunta.innerHTML = "¿Te has colado en casa de alguien?.";
      break;
    case 69:
      pregunta.innerHTML =
        "¿Cual ha sido la confusion mas graciosa que has tenido en la cama?.";
      break;
    case 70:
      pregunta.innerHTML = "¿Cuales son tus preliminares favoritos?.";
      break;
    case 71:
      pregunta.innerHTML =
        "¿Que encontraria tu abuela perturbador pero extrañamente encantador?.";
      break;
    case 72:
      pregunta.innerHTML =
        "¿A que te dedicarias si no te dedicaras a lo que te dedicas?.";
      break;
    case 73:
      pregunta.innerHTML =
        "¿Que haces con ese regalo que no sabes como se le ha ocurrido regalarte semejante basura?.";
      break;
    case 74:
      pregunta.innerHTML =
        "¿Cual es el nude/sext que mas verguenza ajena te ha provocado?.";
      break;
    case 75:
      pregunta.innerHTML = "¿A quien le has enviado tu ultimo nude?.";
      break;
    case 76:
      pregunta.innerHTML = "¿Que es algo infantil que aun haces?.";
      break;
    case 77:
      pregunta.innerHTML = "¿Cual es la zona donde mas te excitan los besos?.";
      break;
    case 78:
      pregunta.innerHTML =
        "¿Cual ha sido el lio mas gordo en el que te has metido?.";
      break;
    case 79:
      pregunta.innerHTML = "Que es peor: la zoofilia o la necrofilia.";
      break;
    case 80:
      pregunta.innerHTML = "¿Cual es tu tecnica preferida para ligar?.";
      break;

    default:
      break;
  }
  mensajeDeReto.innerHTML = ".";
}

function reto() {
  document.getElementById("menu").classList.toggle("d-none");
  document.getElementById("reto").classList.toggle("d-none");
  var reto = document.getElementById("elreto");
  var elreto = Math.floor(1 + Math.random() * 40);

  switch (elreto) {
    case 1:
      reto.innerHTML = "Haz 10 flexiones.";
      break;
    case 2:
      reto.innerHTML = "Lee tu ultimo mensaje de whatsapp en voz alta.";
      break;
    case 3:
      reto.innerHTML = "Lame el pie de la persona a tu derecha.";
      break;
    case 4:
      reto.innerHTML = "Toma este chupito sin las manos.";
      break;
    case 4:
      reto.innerHTML =
        "Desabrocha la bragueta de la persona de tu izquierda mirandol@ fijamente a los ojos. Si te ries tiras de nuevo.";
      break;
    case 5:
      reto.innerHTML =
        "Desde ahora y Hasta nuevo aviso eres el esclavo del jugador de la derecha, si te rajas a la orden. juegas de nuevo.";
      numeroReto[5] = true;
      break;
    case 6:
      reto.innerHTML =
        "Cambia ropas con la persona del otro sexo mas cercana a ti. Si el/ella se raja, le toca jugar.";
      numeroReto[6] = true;
      break;
    case 7:
      reto.innerHTML =
        "Deja a el jugador de tu derecha echar un ojo a tu galeria del movil.";
      break;
    case 8:
      reto.innerHTML =
        "Pon un poco de licor en una parte del cuerpo del jugador de la dercha y entonces, bebelo.";
      break;
    case 9:
      reto.innerHTML = "Haz un calvo al grupo.";
      break;
    case 10:
      reto.innerHTML =
        "Hasta nuevo aviso, habla con el acento mas sexy que se te ocurra.";
      numeroReto[10] = true;
      break;
    case 11:
      reto.innerHTML = "Perrea al jugador de tu izquierda durante 30 segundos.";
      break;
    case 12:
      reto.innerHTML =
        "Deja al jugador de tu derecha pintarte algo en el cuerpo.";
      break;
    case 13:
      reto.innerHTML =
        "Haz reir al jugador de tu derecha. Si no lo consigues juegas de nuevo.";
      break;
    case 14:
      reto.innerHTML = "Elige a un jugador, este podra darte o no un guantazo.";
      break;
    case 15:
      reto.innerHTML =
        "Finje que usas un hoola hoop en tus caderas hasta nuevo aviso, si paras y algun jugador se da cuenta juegas de nuevo.";
      numeroReto[15] = true;
      break;
    case 16:
      reto.innerHTML =
        "De ahora en adelante y hasta nuevo aviso mientras hablas debes hacer el sonido del animal que te diga el jugador de la derecha.";
      numeroReto[16] = true;
      break;
    case 17:
      reto.innerHTML =
        "Quitate la camiseta o los pantalones hasta nuevo aviso.";
      numeroReto[17] = true;
      break;
    case 18:
      reto.innerHTML =
        'Hasta que te vuelva a tocar tras cada frase debes decir "tequila" si te olvidas y un jugador se da cuenta podra añadir una palabra mas a la coletilla ';
      break;
    case 19:
      reto.innerHTML =
        "Repite todo lo que diga la persoan de la izquierda durante un turno completo.";
      break;
    case 20:
      reto.innerHTML = "Desde ahora y hasta nuevo aviso solo puedes susurrar.";
      numeroReto[20] = true;
      break;
    case 21:
      reto.innerHTML =
        "Tira una moneda. si sale cara: juegas de nuevo Si sale crus el siguiente jugador juega dos veces.";
      break;
    case 22:
      reto.innerHTML =
        'Hasta proximo aviso, si algun jugador dice "Azucar" azotate en el culo. Si no lo haces te toca de nuevo.';
      numeroReto[22] = true;
      break;
    case 23:
      reto.innerHTML = "Habla como un mono hasta nuevo aviso.";
      numeroReto[23] = true;
      break;
    case 24:
      reto.innerHTML = "Haz tres flexiones con un brazo.";
      break;
    case 25:
      reto.innerHTML =
        "Huele con ganas el interior del zapato del jugador de tu izquierda.";
      break;
    case 26:
      reto.innerHTML =
        "Hasta proximo aviso debes decir que si a todas las preguntas que se te formulen.";
      numeroReto[26] = true;
      break;
    case 27:
      reto.innerHTML =
        "Mira insistentemente al jugador de en frente hasta que te vuelva a tocar. No apartes la mirada.";
      break;
    case 28:
      reto.innerHTML =
        "LLena tu boca de agua y no la tragues hasta que te vuelva a tocar.";
      break;
    case 29:
      reto.innerHTML =
        "Hasta nuevo aviso usa tus manos como si fueran pinzas de cangrejo.";
      numeroReto[29] = true;
      break;
    case 30:
      reto.innerHTML = "Di algo malo de cada uno de los jugadores presentes.";
      break;
    case 31:
      reto.innerHTML = "Di algo bueno de cada uno de los jugadores presentes.";
      break;
    case 32:
      reto.innerHTML =
        "Hasta nuevo aviso cada vez que acabes una frase debes dar un gritito al estilo de Michael Jackson.";
      numeroReto[32] = true;
      break;
    case 33:
      reto.innerHTML = "Mantente en sentadilla hasta que te vuleva a tocar.";
      break;
    case 34:
      reto.innerHTML = "No puedes dejar de sonreir hasta nuevo aviso.";
      numeroReto[34] = true;
      break;
    case 35:
      reto.innerHTML = "Cuenta la el chiste mas ofensivo que sepas.";
      break;
    case 36:
      reto.innerHTML = "pon tu pie detras de tu cabeza.";
      break;
    case 37:
      reto.innerHTML = "Hasta nuevio aviso, tapate la nariz.";
      numeroReto[37] = true;
      break;
    case 38:
      reto.innerHTML = "Besa a el jugador de tu derecha.";
      break;
    case 39:
      reto.innerHTML =
        "Si tienes gafas quitatelas, si no tienes juegas otra vez.";
      break;
    case 40:
      reto.innerHTML = "Deja que el jugador de la derecha te peine,.";
      break;
    // case 41:
    // reto.innerHTML="¿Cual ha sido la mentira mas cruel que has contado?.";
    // break;
    // case 42:
    // reto.innerHTML="¿Que es lo mas ridiculo que has hecho estando borracho?.";
    // break;
    // case 43:
    // reto.innerHTML="¿Como fue la ultima vez que te masturbaste?.";
    // break;
    // case 44:
    // reto.innerHTML="¿Que es lo mas asqueroso que has tenido en tus manos desnudas?.";
    // break;
    // case 45:
    // reto.innerHTML="¿Cual es tu placer culpable?.";
    // break;
    // case 46:
    // reto.innerHTML="¿Has puesto alguna vez los cuernos a alguien?.";
    // break;
    // case 47:
    // reto.innerHTML="¿Como acabo tu anterior relacion?.";
    // break;
    // case 48:
    // reto.innerHTML="¿Quien te ha visto desnud@ y ojala nunca hubiera sucedido?.";
    // break;
    // case 49:
    // reto.innerHTML="¿Cual es la mentira mas grande que le has contado a alguno de los presentes?.";
    // break;
    // case 50:
    // reto.innerHTML="¿Que ha sido lo mas tonto que te ha hecho llorar?.";
    // break;
    // case 51:
    // reto.innerHTML="¿A que personaje de Disney te follabas?.";
    // break;
    // case 52:
    // reto.innerHTML="¿A quien de los presentes (que nos ea tu pareja) te follabas?.";
    // break;
    // case 53:
    // reto.innerHTML="¿Cual ha sido tu ultima gran decepcion?.";
    // break;
    // case 54:
    // reto.innerHTML="¿Cual ha sido tu ultima gran humillacion?.";
    // break;
    // case 55:
    // reto.innerHTML="¿Con que tema consideras que eres insufrible pero sabes que merece la pena?.";
    // break;
    // case 56:
    // reto.innerHTML="¿Que es lo mas importante en la cama?.";
    // break;
    // case 57:
    // reto.innerHTML="¿Cual es tu postira favorita?.";
    // break;
    // case 58:
    // reto.innerHTML="¿Querrias saber como vas a morir?.";
    // break;
    // case 59:
    // reto.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que te han dado calabazas?.";
    // break;
    // case 60:
    // reto.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que has dado calabazas?.";
    // break;
    // case 61:
    // reto.innerHTML="¿Cual es el cotilleo mas loco que has escuchado?.";
    // break;
    // case 62:
    // reto.innerHTML="¿cual es tu peor habito?.";
    // break;
    // case 63:
    // reto.innerHTML="¿Cual ha sido la peor excusa que has dado para evitar hacer algo?.";
    // break;
    // case 64:
    // reto.innerHTML="¿Cual ha sido la peor excusa que has dado que te dejen hacer algo?.";
    // break;
    // case 65:
    // reto.innerHTML="¿Cual ha sido el beso del que mas te arrepientes?.";
    // break;
    // case 66:
    // reto.innerHTML="Si pudieras elegir entre ser la persona mas feliz del mundo o la mas inteligente, ¿Cual eligirias?.";
    // break;
    // case 67:
    // reto.innerHTML="¿A que te has rebajado con tal de ligar?.";
    // break;
    // case 68:
    // reto.innerHTML="¿Te has colado en casa de alguien?.";
    // break;
    // case 69:
    // reto.innerHTML="¿Cual ha sido la confusion mas graciosa que has tenido en la cama?.";
    // break;
    // case 70:
    // reto.innerHTML="¿Cuales son tus preliminares favoritos?.";
    // break;
    // case 71:
    // reto.innerHTML="¿Que encontraria tu abuela perturbador pero extrañamente encantador?.";
    // break;
    // case 72:
    // reto.innerHTML="¿A que te dedicarias si no te dedicaras a lo que te dedicas?.";
    // break;
    // case 73:
    // reto.innerHTML="¿Que haces con ese regalo que no sabes como se le ha ocurrido regalarte semejante basura?.";
    // break;
    // case 74:
    // reto.innerHTML="¿Cual es el nude/sext que mas verguenza ajena te ha provocado?.";
    // break;
    // case 75:
    // reto.innerHTML="¿A quien le has enviado tu ultimo nude?.";
    // break;
    // case 76:
    // reto.innerHTML="¿Que es algo infantil que aun haces?.";
    // break;
    // case 77:
    // reto.innerHTML="¿Cual es la zona donde mas te excitan los besos?.";
    // break;
    // case 78:
    // reto.innerHTML="¿Cual ha sido el lio mas gordo en el que te has metido?.";
    // break;
    // case 79:
    // reto.innerHTML="Que es peor: la zoofilia o la necrofilia.";
    // break;
    // case 80:
    // reto.innerHTML="¿Cual es tu tecnica preferida para ligar?.";
    // break;

    default:
      break;
  }
  mensajeDeReto.innerHTML = ".";
}
function objetivoCumplido(lugar) {
  switch (lugar) {
    case 1:
      document.getElementById("verdad").classList.toggle("d-none");
      break;
    case 2:
      document.getElementById("reto").classList.toggle("d-none");
      break;
    case 3:
      document.getElementById("sorpresa").classList.toggle("d-none");
      break;
    case 4:
      document.getElementById("elBoton").classList.toggle("d-none");
      break;

    default:
      break;
  }
  sepuedepulsar = true;
}

function eventoSorpresa(numero) {
  document.getElementById("sorpresa").classList.toggle("d-none");

  console.log(numero);

  switch (Math.floor(numero / 3)) {
    case 0:
      document.getElementById("evento").innerHTML =
        "Todos los jugadores sin gafas juegan un tiro extra. Si tienes lentillas dos mas, por listo.<br>";
      break;
    case 1:
      document.getElementById("evento").innerHTML =
        "Todos los jugadores con gafas juegan un tiro extra. Si tienes lentillas dos mas, por listo.<br>";
      break;
    case 2:
      document.getElementById("evento").innerHTML =
        "Pulsa el boton cuando quieras, te toca bebes los chupitos iluminados campeon. Desmarca los chupitos vaciados antes de continuar.<br>";
      break;
    case 3:
      document.getElementById("evento").innerHTML =
        "Decides si un jugador a tu eleccion juega dos veces en su siguiente turno o no.<br>";
      break;
    case 4:
      document.getElementById("evento").innerHTML =
        "Has ganado el juego, todos los jugadores restantes brindan a tu salud.<br>";
      break;
    case 5:
      document.getElementById("evento").innerHTML =
        "Si es tu cumpleaños o lo estas celebrando hoy deja que todos los jugadores te tiren de las orejas.<br>";
      break;
    // case 6:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 7:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 8:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 9:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 10:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 11:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 12:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 13:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 14:
    //   document.getElementById("evento").innerHTML=".";
    //   break;
    // case 15:
    //   document.getElementById("evento").innerHTML=".";
    //   break;

    default:
      break;
  }
}

function reset(modo) {
  jugando = false;
  sepuedepulsar = true;
  var botontarget = 0;
  if (modo == 1) {
    counter = 0;
  }

  for (let index = 0; index < 17; index++) {
    socket.emit("light",[index,0]);
  }

  for (let index = 0; index < 17; index++) {
    estadosVasos[index] = false;
  }
  console.log(estadosVasos);
  
  
  while (botontarget < 16) {
    botontarget++;

    if (
      document
        .getElementById(botontarget)
        .classList.contains("btn-secondary") &&
      botontarget % 2 == 0
    ) {
      document.getElementById(botontarget).classList.remove("btn-secondary");
      document.getElementById(botontarget).classList.add("btn-danger");
    } else if (
      document
        .getElementById(botontarget)
        .classList.contains("btn-secondary") &&
      botontarget % 2 != 0
    ) {
      document.getElementById(botontarget).classList.remove("btn-secondary");
      document.getElementById(botontarget).classList.add("btn-dark");
    } else {
    }
  }
  if (!document.getElementById("botones").classList.contains("d-none")) {
    document.getElementById("botones").classList.add("d-none");
  }

  if (!document.getElementById("menu").classList.contains("d-none")) {
    document.getElementById("menu").classList.add("d-none");
  }
  if (!document.getElementById("verdad").classList.contains("d-none")) {
    document.getElementById("verdad").classList.add("d-none");
  }
  if (!document.getElementById("reto").classList.contains("d-none")) {
    document.getElementById("reto").classList.add("d-none");
  }
  if (!document.getElementById("gameover").classList.contains("d-none")) {
    document.getElementById("gameover").classList.add("d-none");
  }
  if (!document.getElementById("prep").classList.contains("d-none")) {
    document.getElementById("prep").classList.add("d-none");
  }
}

