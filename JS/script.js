// Wrap every letter in a span
var textWrapper = document.querySelector('.title .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


anime.timeline({ loop: true })
    .add({
        targets: '.title .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
    })

    .add({
        targets: '.title',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });



