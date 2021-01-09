// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })
//       ],
//           actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

// alert('Hello world!')


// var addrs = document.querySelectorAll('.card-address');
// console.log(addrs);

// document.addEventListener("click",);

// var popup = document.querySelector('.mapboxgl-popup');

// document.addEventListener("DOMContentLoaded", function(event) {
  // console.log('It is loaded');
  // canvas = document.querySelector('.mapboxgl-canvas-container');
  // canvas.addEventListener('click', function(event) {
  //   console.log(event.target.nodeName);
  //   // var popup = document.querySelector('.mapboxgl-popup-anchor-top');
  //   // if ( popup != null ) {
  //     // console.log("Hello!");
  //   // }
  //   // var addrs = document.querySelectorAll('.card-address');
  //   // console.log(addrs);
  // });

function waitForCanvas() {
  var listener = setInterval(function () {
    canvas = document.querySelector('.mapboxgl-canvas-container');
    if (canvas) {
      console.log("Found canvas");
      clearInterval(listener);
    } else {
      console.log("Waiting for canvas");
    }
  }, 500);
}

function initAddressLink() {
  var listener = setInterval(function () {
    canvas = document.querySelector('.mapboxgl-popup-anchor-top');
    if (canvas) {
      console.log("Found popup");
      var card_id = document.querySelector('.mapboxgl-popup-anchor-top .card-article');
      var id = card_id.attributes["data-lid"].value;
      var new_link = "https://www.coloproperty.com/listing/details/" + id;
      console.log(new_link);

      var address_container = document.querySelector('.mapboxgl-popup-anchor-top .card-address');
      var address = address_container.innerHTML;
      var line_container = document.querySelector('.mapboxgl-popup-anchor-top .line');

      line_container.removeChild(address_container);

      var aTag = document.createElement('a');
      aTag.setAttribute('href', new_link);
      aTag.innerHTML = address;
      line_container.appendChild(aTag);

      clearInterval(listener);
    }
  }, 500);
}

function initCanvas() {
  waitForCanvas();

  // var markers = document.querySelectorAll("[class*=marker]")
  // markers.forEach((marker) => {
  //   console.log("adding event listener for marker");
  //   marker.addEventListener('click', function() {
  //     console.log("click on marker");
  //   });
  // });

  // canvas = document.querySelector('.mapboxgl-map');
  // console.log(window);
  // document.addEventListener('click', function(event) {
  //   console.log(event.target.nodeName);
  //   console.log(event.target.id)
  // });

  const targetNode = document.querySelector('.mapboxgl-canvas-container');

  // Options for the observer (which mutations to observe)
  const config = {childList: true,  subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for(const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            console.log(mutation.target)
            mutation.addedNodes[0].addEventListener('click', function() {
              initAddressLink();
            });
          }
      }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  // observer.disconnect();

}

initCanvas()
