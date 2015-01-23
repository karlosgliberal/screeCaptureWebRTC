
var peer = new Peer({ key: 'khf3nozz5irg4x6r', debug: 3});
//var peer = new Peer('someid', {host: 'localhost', port: 9000, path: '/'});

peer.on('open', function(){
  console.log(peer.id);
});

  // Receiving a call
  peer.on('call', function(call){
    // Answer the call automatically (instead of prompting user) for demo purposes
    call.answer(window.localStream);
    step3(call);
  });
  peer.on('error', function(err){
    alert(err.message);
    console.log(err.message);
    // Return to step 2 if error occurs
    step2();
  });

function gotStream(stream) {
  var video = document.querySelector("video");
  video.src = URL.createObjectURL(stream);
  var call = peer.call('someid1', stream);
  localstream = stream;
  stream.onended = function() { console.log("Ended"); };
}

function getUserMediaError() {
  console.log("getUserMedia() failed.");
}

function step3 (call) {
  // Hang up on an existing call if present


  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#video').prop('src', URL.createObjectURL(stream));
  });

  // UI stuff
  // window.existingCall = call;
  // $('#their-id').text(call.peer);
  // call.on('close', step2);
  // $('#step1, #step2').hide();
  // $('#step3').show();
}


function onAccessApproved(id) {
  if (!id) {
    console.log("Access rejected.");
    return;
  }

  navigator.webkitGetUserMedia({
      audio:false,
      video: { mandatory: { chromeMediaSource: "desktop",
                            chromeMediaSourceId: id } }
  }, gotStream, getUserMediaError);
}

var pending_request_id = null;

document.querySelector('#start').addEventListener('click', function(e) {
  pending_request_id = chrome.desktopCapture.chooseDesktopMedia(
      ["screen", "window"], onAccessApproved);
});

document.querySelector('#cancel').addEventListener('click', function(e) {
  if (pending_request_id != null) {
    chrome.desktopCapture.cancelChooseDesktopMedia(pending_request_id);
  }
});

document.querySelector('#startFromBackgroundPage')
    .addEventListener('click', function(e) {
      chrome.runtime.sendMessage(
          {}, function(response) { console.log(response.farewell); });
    });
