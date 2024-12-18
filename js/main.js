
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
    const brandSelect = document.getElementById("brand");
    const modelSelect = document.getElementById("model");
    const yearSelect = document.getElementById("year");
    const versionSelect = document.getElementById("version");

    const BASE_URL = "https://parallelum.com.br/fipe/api/v1/carros";
    const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYTczNDA4Yi05ZDgwLTQ1YzMtOWIwOS1iZDRkOWYwM2M0ZTAiLCJlbWFpbCI6ImpvaG4wMTA4MjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MzQzODI3NDh9.smgOMO0QSSfmw_TXCiVRgMn617tRMgsvfQD7bkY9mXY";
    const highlightedBrands = ["GM - Chevrolet", "VW - VolksWagen", "Fiat", "Toyota", "Hyundai", "Jeep", "Honda", "Ford", "Nissan", "Renault"];

    async function loadBrands() {
        try {
            const response = await fetch(`${BASE_URL}/marcas`, {
                headers: { Authorization: `Bearer ${API_TOKEN}` }
            });
            const brands = await response.json();

            const sortedBrands = [];
            const remainingBrands = [];

            brands.forEach((brand) => {
                if (highlightedBrands.includes(brand.nome)) {
                    sortedBrands.push(brand);
                } else {
                    remainingBrands.push(brand);
                }
            });

            sortedBrands.sort((a, b) => highlightedBrands.indexOf(a.nome) - highlightedBrands.indexOf(b.nome));
            remainingBrands.sort((a, b) => a.nome.localeCompare(b.nome));
            const allBrands = sortedBrands.concat(remainingBrands);

            brandSelect.innerHTML = '<option value="">Selecione a marca</option>';
            allBrands.forEach((brand) => {
                const option = document.createElement("option");
                option.value = brand.codigo;
                option.textContent = brand.nome;
                brandSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar marcas:", error);
        }
    }

    async function loadModels(brandId) {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos`, {
                headers: { Authorization: `Bearer ${API_TOKEN}` }
            });
            const data = await response.json();

            modelSelect.innerHTML = '<option value="">Selecione o modelo</option>';
            modelSelect.disabled = false;
            const uniqueModels = new Set();

            data.modelos.forEach((model) => {
                const modelName = model.nome.split(" ")[0];
                if (!uniqueModels.has(modelName)) {
                    uniqueModels.add(modelName);
                    const option = document.createElement("option");
                    option.value = model.codigo;
                    option.textContent = modelName;
                    modelSelect.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar modelos:", error);
        }
    }

    async function loadYears(brandId, modelId) {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos`, {
                headers: { Authorization: `Bearer ${API_TOKEN}` }
            });
            const years = await response.json();

            yearSelect.innerHTML = '<option value="">Selecione o ano</option>';
            yearSelect.disabled = false;

            versionSelect.innerHTML = '<option value="">Selecione a versão</option>';
            versionSelect.disabled = true;

            const currentYear = new Date().getFullYear();
            years.forEach((year) => {
                const yearValue = parseInt(year.nome.split(" ")[0]);
                if (yearValue > 1900 && yearValue <= currentYear) {
                    const option = document.createElement("option");
                    option.value = year.codigo;
                    option.textContent = yearValue;
                    yearSelect.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar anos:", error);
        }
    }

    async function loadVersions(brandId, modelId, yearId) {
        try {
            const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`, {
                headers: { Authorization: `Bearer ${API_TOKEN}` }
            });
            const versionData = await response.json();

            versionSelect.innerHTML = '<option value="">Selecione a versão</option>';
            versionSelect.disabled = false;

            const versionText = `${versionData.Modelo.split(" ").slice(1).join(" ")} - ${versionData.Combustivel}`;
            const option = document.createElement("option");
            option.value = versionData.codigo;
            option.textContent = versionText;
            versionSelect.appendChild(option);
        } catch (error) {
            console.error("Erro ao carregar versões:", error);
        }
    }

    brandSelect.addEventListener("change", () => {
        const brandId = brandSelect.value;
        if (brandId) {
            loadModels(brandId);
            modelSelect.disabled = false;
            yearSelect.innerHTML = '<option value="">Selecione o ano</option>';
            versionSelect.innerHTML = '<option value="">Selecione a versão</option>';
        }
    });

    modelSelect.addEventListener("change", () => {
        const brandId = brandSelect.value;
        const modelId = modelSelect.value;
        if (brandId && modelId) {
            loadYears(brandId, modelId);
        }
    });

    yearSelect.addEventListener("change", () => {
        const brandId = brandSelect.value;
        const modelId = modelSelect.value;
        const yearId = yearSelect.value;
        if (brandId && modelId && yearId) {
            loadVersions(brandId, modelId, yearId);
        }
    });

    loadBrands();
});


document.getElementById("consultar").addEventListener("click", () => {
    const brandId = document.getElementById("brand").value;
    const modelId = document.getElementById("model").value;
    const yearId = document.getElementById("year").value;
    const versionText = document.getElementById("version").options[document.getElementById("version").selectedIndex].text;

    if (!brandId || !modelId || !yearId || versionText === "Selecione a versão") {
        alert("Por favor, selecione a marca, modelo, ano e versão do veículo.");
        return;
    }

    window.location.href = `consulta.html?brand=${encodeURIComponent(brandId)}&model=${encodeURIComponent(modelId)}&year=${encodeURIComponent(yearId)}&version=${encodeURIComponent(versionText)}`;
});

document.addEventListener("DOMContentLoaded", () => {
    const brandsContainer = document.getElementById("brands-container");
    const viewMoreButton = document.getElementById("view-more");
    const viewLessButton = document.getElementById("view-less");

    const additionalBrands = [
        { name: "Acura", logo: "./img/logo/acuralogo.png" },
        { name: "Agrale", logo: "./img/logo/agralelogo.png" },
        { name: "Alfa Romeo", logo: "./img/logo/alfaromeologo.png" },
        { name: "AM Gen", logo: "./img/logo/amgenlogo.png" },
        { name: "Asia Motors", logo: "./img/logo/asiamotorslogo.png" },
        { name: "Aston Martin", logo: "./img/logo/astonmartinlogo.png" },
        { name: "Audi", logo: "./img/logo/audilogo.png" },
        { name: "Baby", logo: "./img/logo/babylogo.png" },
        { name: "BMW", logo: "./img/logo/bmwlogo.png" },
        { name: "BRM", logo: "./img/logo/brmlogo.png" },
        { name: "Bugre", logo: "./img/logo/bugrelogo.png" },
        { name: "BYD", logo: "./img/logo/bydlogo.png" },
        { name: "CAB Motors", logo: "./img/logo/cabmotorslogo.png" },
        { name: "Cadillac", logo: "./img/logo/cadillaclogo.png" },
        { name: "Caoa Chery", logo: "./img/logo/caoacherylogo.png" },
        { name: "Caoa Chery/Chery", logo: "./img/logo/caoacherycherylogo.png" },
        { name: "CBT Jipe", logo: "./img/logo/cbtjipelogo.png" },
        { name: "CHANA", logo: "./img/logo/chanalogo.png" },
        { name: "CHANGAN", logo: "./img/logo/changanlogo.png" },
        { name: "Chrysler", logo: "./img/logo/chryslerlogo.png" },
        { name: "Citroën", logo: "./img/logo/citroenlogo.png" },
        { name: "Cross Lander", logo: "./img/logo/crosslanderlogo.png" },
        { name: "D2D Motors", logo: "./img/logo/d2dmotorslogo.png" },
        { name: "Daewoo", logo: "./img/logo/daewoologo.png" },
        { name: "Daihatsu", logo: "./img/logo/daihatsulogo.png" },
        { name: "DFSK", logo: "./img/logo/dfsklogo.png" },
        { name: "Dodge", logo: "./img/logo/dodgelogo.png" },
        { name: "EFFA", logo: "./img/logo/effalogo.png" },
        { name: "Engesa", logo: "./img/logo/engesalogo.png" },
        { name: "Envemo", logo: "./img/logo/envemologo.png" },
        { name: "Ferrari", logo: "./img/logo/ferrarilogo.png" },
        { name: "FEVER", logo: "./img/logo/feverlogo.png" },
        { name: "Fibravan", logo: "./img/logo/fibravanlogo.png" },
        { name: "FOTON", logo: "./img/logo/fotonlogo.png" },
        { name: "Fyber", logo: "./img/logo/fyberlogo.png" },
        { name: "GEELY", logo: "./img/logo/geelylogo.png" },
        { name: "GREAT WALL", logo: "./img/logo/greatwalllogo.png" },
        { name: "Gurgel", logo: "./img/logo/gurgellogo.png" },
        { name: "GWM", logo: "./img/logo/gwmlogo.png" },
        { name: "HAFEI", logo: "./img/logo/hafeilogo.png" },
        { name: "HITECH ELECTRIC", logo: "./img/logo/hitecheletriclogo.png" },
        { name: "Isuzu", logo: "./img/logo/isuzulogo.png" },
        { name: "IVECO", logo: "./img/logo/ivecologo.png" },
        { name: "JAC", logo: "./img/logo/jaclogo.png" },
        { name: "Jaguar", logo: "./img/logo/jaguarlogo.png" },
        { name: "JINBEI", logo: "./img/logo/jinbeilogo.png" },
        { name: "JPX", logo: "./img/logo/jpxlogo.png" },
        { name: "Kia Motors", logo: "./img/logo/kiamotorslogo.png" },
        { name: "Lada", logo: "./img/logo/ladalogo.png" },
        { name: "Lamborghini", logo: "./img/logo/lamborghinilogo.png" },
        { name: "Land Rover", logo: "./img/logo/landroverlogo.png" },
        { name: "Lexus", logo: "./img/logo/lexuslogo.png" },
        { name: "LIFAN", logo: "./img/logo/lifanlogo.png" },
        { name: "LOBINI", logo: "./img/logo/lobinilogo.png" },
        { name: "Lotus", logo: "./img/logo/lotuslogo.png" },
        { name: "Mahindra", logo: "./img/logo/mahindralogo.png" },
        { name: "Maserati", logo: "./img/logo/maseratilogo.png" },
        { name: "Matra", logo: "./img/logo/matralogo.png" },
        { name: "Mazda", logo: "./img/logo/mazdalogo.png" },
        { name: "Mclaren", logo: "./img/logo/mclarenlogo.png" },
        { name: "Mercedes-Benz", logo: "./img/logo/mercedesbenzlogo.png" },
        { name: "Mercury", logo: "./img/logo/mercurylogo.png" },
        { name: "MG", logo: "./img/logo/mglogo.png" },
        { name: "MINI", logo: "./img/logo/minilogo.png" },
        { name: "Mitsubishi", logo: "./img/logo/mitsubishilogo.png" },
        { name: "Miura", logo: "./img/logo/miuralogo.png" },
        { name: "Peugeot", logo: "./img/logo/peugeotlogo.png" },
        { name: "Plymouth", logo: "./img/logo/plymouthlogo.png" },
        { name: "Pontiac", logo: "./img/logo/pontiaclogo.png" },
        { name: "Porsche", logo: "./img/logo/porschelogo.png" },
        { name: "RAM", logo: "./img/logo/ramlogo.png" },
        { name: "RELY", logo: "./img/logo/relylogo.png" },
        { name: "Rolls-Royce", logo: "./img/logo/rollsroycelogo.png" },
        { name: "Rover", logo: "./img/logo/roverlogo.png" },
        { name: "Saab", logo: "./img/logo/saablogo.png" },
        { name: "Saturn", logo: "./img/logo/saturnlogo.png" },
        { name: "Seat", logo: "./img/logo/seatlogo.png" },
        { name: "SERES", logo: "./img/logo/sereslogo.png" },
        { name: "SHINERAY", logo: "./img/logo/shineraylogo.png" },
        { name: "smart", logo: "./img/logo/smartlogo.png" },
        { name: "SSANGYONG", logo: "./img/logo/ssangyonglogo.png" },
        { name: "Subaru", logo: "./img/logo/subarulogo.png" },
        { name: "Suzuki", logo: "./img/logo/suzukilogo.png" },
        { name: "TAC", logo: "./img/logo/taclogo.png" },
        { name: "Troller", logo: "./img/logo/trollerlogo.png" },
        { name: "Volvo", logo: "./img/logo/volvologo.png" },
        { name: "Wake", logo: "./img/logo/wakelogo.png" },
        { name: "Walk", logo: "./img/logo/walklogo.png" }


    ];

    function renderAdditionalBrands() {
        additionalBrands.forEach(brand => {
            const brandCard = document.createElement("div");
            brandCard.classList.add("brand-card");
            brandCard.innerHTML = `
            <img src="${brand.logo}" alt="${brand.name}">
            <span>${brand.name}</span>
        `;
            brandsContainer.appendChild(brandCard);
        });
    }

    viewMoreButton.addEventListener("click", () => {
        renderAdditionalBrands();
        viewMoreButton.style.display = "none";
        viewLessButton.style.display = "inline-block";
    });

    viewLessButton.addEventListener("click", () => {
        const allBrandCards = brandsContainer.querySelectorAll(".brand-card");
        const initialBrands = 8;

        allBrandCards.forEach((card, index) => {
            if (index >= initialBrands) {
                brandsContainer.removeChild(card);
            }
        });

        viewLessButton.style.display = "none";
        viewMoreButton.style.display = "inline-block";
    });
});