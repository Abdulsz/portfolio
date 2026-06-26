(function () {
	const navLinks = document.querySelectorAll(".site-nav a");
	const revealItems = document.querySelectorAll(".reveal");
	const sections = [
		{ id: "home", element: document.querySelector("main") },
		{ id: "about", element: document.querySelector("#about") },
		{ id: "contact", element: document.querySelector("#contact") },
	].filter((section) => section.element);

	const setActiveNav = () => {
		const offset = window.scrollY + window.innerHeight * 0.28;
		let current = "home";

		for (const section of sections) {
			if (section.element.offsetTop <= offset) {
				current = section.id;
			}
		}

		navLinks.forEach((link) => {
			link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
		});
	};

	window.addEventListener("scroll", setActiveNav, { passive: true });
	setActiveNav();

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
		);

		revealItems.forEach((item) => observer.observe(item));
	} else {
		revealItems.forEach((item) => item.classList.add("is-visible"));
	}

	document.querySelectorAll(".project-row .mini-button").forEach((button) => {
		if (button.tagName !== "BUTTON") return;

		button.addEventListener("click", () => {
			const row = button.closest(".project-row");
			const isOpen = row.classList.contains("is-open");

			document.querySelectorAll(".project-row.is-open").forEach((openRow) => {
				if (openRow !== row) {
					openRow.classList.remove("is-open");
					openRow.querySelector("button").setAttribute("aria-expanded", "false");
				}
			});

			row.classList.toggle("is-open", !isOpen);
			button.setAttribute("aria-expanded", String(!isOpen));
		});
	});
})();
