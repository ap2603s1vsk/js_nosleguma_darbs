function poga() {
    const ievade = document.getElementById("ievade").value;
    const vecums = parseInt(ievade);
    const izvade = document.getElementById("izvade");
    const ratuSekcija = document.getElementById("ratuSekcija");

    if (isNaN(vecums)) {
        izvade.textContent = "Lūdzu, ievadi korektu vecumu ar cipariem.";
        ratuSekcija.style.display = "none";
        return;
    }

    let teksts = "Tavam vecumam piemērotie pasākumi: ";

    if (vecums < 12) {
        teksts += "Tev ir mazāk par 12 gadiem, uz pasākumu jādodas ar vecākiem!";
    } else if (vecums < 90) {
        teksts += "MESA koncerttūre, Prāta Vētra koncerttūre, Bermudu Divstūris koncerttūre";
    } else {
        teksts += "Jūs gan labāk palieiciet mājās un atpūtieties savos labos gados, bet ja vēlaties varat izmēģināt!";
        ratuSekcija.style.display = "none";

    }

    izvade.textContent = teksts;
    ratuSekcija.style.display = "block";
}


const tagad = new Date();
document.getElementById("garais").innerHTML = tagad;
setInterval(() => {
    const tagad = new Date();
    const formatets = tagad.toLocaleString("lv-LV", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById("garais").innerHTML = formatets;
}, 1000);

document.addEventListener("DOMContentLoaded", function () {



    const canvas = document.getElementById('raffleWheel');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('podzina');
    const popup = document.getElementById('popup');
    const eventName = document.getElementById('nosaukums');
    const vairakinfopoga = document.getElementById('vairakinfopoga');

    const segments = [
        { name: 'MESA koncerttūre', url: 'mesa/mesa.html' },
        { name: 'Prāta Vētra koncerttūre', url: 'pratavetra/pratavetra.html' },
        { name: 'Bermudu Divstūris koncerttūre', url: 'berdiv/berdiv.html' },
        { name: 'MESA koncerttūre', url: 'mesa/mesa.html' },
        { name: 'Prāta Vētra koncerttūre', url: 'pratavetra/pratavetra.html' },
        { name: 'Bermudu Divstūris koncerttūre', url: 'berdiv/berdiv.html' }
    ];

    const colors = ['#F3D3A5', '#F3D3A5', '#F3D3A5', '#F3D3A5', '#F3D3A5', '#F3D3A5'];
    const segmentAngle = (2 * Math.PI) / segments.length;
    let currentAngle = 0;
    let isSpinning = false;
    let spinVelocity = 0;
    let iegriezvel = false;

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < segments.length; i++) {
            const startAngle = currentAngle + i * segmentAngle;
            const endAngle = startAngle + segmentAngle;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = "center";
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.fillText(segments[i].name, 130, 10);
            ctx.restore();
        }
    }

    function spinWheel() {
        if (iegriezvel) {
            alert("Jūsu iespēja iegriezt ratu vienreiz jau tika izmantota!");
            return;
        }
        isSpinning = true;
        spinVelocity = (Math.random() * 5) + 5;

        function animateSpin() {
            if (spinVelocity <= 0.001) {
                stopWheel();
                return;
            }
            currentAngle += spinVelocity;
            spinVelocity *= 0.97;
            drawWheel();
            requestAnimationFrame(animateSpin);
        }

        function stopWheel() {
            isSpinning = false;
            const normalizedAngle = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const index = Math.floor(((2 * Math.PI - normalizedAngle + Math.PI / 2) % (2 * Math.PI)) / segmentAngle) % segments.length;

            eventName.textContent = segments[index].name;
            vairakinfopoga.dataset.url = segments[index].url;
            popup.style.display = 'block';

            iegriezvel = true;
        }

        animateSpin();
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    function uzvairakinfo() {
        const url = vairakinfopoga.dataset.url;
        if (url) {
            window.location.href = url;
        }
    }

    vairakinfopoga.addEventListener('click', uzvairakinfo);
    spinBtn.addEventListener('click', spinWheel);
    drawWheel();
});


