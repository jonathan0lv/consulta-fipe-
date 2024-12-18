document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.classList.contains("active");


            document.querySelectorAll(".faq-answer").forEach((el) => {
                el.classList.remove("active");
            });


            document.querySelectorAll(".faq-question").forEach((el) => {
                el.classList.remove("open");
            });


            if (!isOpen) {
                answer.classList.add("active");
                question.classList.add("open");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", async function () {

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const imageMap = {

        "a-10": "./img/carros/chevrolet/chevroleta10.png",
        "a-20": "./img/carros/chevrolet/chevroleta20.png",
        "astra": "./img/carros/chevrolet/chevroletastra.png",
        "blazer ev": "./img/carros/chevrolet/chevroletblazerev.png",
        "blazer jimmy": "./img/carros/chevrolet/chevroletblazer.png",
        "bolt": "./img/carros/chevrolet/chevroletbolt.png",
        "bonanza": "./img/carros/chevrolet/chevroletbonanza.png",
        "brasinca": "./img/carros/chevrolet/chevroletbrasinca.png",
        "c-10": "./img/carros/chevrolet/chevroletc10.png",
        "c-20": "./img/carros/chevrolet/chevroletc20.png",
        "calibra": "./img/carros/chevrolet/chevroletcalibra.png",
        "camaro fifty": "./img/carros/chevrolet/chevroletcamarofifty.png",
        "camaro rs": "./img/carros/chevrolet/chevroletcamarors.png",
        "caprice": "./img/carros/chevrolet/chevroletcaprice.png",
        "captiva": "./img/carros/chevrolet/chevroletcaptiva.png",
        "caravan": "./img/carros/chevrolet/chevroletcaravan.png",
        "cavalier": "./img/carros/chevrolet/chevroletcavalier.png",
        "celta": "./img/carros/chevrolet/chevroletcelta.png",
        "chevette junior": "./img/carros/chevrolet/chevroletchevette.png",
        "chevy": "./img/carros/chevrolet/chevroletchevy.png",
        "cheynne": "./img/carros/chevrolet/chevroletcheynne.png",
        "classic": "./img/carros/chevrolet/chevroletclassic.png",
        "cobalt": "./img/carros/chevrolet/chevroletcobalt.png",
        "corsa": "./img/carros/chevrolet/chevroletcorsa.png",
        "corvette": "./img/carros/chevrolet/chevroletcorvette.png",
        "d-10": "./img/carros/chevrolet/chevroletd10.png",
        "d-20": "./img/carros/chevrolet/chevroletd20.png",
        "equinox": "./img/carros/chevrolet/chevroletequinoxev.png",
        "ipanema": "./img/carros/chevrolet/chevroletipanema.png",
        "joy": "./img/carros/chevrolet/chevroletjoy.png",
        "kadett": "./img/carros/chevrolet/chevroletkadett.png",
        "lumina": "./img/carros/chevrolet/chevroletlumina.png",
        "malibu": "./img/carros/chevrolet/chevroletmalibu.png",
        "marajo": "./img/carros/chevrolet/chevroletmarajo.png",
        "meriva": "./img/carros/chevrolet/chevroletmeriva.png",
        "montana": "./img/carros/chevrolet/chevroletmontana.png",
        "monza": "./img/carros/chevrolet/chevroletmonza.png",
        "omega": "./img/carros/chevrolet/chevroletomega.png",
        "onix": "./img/carros/chevrolet/chevroletonix.png",
        "opala": "./img/carros/chevrolet/chevroletopala.png",
        "prisma": "./img/carros/chevrolet/chevroletprisma.png",
        "s10 blazer": "./img/carros/chevrolet/chevroletblazer.png",
        "saturn": "./img/carros/chevrolet/chevroletsaturn.png",
        "sierra": "./img/carros/chevrolet/chevroletsierra.png",
        "silverado": "./img/carros/chevrolet/chevroletsilverado.png",
        "sonic": "./img/carros/chevrolet/chevroletsonic.png",
        "sonoma": "./img/carros/chevrolet/chevroletsonoma.png",
        "spacevan": "./img/carros/chevrolet/chevroletspacevan.png",
        "spin": "./img/carros/chevrolet/chevroletspin.png",
        "ss10": "./img/carros/chevrolet/chevroletss10.png",
        "suburban": "./img/carros/chevrolet/chevroletsuburban.png",
        "suprema": "./img/carros/chevrolet/chevroletsuprema.png",
        "syclone": "./img/carros/chevrolet/chevroletsyclone.png",
        "tigra": "./img/carros/chevrolet/chevrolettigra.png",
        "tracker": "./img/carros/chevrolet/chevrolettracker.png",
        "trafic": "./img/carros/chevrolet/chevrolettrafic.png",
        "trailblazer": "./img/carros/chevrolet/chevrolettrailblazer.png",
        "vectra": "./img/carros/chevrolet/chevroletvectra.png",
        "veraneio": "./img/carros/chevrolet/chevroletveraneio.png",
        "zafira": "./img/carros/chevrolet/chevroletzafira.png",
    };

    const brandId = getQueryParam("brand");
    const modelId = getQueryParam("model");
    const yearId = getQueryParam("year");
    const versionText = getQueryParam("version");

    if (!brandId || !modelId || !yearId || !versionText) {
        alert("Erro ao carregar os dados do veículo. Redirecionando...");
        window.location.href = "index.html";
        return;
    }

    async function loadVehicleData() {
        try {
            const BASE_URL = "https://parallelum.com.br/fipe/api/v1/carros";
            const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYTczNDA4Yi05ZDgwLTQ1YzMtOWIwOS1iZDRkOWYwM2M0ZTAiLCJlbWFpbCI6ImpvaG4wMTA4MjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MzQzODI3NDh9.smgOMO0QSSfmw_TXCiVRgMn617tRMgsvfQD7bkY9mXY";
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`, {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`
                }
            });

            if (!response.ok) throw new Error("Erro na API FIPE");
            const data = await response.json();

            document.getElementById("result-title").innerText = `Preços ${data.Marca} ${data.Modelo}`;
            document.getElementById("result-description").innerText = `${yearId} - ${versionText}`;

            document.getElementById("breadcrumb-brand").innerText = data.Marca;
            document.getElementById("breadcrumb-model").innerText = data.Modelo.split(" ")[0];
            document.getElementById("breadcrumb-year").innerText = yearId;
            document.getElementById("breadcrumb-version").innerText = versionText;

            document.getElementById("vehicle-title").innerText = `${data.Modelo}`;
            document.getElementById("vehicle-description").innerText = `${data.Combustivel}`;
            document.getElementById("vehicle-price").innerText = data.Valor;

            const vehicleKey = `${data.Marca} ${data.Modelo}`.toLowerCase().trim();

            let vehicleImage = "./img/carros/default.png";
            for (const key in imageMap) {
                if (vehicleKey.includes(key)) {
                    vehicleImage = imageMap[key];
                    break;
                }
            }

            document.getElementById("vehicle-image").src = vehicleImage;

        } catch (error) {
            console.error("Erro ao buscar dados da API FIPE:", error);
            alert("Erro ao carregar os dados do veículo. Redirecionando...");
            window.location.href = "index.html";
        }
    }

    loadVehicleData();
});