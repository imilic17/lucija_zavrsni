let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

if (toggleBtn) {
    toggleBtn.onclick = (e) => {
        darkMode = localStorage.getItem('dark-mode');
        if (darkMode === 'disabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    };
}

let profile = document.querySelector('.header .flex .profile');

let userBtn = document.querySelector('#user-btn');
if (userBtn) {
    userBtn.onclick = () => {
        profile.classList.toggle('active');
        search.classList.remove('active');
    };
}

let search = document.querySelector('.header .flex .search-form');

let searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
    searchBtn.onclick = () => {
        search.classList.toggle('active');
        profile.classList.remove('active');
    };
}

let sideBar = document.querySelector('.side-bar');

let menuBtn = document.querySelector('#menu-btn');
if (menuBtn) {
    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    };
}

let closeBtn = document.querySelector('#close-btn');
if (closeBtn) {
    closeBtn.onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    };
}

window.onscroll = () =>{
   // Provjera postojanja elemenata prije manipulacije
   if (profile) {
       profile.classList.remove('active');
   }
   if (search) {
       search.classList.remove('active');
   }

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

// Dodavanje funkcionalnosti za dohvaćanje i prikaz podataka
async function fetchData() {
    try {
        const response = await fetch('/lucija_zavrsni/data.json');
        const data = await response.json();

        // Prikaz tečajeva
        const coursesContainer = document.getElementById('courses-container');
        // Provjera postojanja elemenata prije manipulacije
        if (coursesContainer) {
            data.courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.classList.add('course');
                courseElement.innerHTML = `
                    <a href="detalji_tecaja.html?id=${course.id}">
                        <img src="${course.thumbnail}" alt="${course.title}">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                    </a>
                `;
                coursesContainer.appendChild(courseElement);
            });
        } else {
            console.error('Element courses-container nije pronađen.');
        }

        // Prikaz profesora
        const professorsContainer = document.getElementById('professors-container');
        // Provjera postojanja elemenata prije manipulacije
        if (professorsContainer) {
            data.professors.forEach(professor => {
                const professorElement = document.createElement('div');
                professorElement.classList.add('professor');
                professorElement.innerHTML = `
                    <img src="${professor.profilePicture}" alt="${professor.name}">
                    <h3>${professor.name}</h3>
                    <p>${professor.bio}</p>
                `;
                professorsContainer.appendChild(professorElement);
            });
        } else {
            console.error('Element professors-container nije pronađen.');
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka:', error);
    }
}

if (window.location.pathname.includes('profesori.html')) {
    async function fetchProfessors() {
        try {
            const response = await fetch('/lucija_zavrsni/data.json');
            const data = await response.json();

            const professorsContainer = document.getElementById('professors-container');
            if (professorsContainer) {
                data.professors.forEach(professor => {
                    const professorElement = document.createElement('div');
                    professorElement.classList.add('professor');
                    professorElement.innerHTML = `
                        <img src="${professor.profilePicture}" alt="${professor.name}">
                        <h3>${professor.name}</h3>
                        <p>${professor.bio}</p>
                    `;
                    professorsContainer.appendChild(professorElement);
                });
            } else {
                console.error('Element professors-container nije pronađen.');
            }
        } catch (error) {
            console.error('Greška prilikom dohvaćanja podataka o profesorima:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchProfessors();
    });
}

if (window.location.pathname.includes('tečajevi.html')) {
    async function fetchCourses() {
        try {
            const response = await fetch('/lucija_zavrsni/data.json');
            const data = await response.json();

            // Prikaz tečajeva
            const coursesContainer = document.getElementById('courses-container');
            // Provjera postojanja elemenata prije manipulacije
            if (coursesContainer) {
                data.courses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.classList.add('course');
                    courseElement.innerHTML = `
                        <a href="detalji_tecaja.html?id=${course.id}">
                            <img src="${course.thumbnail}" alt="${course.title}">
                            <h3>${course.title}</h3>
                            <p>${course.description}</p>
                        </a>
                    `;
                    coursesContainer.appendChild(courseElement);
                });
            } else {
                console.error('Element courses-container nije pronađen.');
            }
        } catch (error) {
            console.error('Greška prilikom dohvaćanja podataka o tečajevima:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchCourses();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});