const teamMembers = [
	{ name: "Você faz meu coração bater mais forte ❤️", role: "Para você, Carlos ❤️" },
	{ name: "Com você, tudo é mais bonito ✨", role: "Com todo meu carinho e amor!" },
	{ name: "Seu sorriso ilumina meu mundo 🌟", role: "Sempre pensando em você 💖" },
	{ name: "Cada momento contigo é especial 💫", role: "Você é minha inspiração diária!" },
	{ name: "Você é meu lugar favorito no mundo 🌍❤️", role: "Com amor que só cresce a cada dia!" },
	{ name: "Meu coração é todo seu 💕", role: "Para sempre seu, com todo carinho!" }
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = teamMembers[currentIndex].name;
		memberRole.textContent = teamMembers[currentIndex].role;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);

// Add falling hearts effect
function createHeart() {
	const heart = document.createElement('div');
	heart.classList.add('falling-heart');
	heart.textContent = '❤️'; // Use emoji for heart
	heart.style.left = `${Math.random() * 100}vw`;
	heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration between 3-5 seconds
	heart.style.fontSize = '30px'; // Increase emoji size

	document.body.appendChild(heart);

	setTimeout(() => {
		heart.remove();
	}, 5000);
}

setInterval(createHeart, 300); // Create a new heart every 300ms

function updateRelationshipCounter() {
	const startDate = new Date('2024-06-28T00:00:00'); // Ajuste aqui a data inicial

	const now = new Date();

	let years = now.getFullYear() - startDate.getFullYear();
	let months = now.getMonth() - startDate.getMonth();
	let days = now.getDate() - startDate.getDate();
	let hours = now.getHours() - startDate.getHours();
	let minutes = now.getMinutes() - startDate.getMinutes();
	let seconds = now.getSeconds() - startDate.getSeconds();
	let milliseconds = now.getMilliseconds() - startDate.getMilliseconds();

	if (milliseconds < 0) {
		milliseconds += 1000;
		seconds--;
	}
	if (seconds < 0) {
		seconds += 60;
		minutes--;
	}
	if (minutes < 0) {
		minutes += 60;
		hours--;
	}
	if (hours < 0) {
		hours += 24;
		days--;
	}
	if (days < 0) {
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
		months--;
	}
	if (months < 0) {
		months += 12;
		years--;
	}

	document.getElementById('years').textContent = years;
	document.getElementById('months').textContent = months;
	document.getElementById('days').textContent = days;
	document.getElementById('hours').textContent = hours;
	document.getElementById('minutes').textContent = minutes;
	document.getElementById('seconds').textContent = seconds;
	document.getElementById('milliseconds').textContent = milliseconds;
}

setInterval(updateRelationshipCounter, 50); // atualiza a cada 50ms para suavidade
updateRelationshipCounter();