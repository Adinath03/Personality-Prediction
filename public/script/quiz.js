document.getElementById("submitBtn").addEventListener("click", function(event) {
    // event.preventDefault();
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    setTimeout(function() {
      loader.style.display = "none";
    }, 10000);
    // Perform form submission
  });
  