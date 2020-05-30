var socket = io(); //load socket.io-client and connect to the host that serves the page
window.addEventListener("load", function(){ //when page loads
  var lightbox = document.getElementById("light");
  lightbox.addEventListener("change", function() { //add event listener for when checkbox changes
    socket.emit("light", Number(this.checked)); //send button status to server (as 1 or 0)
  });
});
socket.on('light', function (data) { //get button status from client
  document.getElementById("light").checked = data; //change checkbox according to push button on Raspberry Pi
  socket.emit("light", data); //send push button status to back to server
});



var jugando = false;
var numeroselect = document.getElementById("numeroliq");
var counter=0;
var sepuedepulsar=true;
var retoTimer=0;
var numeroReto=0

function init(){

  if (jugando==false){
    jugando=true;
    document.getElementById("prep").classList.toggle("d-none");
    
    
    if (document.getElementById("gameover").classList.contains("d-none")) {
      document.getElementById("gameover").classList.remove("d-none");
    }
  }
  
}

function reset(){
  jugando=false;
  sepuedepulsar = true;
  var botontarget=0;
  counter=0;
  while(botontarget<16){
      botontarget++;
      
      if (document.getElementById(botontarget).classList.contains('btn-secondary') && botontarget%2==0) {
        document.getElementById(botontarget).classList.remove("btn-secondary");
        document.getElementById(botontarget).classList.add("btn-danger");
      }
      else if (document.getElementById(botontarget).classList.contains('btn-secondary') && botontarget%2!=0) {
        document.getElementById(botontarget).classList.remove("btn-secondary");
        document.getElementById(botontarget).classList.add("btn-dark");
    }
    else{
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

function actualizarNumero(){
  var cantidadlicor = numeroselect.options[numeroselect.selectedIndex].value;
  var b1;
  var b2;
  var b3;
  var b4;
  var agua=2+Math.random()*2;
  var tot=0;
  console.log(cantidadlicor);
  if (cantidadlicor==2){
    do{
      b2=Math.random()*15;
      b1 = Math.random()*15;
      tot=Math.floor(b1+b2+agua);
    }
    while(tot!=16);
    console.log(tot)
    document.getElementById("config").innerHTML="Pon " +Math.floor(b1)+" vasos con el licor numero uno, "+Math.floor(b2)+" con el dos  y rellena el resto con agua.";
  }
  if (cantidadlicor==3){
    do{
      b2=Math.random()*10;
      b1 = Math.random()*10;
      b3 = Math.random()*10;
      tot=Math.floor(b1+b2+b3+agua);
    }
    while(tot!=16);
    console.log(tot)
    document.getElementById("config").innerHTML="Pon " +Math.floor(b1)+" vasos con el licor numero uno, "+Math.floor(b2)+" con el dos, "+Math.floor(b3)+" Con el tres y rellena el resto con agua.";
  }
  if (cantidadlicor==4){
    do{
      b2 = Math.random()*6;
      b1 = Math.random()*6;
      b3 = Math.random()*6;
      b4 = Math.random()*6;
      tot=Math.floor(b1+b2+b3+b4+agua);
    }
    while(tot!=16);
    document.getElementById("config").innerHTML="Pon " +Math.floor(b1)+" vasos con el licor numero uno "+Math.floor(b2)+" con el dos, "+Math.floor(b3)+" Con el tres, " + Math.floor(b4) +" con el cuatro y rellena el resto con agua.";
  }

}

function prepdone(){
  document.getElementById("prep").classList.toggle("d-none");
  document.getElementById("botones").classList.toggle("d-none");
}

function vaso(numeroVaso){
  var eventosorpresa = Math.floor(Math.random()*100);
  console.log(eventosorpresa);
  if (document.getElementById(numeroVaso).classList.contains('btn-secondary')) {
    // do some stuff
  }
  else if (sepuedepulsar){
    var vaso = document.getElementById(numeroVaso);
    vaso.classList.remove("btn-dark");
    vaso.classList.remove("btn-danger");
    vaso.classList.add("btn-secondary");
    counter++;
    document.getElementById("counter").innerHTML = counter;

    if (eventosorpresa<15) {
      eventoSorpresa(eventosorpresa);
    } else {
      document.getElementById("menu").classList.toggle("d-none"); 
    }
    
    sepuedepulsar=false;
  }
}

function beber(){
  document.getElementById("menu").classList.toggle("d-none");
  sepuedepulsar=true;
}

function verdad(){
  document.getElementById("menu").classList.toggle("d-none");
  document.getElementById("verdad").classList.toggle("d-none");
  var pregunta = document.getElementById("lapregunta");
  var lapregunta = Math.floor(1+Math.random()*80);
  switch (parseInt(lapregunta)) {
    case 1:
      pregunta.innerHTML="Cuentanos de que iba el ultimo video porno que has visto";
      break;
    case 2:
      pregunta.innerHTML="¿Alguna vez le has robado dinero a tus padres?";
      break;
    case 3:
      pregunta.innerHTML="¿Donde es el sitio mas raro donde has tenido sexo?";
    break;
    case 4:
      pregunta.innerHTML="Cual es tu mayor complejo y por qué";
    break;
    case 4:
       pregunta.innerHTML="¿Alguna vez le has robado dinero a tus padres?";
    break;
    case 5:
      pregunta.innerHTML="¿Cual ha sido tu peor experiencia con algun cuerpo de seguridad?";
    break;
    case 6:
      pregunta.innerHTML="¿Cual es el sitio mas raro en el que has meado?";
    break;
    case 7:
      pregunta.innerHTML="¿Cual es el pedo mas inaporopiado que recuerdas?";
    break;
    case 8:
      pregunta.innerHTML="¿Que fotos sobre ti nunca desearias que existieran?";
    break;
    case 9:
      pregunta.innerHTML="¿Cual ha sido la conversacion de chat mas lamentable que has tenido?";
    break;
    case 10:
      pregunta.innerHTML="¿Que realmente esperas que tus padres jamas descubran sobre ti?";
    break;
    case 11:
      pregunta.innerHTML="¿Cambiarias de sexo durante una semana?¿y para siempre?";
    break;
    case 12:
      pregunta.innerHTML="De los presentes,¿Quien crees que seria la peor cita?";
    break;
    case 13:
      pregunta.innerHTML="De los presentes, ¿Quien esta en una relacion con alguien que no le pega?";
    break;
    case 14:
      pregunta.innerHTML="¿Que es lo mas estupido que has dicho en la intimidad de pareja?";
    break;
    case 15:
      pregunta.innerHTML="Qué prefieres, ¿estar desnudo o vestido pero todos saben en que piensas?";
    break;
    case 16:
      pregunta.innerHTML="¿Alguna vez has practicado besando a un espejo?";
    break;
    case 17:
      pregunta.innerHTML="¿Babeas al dormir?";
    break;
    case 18:
      pregunta.innerHTML="Marry, kill, fuck";
    break;
    case 19:
      pregunta.innerHTML="¿Quien de los aqui presentes te cae peor y por qué?";
    break;
    case 20:
      pregunta.innerHTML="¿Qué es lo que mas te molesta de el jugador de tu derecha?";
    break;
    case 21:
      pregunta.innerHTML="¿Qué es lo que mas te molesta de el jugador de tu izquierda?";
    break;
    case 22:
      pregunta.innerHTML="¿Alguna vez has probado el cerumen de tus oidos?";
    break;
    case 23:
      pregunta.innerHTML="¿mama o papa?";
    break;
    case 24:
    pregunta.innerHTML="¿prefieres ser obeso morbido para siempre o perder tus genitales?";
    break;
    case 25:
      pregunta.innerHTML="Si tuvieras que ver a todos los presentes desnudos pero pudieras evitar a uno, ¿quien seria?";
    break;
    case 26:
    pregunta.innerHTML="¿Que harias si supieras que si murieras en las siguientes 24h revivirias al dia siguiente?";
    break;
    case 27:
    pregunta.innerHTML="Si pudieras cambiar algo de tu pasado, ¿que cambiarias?";
    break;
    case 28:
    pregunta.innerHTML="lo de la tarta y la polla";
    break;
    case 29:
    pregunta.innerHTML="El juego. Si habeis perdido, bebeis";
    break;
    case 30:
    pregunta.innerHTML="¿Quien es la diva del grupo?";
    break;
    case 31:
    pregunta.innerHTML="Si pudieras robar una cualidad fisica de alguno de lso presentes, ¿Cual seria?";
    break;
    case 32:
    pregunta.innerHTML="Que prefieres, una relacion muy apasionada, una relacion muy poco apasionada o una relacion muy imprevisible";
    break;
    case 33:
    pregunta.innerHTML="¿Que es lo que mas te corta el rollo?";
    break;
    case 34:
    pregunta.innerHTML="¿Que es lo que mas te pone a tono?";
    break;
    case 35:
    pregunta.innerHTML="Que ha sido lo mas escandaloso/patetico que has llegado a hacer intentando ligar";
    break;
    case 36:
    pregunta.innerHTML="¿Tienes alguna perforacion oculta?";
    break;
    case 37:
    pregunta.innerHTML="¿tienes algun fetiche?";
    break;
    case 38:
    pregunta.innerHTML="¿Sueles dormir desnud@?";
    break;
    case 39:
    pregunta.innerHTML="¿Cual seria la edad maxima con la que saldrias con alguien?";
    break;
    case 40:
    pregunta.innerHTML="¿Que ha sido lo mas borde que has hecho en tu vida?";
    break;
    case 41:
    pregunta.innerHTML="¿Cual ha sido la mentira mas cruel que has contado?";
    break;
    case 42:
    pregunta.innerHTML="¿Que es lo mas ridiculo que has hecho estando borracho?";
    break;
    case 43:
    pregunta.innerHTML="¿Como fue la ultima vez que te masturbaste?";
    break;
    case 44:
    pregunta.innerHTML="¿Que es lo mas asqueroso que has tenido en tus manos desnudas?";
    break;
    case 45:
    pregunta.innerHTML="¿Cual es tu placer culpable?";
    break;
    case 46:
    pregunta.innerHTML="¿Has puesto alguna vez los cuernos a alguien?";
    break;
    case 47:
    pregunta.innerHTML="¿Como acabo tu anterior relacion?";
    break;
    case 48:
    pregunta.innerHTML="¿Quien te ha visto desnud@ y ojala nunca hubiera sucedido?";
    break;
    case 49:
    pregunta.innerHTML="¿Cual es la mentira mas grande que le has contado a alguno de los presentes?";
    break;
    case 50:
    pregunta.innerHTML="¿Que ha sido lo mas tonto que te ha hecho llorar?";
    break;
    case 51:
    pregunta.innerHTML="¿A que personaje de Disney te follabas?";
    break;
    case 52:
    pregunta.innerHTML="¿A quien de los presentes (que nos ea tu pareja) te follabas?";
    break;
    case 53:
    pregunta.innerHTML="¿Cual ha sido tu ultima gran decepcion?";
    break;
    case 54:
    pregunta.innerHTML="¿Cual ha sido tu ultima gran humillacion?";
    break;
    case 55:
    pregunta.innerHTML="¿Con que tema consideras que eres insufrible pero sabes que merece la pena?";
    break;
    case 56:
    pregunta.innerHTML="¿Que es lo mas importante en la cama?";
    break;
    case 57:
    pregunta.innerHTML="¿Cual es tu postira favorita?";
    break;
    case 58:
    pregunta.innerHTML="¿Querrias saber como vas a morir?";
    break;
    case 59:
    pregunta.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que te han dado calabazas?";
    break;
    case 60:
    pregunta.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que has dado calabazas?";
    break;
    case 61:
    pregunta.innerHTML="¿Cual es el cotilleo mas loco que has escuchado?";
    break;
    case 62:
    pregunta.innerHTML="¿cual es tu peor habito?";
    break;
    case 63:
    pregunta.innerHTML="¿Cual ha sido la peor excusa que has dado para evitar hacer algo?";
    break;
    case 64:
    pregunta.innerHTML="¿Cual ha sido la peor excusa que has dado que te dejen hacer algo?";
    break;
    case 65:
    pregunta.innerHTML="¿Cual ha sido el beso del que mas te arrepientes?";
    break;
    case 66:
    pregunta.innerHTML="Si pudieras elegir entre ser la persona mas feliz del mundo o la mas inteligente, ¿Cual eligirias?";
    break;
    case 67:
    pregunta.innerHTML="¿A que te has rebajado con tal de ligar?";
    break;
    case 68:
    pregunta.innerHTML="¿Te has colado en casa de alguien?";
    break;
    case 69:
    pregunta.innerHTML="¿Cual ha sido la confusion mas graciosa que has tenido en la cama?";
    break;
    case 70:
    pregunta.innerHTML="¿Cuales son tus preliminares favoritos?";
    break;
    case 71:
    pregunta.innerHTML="¿Que encontraria tu abuela perturbador pero extrañamente encantador?";
    break;
    case 72:
    pregunta.innerHTML="¿A que te dedicarias si no te dedicaras a lo que te dedicas?";
    break;
    case 73:
    pregunta.innerHTML="¿Que haces con ese regalo que no sabes como se le ha ocurrido regalarte semejante basura?";
    break;
    case 74:
    pregunta.innerHTML="¿Cual es el nude/sext que mas verguenza ajena te ha provocado?";
    break;
    case 75:
    pregunta.innerHTML="¿A quien le has enviado tu ultimo nude?";
    break;
    case 76:
    pregunta.innerHTML="¿Que es algo infantil que aun haces?";
    break;
    case 77:
    pregunta.innerHTML="¿Cual es la zona donde mas te excitan los besos?";
    break;
    case 78:
    pregunta.innerHTML="¿Cual ha sido el lio mas gordo en el que te has metido?";
    break;
    case 79:
    pregunta.innerHTML="Que es peor: la zoofilia o la necrofilia";
    break;
    case 80:
    pregunta.innerHTML="¿Cual es tu tecnica preferida para ligar?";
    break;


    default:
      break;
  }
  
}

function reto(){
  document.getElementById("menu").classList.toggle("d-none");
  document.getElementById("reto").classList.toggle("d-none");
  var reto = document.getElementById("elreto");
  var elreto = Math.floor(1+Math.random()*80);

  switch (elreto) {
    case 1:
      reto.innerHTML="Haz 10 flexiones";
      break;
    case 2:
      reto.innerHTML="Lee tu ultimo mensaje de whatsapp en voz alta";
      break;
    case 3:
      reto.innerHTML="Lame el pie de la persona a tu derecha";
    break;
    case 4:
      reto.innerHTML="Toma este chupito sin las manos";
    break;
    case 4:
       reto.innerHTML="Desabrocha la bragueta de la persona de tu izquierda mirandol@ fijamente a los ojos. Si te ries tiras de nuevo";
    break;
    case 5:
      reto.innerHTML="Desde ahora y Hasta nuevo aviso eres el esclavo del jugador de la derecha, si te rajas a la orden. juegas de nuevo";
      retoTimer=0;
    break;
    case 6:
      reto.innerHTML="Cambia ropas con la persona del otro sexo mas cercana a ti. Si el/ella se raja, le toca jugar.";
      retoTimer=0;
    break;
    case 7:
      reto.innerHTML="Deja a el jugador de tu derecha echar un ojo a tu galeria del movil.";
    break;
    case 8:
      reto.innerHTML="Pon un poco de licor en una parte del cuerpo del jugador de la dercha y entonces, bebelo.";
    break;
    case 9:
      reto.innerHTML="Haz un calvo al grupo";
    break;
    case 10:
      reto.innerHTML="Hasta nuevo aviso, habla con el acento mas sexy que se te ocurra";
      retoTimer=0;
    break;
    case 11:
      reto.innerHTML="Perrea al jugador de tu izquierda durante 30 segundos";
    break;
    case 12:
      reto.innerHTML="Deja al jugador de tu derecha pintarte algo en el cuerpo";
    break;
    case 13:
      reto.innerHTML="Haz reir al jugador de tu derecha. Si no lo consigues juegas de nuevo.";
    break;
    case 14:
      reto.innerHTML="Elige a un jugador, este podra darte o no un guantazo.";
    break;
    case 15:
      reto.innerHTML="Finje que usas un hoola hoop en tus caderas hasta nuevo aviso, si paras y algun jugador se da cuenta juegas de nuevo.";
      retoTimer=0;
    break;
    case 16:
      reto.innerHTML="De ahora en adelante y hasta nuevo aviso mientras hablas debes hacer el sonido del animal que te diga el jugador de la derecha.";
      numeroReto=16;
    break;
    case 17:
      reto.innerHTML="Quitate la camiseta o los pantalones hasta nuevo aviso.";
      numeroReto=17;
    break;
    case 18:
      reto.innerHTML="Hasta que te vuelva a tocar tras cada frase debes decir \"tequila\" si te olvidas y un jugador se da cuenta podra añadir una palabra mas a la coletilla ";
    break;
    case 19:
      reto.innerHTML="Repite todo lo que diga la persoan de la izquierda durante un turno completo";
    break;
    case 20:
      reto.innerHTML="Desde ahora y hasta nuevo aviso solo puedes susurrar";
      numeroReto=20;
    break;
    case 21:
      reto.innerHTML="Tira una moneda. si sale cara: juegas de nuevo Si sale crus el siguiente jugador juega dos veces.";
    break;
    case 22:
      reto.innerHTML="Hasta proximo aviso, si algun jugador dice \"Azucar\" azotate en el culo. Si no lo haces te toca de nuevo.";
      numeroReto=22;
    break;
    case 23:
      reto.innerHTML="¿mama o papa?";
    break;
    case 24:
    reto.innerHTML="¿prefieres ser obeso morbido para siempre o perder tus genitales?";
    break;
    case 25:
      reto.innerHTML="Si tuvieras que ver a todos los presentes desnudos pero pudieras evitar a uno, ¿quien seria?";
    break;
    case 26:
    reto.innerHTML="¿Que harias si supieras que si murieras en las siguientes 24h revivirias al dia siguiente?";
    break;
    case 27:
    reto.innerHTML="Si pudieras cambiar algo de tu pasado, ¿que cambiarias?";
    break;
    case 28:
    reto.innerHTML="lo de la tarta y la polla";
    break;
    case 29:
    reto.innerHTML="El juego. Si habeis perdido, bebeis";
    break;
    case 30:
    reto.innerHTML="¿Quien es la diva del grupo?";
    break;
    case 31:
    reto.innerHTML="Si pudieras robar una cualidad fisica de alguno de lso presentes, ¿Cual seria?";
    break;
    case 32:
    reto.innerHTML="Que prefieres, una relacion muy apasionada, una relacion muy poco apasionada o una relacion muy imprevisible";
    break;
    case 33:
    reto.innerHTML="¿Que es lo que mas te corta el rollo?";
    break;
    case 34:
    reto.innerHTML="¿Que es lo que mas te pone a tono?";
    break;
    case 35:
    reto.innerHTML="Que ha sido lo mas escandaloso/patetico que has llegado a hacer intentando ligar";
    break;
    case 36:
    reto.innerHTML="¿Tienes alguna perforacion oculta?";
    break;
    case 37:
    reto.innerHTML="¿tienes algun fetiche?";
    break;
    case 38:
    reto.innerHTML="¿Sueles dormir desnud@?";
    break;
    case 39:
    reto.innerHTML="¿Cual seria la edad maxima con la que saldrias con alguien?";
    break;
    case 40:
    reto.innerHTML="¿Que ha sido lo mas borde que has hecho en tu vida?";
    break;
    case 41:
    reto.innerHTML="¿Cual ha sido la mentira mas cruel que has contado?";
    break;
    case 42:
    reto.innerHTML="¿Que es lo mas ridiculo que has hecho estando borracho?";
    break;
    case 43:
    reto.innerHTML="¿Como fue la ultima vez que te masturbaste?";
    break;
    case 44:
    reto.innerHTML="¿Que es lo mas asqueroso que has tenido en tus manos desnudas?";
    break;
    case 45:
    reto.innerHTML="¿Cual es tu placer culpable?";
    break;
    case 46:
    reto.innerHTML="¿Has puesto alguna vez los cuernos a alguien?";
    break;
    case 47:
    reto.innerHTML="¿Como acabo tu anterior relacion?";
    break;
    case 48:
    reto.innerHTML="¿Quien te ha visto desnud@ y ojala nunca hubiera sucedido?";
    break;
    case 49:
    reto.innerHTML="¿Cual es la mentira mas grande que le has contado a alguno de los presentes?";
    break;
    case 50:
    reto.innerHTML="¿Que ha sido lo mas tonto que te ha hecho llorar?";
    break;
    case 51:
    reto.innerHTML="¿A que personaje de Disney te follabas?";
    break;
    case 52:
    reto.innerHTML="¿A quien de los presentes (que nos ea tu pareja) te follabas?";
    break;
    case 53:
    reto.innerHTML="¿Cual ha sido tu ultima gran decepcion?";
    break;
    case 54:
    reto.innerHTML="¿Cual ha sido tu ultima gran humillacion?";
    break;
    case 55:
    reto.innerHTML="¿Con que tema consideras que eres insufrible pero sabes que merece la pena?";
    break;
    case 56:
    reto.innerHTML="¿Que es lo mas importante en la cama?";
    break;
    case 57:
    reto.innerHTML="¿Cual es tu postira favorita?";
    break;
    case 58:
    reto.innerHTML="¿Querrias saber como vas a morir?";
    break;
    case 59:
    reto.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que te han dado calabazas?";
    break;
    case 60:
    reto.innerHTML="¿Cual ha sido al forma mas humillamnte/patetica/original que has dado calabazas?";
    break;
    case 61:
    reto.innerHTML="¿Cual es el cotilleo mas loco que has escuchado?";
    break;
    case 62:
    reto.innerHTML="¿cual es tu peor habito?";
    break;
    case 63:
    reto.innerHTML="¿Cual ha sido la peor excusa que has dado para evitar hacer algo?";
    break;
    case 64:
    reto.innerHTML="¿Cual ha sido la peor excusa que has dado que te dejen hacer algo?";
    break;
    case 65:
    reto.innerHTML="¿Cual ha sido el beso del que mas te arrepientes?";
    break;
    case 66:
    reto.innerHTML="Si pudieras elegir entre ser la persona mas feliz del mundo o la mas inteligente, ¿Cual eligirias?";
    break;
    case 67:
    reto.innerHTML="¿A que te has rebajado con tal de ligar?";
    break;
    case 68:
    reto.innerHTML="¿Te has colado en casa de alguien?";
    break;
    case 69:
    reto.innerHTML="¿Cual ha sido la confusion mas graciosa que has tenido en la cama?";
    break;
    case 70:
    reto.innerHTML="¿Cuales son tus preliminares favoritos?";
    break;
    case 71:
    reto.innerHTML="¿Que encontraria tu abuela perturbador pero extrañamente encantador?";
    break;
    case 72:
    reto.innerHTML="¿A que te dedicarias si no te dedicaras a lo que te dedicas?";
    break;
    case 73:
    reto.innerHTML="¿Que haces con ese regalo que no sabes como se le ha ocurrido regalarte semejante basura?";
    break;
    case 74:
    reto.innerHTML="¿Cual es el nude/sext que mas verguenza ajena te ha provocado?";
    break;
    case 75:
    reto.innerHTML="¿A quien le has enviado tu ultimo nude?";
    break;
    case 76:
    reto.innerHTML="¿Que es algo infantil que aun haces?";
    break;
    case 77:
    reto.innerHTML="¿Cual es la zona donde mas te excitan los besos?";
    break;
    case 78:
    reto.innerHTML="¿Cual ha sido el lio mas gordo en el que te has metido?";
    break;
    case 79:
    reto.innerHTML="Que es peor: la zoofilia o la necrofilia";
    break;
    case 80:
    reto.innerHTML="¿Cual es tu tecnica preferida para ligar?";
    break;
  
    default:
      break;
  }
}
function objetivoCumplido(lugar){
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
      
    default:
      break;
  }
  sepuedepulsar=true;
}

function eventoSorpresa(numero){
  document.getElementById("sorpresa").classList.toggle("d-none");
  
}