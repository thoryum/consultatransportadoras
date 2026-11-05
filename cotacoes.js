// Aba "Cotações": o vendedor registra a cotação anexando foto ou documento.
// Tudo fica salvo no NAVEGADOR deste computador (IndexedDB). Não existe servidor nesta fase,
// então as cotações NÃO aparecem em outros computadores. Use "Exportar backup" para guardar/compartilhar.
(function () {
  const MAX_ARQUIVOS = 5;
  const MAX_MB = 15;

  // ---------- Elementos da tela ----------
  const abaTransportadoras = document.getElementById("aba-transportadoras");
  const abaCotacoes = document.getElementById("aba-cotacoes");
  if (!abaCotacoes) return;

  const botoesAba = document.querySelectorAll(".aba");
  const form = document.getElementById("formCotacao");
  const campoCliente = document.getElementById("cotCliente");
  const campoCodigo = document.getElementById("cotCodigo");
  const campoTransportadora = document.getElementById("cotTransportadora");
  const campoValor = document.getElementById("cotValor");
  const campoVendedor = document.getElementById("cotVendedor");
  const campoObs = document.getElementById("cotObs");
  const campoArquivos = document.getElementById("cotArquivos");
  const botaoSalvar = document.getElementById("cotSalvar");
  const mensagem = document.getElementById("cotMensagem");
  const listaCotacoes = document.getElementById("cotLista");
  const resumo = document.getElementById("cotResumo");
  const buscaCotacoes = document.getElementById("cotBusca");
  const filtroTransportadora = document.getElementById("cotFiltroTransportadora");
  const botaoExportar = document.getElementById("cotExportar");
  const campoImportar = document.getElementById("cotImportar");

  // ---------- Utilitários ----------
  function escapar(texto) {
    return String(texto == null ? "" : texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function norm(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/\s+/g, " ").trim();
  }

  // Devolve: número, null (campo vazio) ou NaN (valor inválido).
  function lerValor(texto) {
    let t = String(texto || "").replace(/R\$|\s/g, "");
    if (t === "") return null;
    if (t.includes(",")) {
      t = t.replace(/\./g, "").replace(",", ".");
    } else if (/^\d{1,3}(\.\d{3})+$/.test(t)) {
      t = t.replace(/\./g, "");
    }
    if (!/^\d+(\.\d+)?$/.test(t)) return NaN;
    return parseFloat(t);
  }

  function moeda(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function doisDigitos(n) {
    return String(n).padStart(2, "0");
  }

  function dataHora(iso) {
    const d = new Date(iso);
    return doisDigitos(d.getDate()) + "/" + doisDigitos(d.getMonth() + 1) + "/" + d.getFullYear()
      + " às " + doisDigitos(d.getHours()) + ":" + doisDigitos(d.getMinutes());
  }

  function avisar(texto, erro) {
    mensagem.textContent = texto;
    mensagem.className = erro ? "erro" : "ok";
  }

  // ---------- Banco de dados do navegador (IndexedDB) ----------
  let bancoPromessa = null;

  function abrirBanco() {
    if (!bancoPromessa) {
      bancoPromessa = new Promise(function (resolve, reject) {
        const pedido = indexedDB.open("magmetal-cotacoes", 1);
        pedido.onupgradeneeded = function () {
          pedido.result.createObjectStore("cotacoes", { keyPath: "id", autoIncrement: true });
        };
        pedido.onsuccess = function () { resolve(pedido.result); };
        pedido.onerror = function () { reject(pedido.error); };
      });
    }
    return bancoPromessa;
  }

  function operar(modo, acao) {
    return abrirBanco().then(function (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction("cotacoes", modo);
        const pedido = acao(tx.objectStore("cotacoes"));
        tx.oncomplete = function () { resolve(pedido.result); };
        tx.onerror = function () { reject(tx.error); };
        tx.onabort = function () { reject(tx.error); };
      });
    });
  }

  function salvarCotacao(c) {
    return operar("readwrite", function (store) { return store.add(c); });
  }

  function listarCotacoes() {
    return operar("readonly", function (store) { return store.getAll(); });
  }

  function excluirCotacao(id) {
    return operar("readwrite", function (store) { return store.delete(id); });
  }

  // ---------- Arquivos ----------
  // Fotos grandes do celular são reduzidas (máx. 1600 px) para ocupar pouco espaço.
  function prepararArquivo(arquivo) {
    return new Promise(function (resolve) {
      const original = { nome: arquivo.name, tipo: arquivo.type, blob: arquivo };
      if (!arquivo.type.startsWith("image/") || arquivo.type === "image/gif") {
        resolve(original);
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(arquivo);
      img.onload = function () {
        const escala = Math.min(1, 1600 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob(function (blob) {
          if (!blob) { resolve(original); return; }
          resolve({
            nome: arquivo.name.replace(/\.[^.]+$/, "") + ".jpg",
            tipo: "image/jpeg",
            blob: blob
          });
        }, "image/jpeg", 0.8);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        resolve(original);
      };
      img.src = url;
    });
  }

  function blobParaDataUrl(blob) {
    return new Promise(function (resolve, reject) {
      const leitor = new FileReader();
      leitor.onload = function () { resolve(leitor.result); };
      leitor.onerror = function () { reject(leitor.error); };
      leitor.readAsDataURL(blob);
    });
  }

  // ---------- Transportadoras cadastradas (vêm do dados.js) ----------
  const cadastradas = transportadoras.slice().sort(function (a, b) {
    return a.nome.localeCompare(b.nome, "pt-BR");
  });

  cadastradas.forEach(function (t) {
    const opcao = `<option value="${escapar(t.id)}">${escapar(t.nome)}</option>`;
    campoTransportadora.innerHTML += opcao;
    filtroTransportadora.innerHTML += opcao;
  });

  // ---------- Lista de cotações ----------
  let urlsAtivas = [];

  function limparUrls() {
    urlsAtivas.forEach(function (u) { URL.revokeObjectURL(u); });
    urlsAtivas = [];
  }

  function urlDe(blob) {
    const u = URL.createObjectURL(blob);
    urlsAtivas.push(u);
    return u;
  }

  function desenharAnexo(a) {
    const url = urlDe(a.blob);
    const nome = escapar(a.nome);
    if (a.tipo.startsWith("image/")) {
      return `<a href="${url}" target="_blank" title="${nome}"><img src="${url}" alt="${nome}"></a>`;
    }
    if (a.tipo === "application/pdf") {
      return `<a class="anexo" href="${url}" target="_blank">PDF: ${nome}</a>`;
    }
    return `<a class="anexo" href="${url}" download="${nome}">Arquivo: ${nome}</a>`;
  }

  function desenharCotacao(c, ehMenor) {
    const partes = [escapar(c.transportadoraNome)];
    if (c.valor != null) partes.push(moeda(c.valor));
    partes.push(dataHora(c.criadoEm));
    if (c.vendedor) partes.push("Vendedor: " + escapar(c.vendedor));

    return `
      <div class="cotacao">
        <div class="cotacao-topo">
          <strong>${escapar(c.cliente)}</strong>
          <span class="codigo">Cotação ${escapar(c.codigo)}</span>
          ${ehMenor ? '<span class="selo">Menor valor</span>' : ""}
        </div>
        <p>${partes.join(" · ")}</p>
        ${c.obs ? `<p><em>${escapar(c.obs)}</em></p>` : ""}
        <div class="anexos">${(c.arquivos || []).map(desenharAnexo).join("")}</div>
        <button type="button" class="excluir" data-id="${c.id}">Excluir</button>
      </div>
    `;
  }

  // Cotações com o mesmo código e valores diferentes: marca a de menor valor.
  function menoresValores(todas) {
    const porCodigo = {};
    todas.forEach(function (c) {
      if (c.valor == null) return;
      const k = norm(c.codigo);
      (porCodigo[k] = porCodigo[k] || []).push(c.valor);
    });
    const menores = {};
    Object.keys(porCodigo).forEach(function (k) {
      if (porCodigo[k].length >= 2) menores[k] = Math.min.apply(null, porCodigo[k]);
    });
    return menores;
  }

  async function atualizarLista() {
    let todas;
    try {
      todas = await listarCotacoes();
    } catch (erro) {
      listaCotacoes.innerHTML = "<p>Não foi possível abrir o armazenamento do navegador. Tente fora da aba anônima.</p>";
      return;
    }

    todas.sort(function (a, b) { return a.criadoEm < b.criadoEm ? 1 : -1; });
    const menores = menoresValores(todas);

    const termo = norm(buscaCotacoes.value);
    const idTransp = filtroTransportadora.value;
    const filtradas = todas.filter(function (c) {
      const alvo = norm(c.cliente + " " + c.codigo + " " + (c.vendedor || "") + " " + c.transportadoraNome);
      return alvo.includes(termo) && (idTransp === "" || c.transportadoraId === idTransp);
    });

    limparUrls();
    resumo.textContent = todas.length === 0
      ? ""
      : filtradas.length + " de " + todas.length + " cotações";

    if (filtradas.length === 0) {
      listaCotacoes.innerHTML = todas.length === 0
        ? "<p>Nenhuma cotação registrada ainda.</p>"
        : "<p>Nenhuma cotação encontrada com esses filtros.</p>";
      return;
    }

    listaCotacoes.innerHTML = filtradas.map(function (c) {
      const ehMenor = c.valor != null && menores[norm(c.codigo)] === c.valor;
      return desenharCotacao(c, ehMenor);
    }).join("");
  }

  // ---------- Salvar ----------
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const cliente = campoCliente.value.trim();
    const codigo = campoCodigo.value.trim();
    const transportadoraId = campoTransportadora.value;
    const transportadora = cadastradas.find(function (t) { return t.id === transportadoraId; });
    const vendedor = campoVendedor.value.trim();
    const arquivos = Array.from(campoArquivos.files || []);
    const valor = lerValor(campoValor.value);

    if (!cliente || !codigo || !transportadora) {
      avisar("Preencha cliente, código e transportadora.", true);
      return;
    }
    if (arquivos.length === 0) {
      avisar("Anexe pelo menos uma foto ou documento.", true);
      return;
    }
    if (arquivos.length > MAX_ARQUIVOS) {
      avisar("Máximo de " + MAX_ARQUIVOS + " arquivos por cotação.", true);
      return;
    }
    const grande = arquivos.find(function (a) { return a.size > MAX_MB * 1024 * 1024; });
    if (grande) {
      avisar('O arquivo "' + grande.name + '" passa de ' + MAX_MB + " MB.", true);
      return;
    }
    if (Number.isNaN(valor)) {
      avisar("Valor inválido. Use por exemplo 1500,00.", true);
      return;
    }

    botaoSalvar.disabled = true;
    try {
      const existentes = await listarCotacoes();
      const repetida = existentes.some(function (c) {
        return norm(c.codigo) === norm(codigo) && c.transportadoraId === transportadoraId;
      });
      if (repetida && !confirm("Já existe uma cotação com o código " + codigo + " para " + transportadora.nome + ". Salvar mesmo assim?")) {
        botaoSalvar.disabled = false;
        return;
      }

      const preparados = await Promise.all(arquivos.map(prepararArquivo));
      const agora = new Date().toISOString();
      await salvarCotacao({
        criadoEm: agora,
        cliente: cliente,
        codigo: codigo,
        transportadoraId: transportadoraId,
        transportadoraNome: transportadora.nome,
        vendedor: vendedor,
        valor: valor,
        obs: campoObs.value.trim(),
        arquivos: preparados
      });

      try {
        localStorage.setItem("cotacoes.vendedor", vendedor);
        if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
      } catch (erro) { /* sem localStorage: segue sem lembrar o vendedor */ }

      form.reset();
      campoVendedor.value = vendedor;
      avisar("Cotação salva em " + dataHora(agora) + ".", false);
      await atualizarLista();
    } catch (erro) {
      avisar("Não foi possível salvar: " + (erro && erro.message ? erro.message : "erro no navegador") + ".", true);
    }
    botaoSalvar.disabled = false;
  });

  listaCotacoes.addEventListener("click", async function (e) {
    const alvo = e.target;
    if (!alvo.classList || !alvo.classList.contains("excluir")) return;
    if (!confirm("Excluir esta cotação e os arquivos dela? Não dá para desfazer.")) return;
    await excluirCotacao(Number(alvo.dataset.id));
    await atualizarLista();
  });

  buscaCotacoes.addEventListener("input", atualizarLista);
  filtroTransportadora.addEventListener("change", atualizarLista);

  // ---------- Backup (exportar / importar) ----------
  function chaveDe(c) {
    return c.criadoEm + "|" + c.codigo + "|" + c.transportadoraId;
  }

  botaoExportar.addEventListener("click", async function () {
    const todas = await listarCotacoes();
    if (todas.length === 0) {
      avisar("Não há cotações para exportar.", true);
      return;
    }
    const saida = [];
    for (const c of todas) {
      const arquivos = [];
      for (const a of c.arquivos || []) {
        arquivos.push({ nome: a.nome, tipo: a.tipo, dados: await blobParaDataUrl(a.blob) });
      }
      saida.push(Object.assign({}, c, { id: undefined, arquivos: arquivos }));
    }
    const hoje = new Date();
    const nomeArquivo = "cotacoes-" + hoje.getFullYear() + "-" + doisDigitos(hoje.getMonth() + 1) + "-" + doisDigitos(hoje.getDate()) + ".json";
    const blob = new Blob([JSON.stringify({ versao: 1, cotacoes: saida })], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 2000);
    avisar("Backup gerado: " + nomeArquivo + " (" + saida.length + " cotações).", false);
  });

  campoImportar.addEventListener("change", async function () {
    const arquivo = campoImportar.files && campoImportar.files[0];
    if (!arquivo) return;
    try {
      const dados = JSON.parse(await arquivo.text());
      if (!dados || !Array.isArray(dados.cotacoes)) throw new Error("arquivo de backup inválido");
      const existentes = await listarCotacoes();
      const chaves = new Set(existentes.map(chaveDe));
      let novas = 0;
      for (const c of dados.cotacoes) {
        if (chaves.has(chaveDe(c))) continue;
        const arquivos = [];
        for (const a of c.arquivos || []) {
          const resposta = await fetch(a.dados);
          arquivos.push({ nome: a.nome, tipo: a.tipo, blob: await resposta.blob() });
        }
        await salvarCotacao(Object.assign({}, c, { arquivos: arquivos }));
        novas++;
      }
      avisar("Backup importado: " + novas + " cotações novas.", false);
      await atualizarLista();
    } catch (erro) {
      avisar("Não foi possível importar: " + (erro && erro.message ? erro.message : "erro"), true);
    }
    campoImportar.value = "";
  });

  // ---------- Prévia dos arquivos escolhidos ----------
  campoArquivos.addEventListener("change", function () {
    const nomes = Array.from(campoArquivos.files || []).map(function (a) {
      return escapar(a.name) + " (" + (a.size / 1024 / 1024).toFixed(1).replace(".", ",") + " MB)";
    });
    document.getElementById("cotPrevia").innerHTML = nomes.length ? nomes.join("<br>") : "";
  });

  // ---------- Atalho: botão "Registrar cotação" dentro do cartão da transportadora ----------
  const listaTransportadoras = document.getElementById("lista");
  if (listaTransportadoras) {
    listaTransportadoras.addEventListener("click", function (e) {
      const id = e.target.dataset && e.target.dataset.cotar;
      if (!id) return;
      campoTransportadora.value = id;
      mostrarAba("cotacoes");
      campoCliente.focus();
    });
  }

  // ---------- Abas ----------
  function mostrarAba(nome) {
    abaTransportadoras.hidden = nome !== "transportadoras";
    abaCotacoes.hidden = nome !== "cotacoes";
    botoesAba.forEach(function (b) {
      b.classList.toggle("ativa", b.dataset.aba === nome);
    });
    if (location.hash !== "#" + nome) history.replaceState(null, "", "#" + nome);
    if (nome === "cotacoes") atualizarLista();
  }

  function abaDoEndereco() {
    return location.hash === "#cotacoes" ? "cotacoes" : "transportadoras";
  }

  botoesAba.forEach(function (b) {
    b.addEventListener("click", function () { mostrarAba(b.dataset.aba); });
  });
  window.addEventListener("hashchange", function () { mostrarAba(abaDoEndereco()); });

  try {
    const lembrado = localStorage.getItem("cotacoes.vendedor");
    if (lembrado) campoVendedor.value = lembrado;
  } catch (erro) { /* sem localStorage */ }

  mostrarAba(abaDoEndereco());
})();
