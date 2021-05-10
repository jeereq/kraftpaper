const createElements = (ListClass, parent) => {
	let div = document.createElement("div");
	ListClass.forEach((element) => {
		div.classList.add(element);
	});
	parent.appendChild(div);
	return div;
};

window.onload = function () {
	let allLiens = document.querySelectorAll("header ul li a");
	let allPortfolioImage = document.querySelectorAll(".container .image");
	let allListeAbout = document.querySelectorAll("#about .container ul li");
	let Cards = document.querySelectorAll(".card");
	let arrowCard = document.querySelectorAll(".cards .arrow");
	let bottom = document.querySelector(".bottom");
	let init = 1;

	PrevElement(Cards[init], 1);
	NextElement(Cards[init], 1);

	Cards.forEach((item, index) => {
		bottom.append(createCard("div"));
	});

	let blocks = document.querySelectorAll(".bottom .block");
	blocks[init].classList.add("active");

	arrowCard.forEach((element) => {
		element.addEventListener("click", (event) => {
			let self = event.currentTarget;
			const STEP = 92.5;
			const SCALE = 1.3;

			if (self.classList.contains("left")) {
				if (init === 0) {
					init = 1;
				}
				if (init > 0) {
					init--;
					Cards.forEach((item, index) => {
						if (item.classList.contains("active"))
							item.classList.remove("active");
						if (init != index)
							item.style.transform = `translatex(-${STEP * init}%)`;
						Cards[init].classList.add("active");
						Cards[init].style.transform = `translatex(-${
							STEP * init
						}%) scale(${SCALE})`;
					});
				}
			}
			if (self.classList.contains("right")) {
				if (init < Cards.length) {
					init++;
					Cards.forEach((item, index) => {
						if (item.classList.contains("active"))
							item.classList.remove("active");
						if (init != index)
							item.style.transform = `translatex(-${STEP * init}%)`;
						if (init < Cards.length) {
							Cards[init].classList.add("active");
							Cards[init].style.transform = `translatex(-${
								STEP * init
							}%) scale(${SCALE})`;
						}
					});
				}
			}

			let parentBlock = blocks[init].parentElement;
			parentBlock.querySelector(".active").classList.remove("active");
			blocks[init].classList.add("active");

			PrevElement(Cards[init], 1);
			NextElement(Cards[init], 1);

			if (init === Cards.length - 1) {
				init = 0;
			}
			if (init === 0) {
				Cards[init].classList.add("active");
			}
		});
	});
	Cards.forEach((element) => {
		element.addEventListener("click", (event) => {
			let parent = event.currentTarget.parentNode;
			let self = event.currentTarget;

			parent.querySelector(".active").classList.remove("active");
			self.classList.add("active");
		});
	});
	allPortfolioImage.forEach((element) => {
		element.addEventListener("click", clickImage);
	});

	allLiens.forEach((lien) => {
		lien.addEventListener("click", selectLienActive);
	});
	allListeAbout.forEach((element) => {
		element.addEventListener("click", clickListeAbout);
	});
	window.addEventListener("scroll", function (event) {
		console.log(event);
	});
};

let selectLienActive = (event) => {
	let moi = event.target.parentNode;
	if (!moi.classList.contains("active")) {
		let parent = moi.parentNode;
		parent.querySelector("li.active").classList.remove("active");
		moi.classList.add("active");
	}
};

let clickImage = (event) => {
	let original = event.target.parentNode;
	let clone = event.target.parentNode.cloneNode(true);
	let bigBoss = createElements(["big-boss"], document.body);
	let croix = createElements(["croix"], bigBoss);
	let arrowLeft = createElements(["arrow", "left"], bigBoss);

	clone.classList.add("transform");
	bigBoss.append(clone);
	let arrowRight = createElements(["arrow", "right"], bigBoss);

	croix.addEventListener("click", (e) => {
		e.target.parentNode.remove();
	});

	arrowLeft.addEventListener("click", () => {
		let previous = original.previousElementSibling;
		if (previous != undefined) {
			let img = previous.firstElementChild;
			let cloned = img.cloneNode(true);
			let current = bigBoss.querySelector(".image");

			current.querySelector("img").remove();
			current.append(cloned);
			original = previous;
		}
	});

	arrowRight.addEventListener("click", () => {
		let next = original.nextElementSibling;
		if (next != undefined) {
			let img = next.firstElementChild;
			let cloned = img.cloneNode(true);
			let current = bigBoss.querySelector(".image");

			current.querySelector("img").remove();
			current.append(cloned);
			original = next;
		}
	});
};

let clickListeAbout = (Event) => {
	let self = Event.currentTarget;
	let attribut = self.id;
	let directParent = Event.currentTarget.parentNode;
	let active = directParent.querySelector(".active");
	let bigParent = directParent.parentNode.parentNode;
	let blockActive = bigParent.querySelector(".active");
	let newSelf = bigParent.querySelector(`.${attribut}`);

	blockActive.classList.add("non-active");
	blockActive.classList.remove("active");

	newSelf.classList.add("active");
	newSelf.classList.remove("non-active");

	active.classList.remove("active");
	self.classList.add("active");
};

const PrevElement = (element, value) => {
	let trueValue = 10 - value;
	trueValue = trueValue / 10;
	let prev = element.previousElementSibling;
	if (prev) {
		prev.style.transform += `scale(${trueValue})`;
		return PrevElement(prev, value + 2);
	}
	return false;
};

const NextElement = (element, value) => {
	let trueValue = 10 - value;
	trueValue = trueValue / 10;
	let prev = element.nextElementSibling;
	if (prev) {
		prev.style.transform += `scale(${trueValue})`;
		return NextElement(prev, value + 2);
	}
	return false;
};

const createCard = (element) => {
	let yes = document.createElement(element);
	yes.classList.add("block");
	return yes;
};
