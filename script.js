const lista = document.getElementById("lista");
const campoBusca = document.getElementById("busca");
const filtroRegiao = document.getElementById("filtroRegiao");
const filtroVeiculo = document.getElementById("filtroVeiculo");

// ---------- Utilitários ----------
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ").trim();
}

function mostrar(valor) {
  return valor ? valor : "Não informado";
}

// Aceita 1 ou mais números no mesmo campo, separados por "/" ou ";".
// O nome entre parênteses fica no texto do link, mas não entra no número.
// Ex.: "41 99967-0787 (Adilson) / 41 99816-0038 (Manoelly)" vira 2 links.
function linkWhatsapp(texto) {
  if (!texto) return "Não informado";
  const partes = texto.split(/\s*[\/;]\s*/).filter(function (p) {
    return p.trim() !== "";
  });
  return partes.map(function (parte) {
    const semNome = parte.replace(/\(.*?\)/g, "");
    let digitos = semNome.replace(/\D/g, "");
    if (digitos.length < 10) return parte.trim();
    if (!digitos.startsWith("55") || digitos.length <= 11) digitos = "55" + digitos;
    return `<a href="https://wa.me/${digitos}" target="_blank">${parte.trim()}</a>`;
  }).join("<br>");
}

function linkEmail(email) {
  if (!email) return "Não informado";
  return `<a href="mailto:${email}">${email}</a>`;
}

// ---------- Partes do cartão ----------
function textoSeis(t) {
  if (t.transporta6m === "sim") return "Sim";
  if (t.transporta6m === "nao") return "Não";
  return "A confirmar";
}

function desenharLimites(t) {
  if (!t.limitesPorRegiao || t.limitesPorRegiao.length === 0) return "";
  const itens = t.limitesPorRegiao.map(function (l) {
    return `${l.regiao}: máx. ${l.comprimentoMaximoMetros} m`;
  });
  return `<p><strong>Exceções:</strong> ${itens.join("; ")}</p>`;
}

function textoRegioes(t) {
  if (!t.regioes || t.regioes.length === 0) return "Não informado";
  return t.regioes.join(", ");
}

function textoVeiculos(t) {
  if (!t.tiposVeiculo || t.tiposVeiculo.length === 0) return "Não informado";
  return t.tiposVeiculo.join(", ");
}

function desenharObservacao(t) {
  if (!t.observacao) return "";
  return `<p><strong>Observações:</strong> ${t.observacao}</p>`;
}

function desenharContato(titulo, c) {
  return `
    <div class="contato">
      <h3>${titulo}</h3>
      <p>Telefone: ${mostrar(c.telefone)}</p>
      <p>WhatsApp: ${linkWhatsapp(c.whatsapp)}</p>
      <p>E-mail: ${linkEmail(c.email)}</p>
      ${c.obs ? `<p><em>${c.obs}</em></p>` : ""}
    </div>
  `;
}

function desenharCobertura(t, termo) {
  const cidades = cobertura[t.id] || [];
  if (cidades.length === 0) return "";

  // Só aparecem as colunas que a transportadora realmente tem.
  const colunas = [
    { campo: "grupo", titulo: "Região" },
    { campo: "prazo", titulo: "Prazo" },
    { campo: "tipo", titulo: "Tipo" },
    { campo: "filial", titulo: "Filial" },
    { campo: "obs", titulo: "Obs." }
  ].filter(function (col) {
    return cidades.some(function (c) { return c[col.campo]; });
  });

  function detalhe(c) {
    const partes = [];
    if (c.grupo) partes.push(c.grupo);
    if (c.prazo) partes.push(c.prazo);
    if (c.tipo) partes.push(c.tipo);
    if (c.filial) partes.push("filial " + c.filial);
    if (c.obs) partes.push(c.obs);
    return partes.join(" · ");
  }

  let destaque = "";
  if (termo.length >= 2) {
    const achadas = cidades.filter(function (c) {
      return normalizar(c.cidade).includes(termo);
    });
    if (achadas.length > 0) {
      destaque = '<ul class="achadas">' + achadas.map(function (c) {
        const d = detalhe(c);
        return `<li><strong>${c.cidade}</strong>${d ? ": " + d : ""}</li>`;
      }).join("") + "</ul>";
    }
  }

  const cabecalho = "<th>Cidade</th>" + colunas.map(function (col) {
    return "<th>" + col.titulo + "</th>";
  }).join("");

  const linhas = cidades.map(function (c) {
    return "<tr><td>" + c.cidade + "</td>" + colunas.map(function (col) {
      return "<td>" + (c[col.campo] || "") + "</td>";
    }).join("") + "</tr>";
  }).join("");

  return `
    ${destaque}
    <details class="cobertura">
      <summary>Atende ${cidades.length} cidades</summary>
      <table>
        <tr>${cabecalho}</tr>
        ${linhas}
      </table>
    </details>
  `;
}

function desenharCartao(t, termo) {
  return `
    <div class="cartao">
      <h2>${t.nome}</h2>
      <p><strong>Regiões:</strong> ${textoRegioes(t)}</p>
      <p><strong>Transporta 6 m:</strong> ${textoSeis(t)}</p>
      <p><strong>Tipos de veículo:</strong> ${textoVeiculos(t)}</p>
      ${desenharLimites(t)}
      ${desenharObservacao(t)}
      ${desenharCobertura(t, termo)}
      <div class="contatos">
        ${desenharContato("Expedição", t.contatos.expedicao)}
        ${desenharContato("Financeiro", t.contatos.financeiro)}
        ${desenharContato("Comercial", t.contatos.comercial)}
      </div>
    </div>
  `;
}

// ---------- Filtros ----------
function preencherOpcoes(select, valores) {
  const unicos = [...new Set(valores)].sort();
  unicos.forEach(function (v) {
    select.innerHTML += `<option value="${v}">${v}</option>`;
  });
}

// "Nacional" não vira opção do filtro: quem atende o Brasil todo entra em qualquer região escolhida.
preencherOpcoes(filtroRegiao, transportadoras.flatMap(function (t) {
  return t.regioes;
}).filter(function (r) {
  return r !== "Nacional";
}));

preencherOpcoes(filtroVeiculo, transportadoras.flatMap(function (t) {
  return t.tiposVeiculo || [];
}));

function mostrarLista() {
  const termo = normalizar(campoBusca.value);
  const regiao = filtroRegiao.value;
  const veiculo = filtroVeiculo.value;

  const filtradas = transportadoras.filter(function (t) {
    const alvo = normalizar(t.nome + " " + t.regioes.join(" ") + " " + (t.tiposVeiculo || []).join(" "));
    const temCidade = termo.length >= 2 && (cobertura[t.id] || []).some(function (c) {
      return normalizar(c.cidade).includes(termo);
    });
    const bateBusca = alvo.includes(termo) || temCidade;
    const bateRegiao = regiao === "" || t.regioes.includes(regiao) || t.regioes.includes("Nacional");
    const bateVeiculo = veiculo === "" || (t.tiposVeiculo || []).includes(veiculo);
    return bateBusca && bateRegiao && bateVeiculo;
  });

  if (filtradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma transportadora encontrada.</p>";
    return;
  }

  lista.innerHTML = filtradas.map(function (t) {
    return desenharCartao(t, termo);
  }).join("");
}

campoBusca.addEventListener("input", mostrarLista);
filtroRegiao.addEventListener("change", mostrarLista);
filtroVeiculo.addEventListener("change", mostrarLista);

mostrarLista();
