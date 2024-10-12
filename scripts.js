// Data
const skills = [
    { name: 'Advanced Excel', level: 'Advanced' },
    { name: 'Google BigQuery', level: 'Intermediate' },
    { name: 'Power BI', level: 'Advanced' },
    { name: 'Tableau', level: 'Advanced' },
    { name: 'MicroStrategy', level: 'Intermediate' },
    { name: 'SQL', level: 'Basic' },
];

const experiences = [
    {
        title: 'Deputy Manager - E-Commerce Operations and Analytics',
        company: 'Metro Cash & Carry India Private Limited',
        period: 'Jan 2022 - Current',
        achievements: [
            'Improved service level performance of delivery from 68% to 90%+',
            'Increased availability of articles from 88% to 94%',
            'Increased sales by 40% YoY through effective promotion execution',
            'Improved YoY buying customers by 45% and basket value by 15%',
            'Increased income percentage from 9% to 14%',
        ],
    },
    {
        title: 'Assistant Manager - FMCG Data Analytics and Automations',
        company: 'Metro Cash & Carry India Private Limited',
        period: 'Apr 2018 - Jan 2022',
        achievements: [
            'Increased overall FMCG sales by 18% YoY',
            'Increased customer visits by 23% YoY',
            'Improved stock in hand percentage from 88% to 92%',
            'Reduced overall shrinkage from 8% to 5.8%',
        ],
    },
    {
        title: 'Operations Lead - Program Management',
        company: 'Amazon Seller Services India Pvt. Ltd',
        period: 'Aug 2014 - Mar 2018',
        achievements: [
            'Increased YoY earnings by 24% for Easy Ship Orders',
            'Saved 40 hours of work/week for the team through automation',
            'Conducted training sessions on data extraction, cleaning, and automation',
        ],
    },
];

const accomplishments = [
    "MD's Excellence award for consecutive 2 years",
    "JEDI's award at Amazon for consecutive 2 years",
    'Star Performer award 3 times in a row at Infosys Ltd.',
];

// DOM Elements
const skillsSection = document.getElementById('skills');
const experienceSection = document.getElementById('experience');
const accomplishmentsSection = document.getElementById('accomplishments');
const navButtons = document.querySelectorAll('.nav-button');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
    updateWelcomeTextColor();
}

themeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '☀️';
}

// Populate sections
function populateSkills() {
    const skillsGrid = skillsSection.querySelector('.grid');
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'card';
        skillCard.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.level}</p>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

function populateExperience() {
    const experienceGrid = experienceSection.querySelector('.grid');
    experiences.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.className = 'card';
        expCard.innerHTML = `
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p>${exp.period}</p>
            <ul>
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        experienceGrid.appendChild(expCard);
    });
}

function populateAccomplishments() {
    const accomplishmentsList = accomplishmentsSection.querySelector('.accomplishments-list');
    accomplishments.forEach(accomplishment => {
        const li = document.createElement('li');
        li.textContent = accomplishment;
        accomplishmentsList.appendChild(li);
    });
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.section === sectionId) {
            button.classList.add('active');
        }
    });
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        showSection(button.dataset.section);
    });
});

// 3D Background
let welcomeTextMesh;

function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-background').appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x007bff, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add "WELCOME" text
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        const textGeometry = new THREE.TextGeometry('WELCOME', {
            font: font,
            size: 3,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: false,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        welcomeTextMesh = new THREE.Mesh(textGeometry, textMaterial);
        welcomeTextMesh.position.set(-7, 0, 0);
        scene.add(welcomeTextMesh);

        updateWelcomeTextColor();
    });

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        if (welcomeTextMesh) {
            const time = Date.now() * 0.001;
            welcomeTextMesh.position.y = Math.sin(time) * 2;
            welcomeTextMesh.rotation.x = Math.sin(time * 0.5) * 
            0.2;
            welcomeTextMesh.rotation.y = Math.sin(time * 0.3) * 0.1;
        }
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function updateWelcomeTextColor() {
    if (welcomeTextMesh) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        welcomeTextMesh.material.color.setHex(isDarkMode ? 0xffffff : 0x000000);
    }
}

// Initialize
populateSkills();
populateExperience();
populateAccomplishments();
init3DBackground();
showSection('skills');