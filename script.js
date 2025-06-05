const animalFadeImages = {
    lion: "images/lion_fade.jpg",
    elephant: "images/elephant_fade.jpg",
    monkey: "images/monkey_fade.jpg",
    parrot: "images/parrot_fade.jpg",
    tiger: "images/tiger_fade.jpg",
    frog: "images/frog_fade.jpg",
    snake: "images/snake_fade.jpg"
};

// Animal sound map
const animalSounds = {
    lion: "sounds/lion.mp3",
    elephant: "sounds/elephant.mp3",
    monkey: "sounds/monkey.mp3",
    parrot: "sounds/parrot.mp3",
    tiger: "sounds/tiger.mp3",
    frog: "sounds/frog.mp3",
    snake: "sounds/snake.mp3"
};

// Animal keys map
const animalKeys = {
    l: "lion",
    e: "elephant",
    m: "monkey",
    p: "parrot",
    t: "tiger",
    f: "frog",
    s: "snake"
};

// Play animal sound
function playAnimalSound(animal) {
    const soundSrc = animalSounds[animal];
    if (soundSrc) {
        const audio = new Audio(soundSrc);
        audio.play();
    }
}

// On click event
document.querySelectorAll('.animal').forEach(item => {
    item.addEventListener('click', () => {
        const animal = item.getAttribute('data-animal');
        playAnimalSound(animal);
        showAnimalFade(animal);
    });
    // Allow keyboard navigation
    item.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.key === " ") {
            const animal = item.getAttribute('data-animal');
            playAnimalSound(animal);
            showAnimalFade(animal);
        }
    });
});

// Play sound and fade by keyboard shortcut (l/e/m/p/t/f/s)
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (animalKeys[key]) {
        const animal = animalKeys[key];
        playAnimalSound(animal);
        showAnimalFade(animal);
    }
});

// Play background music on page load
window.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('background-music');
    // Try to autoplay music (some browsers may block, show prompt if needed)
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
        // If blocked, show play button
        const btn = document.createElement("button");
        btn.textContent = "Click to Play Background Music";
        btn.style = "position:fixed;top:10px;right:10px;padding:10px;";
        btn.onclick = () => { bgMusic.play(); btn.remove(); };
        document.body.appendChild(btn);
    });
});
function showAnimalFade(animal) {
    const fadeDiv = document.getElementById('animal-fade-bg');
    const img = animalFadeImages[animal];
    if (img) {
        fadeDiv.style.backgroundImage = `url('${img}')`;
        fadeDiv.classList.add('active');
        // Remove fade after 1 seconds automatically
        setTimeout(() => { fadeDiv.classList.remove('active'); }, 1000);
    }
}

