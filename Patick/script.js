const perguntas = [
    "Você conhece a vítima?",
    "Você esteve no local do crime?",
    "Você conhece algum suspeito?",
    "Você teve algum conflito com a vítima?",
    "Você possui informações sobre o ocorrido?",
    "Você conversou com a vítima recentemente?",
    "Você sabe como o crime aconteceu?",
    "Você esteve próximo ao local na hora do ocorrido?",
    "Você esconde alguma informação importante?",
    "Você teve alguma participação no ocorrido?"
];

const areaPerguntas = document.getElementById("perguntas");

// Criar as 10 perguntas
perguntas.forEach((pergunta, index) => {
    areaPerguntas.innerHTML += `
        <div class="pergunta">
            <p><strong>${index + 1}.</strong> ${pergunta}</p>

            <label>
                <input type="radio" name="p${index}" value="Sim" required>
                Sim
            </label>

            <label>
                <input type="radio" name="p${index}" value="Não">
                Não
            </label>
        </div>
    `;
});

// Contar respostas e apresentar a classificação
document.getElementById("formulario")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        let totalSim = 0;

        for (let i = 0; i < perguntas.length; i++) {
            const resposta = document.querySelector(
                `input[name="p${i}"]:checked`
            );

            if (!resposta) {
                alert("Responda todas as perguntas!");
                return;
            }

            if (resposta.value === "Sim") {
                totalSim++;
            }
        }

        let classificacao;
        let mensagem;

        if (totalSim < 5) {
            classificacao = "Inocente";
            mensagem = "As evidências apresentadas não indicam envolvimento significativo na ocorrência.";
        } else if (totalSim === 5) {
            classificacao = "Suspeita";
            mensagem = "Foram encontrados indícios que justificam investigação adicional.";
        } else if (totalSim <= 8) {
            classificacao = "Cúmplice";
            mensagem = "A quantidade de evidências sugere possível participação indireta no crime.";
        } else {
            classificacao = "Culpada";
            mensagem = "O nível de envolvimento indicado pelas respostas é extremamente alto.";
        }

        document.getElementById("quantidade").textContent =
            "Quantidade de respostas Sim: " + totalSim;

        document.getElementById("classificacao").textContent =
            "Classificação: " + classificacao;

        document.getElementById("mensagem").textContent = mensagem;

        const resultado = document.getElementById("resultado");
        resultado.style.display = "block";
        resultado.scrollIntoView({ behavior: "smooth" });
    });
