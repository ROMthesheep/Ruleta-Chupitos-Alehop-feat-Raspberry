# Ruleta de Chupitos de Alehop feat Raspberry:

## La idea: 
~~Que al coger un vasito la ruleta sepa que vaso es y proponga una serie de juegos de bar de mierda (pulsarias el boton, verdad o reto). Para ello hay que forrar previamente los agujeros de los vasos y la seccion de los vasos con cobre adhesivo. Cada uno de estos huecos sera un interruptor abierto que al colocar el vaso se cerrara.~~ o eso diria, pero resulta que la raspberry no tiene pines suficientes para detectar los 16 vasos e iluminarlos, asi que tuve que elegir entre iluminar los vasos o que la maquina los detectara (o que un arduino gestione el i/o y mandar la info por c2c, pero xd), finalmente me decante por la iluminacion.

## El proceso:

En primer lugar deberemos instanciar node con npm y en mi caso instale nodemon para facilizar el desarrollo. Utilizando node.js, express.js, websocket y onoff alojaremos todo este sistema en una webapp para que todos puedan usar sus moviles durante la partida, aqui el package de node.js que he acabado usando.

![](https://i.gyazo.com/5561ce8f2d7fa255a725c19d3ffe78b4.png)

Para el front en si, se ha usado bootstrap con algunas adiciones como los botones redondos. Si volviera a diseñar el sistema no me lo pensaria dos veces y lo haria en angular, el proyecto crecio muy deprisa (por que no paraba de meterle tonterias y debido a la naturaleza dinamica del front) y rapidamente el javascript llego a un volumen que dificultaba su trabajo, aun asi tire para alante con el trabajo en ese estado ya que para cuando empezo a ser pesado de navegar habia ya cruzado el punto de no retorno, la conversion tardaria mas tiempo que seguir como estaba.

El hardware es rematadamente simple, un circuito donde los leds tienen un nodo tierra comun y cada catodo va al pin correspondiente, si vais a hacerlo de forma semi permanente por dios ponedle resistencias de aprox 100Ω, si lo haceis para usarlo una vez cada mil pues oye, no hace tamta falta. Yo he usado leds blancos muy brillantes para que asi la luz pueda filtrarse por el vidrio y el licor. 

![](https://i.imgur.com/AKXixzC.jpg)

La chicha del proyecto es el control de los GPIO pines de raspberry, aqui habia varias soluciones, la más cutre y mas comoda era ejecutar un script de python, pero ello me dejaria ciego de cara al front. Asi que elegí controlar todo desde js.

El control en maquina de los pines de hace desde init.js y el control logico se hace desde jabihcri.js mediante el ```socket.emit()```. 

A día de hoy hay 3 minijuegos, el boton, donde se te presenta una situacion con pros y contras y el jugador debe decidir si le compensa aceptarlo o si ignorar la oferta, verdad y reto. A parte de esto existe una probabilidad del 15% de que surja un evento sorpresa que puede ser bueno o malo para el jugador.

## Conclusion de fin de proyecto:
Realmente este proyecto nacio de la necesidad autoimpuesta de terminar un proyecto con una fecha limite, que he cumplido. Y para ver si sabia hacerlo, Porque es muy facil pensar en algo y pensar "Puedo hacerlo" pero entre saber que puedes hacerlo a saber hacerlo y finalmente hacerlo hay un proceso que creo que es muy importante.
Si pudiera volver atras y cambiar algo implementaria desde el inicio un sistema de lectura de fichero para que los textos no estuvieran metidos en el codigo y usaria angular para facilitar el dinamismo de la pagina.