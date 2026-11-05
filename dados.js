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
    nome: "Tanea Alexandre Pelandir (Pelantir)",
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
  },
  {
    id: "gamper",
    nome: "Gamper",
    regioes: ["PR", "SP"],
    transporta6m: "sim",
    limitesPorRegiao: [],
    tiposVeiculo: ["Baú"],
    observacao: "Só trabalha com caminhão baú. Para SP, 6 m somente sob consulta, informando o CEP à filial: em geral não leva 6 m, porque muitas regiões restringem veículo grande. Sem restrição de 6 m em Vila Maria, Vila Guilherme, Guarulhos, São Bernardo do Campo, Santo André e Diadema. Dias e período (manhã/tarde) de coleta e entrega: confirmar com a unidade.",
    contatos: {
      expedicao: {
        telefone: "41 2112-4144 (Curitiba) / 42 2101-5800 (Ponta Grossa) / 11 5668-9800 (São Paulo)",
        whatsapp: "41 99207-8244 (Curitiba) / 42 99127-9123 (Ponta Grossa) / 11 99679-4798 (São Paulo)",
        email: null
      },
      financeiro: {
        telefone: "41 2112-4144",
        whatsapp: "41 9189-0680",
        email: null,
        obs: "Financeiro Curitiba."
      },
      comercial: {
        telefone: "41 2112-4144",
        whatsapp: "41 99207-8244",
        email: null
      }
    }
  },
  {
    id: "aceville",
    nome: "Aceville",
    regioes: ["PR", "SC", "RS", "SP", "MG", "GO", "DF"],
    transporta6m: "nao",
    comprimentoMaximoMetros: 3,
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Rotas a partir de Curitiba. Em geral não atende acima de 3 m; em algumas cidades atende (veja a coluna \"Acima de 3 m\" na lista de cidades). Prazos em dias úteis após a coleta. Rastreios: tratados no grupo com Giovana e Nilce. Planilha de 01/10/2026, sujeita a alterações sem aviso.",
    contatos: {
      expedicao: {
        telefone: "41 3266-0484",
        whatsapp: "41 99992-1097 (Tobias e Marlon)",
        email: "coleta.ctb@aceville.com.br / operacional2.ctb@aceville.com.br",
        obs: "Coletas e operacional em Curitiba."
      },
      financeiro: {
        telefone: "41 3266-0484",
        whatsapp: "41 99712-0151",
        email: "cobranca.ctb@aceville.com.br"
      },
      comercial: {
        telefone: "41 3266-0484",
        whatsapp: null,
        email: "cotacao.ctb@aceville.com.br",
        obs: "Cotações: Felipe. O WhatsApp informado, (41) 99752-50297, tem um dígito a mais: confirmar."
      }
    },
    outrosContatos: [
      {
        titulo: "Pendências, avarias e devoluções",
        whatsapp: "47 99984-1798 (Jéssica)",
        email: "pendencia.ctb@aceville.com.br"
      },
      {
        titulo: "SAC / Relacionamento",
        email: "relacionamento.ctb@aceville.com.br",
        obs: "Giovana."
      }
    ]
  },
  {
    id: "tw",
    nome: "TW Transportes",
    regioes: [],
    transporta6m: "nao",
    comprimentoMaximoMetros: 3.5,
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Carga fracionada. Limite padrão de 3,5 m, podendo variar conforme a unidade responsável pela coleta e entrega. Regiões atendidas, prazos e cotações: pedir ao comercial.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: null,
        email: null
      },
      financeiro: {
        telefone: null,
        whatsapp: "51 99294-9000 (Vinicius Pelissari)",
        email: "vinicius.pelissa@twtransportes.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: null,
        email: "josue.rosa@twtransportes.com.br",
        obs: "Josué Rosa."
      }
    }
  },
  {
    id: "melck",
    nome: "Melck",
    regioes: ["Nacional"],
    transporta6m: "a_confirmar",
    limitesPorRegiao: [],
    tiposVeiculo: [],
    observacao: "Atende todo o Brasil. Prazos após a coleta: Sul, Centro-Oeste e Sudeste, 24, 48 ou 72 horas úteis; Nordeste, normalmente 3 a 7 dias úteis. Varia conforme a cidade de coleta e de destino.",
    contatos: {
      expedicao: {
        telefone: null,
        whatsapp: "41 9284-0806",
        email: "daferson.goncalves@melck.com.br / camilly.horing@melck.com.br / karoline.souza@melck.com.br",
        obs: "Coletas e fiscal."
      },
      financeiro: {
        telefone: null,
        whatsapp: "41 9138-0617",
        email: "financeiro@melck.com.br / maria.silveira@melck.com.br / ana.santiago@melck.com.br"
      },
      comercial: {
        telefone: null,
        whatsapp: "41 9105-8058 (Izadora Machado) / 41 9987-8666 (Victoria Borba)",
        email: "izadora.machado@melck.com.br / victoria.borba@melck.com.br",
        obs: "Izadora é analista e Victoria é coordenadora."
      }
    },
    outrosContatos: [
      {
        titulo: "Monitoramento",
        email: "jefferson@melck.com.br / monitoramento.melck@melck.com.br"
      }
    ]
  }
];
