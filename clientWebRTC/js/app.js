
    // Click handlers setup
    $(function(){
      $('#make-connect').click(function(){
        // PeerJS object
        var peer = new Peer('clienteByInterzonas', { key: 't8jdgbn69x315rk9', debug: 3});

        peer.on('open', function(){
          $('#my-id').text(peer.id);
        });

        // Receiving a call
        peer.on('call', function(call){
          // Answer the call automatically (instead of prompting user) for demo purposes
          call.answer(window.localStream);
          llamada(call);
        });

        peer.on('error', function(err){
          alert(err.message);
          // Return to step 2 if error occurs
          cerrar();
        });
        $('.esperar').show();
      });

      $('#end-call').click(function(){
        window.existingCall.close();
        cerrar();
      });

      // Retry if getUserMedia fails
      $('#step1-retry').click(function(){
        $('#step1-error').hide();
        init();
      });
      // Get things started
      init();
    });

    function init() {
      console.log('step1');
    }

    function cerrar () {
      $('#step1, #step3').hide();
      $('#step2').show();
    }

    function llamada(call) {
      console.log('llamada');
      // Hang up on an existing call if present
      if (window.existingCall) {
        window.existingCall.close();
      }

      // Wait for stream on the call, then set peer video display
      call.on('stream', function(stream){
        $('.esperar').fadeOut();
        $('#their-video').prop('src', URL.createObjectURL(stream));
      });

      // UI stuff
      window.existingCall = call;
      $('#their-id').text(call.peer);
      call.on('close', cerrar);
      $('#step1, #step2').hide();
      $('#step3').show();
    }

