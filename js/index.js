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

selectLienActive = (event) => {
	let moi = event.target.parentNode;
	if (!moi.classList.contains("active")) {
		let parent = moi.parentNode;
		parent.querySelector("li.active").classList.remove("active");
		moi.classList.add("active");
	}
};

clickImage = (event) => {
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

clickListeAbout = (Event) => {
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
