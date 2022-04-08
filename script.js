
// <!--     --!>


function sendEmail(){
  // e.preventDefault()
  Email.send({
    // secureToken: "2bb100ef-43c7-43bf-974d-f96f345bb162",
    // 2bb100ef-43c7-43bf-974d-f96f345bb162
    Host : "smtp.gmail.com",
    Username : "emailstevenrodriguez0818@gmail.com",
    Password : "bhuewtdnlhemwapf",

    To : 'emailstevenrodriguez0818@gmail.com',
    From : document.getElementById("email").value,
    Subject : "New Contact Form Enquiry",
    Body : "Name:" + document.getElementById("name").value
      + "<br> Email: " + document.getElementById("email").value
      + "<br> Phone: " + document.getElementById("phone").value
      + "<br> Message: " + document.getElementById("message").value

  }).then(
    message => alert("message sent")
  );

}

// <----- Main Navigation ------>
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//       Main NAV
// /* function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "nav ul") {
//     x.className += " responsive";
//   } else {
//     x.className = "nav ul";
//   }
// } */






$(document).ready(function(){
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
    
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
  
        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
      });
    });
  })


console.log("hello");