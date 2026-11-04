// Dados das transportadoras. Cada bloco { ... } é uma transportadora.
// telefone = fixo | whatsapp = celular(es), separados por "/" | null = não recebido.
// "Nacional" em regioes = atende o Brasil todo.
const transportadoras = [
  {
    id: "asr",
    nome: "ASR Transportes",
    regioes: ["SP", "MG", "Curitiba", "Região Metropolitana de Curitiba"],
    transporta6m: "sim",
    limitesPorRegiao: [
      { regiao: "Interior de SP", comprimentoMaximoMetros: 3 }
    ],
    tiposVeiculo: [],
    observacao: null,
    contatos: {
      expedicao: {
        telefone: "41 3278-8381",
        whatsapp: null,
        email: null
      },
      financeiro: {
        telefone: "41 3278-8381",
        whatsapp: null,
        email: "financeiro@asrtransportes.com.br"
      },
      comercial: {
        telefone: "41 3278-8381",
        whatsapp: "41 9950-6690",
        email: "leticia@asrtransportes.com.br"
      }
    }
  },
  {
    id: "transapucarana",
    nome: "Transapucarana",
    regioes: ["PR", "SC", "SP"],
    transporta6m: "a_confirmar",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: null,
    contatos: {
      expedicao: {
        telefone: "41 3276-3440",
        whatsapp: null,
        email: null
      },
      financeiro: {
        telefone: "41 3276-3440",
        whatsapp: "41 9129-9995",
        email: null
      },
      comercial: {
        telefone: "41 3276-3440",
        whatsapp: "41 8902-0472",
        email: null
      }
    }
  },
  {
    id: "efitrans",
    nome: "Efitrans",
    regioes: ["RJ", "SP", "PR", "SC", "RS"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: ["Truck", "Carreta"],
    observacao: "Transporta tubos, perfis e chapas desde que embalados. Truck até 8 m e carreta até 12 m. Também coleta em fornecedores de SP e outras regiões. O contato de expedição é da unidade Curitiba.",
    contatos: {
      expedicao: {
        telefone: "41 3071-4747",
        whatsapp: "41 99682-8298",
        email: "expedicaoctba@efitrans.com.br"
      },
      financeiro: {
        telefone: "41 3071-4747",
        whatsapp: "41 98853-4424 / 41 99682-9375",
        email: "financeiro@efitrans.com.br"
      },
      comercial: {
        telefone: "41 3071-4754",
        whatsapp: "41 99934-2875 (Nádia Rabak)",
        email: "nadia.moreira@efitrans.com.br"
      }
    }
  },
  {
    id: "britto",
    nome: "Britto Transportes",
    regioes: ["Nacional"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: ["Truck", "Bitruck", "Carreta"],
    observacao: "Truck e bitruck: 6 m. Carreta: até 12 m. Coleta e logística têm o mesmo contato (Adilson). Número geral (celular): 41 99804-6998.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "41 99967-0787 (Adilson) / 41 99816-0038 (Manoelly)",
        email: "comercial@brittotransportes.com.br"
      },
      financeiro: {
        telefone: null,
        whatsapp: "41 98798-2349 (Adriane)",
        email: "financeiro@brittotransportes.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: "41 99816-0038 (Manoelly) / 41 98863-9903 (Carol)",
        email: "comercial@brittotransportes.com.br"
      }
    }
  },
  {
    id: "jdx",
    nome: "JDX Transportes",
    regioes: ["Nacional"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Coleta e logística têm o mesmo contato (Luis).",
    contatos: {
      expedicao: {
        telefone: "41 3168-0278",
        whatsapp: "41 8806-0140 (Luis)",
        email: null
      },
      financeiro: {
        telefone: "41 3168-0278",
        whatsapp: "41 9711-3057 (Valéria)",
        email: "financeiro@jdxtransportes.com"
      },
      comercial: {
        telefone: "41 3168-0278",
        whatsapp: "41 99694-4872 (Kayo)",
        email: "kayocampos@jdxtransportes.com"
      }
    }
  },
  {
    id: "turbo",
    nome: "Turbo Transportes",
    regioes: ["RS", "SC", "PR", "SP"],
    transporta6m: "a_confirmar",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Demais cidades de RS, SC, PR e SP: consultar demanda com o comercial. Cargas completas: atende o Brasil todo. Contatos ainda não recebidos.",
    contatos: {
      expedicao:  { telefone: null, whatsapp: null, email: null },
      financeiro: { telefone: null, whatsapp: null, email: null },
      comercial:  { telefone: null, whatsapp: null, email: null }
    }
  },
  {
    id: "transprimer",
    nome: "Transprimer",
    regioes: [],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Transporta até 7 m. Região de atuação ainda não informada.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "41 99666-3596",
        email: "cotacao@transprimer.com.br"
      },
      financeiro: {
        telefone: null,
        whatsapp: null,
        email: "transprimer@transprimer.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: "41 99666-3596",
        email: null
      }
    }
  },
  {
    id: "transpen",
    nome: "Transpen",
    regioes: [],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Região de atuação ainda não informada. Contato de coleta não informado: a expedição usa o número da logística.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "15 98188-0245",
        email: null
      },
      financeiro: {
        telefone: null,
        whatsapp: "15 98188-0199",
        email: null
      },
      comercial: {
        telefone: null,
        whatsapp: "15 99713-2740",
        email: null
      }
    }
  },
  {
    id: "pelantir",
    nome: "Tanea Alexandre Pelandir",
    regioes: ["Curitiba", "Região Metropolitana de Curitiba", "União da Vitória", "Bituruna", "Guarapuava"],
    transporta6m: "nao",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "No momento não transporta chapas, tubos e perfis de 6 m. Comprimento máximo não informado; cargas maiores ou fora do padrão são avaliadas caso a caso. Atende outras localidades por meio de parceiros.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "41 99717-8576",
        email: "operacional@pelantir.com.br"
      },
      financeiro: {
        telefone: null,
        whatsapp: "41 99717-8576",
        email: "oiles@pelantir.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: "41 99717-8576",
        email: "cotacoes@pelantir.com.br"
      }
    }
  },
  {
    id: "zambilog",
    nome: "Zambilog",
    regioes: ["Nacional"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: ["Carreta", "Sider", "VUC", "Baú", "3/4", "Van"],
    observacao: "Veículos: carreta sider, VUC baú, 3/4 sider e van. Capacidade para chapas, tubos e perfis de até 15,50 m. Mesmo contato para todos os departamentos.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "41 98856-7434 (Paola)",
        email: "rafaelzambiazi@zambilog.com.br"
      },
      financeiro: {
        telefone: null,
        whatsapp: "41 98856-7434 (Paola)",
        email: "rafaelzambiazi@zambilog.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: "41 98856-7434 (Paola)",
        email: "rafaelzambiazi@zambilog.com.br"
      }
    }
  },
  {
    id: "transjoi",
    nome: "Transjoi",
    regioes: ["RS", "SC", "PR", "SP", "GO"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Algumas cidades itinerantes não atendem o perfil de 6 m. Isso é consultado no agendamento da coleta.",
    contatos: {
      expedicao: {
        telefone: "47 4009-5600",
        whatsapp: "11 4200-0233",
        email: "sac@transjoi.com.br"
      },
      financeiro: {
        telefone: null,
        whatsapp: null,
        email: null,
        obs: "Sem contato direto: transferem ao setor responsável conforme o assunto. Use o contato da expedição/SAC."
      },
      comercial: {
        telefone: null,
        whatsapp: null,
        email: null,
        obs: "O contato só é passado a clientes que têm tabela com a Transjoi."
      }
    }
  }
];
