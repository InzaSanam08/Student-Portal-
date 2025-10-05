const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});


// loader


// $('button').on('click', function(){
// 	var number = getRandomInt(1, 40);
// 	if (number < 10) {number = '0'+ number;}
// 	$(this).html('<div class="loader-' + number + '"></div> Loading...');
// 	console.log('Resize window to change size and color of the button');
// });

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// $(window).resize(function() {
// 	$('button').css('color', 'hsl(' + Math.floor((window.innerWidth / 360)*100)  + ', 70%, 70%)');
// });