Ejemplo de WebRTC con google chrome apps 
========================================

En [interzonas labs](http://labs.interzonas.info/) hemos escrito este [post](http://labs.interzonas.info/articles/experimentos-con-una-fachada-de-leds-y-webRTC/) donde explicamos cual es el experimentos que hicimos.

En el repositorio tenemos las piezas necesarias para poder hacer funcionar un sistema basado en WebRTC

* clienteWebRTC: Cliente que inicia una llamada, para poder recibir un stream desde la app de google chrome. 
* destopCaptureApp: Es una app para Google chrome ante la llamada del cliente permite seleccionar una ventana del sistema operativo para poder enviar en formato vídeo al cliente. 

Para hacer funcionar esto hemos usado [peerjs](http://peerjs.com/)

Si tienes alguna duda hola@interzonas.info