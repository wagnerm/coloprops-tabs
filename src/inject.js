function replaceAddressLinksOnMap() {
  var listener = setInterval(function () {
    canvas = document.querySelector('.mapboxgl-popup-anchor-top');
    if (canvas) {
      var card_id = document.querySelector('.mapboxgl-popup-anchor-top .card-article');
      var id = card_id.attributes["data-lid"].value;
      var new_link = "https://www.coloproperty.com/listing/details/" + id;

      var address_container = document.querySelector('.mapboxgl-popup-anchor-top .card-address');
      var address = address_container.innerHTML;
      var line_container = document.querySelector('.mapboxgl-popup-anchor-top .line');

      line_container.removeChild(address_container);

      var new_a = document.createElement('a');
      new_a.setAttribute('href', new_link);
      new_a.innerHTML = address;
      new_a.target = "_blank";
      line_container.appendChild(new_a);

      clearInterval(listener);
    }
  }, 500);
}

function replaceAddressLinksOnCardView() {
  var listener = setInterval(function () {
    card_list = document.querySelector('.CardList--listingResults');
    if (card_list) {

      var card_summaries = document.querySelectorAll('.CardList--listingResults .card-article').forEach(function(card) {
        var id = card.attributes["data-lid"].value;
        var new_link = "https://www.coloproperty.com/listing/details/" + id;

        var address_container = card.querySelector('.card-address');
        var address = address_container.innerHTML;
        var line_container = card.querySelector('.line');
        line_container.removeChild(address_container);

        var new_a = document.createElement('a');
        new_a.setAttribute('href', new_link);
        new_a.innerHTML = address;
        new_a.target = "_blank";
        line_container.appendChild(new_a);

        clearInterval(listener);
      });
    }
  }, 500);
}

function waitForCanvas() {
  var listener = setInterval(function () {
    canvas = document.querySelector('.mapboxgl-canvas-container');
    if (canvas) {
      clearInterval(listener);
    }
  }, 500);
}

function initCanvasWatcher() {
  waitForCanvas();
  const targetNode = document.querySelector('.mapboxgl-canvas-container');
  const config = {childList: true,  subtree: true };
  const callback = function(mutationsList, observer) {
      for(const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            for(var i = 0; i < mutation.addedNodes.length; i++) {
              mutation.addedNodes[i].addEventListener('click', function() {
                replaceAddressLinksOnMap();
                replaceAddressLinksOnCardView();
              });
            }
          }
      }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

initCanvasWatcher()
