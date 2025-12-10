const rotatingContainer = document.getElementById('rotatingContainer');
const galaxy = document.getElementById('galaxy');

const moonUrl = 'https://res.cloudinary.com/dint85klf/image/upload/v1759652375/id5477337-moon-shutterstock2-870x522.jpg.webp-removebg-preview_n70bp1.png';
const sunUrl = 'https://res.cloudinary.com/dint85klf/image/upload/v1759652925/photo1616752083426-1616752083558340068950-removebg-preview_x2tp7s.png';
const messages = [
    "Vậy là m chấp nhận ròi nha.",
"I miss u",
"I ♥️ u", 
"Nhớ chú ý giữ sức khoẻ nha",
'Một ngày tốt lành'];
const imageURLs = [
    "https://miro.medium.com/v2/resize:fit:2000/1*PjD3CtH90bHKo9nt2hP0BQ.jpeg",
    "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/fall_in_love_la_gi_70f544d56e.png",
    "https://img.freepik.com/free-vector/charity-logo-hands-supporting-heart-icon-flat-design-vector-illustration_53876-136266.jpg?semt=ais_hybrid&w=740&q=80"
];
const icons = ["❤️", "💖", "💘", "💝", "💕", "💗", "💓", "💞"];
const maxParticles = 60;
const activeParticles = new Set();

function createParticle(type = 'text') {
    if (activeParticles.size >= maxParticles) return;

    const el = type === 'text' ? document.createElement('div') : document.createElement('img');
    if (type === 'text') {
        const isIcon = Math.random() < 0.3;
        el.className = 'text-particle';
        el.textContent = isIcon ? icons[Math.floor(Math.random() * icons.length)] : messages[Math.floor(Math.random() * messages.length)];
        el.style.fontSize = (isIcon ? 20 : 18) + Math.random() * 10 + 'px';
    } else {
        el.className = 'image-particle';
        el.src = imageURLs[Math.floor(Math.random() * imageURLs.length)];
    }
    el.style.opacity = 0;
    rotatingContainer.appendChild(el);

    const w = el.offsetWidth || 40;
    el.style.left = Math.random() * (window.innerWidth - w) + 'px';

    const z = -Math.random() * 300;
    const startY = -50;
    const endY = window.innerHeight + 50;
    const duration = 7000 + Math.random() * 4000;
    const t0 = performance.now();

    function animate(t) {
        const p = (t - t0) / duration;
        if (p >= 1) {
            el.remove();
            activeParticles.delete(el);
        } else {
            const y = startY + p * (endY - startY);
            const op = p < 0.1 ? p * 10 : (p > 0.9 ? (1 - p) * 10 : 1);
            el.style.opacity = op;
            el.style.transform = `translate3d(0, ${y}px, ${z}px)`;
            requestAnimationFrame(animate);
        }
    }

    activeParticles.add(el);
    requestAnimationFrame(animate);
}

function loopParticles() {
    let last = 0;
    function tick(t) {
        if (t - last > 500) {
            createParticle('text');
            if (Math.random() < 0.3) createParticle('image');
            last = t;
        }
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function startStars() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    galaxy.appendChild(renderer.domElement);

    // const moonGeometry = new THREE.PlaneGeometry(70, 50);
    // const moonTexture = new THREE.TextureLoader().load(moonUrl);
    // const moonMaterial = new THREE.MeshBasicMaterial({
    //     map: moonTexture,
    //     transparent: true,
    //     side: THREE.DoubleSide,
    //     opacity: 0.9
    // });
    // const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // moon.position.set(0, 0, -100);
    // scene.add(moon);

    // const sunGeometry = new THREE.PlaneGeometry(80, 60);
    // const sunTexture = new THREE.TextureLoader().load(sunUrl);
    // const sunMaterial = new THREE.MeshBasicMaterial({
    //     map: sunTexture,
    //     transparent: true,
    //     side: THREE.DoubleSide,
    //     opacity: 0.9
    // });
    // const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    // sun.position.set(0, 0, 100);
    // scene.add(sun);

    const starsCount = 500;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        map: starTexture,
        transparent: true,
        alphaTest: 0.2,
        depthWrite: false
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // let currentRotX = 0;
    // let currentRotY = 0;

    function animate() {
        // const radius = 100;
        // const angleX = -currentRotX * Math.PI / 180;
        // const angleY = -currentRotY * Math.PI / 180;

        // moon.position.x = Math.sin(angleY) * radius;
        // moon.position.y = Math.sin(angleX) * radius;
        // moon.position.z = -Math.cos(angleX) * Math.cos(angleY) * radius;

        // sun.position.x = -Math.sin(angleY) * radius;
        // sun.position.y = -Math.sin(angleX) * radius;
        // sun.position.z = Math.cos(angleX) * Math.cos(angleY) * radius;

        // moon.lookAt(camera.position);
        // sun.lookAt(camera.position);

        // const moonAngle = Math.cos(angleX) * Math.cos(angleY);
        // const sunAngle = -Math.cos(angleX) * Math.cos(angleY);

        // moon.material.opacity = moonAngle > 0 ? 0.9 : 0;
        // sun.material.opacity = sunAngle > 0 ? 0.9 : 0;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // window.updateMoonRotation = function (rotX, rotY) {
    //     currentRotX = rotX;
    //     currentRotY = rotY;
    // };

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initRotation() {
    let rotX = 0;
    let rotY = 0;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    function updateRotation(deltaX, deltaY) {
        rotY += deltaX * 0.2;
        rotX += deltaY * 0.2;
        rotatingContainer.style.transform = `translate(-50%, -50%) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        if (window.updateMoonRotation) {
            window.updateMoonRotation(rotX, rotY);
        }
    }

    document.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        updateRotation(deltaX, deltaY);
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            isMouseDown = true;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isMouseDown = false;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isMouseDown || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - lastMouseX;
        const deltaY = e.touches[0].clientY - lastMouseY;
        updateRotation(deltaX, deltaY);
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
    }, { passive: true });
}

function setupMusic() {
    let started = false;
    const notification = document.getElementById('notification');

    document.body.addEventListener('dblclick', () => {
        if (started) return;
        const audio = new Audio('https://res.cloudinary.com/dint85klf/video/upload/v1765342463/music_bp4ao6.mp3');
        audio.loop = true;
        audio.play().catch(() => console.log("Không thể phát nhạc tự động."));
        started = true;
        notification.style.display = 'none';
    });
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, { passive: false });

function getTimeParts() {
    const now = new Date();

    // Phần 1: Giờ - Phút
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const timeHM = `${hour}:${minute}`;

    // Phần 2: Ngày - Tháng - Năm
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const dateDMY = `${day}/${month}/${year}`;

    return { timeHM, dateDMY };
}

function createData() {
    const { timeHM, dateDMY } = getTimeParts();
    let visitorId = localStorage.getItem("visitor_id");
    fetch("https://api.jsonbin.io/v3/b", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Master-key": "$2a$10$nsUUsCRp7g91LZ8S7MukgeFMifcyFBraXQmz3SJLJ32o64gKSwfw2",
            "X-Access-Key": "$2a$10$JENWvzOOgAFjP1AewZhZ5e7I7dVzJ5N0lXqj5xIGxUgUR/vX9TgCu",
            "X-Visitor-ID": visitorId // 👈 THÊM VÀO ĐÂY
        },
        body: JSON.stringify({
            status: "Đồng ý",
            visitor_id: visitorId, // 👈 gửi trong body luôn
            time: timeHM,
            day: dateDMY
        })
    })
    .then(res => res.json())
    .then(data => console.log("Created:", data))
    .catch(err => console.log(err));
}

function start() {
    const wrapper = document.getElementById('wrapper-pg');
    wrapper.remove();
    createData();
    startStars();
    loopParticles();
    initRotation();
    paragraph();
}

function paragraph() {
    // Tạo visitor_id nếu chưa có
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("visitor_id", visitorId);
    }

console.log("Visitor ID:", visitorId);

    const paragraphs = [
        'Hmmmmmmm!!',
        'T với m quen nhau cũng 2 tháng rồi hẻ.',
        'Suốt thời gian ấy thì t làm cho m buồn nhiều.',
        'T thật sự xin lỗi',
        'T là một người không giỏi ăn nói, nhạt, trầm tính :))',
        'T cũng không biết m coi t là gì, nma bây giờ thì!!',
        'M làm ny t nha.'
    ];

    const btn_ct = ['Đồng ý', 'Từ chối'];

    const paraElement = document.getElementById('paragraph');
    let currentIndex = 0;

    function render(idx, currentString, content) {
        if (idx >= currentString.length) {
            // Hoàn thành typing, chờ 2s rồi fade out
            if (currentIndex < paragraphs.length) {
                paraElement.style.animation = 'paragraphFade 2s ease-in-out forwards';
            } else {
                const wrapper = document.getElementById('wrapper-pg');
                wrapper.innerHTML += `
                <div class='btn_ques_wrapper'>
                <span>
                <button class='btn_ques' id='btn_ques_1' onclick='start()'>${btn_ct[0]}</button>
                <button class='btn_ques' id='btn_ques_2' onclick='clickWrong()'>${btn_ct[1]}</button>
                </span>
                </div>
            `;
            }
            setTimeout(() => {
                void paraElement.offsetWidth;
                displayNextParagraph();
            }, 2000);
            return;
        }
        content += currentString[idx];
        paraElement.textContent = content;
        setTimeout(() => render(idx + 1, currentString, content), 100);
    }

    function displayNextParagraph() {
        if (currentIndex >= paragraphs.length) {
            return;
        }
        paraElement.style.animation = 'none';
        const currentString = paragraphs[currentIndex];
        currentIndex++;
        render(0, currentString, '');
    }

    displayNextParagraph();
}

paragraph();
setupMusic();

function clickWrong() {
    const btn_wrong = document.getElementById('btn_ques_2');

    const max_width = window.innerWidth - 100;
    const max_height = window.innerHeight - 100;

    const x = Math.random() * max_width;
    const y = Math.random() * max_height;

    btn_wrong.style.position = "absolute";
    btn_wrong.style.left = `${x}px`;
    btn_wrong.style.top = `${y}px`;

}
