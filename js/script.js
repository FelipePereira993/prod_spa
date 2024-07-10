function carregarDados() {
    // Planilha para banco de dados
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTvcHjhWqYullaAD2ukCSIj2ykRwRjrArf3CC0Vzr_ZRxq0LBKqVIzb__wF1BTAgZi2IFjDe2gQwbjp/pub?gid=292500322&single=true&output=csv`;
    const matInpt = document.getElementById('matricula-inpt');
    const conteudoData = document.getElementById('data-inpt');

    if (matInpt.value != "" && matInpt.value.toString().length > 0 && matInpt.value.toString().length <= 5) {
        fetch(url, { cache: "no-cache" })
            .then(response => response.text())
            .then(data => {
                let linhas = data.split(/\r?\n/);

                let tabela = document.getElementById("tabela-principal");
                let corpoTabela = tabela.querySelector("tbody");
                let rodape = tabela.querySelector("tfoot");
                let containerProdTotal = document.querySelector(".container_producao_total")

                let totalProducao = 0;
                let totalProducao2 = 0;

                let dataAtual = new Date().toLocaleDateString('pt-BR');
                let dataFormatada = new Date(conteudoData.value + 'T00:00:00').toLocaleDateString('pt-BR');
                let resData = conteudoData.value == "" ? dataAtual : dataFormatada;

                while (corpoTabela.hasChildNodes()) {
                    corpoTabela.removeChild(corpoTabela.firstChild);
                };

                while (rodape.hasChildNodes()) {
                    rodape.removeChild(rodape.firstChild);
                };

                while (containerProdTotal.hasChildNodes()) {
                    containerProdTotal.removeChild(containerProdTotal.firstChild);
                };

                linhas.forEach(linha => {
                    let colunas = linha.split(",");

                    let columnDateHour = colunas[0].split(" ");
                    let data = columnDateHour[0];
                    let hora = columnDateHour[1];

                    let nome = colunas[3];
                    let matricula = colunas[4];
                    let atividade = colunas[5];
                    let producao = parseInt(colunas[9]);
                    let demaisAtividades = colunas[10];
                    let producao2 = parseInt(colunas[11] == "" ? 0 : colunas[11]);

                    if (matricula == matInpt.value && data == resData) {
                        let tr = document.createElement("tr");
                        let tdNome = document.createElement("td");
                        let tdHora = document.createElement("td");
                        let tdAtividade = document.createElement("td");
                        let tdProducao = document.createElement("td");
                        let tdDemaisAtividades = document.createElement("td");
                        let tdProducao2 = document.createElement("td");

                        tdNome.textContent = nome;
                        tdHora.textContent = hora;
                        tdAtividade.textContent = atividade;
                        tdProducao.textContent = producao;
                        tdDemaisAtividades.textContent = demaisAtividades;
                        tdProducao2.textContent = producao2;

                        totalProducao += producao;
                        totalProducao2 += producao2;

                        tr.appendChild(tdNome);
                        tr.appendChild(tdHora);
                        tr.appendChild(tdAtividade);
                        tr.appendChild(tdProducao);
                        tr.appendChild(tdDemaisAtividades);
                        tr.appendChild(tdProducao2);
                        corpoTabela.appendChild(tr);
                    };
                });
                let trRodape = document.createElement("tr");
                let thTotalLabel = document.createElement("th");
                let tdTotalProd = document.createElement("th");
                let tdTotalProd2 = document.createElement("th")

                thTotalLabel.textContent = "Total";
                thTotalLabel.colSpan = 2;
                tdTotalProd.textContent = totalProducao;
                tdTotalProd.colSpan = 2;
                tdTotalProd2.textContent = totalProducao2;
                tdTotalProd2.colSpan = 2;

                trRodape.appendChild(thTotalLabel);
                trRodape.appendChild(tdTotalProd);
                trRodape.appendChild(tdTotalProd2);
                rodape.appendChild(trRodape);

                let prodLabel = document.createElement("div");
                let prodText = document.createElement("div");
                let containerProd = document.createElement("div");

                containerProd.className = "producao_total"

                prodLabel.textContent = "Produção total:";
                prodLabel.id = "producao_final";
                prodText.textContent = totalProducao + totalProducao2;
                prodText.id = "producao_final";

                containerProd.appendChild(prodLabel)
                containerProd.appendChild(prodText)

                containerProdTotal.appendChild(containerProd)
                
            });
    } else {
        window.alert("Coloque uma matricula valida, sem os 3 primeiros zeros na frente por favor")
    }
}