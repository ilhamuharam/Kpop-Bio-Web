// Fungsionalitas sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("artistSidebar");
  sidebar.classList.toggle("show");
}

function closeSidebar() {
  const sidebar = document.getElementById("artistSidebar");
  sidebar.classList.remove("show");
}

// Tutup sidebar saat mengklik di luar
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("artistSidebar");
  const dropdownBtn = document.querySelector(".dropdown-btn");
  if (!sidebar.contains(e.target) && e.target !== dropdownBtn) {
    sidebar.classList.remove("show");
  }
});

// Fungsi dropdown
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", () => {
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!e.target.matches(".dropdown-btn")) {
    dropdownContent.style.display = "none";
  }
});

// Fungsi slider dots dan fitur geser
document
  .querySelectorAll(".slider-container")
  .forEach((container, sliderIndex) => {
    const sliderEl = container.querySelector(".slider");
    const slides = container.querySelectorAll(".slide");
    const dotsContainer = container.querySelector(".slider-dots");
    let current = 0;
    let startX = 0;
    let isMoving = false;

    // buat dots untuk setiap slide
    slides.forEach((s, i) => {
      const btn = document.createElement("button");
      if (i === 0) btn.classList.add("active");
      btn.addEventListener("click", () => {
        current = i;
        update();
      });
      dotsContainer.appendChild(btn);
    });

    function update() {
      sliderEl.style.transform = `translateX(-${current * 100}%)`;
      Array.from(dotsContainer.children).forEach((b, idx) =>
        b.classList.toggle("active", idx === current)
      );
    }

    // fitur sentuh/geser
    sliderEl.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isMoving = true;
      },
      { passive: true }
    );

    sliderEl.addEventListener(
      "touchmove",
      (e) => {
        if (!isMoving) return;
        const diff = e.touches[0].clientX - startX;
        // efek drag visual
      },
      { passive: true }
    );

    sliderEl.addEventListener("touchend", (e) => {
      if (!isMoving) return;
      const endX =
        e.changedTouches && e.changedTouches[0]
          ? e.changedTouches[0].clientX
          : startX;
      const diff = endX - startX;
      if (diff > 50) {
        current = (current - 1 + slides.length) % slides.length;
        update();
      } else if (diff < -50) {
        current = (current + 1) % slides.length;
        update();
      }
      isMoving = false;
    });
  });

// Fitur hero carousel otomatis
const heroCarousel = document.querySelector(".hero-carousel");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsContainer = document.querySelector(".hero-dots");
let currentHeroSlide = 0;
let heroInterval;

// Slider dots hero
heroSlides.forEach((s, i) => {
  const btn = document.createElement("button");
  if (i === 0) btn.classList.add("active");
  btn.addEventListener("click", () => {
    currentHeroSlide = i;
    updateHero();
    resetHeroInterval();
  });
  heroDotsContainer.appendChild(btn);
});

function updateHero() {
  heroCarousel.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
  Array.from(heroDotsContainer.children).forEach((b, idx) =>
    b.classList.toggle("active", idx === currentHeroSlide)
  );
}

function moveHeroCarousel() {
  currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
  updateHero();
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(moveHeroCarousel, 5000);
}

// jeda hero saat hover (desktop)
const heroSection = document.querySelector(".hero-section");
heroSection.addEventListener("mouseenter", () => clearInterval(heroInterval));
heroSection.addEventListener("mouseleave", () => resetHeroInterval());

heroInterval = setInterval(moveHeroCarousel, 5000); // Ganti slide setiap 5 detik

// Fitur search di aside
const searchInput = document.querySelector(".search-input");
const artistCards = document.querySelectorAll(".artist-card");

// Tampilkan card member pertama secara default di aside
artistCards[0].classList.add("active");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  artistCards.forEach((card) => {
    const artistName = card.dataset.name;
    const groupName = card.dataset.group;
    const searchString = `${artistName} ${groupName}`.toLowerCase();

    if (searchTerm === "") {
      card.classList.remove("active");
      artistCards[0].classList.add("active");
    } else if (searchString.includes(searchTerm)) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
});

// Fungsi tombol more
const moreButtons = document.querySelectorAll(".more-btn");
moreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
      button.textContent = "Less...";
    } else {
      content.style.display = "none";
      button.textContent = "More...";
    }
  });
});

// Info konten dinamis
const artists = [
  { name: "BLACKPINK", members: ["Jisoo", "Jennie", "Rosé", "Lisa"] },
  {
    name: "BTS",
    members: ["RM", "Jin", "Suga", "J-Hope", "Jimin", "V", "Jungkook"],
  },
  {
    name: "TWICE",
    members: [
      "Nayeon",
      "Jeongyeon",
      "Momo",
      "Sana",
      "Jihyo",
      "Mina",
      "Dahyun",
      "Chaeyoung",
      "Tzuyu",
    ],
  },
];

// Render card girl/boy grup dan card member di konten More
artists.forEach((artist) => {
  const article = document.getElementById(artist.name.toLowerCase());
  if (article) {
    // judul artikel (menampilkan nama grup + jumlah member)
    const groupCard = document.createElement("div");
    groupCard.className = "artist-group-card";
    groupCard.innerHTML = `<h2>${artist.name}</h2><p>${artist.members.length} members</p>`;
    const headerEl = article.querySelector("header");
    if (headerEl && headerEl.parentNode) {
      headerEl.parentNode.insertBefore(groupCard, headerEl.nextSibling);
    } else {
      article.insertBefore(groupCard, article.firstChild);
    }

    // memastikan ada .more-content container untuk menambahkan info girl/boy grup
    let moreContent = article.querySelector(".more-content");
    if (!moreContent) {
      moreContent = document.createElement("div");
      moreContent.className = "more-content";
      moreContent.style.display = "none";
      article.appendChild(moreContent);
    }

    // Menambahkan info girl/boy grup ke moreContent
    const memberCard = document.createElement("div");
    memberCard.className = "member-card";
    const title = document.createElement("h4");
    title.textContent = "Members";
    memberCard.appendChild(title);
    const ul = document.createElement("ul");
    artist.members.forEach((m) => {
      const li = document.createElement("li");
      li.textContent = m;
      ul.appendChild(li);
    });
    memberCard.appendChild(ul);
    // menambahkan info girl/boy grup diatas more-content section
    moreContent.insertAdjacentElement("afterbegin", memberCard);
  }
});
