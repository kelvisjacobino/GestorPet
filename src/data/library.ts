
export const initialLibrary = [
  {
    metadata: {
      id: "CIVIL-001",
      slug: "acao-de-cobranca-procedimento-comum",
      titulo: "Ação de Cobrança - Procedimento Comum",
      area: "Direito Civil",
      categoria: "Cobranca",
      subcategoria: "Procedimento Comum",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Cobrança", "Civil", "Inadimplemento"],
      variaveis: ["CLIENTE", "CPF", "ENDERECO", "ADVOGADO", "OAB", "REU", "CPF_REU", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSAO}}, portador da cédula de identidade RG nº {{RG}} e inscrito no CPF sob o nº {{CPF}}, residente e domiciliado na {{ENDERECO}}, {{NUMERO}}, {{BAIRRO}}, {{CEP}}, {{CIDADE}} - {{ESTADO}}, por intermédio de seu advogado infra-assinado, com escritório profissional na {{ENDERECO_ADV}}, onde recebe notificações e intimações, vem, respeitosamente, à presença de Vossa Excelência, propor a presente:

# AÇÃO DE COBRANÇA

em face de **{{REU}}**, {{NACIONALIDADE_REU}}, {{ESTADO_CIVIL_REU}}, {{PROFISSAO_REU}}, portador da cédula de identidade RG nº {{RG_REU}} e inscrito no CPF sob o nº {{CPF_REU}}, residente e domiciliado na {{ENDERECO_REU}}, {{NUMERO_REU}}, {{BAIRRO_REU}}, {{CEP_REU}}, {{CIDADE_REU}} - {{ESTADO_REU}}, pelos fatos e fundamentos a seguir expostos:

# DOS FATOS

O Requerente é credor do Requerido da importância líquida e certa de R$ {{VALOR_CAUSA}}, originária de {{DESCRICAO_NEGOCIO}}.

Ocorre que, apesar de diversas tentativas de recebimento amigável do referido crédito, o Requerido não efetuou o pagamento, restando ao Requerente apenas a via judicial para a satisfação de seu crédito.

# DO DIREITO

A pretensão do Requerente encontra fundamento legal no Código Civil Brasileiro, especificamente no que tange ao inadimplemento das obrigações.

Conforme dispõe o art. 389 do Código Civil: "Não cumprida a obrigação, responde o devedor por perdas e danos, mais juros e atualização monetária segundo índices oficiais regularmente estabelecidos, e honorários de advogado."

Dessa forma, o Requerido está em mora com o Requerente, devendo ser compelido ao pagamento do principal acrescido de encargos legais.

# DOS PEDIDOS

Diante do exposto, requer a Vossa Excelência:

1. A citação do Requerido para, querendo, apresentar contestação no prazo legal, sob pena de revelia e confissão quanto à matéria de fato;
2. A procedência total da presente ação, condenando o Requerido ao pagamento da importância de R$ {{VALOR_CAUSA}}, devidamente atualizada com juros e correção monetária até a data do efetivo pagamento;
3. A condenação do Requerido ao pagamento das custas processuais e honorários advocatícios, nos termos do art. 85, §2º do CPC.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "PENAL-001",
      slug: "habeas-corpus-prisao-preventiva-ilegal",
      titulo: "Habeas Corpus por Prisão Preventiva Ilegal",
      area: "Direito Penal",
      categoria: "Habeas Corpus",
      subcategoria: "Prisão Preventiva",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["HC", "prisão preventiva", "CPP"],
      variaveis: ["CLIENTE", "ADVOGADO", "OAB", "PROCESSO", "AUTORIDADE", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR PRESIDENTE DO EGRÉGIO TRIBUNAL DE JUSTIÇA DO ESTADO DE {{ESTADO}}

**{{ADVOGADO}}**, brasileiro, advogado regularmente inscrito na OAB/{{ESTADO}} sob o nº {{OAB}}, com escritório profissional na {{ENDERECO_ADV}}, vem, respeitosamente, à presença de Vossa Excelência, com fulcro no art. 5º, inciso LXVIII, da Constituição Federal, e nos arts. 647 e seguintes do Código de Processo Penal, impetrar a presente ordem de:

# HABEAS CORPUS COM PEDIDO LIMINAR

em favor de **{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSAO}}, atualmente recolhido no {{ESTABELECIMENTO_PRISIONAL}}, figurando como autoridade coatora o MM. Juiz de Direito da {{VARA}} Criminal da Comarca de {{COMARCA}}, nos autos do processo nº {{PROCESSO}}, pelos motivos fáticos e jurídicos a seguir aduzidos:

# DOS FATOS

O Paciente foi preso preventivamente em {{DATA_PRISAO}}, sob a alegação de {{FUNDAMENTO_PRISAO}}.

Entretanto, a decisão que decretou a segregação cautelar carece de fundamentação concreta, limitando-se a repetir os termos genéricos da lei, sem demonstrar a presença real dos requisitos previstos no art. 312 do CPP.

# DO DIREITO

A liberdade é a regra no ordenamento jurídico pátrio, sendo a prisão cautelar medida excepcional que exige fundamentação idônea e baseada em elementos concretos de cautelaridade.

Conforme o art. 5º, inciso LXVI da Constituição Federal: "ninguém será levado à prisão ou nela mantido, quando a lei admitir a liberdade provisória, com ou sem fiança".

No presente caso, o Paciente possui residência fixa, trabalho lícito e é primário, não havendo qualquer indício de que, em liberdade, representará risco à ordem pública ou à instrução criminal.

# DOS PEDIDOS

Ante o exposto, requer:

1. A concessão da liminar, para que seja expedido o competente alvará de soltura em favor do Paciente;
2. A requisição de informações à autoridade coatora;
3. Ao final, a concessão definitiva da ordem de Habeas Corpus, confirmando a liminar outrora deferida.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CONSUM-001",
      slug: "indenizacao-danos-morais-atraso-voo",
      titulo: "Indenização por Danos Morais - Atraso de Voo",
      area: "Direito do Consumidor",
      categoria: "Danos Morais",
      subcategoria: "Transporte Aéreo",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Consumidor", "Aéreo", "Danos Morais"],
      variaveis: ["CLIENTE", "CPF", "REU", "CNPJ", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSAO}}, portador da cédula de identidade RG nº {{RG}} e inscrito no CPF sob o nº {{CPF}}, residente e domiciliado na {{ENDERECO}}, por intermédio de seu advogado, vem propor a presente:

# AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS E MATERIAIS

em face de **{{REU}}**, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº {{CNPJ}}, com sede na {{ENDERECO_REU}}, pelos fatos e fundamentos a seguir expostos:

# DOS FATOS

O Autor adquiriu passagens aéreas da Ré para o trecho {{TRECHO}}, com saída prevista para as {{HORA_SAIDA}} do dia {{DATA}}.

Entretanto, o voo sofreu um atraso injustificado de {{HORAS_ATRASO}} horas, causando ao Autor a perda de compromissos importantes e profundo desgaste emocional, sem que a Ré prestasse a assistência devida.

# DO DIREITO

A relação entre as partes é de consumo, aplicando-se o Código de Defesa do Consumidor. A responsabilidade da Ré é objetiva, nos termos do art. 14 do CDC.

O atraso excessivo de voo gera dano moral in re ipsa, conforme entendimento consolidado dos tribunais, ante a violação do direito ao transporte eficiente e seguro.

# DOS PEDIDOS

Requer:

1. A inversão do ônus da prova;
2. A condenação da Ré ao pagamento de indenização por danos morais no valor de R$ {{VALOR_CAUSA_MORAL}};
3. A condenação ao pagamento de danos materiais no valor de R$ {{VALOR_CAUSA_MATERIAL}}.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "FAMILIA-001",
      slug: "acao-de-alimentos-filho-menor",
      titulo: "Ação de Alimentos - Filho Menor",
      area: "Direito de Família",
      categoria: "Alimentos",
      subcategoria: "Menor",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Família", "Alimentos", "Menor"],
      variaveis: ["CLIENTE", "CPF", "REU", "CPF_REU", "COMARCA", "VALOR_ALIMENTOS"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DE FAMÍLIA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, menor impúbere, neste ato representado por sua genitora, **{{MAE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, residente na {{ENDERECO}}, vem propor a presente:

# AÇÃO DE ALIMENTOS COM PEDIDO DE ALIMENTOS PROVISÓRIOS

em face de **{{REU}}**, {{NACIONALIDADE}}, {{PROFISSAO}}, residente na {{ENDERECO_REU}}, pelos fundamentos seguintes:

# DOS FATOS

O Autor é filho do Requerido, conforme prova a certidão de nascimento anexa. A genitora do Autor não possui condições de arcar sozinha com todas as despesas de manutenção da criança.

O Requerido, por sua vez, possui capacidade financeira para contribuir com o sustento do filho, exercendo a profissão de {{PROFISSAO_REU}}.

# DO DIREITO

O dever de prestar alimentos aos filhos deriva do poder familiar, conforme arts. 1.694 e 1.696 do Código Civil. O binômio necessidade-possibilidade deve nortear a fixação do valor.

# DOS PEDIDOS

Requer:

1. A fixação de alimentos provisórios no valor de {{PERCENTUAL_OU_VALOR}};
2. A citação do Requerido;
3. A procedência para fixar os alimentos definitivos;
4. A intervenção do Ministério Público.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "TRAB-001",
      slug: "reclamacao-trabalhista-verbas-rescisorias",
      titulo: "Reclamação Trabalhista - Verbas Rescisórias",
      area: "Direito Trabalhista",
      categoria: "Reclamação",
      subcategoria: "Verbas Rescisórias",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Trabalhista", "Rescisão", "CLT"],
      variaveis: ["CLIENTE", "CPF", "REU", "CNPJ", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DA ____ VARA DO TRABALHO DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSAO}}, portador da CTPS nº {{CTPS}}, residente na {{ENDERECO}}, vem propor a presente:

# RECLAMAÇÃO TRABALHISTA

em face de **{{REU}}**, inscrita no CNPJ sob o nº {{CNPJ}}, com sede na {{ENDERECO_REU}}, pelos motivos seguintes:

# DOS FATOS

O Reclamante trabalhou para a Reclamada no período de {{DATA_INICIO}} a {{DATA_FIM}}, exercendo a função de {{FUNCAO}}, percebendo como última remuneração o valor de R$ {{SALARIO}}.

Ocorre que, ao ser dispensado sem justa causa, a Reclamada não efetuou o pagamento correto das verbas rescisórias, tais como aviso prévio, 13º proporcional e férias.

# DO DIREITO

O descumprimento das obrigações trabalhistas gera o direito ao recebimento das verbas inadimplidas, acrescidas das multas dos arts. 467 e 477 da CLT.

# DOS PEDIDOS

Requer:

1. O pagamento do aviso prévio indenizado;
2. O pagamento do 13º salário proporcional;
3. O pagamento das férias acrescidas de 1/3;
4. A liberação do FGTS com a multa de 40%.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "FAMILIA-002",
      slug: "divorcio-consensual",
      titulo: "Divórcio Consensual",
      area: "Direito de Família",
      categoria: "Divórcio",
      subcategoria: "Consensual",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Família", "Divórcio", "Consensual"],
      variaveis: ["CLIENTE_1", "CLIENTE_2", "DATA_CASAMENTO", "REGIME_BENS", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DE FAMÍLIA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE_1}}** e **{{CLIENTE_2}}**, ambos devidamente qualificados nos autos, por intermédio de seu advogado comum, vêm propor a presente:

# AÇÃO DE DIVÓRCIO CONSENSUAL

pelas razões a seguir expostas:

# DOS FATOS

Os Requerentes contraíram matrimônio em {{DATA_CASAMENTO}}, sob o regime de {{REGIME_BENS}}. Desta união {{POSSUI_FILHOS}}.

Entretanto, não há mais possibilidade de manutenção da vida em comum, tendo as partes decidido, de comum acordo, pelo divórcio.

# DO DIREITO

O art. 226, § 6º, da Constituição Federal, dispõe que o casamento civil pode ser dissolvido pelo divórcio, sem a necessidade de prévia separação judicial.

# DOS PEDIDOS

Requerem a homologação do divórcio consensual, com a expedição do mandado de averbação.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "SUCESS-001",
      slug: "inventario-e-partilha",
      titulo: "Ação de Inventário e Partilha",
      area: "Direito Sucessório",
      categoria: "Inventário",
      subcategoria: "Partilha",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Sucessório", "Inventário", "Partilha"],
      variaveis: ["CLIENTE", "FALECIDO", "DATA_FALECIMENTO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DE SUCESSÕES DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, na qualidade de inventariante, vem propor a presente:

# AÇÃO DE INVENTÁRIO

dos bens deixados pelo falecimento de **{{FALECIDO}}**, ocorrido em {{DATA_FALECIMENTO}}, conforme fundamentos a seguir:

# DOS FATOS

O de cujus faleceu em {{DATA_FALECIMENTO}}, deixando bens a inventariar e herdeiros.

# DO DIREITO

Conforme o art. 611 do CPC, o processo de inventário e partilha deve ser instaurado no prazo de 2 meses a contar da abertura da sucessão.

# DOS PEDIDOS

Requer a abertura do inventário e a nomeação do Requerente como inventariante.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "IMOB-001",
      slug: "acao-de-despejo-falta-pagamento",
      titulo: "Ação de Despejo por Falta de Pagamento",
      area: "Direito Imobiliário",
      categoria: "Despejo",
      subcategoria: "Falta de Pagamento",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Imobiliário", "Despejo", "Locação"],
      variaveis: ["CLIENTE", "REU", "IMOVEL", "VALOR_ALUGUEL", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, proprietário do imóvel situado na {{IMOVEL}}, vem propor a presente:

# AÇÃO DE DESPEJO POR FALTA DE PAGAMENTO

em face de **{{REU}}**, locatário do referido imóvel, pelos motivos seguintes:

# DOS FATOS

As partes firmaram contrato de locação em {{DATA_CONTRATO}}. Ocorre que o Requerido encontra-se inadimplente com os aluguéis desde {{DATA_INADIMPLEMENTO}}.

# DO DIREITO

A Lei 8.245/91 prevê o despejo em caso de falta de pagamento do aluguel e acessórios da locação no prazo estipulado.

# DOS PEDIDOS

Requer a rescisão do contrato e a decretação do despejo.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "PREV-001",
      slug: "aposentadoria-por-idade-urbana",
      titulo: "Aposentadoria por Idade Urbana",
      area: "Direito Previdenciário",
      categoria: "Aposentadoria",
      subcategoria: "Idade Urbana",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Previdenciário", "INSS", "Aposentadoria"],
      variaveis: ["CLIENTE", "CPF", "NB", "DATA_DER", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ FEDERAL DA ____ VARA GABINETE DO JUIZADO ESPECIAL FEDERAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSAO}}, portador do RG nº {{RG}} e CPF nº {{CPF}}, residente na {{ENDERECO}}, vem propor a presente:

# AÇÃO PREVIDENCIÁRIA DE CONCESSÃO DE APOSENTADORIA POR IDADE URBANA

em face do **INSTITUTO NACIONAL DO SEGURO SOCIAL - INSS**, autarquia federal, pelos fatos e fundamentos a seguir expostos:

# DOS FATOS

A Parte Autora requereu junto à Autarquia Ré, em {{DATA_DER}}, o benefício de aposentadoria por idade urbana, o qual foi indeferido sob o argumento de {{MOTIVO_INDEFERIMENTO}}.

Ocorre que a Parte Autora já atingiu a idade mínima de {{IDADE}} anos e possui mais de {{CARENCIA}} meses de carência, preenchendo todos os requisitos legais para a concessão do benefício.

# DO DIREITO

A aposentadoria por idade urbana está prevista no art. 48 da Lei 8.213/91, exigindo-se a idade de 65 anos para homens e 62 anos para mulheres (após a EC 103/2019), além da carência de 180 contribuições.

# DOS PEDIDOS

Requer:

1. A citação do INSS;
2. A condenação do INSS à concessão do benefício de aposentadoria por idade desde a DER;
3. O pagamento das parcelas vencidas e vincendas.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "TRIB-001",
      slug: "anulatoria-debito-fiscal",
      titulo: "Ação Anulatória de Débito Fiscal",
      area: "Direito Tributário",
      categoria: "Anulatória",
      subcategoria: "Débito Fiscal",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Tributário", "Anulatória", "Fisco"],
      variaveis: ["CLIENTE", "CNPJ", "REU", "AUTO_INFRACAO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DA FAZENDA PÚBLICA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº {{CNPJ}}, vem propor a presente:

# AÇÃO ANULATÓRIA DE DÉBITO FISCAL COM PEDIDO DE TUTELA DE URGÊNCIA

em face do **ESTADO DE {{ESTADO}}**, pessoa jurídica de direito público, pelos motivos seguintes:

# DOS FATOS

A Requerente foi autuada através do Auto de Infração nº {{AUTO_INFRACAO}}, sob a alegação de descumprimento da obrigação tributária relativa ao {{IMPOSTO}}.

Entretanto, o referido lançamento padece de nulidade, uma vez que {{MOTIVO_NULIDADE}}, violando os princípios da legalidade e da tipicidade tributária.

# DO DIREITO

O lançamento tributário deve observar estritamente as hipóteses previstas em lei. A ausência de subsunção do fato à norma torna o débito inexigível.

# DOS PEDIDOS

Requer:

1. A concessão da tutela de urgência para suspender a exigibilidade do crédito tributário;
2. A procedência total para anular o débito fiscal.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "ADMIN-001",
      slug: "mandado-de-seguranca-concurso",
      titulo: "Mandado de Segurança - Concurso Público",
      area: "Direito Administrativo",
      categoria: "Mandado de Segurança",
      subcategoria: "Concurso Público",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Administrativo", "MS", "Concurso"],
      variaveis: ["CLIENTE", "AUTORIDADE", "CONCURSO", "CARGO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DA FAZENDA PÚBLICA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, residente na {{ENDERECO}}, vem impetrar o presente:

# MANDADO DE SEGURANÇA COM PEDIDO DE LIMINAR

em face de ato omissivo da **{{AUTORIDADE}}**, vinculada à {{ORGAO_PUBLICO}}, relativo ao Concurso Público nº {{CONCURSO}} para o cargo de {{CARGO}}, pelos fundamentos a seguir:

# DOS FATOS

O Impetrante foi aprovado dentro do número de vagas oferecidas no edital do referido concurso. Ocorre que o prazo de validade do certame está prestes a expirar sem que a Administração tenha procedido à sua nomeação.

# DO DIREITO

A aprovação dentro do número de vagas gera direito subjetivo à nomeação, conforme entendimento consolidado pelo Supremo Tribunal Federal em sede de repercussão geral (RE 598.099).

# DOS PEDIDOS

Requer:

1. A concessão da liminar para reserva de vaga;
2. A notificação da autoridade coatora;
3. A concessão definitiva da segurança para determinar a nomeação e posse do Impetrante.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "BANC-001",
      slug: "revisional-contrato-bancario",
      titulo: "Ação Revisional de Contrato Bancário",
      area: "Direito Bancário",
      categoria: "Revisional",
      subcategoria: "Contrato",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Bancário", "Revisional", "Juros"],
      variaveis: ["CLIENTE", "BANCO", "CONTRATO", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO REVISIONAL DE CONTRATO BANCÁRIO

em face do **{{BANCO}}**, instituição financeira, pelos motivos seguintes:

# DOS FATOS

O Autor celebrou com o Réu o contrato de financiamento nº {{CONTRATO}}. Ocorre que as taxas de juros aplicadas são abusivas e superiores à média de mercado divulgada pelo Banco Central.

# DO DIREITO

A revisão contratual é direito do consumidor quando as cláusulas se tornam excessivamente onerosas, violando o princípio do equilíbrio contratual e do CDC.

# DOS PEDIDOS

Requer a revisão das cláusulas abusivas e a repetição do indébito.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "MED-001",
      slug: "indenizacao-erro-medico",
      titulo: "Indenização por Erro Médico",
      area: "Direito Médico",
      categoria: "Indenização",
      subcategoria: "Erro Médico",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Médico", "Erro", "Responsabilidade Civil"],
      variaveis: ["CLIENTE", "REU", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS E MATERIAIS DECORRENTES DE ERRO MÉDICO

em face de **{{REU}}**, pelos motivos de fato e de direito que passa a expor:

# DOS FATOS

O Autor submeteu-se a procedimento cirúrgico realizado pelo Réu em {{DATA}}. Ocorre que, por negligência e imperícia, o Réu causou ao Autor {{SEQUELA}}.

# DO DIREITO

A responsabilidade civil do médico decorre da violação do dever de cuidado e da obrigação de meio. O nexo causal entre a conduta e o dano enseja a obrigação de indenizar.

# DOS PEDIDOS

Requer a condenação ao pagamento de danos morais, materiais e estéticos.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "AMB-001",
      slug: "acao-civil-publica-dano-ambiental",
      titulo: "Ação Civil Pública - Dano Ambiental",
      area: "Direito Ambiental",
      categoria: "Ação Civil Pública",
      subcategoria: "Dano Ambiental",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Ambiental", "ACP", "Dano"],
      variaveis: ["AUTOR", "REU", "LOCAL_DANO", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

O **MINISTÉRIO PÚBLICO DO ESTADO DE {{ESTADO}}**, por seu Promotor de Justiça, vem propor a presente:

# AÇÃO CIVIL PÚBLICA COM PEDIDO DE LIMINAR

em face de **{{REU}}**, pelos fundamentos seguintes:

# DOS FATOS

Foi constatado que o Réu vem realizando atividades de {{ATIVIDADE}} na área de {{LOCAL_DANO}}, sem o devido licenciamento ambiental e causando degradação da fauna e flora locais.

# DO DIREITO

A Constituição Federal estabelece no art. 225 que todos têm direito ao meio ambiente ecologicamente equilibrado. A Lei 7.347/85 disciplina a ação civil pública por danos causados ao meio ambiente.

# DOS PEDIDOS

Requer a cessação imediata das atividades e a recuperação da área degradada.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{PROMOTOR}}**`
  },
  {
    metadata: {
      id: "DIG-001",
      slug: "indenizacao-lgpd",
      titulo: "Indenização por Violação da LGPD",
      area: "Direito Digital",
      categoria: "Indenização",
      subcategoria: "LGPD",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Digital", "LGPD", "Privacidade"],
      variaveis: ["CLIENTE", "EMPRESA", "DADO_VAZADO", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS POR VIOLAÇÃO À LGPD

em face de **{{EMPRESA}}**, pelos motivos seguintes:

# DOS FATOS

O Autor teve seus dados pessoais, especificamente {{DADO_VAZADO}}, expostos indevidamente por falha na segurança dos sistemas da Ré.

# DO DIREITO

A Lei Geral de Proteção de Dados (Lei 13.709/18) estabelece a responsabilidade dos agentes de tratamento pelos danos causados em virtude do tratamento irregular de dados pessoais.

# DOS PEDIDOS

Requer a condenação da Ré ao pagamento de indenização por danos morais.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "ELEIT-001",
      slug: "recurso-expedicao-diploma",
      titulo: "Recurso contra Expedição de Diploma",
      area: "Direito Eleitoral",
      categoria: "Recurso",
      subcategoria: "Diploma",
      tipo: "Recursos",
      versao: "1.0",
      tags: ["Eleitoral", "Recurso", "Diploma"],
      variaveis: ["RECORRENTE", "RECORRIDO", "ELEICAO", "CARGO", "COMARCA"]
    },
    markdown: `# AO EGRÉGIO TRIBUNAL REGIONAL ELEITORAL DO ESTADO DE {{ESTADO}}

**{{RECORRENTE}}**, por seu advogado, vem interpor o presente:

# RECURSO CONTRA EXPEDIÇÃO DE DIPLOMA (RCED)

em face da expedição do diploma de **{{RECORRIDO}}**, eleito para o cargo de {{CARGO}} nas eleições de {{ELEICAO}}, pelos fundamentos seguintes:

# DOS FATOS

O Recorrido incorreu em causa de inelegibilidade superveniente consistente em {{CAUSA_INELEGIBILIDADE}}, o que obsta a manutenção de seu diploma.

# DO DIREITO

O art. 262 do Código Eleitoral prevê o recurso contra expedição de diploma nos casos de inelegibilidade ou ausência de condição de elegibilidade.

# DOS PEDIDOS

Requer o provimento do recurso para cassar o diploma do Recorrido.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "INT-001",
      slug: "homologacao-sentenca-estrangeira",
      titulo: "Homologação de Sentença Estrangeira",
      area: "Direito Internacional",
      categoria: "Homologação",
      subcategoria: "Sentença",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Internacional", "Sentença", "STJ"],
      variaveis: ["REQUERENTE", "REQUERIDO", "SENTENCA_ORIGEM", "PAIS_ORIGEM", "BRASILIA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR MINISTRO PRESIDENTE DO SUPERIOR TRIBUNAL DE JUSTIÇA

**{{REQUERENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE HOMOLOGAÇÃO DE SENTENÇA ESTRANGEIRA

proferida pelo Juízo de {{SENTENCA_ORIGEM}} no {{PAIS_ORIGEM}}, em face de **{{REQUERIDO}}**, pelos fundamentos seguintes:

# DOS FATOS

A sentença estrangeira objeto de homologação transitou em julgado e cumpre todos os requisitos formais para sua eficácia no Brasil.

# DO DIREITO

Conforme o art. 961 do CPC, a sentença estrangeira somente terá eficácia no Brasil após sua homologação pelo STJ.

# DOS PEDIDOS

Requer a homologação da referida sentença.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{BRASILIA}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "MIL-001",
      slug: "mandado-seguranca-reforma-militar",
      titulo: "Mandado de Segurança - Reforma Militar",
      area: "Direito Militar",
      categoria: "Mandado de Segurança",
      subcategoria: "Reforma",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Militar", "Reforma", "MS"],
      variaveis: ["IMPETRANTE", "AUTORIDADE", "PATENTE", "FORCA_ARMADA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ FEDERAL DA ____ VARA FEDERAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{IMPETRANTE}}**, {{PATENTE}} da {{FORCA_ARMADA}}, vem impetrar:

# MANDADO DE SEGURANÇA COM PEDIDO DE LIMINAR

em face de ato da **{{AUTORIDADE}}**, pelos fundamentos seguintes:

# DOS FATOS

O Impetrante foi julgado incapaz definitivamente para o serviço militar, mas a Administração negou seu direito à reforma remunerada, alegando {{ALEGACAO_ADM}}.

# DO DIREITO

O Estatuto dos Militares (Lei 6.880/80) garante a reforma ao militar que se torne incapaz definitivamente.

# DOS PEDIDOS

Requer a concessão da segurança para determinar a reforma do Impetrante.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "FAMILIA-003",
      slug: "acao-de-guarda-e-visitas",
      titulo: "Ação de Guarda e Regulamentação de Visitas",
      area: "Direito de Família",
      categoria: "Guarda",
      subcategoria: "Visitas",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Família", "Guarda", "Visitas"],
      variaveis: ["AUTOR", "REU", "MENOR", "COMARCA", "VALOR_CAUSA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DE FAMÍLIA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{AUTOR}}**, genitor(a) do menor **{{MENOR}}**, vem propor a presente:

# AÇÃO DE GUARDA E REGULAMENTAÇÃO DE VISITAS

em face de **{{REU}}**, pelos motivos seguintes:

# DOS FATOS

As partes estão separadas e necessitam regulamentar a guarda e as visitas do filho em comum, visando o melhor interesse da criança.

# DO DIREITO

O art. 1.583 do Código Civil estabelece que a guarda será unilateral ou compartilhada, devendo prevalecer sempre o bem-estar do menor.

# DOS PEDIDOS

Requer o estabelecimento da guarda compartilhada e a fixação do regime de visitas.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CIVIL-002",
      slug: "acao-de-usucapiao-extraordinaria",
      titulo: "Ação de Usucapião Extraordinária",
      area: "Direito Civil",
      categoria: "Usucapião",
      subcategoria: "Extraordinária",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Civil", "Usucapião", "Propriedade"],
      variaveis: ["CLIENTE", "IMOVEL", "TEMPO_POSSE", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE USUCAPIÃO EXTRAORDINÁRIA

relativa ao imóvel situado na {{IMOVEL}}, pelos fundamentos seguintes:

# DOS FATOS

O Autor detém a posse mansa, pacífica e ininterrupta do referido imóvel há mais de {{TEMPO_POSSE}} anos, agindo com animus domini.

# DO DIREITO

O art. 1.238 do Código Civil estabelece que aquele que possuir imóvel por 15 anos, sem interrupção nem oposição, adquire-lhe a propriedade.

# DOS PEDIDOS

Requer a declaração da aquisição da propriedade pelo Autor.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CIVIL-003",
      slug: "reintegracao-de-posse-esbulho",
      titulo: "Ação de Reintegração de Posse",
      area: "Direito Civil",
      categoria: "Possessória",
      subcategoria: "Reintegração",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Civil", "Possessória", "Esbulho"],
      variaveis: ["CLIENTE", "REU", "IMOVEL", "DATA_ESBULHO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, possuidor do imóvel situado na {{IMOVEL}}, vem propor a presente:

# AÇÃO DE REINTEGRAÇÃO DE POSSE COM PEDIDO DE LIMINAR

em face de **{{REU}}**, pelos motivos seguintes:

# DOS FATOS

O Autor sofreu esbulho possessório em {{DATA_ESBULHO}}, quando o Réu invadiu o imóvel de forma violenta/clandestina.

# DO DIREITO

O possuidor tem direito a ser reintegrado na posse em caso de esbulho, conforme art. 560 do CPC.

# DOS PEDIDOS

Requer a expedição de mandado liminar de reintegração de posse.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "PENAL-002",
      slug: "queixa-crime-calunia-difamacao",
      titulo: "Queixa-Crime - Calúnia e Difamação",
      area: "Direito Penal",
      categoria: "Queixa-Crime",
      subcategoria: "Honra",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Penal", "Honra", "Queixa"],
      variaveis: ["QUERELANTE", "QUERELADO", "FATO_CRIMINOSO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CRIMINAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{QUERELANTE}}**, devidamente qualificado, por seu advogado com poderes especiais, vem oferecer:

# QUEIXA-CRIME

em face de **{{QUERELADO}}**, pelos motivos de fato e de direito seguintes:

# DOS FATOS

Em {{DATA}}, o Querelado proferiu palavras ofensivas à honra do Querelante, imputando-lhe falsamente fato definido como crime (calúnia) e fato ofensivo à sua reputação (difamação).

# DO DIREITO

A conduta do Querelado amolda-se aos tipos penais previstos nos arts. 138 e 139 do Código Penal.

# DOS PEDIDOS

Requer o recebimento da queixa e a condenação do Querelado.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "TRIB-002",
      slug: "mandado-seguranca-compensacao-tributaria",
      titulo: "Mandado de Segurança - Compensação Tributária",
      area: "Direito Tributário",
      categoria: "Mandado de Segurança",
      subcategoria: "Compensação",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Tributário", "MS", "Compensação"],
      variaveis: ["IMPETRANTE", "AUTORIDADE", "TRIBUTO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ FEDERAL DA ____ VARA FEDERAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{IMPETRANTE}}**, pessoa jurídica, vem impetrar:

# MANDADO DE SEGURANÇA COM PEDIDO DE LIMINAR

em face de ato do **DELEGADO DA RECEITA FEDERAL**, pelos motivos seguintes:

# DOS FATOS

A Impetrante possui créditos tributários decorrentes de {{ORIGEM_CREDITO}} e pretende realizar a compensação com débitos de {{TRIBUTO}}, direito este negado pela autoridade coatora.

# DO DIREITO

O direito à compensação tributária está previsto no art. 170 do CTN e na Lei 9.430/96.

# DOS PEDIDOS

Requer a concessão da segurança para garantir o direito à compensação.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "EMP-001",
      slug: "recuperacao-judicial",
      titulo: "Pedido de Recuperação Judicial",
      area: "Direito Empresarial",
      categoria: "Recuperação",
      subcategoria: "Judicial",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Empresarial", "Recuperação", "Falência"],
      variaveis: ["EMPRESA", "CNPJ", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DE FALÊNCIAS E RECUPERAÇÕES JUDICIAIS DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{EMPRESA}}**, inscrita no CNPJ sob o nº {{CNPJ}}, vem requerer a sua:

# RECUPERAÇÃO JUDICIAL

com fulcro na Lei 11.101/2005, pelos motivos seguintes:

# DOS FATOS

A Requerente atravessa crise econômico-financeira decorrente de {{MOTIVOS_CRISE}}, o que tem dificultado o cumprimento de suas obrigações. Contudo, a empresa é viável e a recuperação permitirá a manutenção da fonte produtora e dos empregos.

# DO DIREITO

A Lei 11.101/05 visa viabilizar a superação da situação de crise econômico-financeira do devedor, a fim de permitir a manutenção da unidade produtiva.

# DOS PEDIDOS

Requer o deferimento do processamento da recuperação judicial.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CIVIL-004",
      slug: "indenizacao-acidente-transito",
      titulo: "Indenização por Acidente de Trânsito",
      area: "Direito Civil",
      categoria: "Responsabilidade Civil",
      subcategoria: "Acidente de Trânsito",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Civil", "Trânsito", "Indenização"],
      variaveis: ["CLIENTE", "REU", "DATA_ACIDENTE", "PLACA_REU", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS E MORAIS DECORRENTES DE ACIDENTE DE TRÂNSITO

em face de **{{REU}}**, pelos motivos seguintes:

# DOS FATOS

Em {{DATA_ACIDENTE}}, o Autor trafegava com seu veículo quando foi atingido pelo veículo do Réu, placa {{PLACA_REU}}, que avançou o sinal vermelho/invadiu a preferencial.

# DO DIREITO

Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, comete ato ilícito, ficando obrigado a repará-lo (art. 186 e 927 do CC).

# DOS PEDIDOS

Requer a condenação do Réu ao pagamento de danos materiais (conserto do veículo) e danos morais.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "PENAL-003",
      slug: "liberdade-provisoria-sem-fianca",
      titulo: "Pedido de Liberdade Provisória",
      area: "Direito Penal",
      categoria: "Liberdade",
      subcategoria: "Provisória",
      tipo: "Petição Intermediária",
      versao: "1.0",
      tags: ["Penal", "Liberdade", "Prisão"],
      variaveis: ["CLIENTE", "PROCESSO", "COMARCA", "DATA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CRIMINAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, já qualificado nos autos do processo nº {{PROCESSO}}, vem requerer a concessão de:

# LIBERDADE PROVISÓRIA SEM FIANÇA

com fulcro no art. 310, inciso III e art. 321, ambos do Código de Processo Penal, pelos motivos seguintes:

# DOS FATOS

O Requerente foi preso em flagrante pela suposta prática do crime de {{CRIME}}. Ocorre que não estão presentes os requisitos da prisão preventiva.

# DO DIREITO

Inexistindo as hipóteses que autorizam a prisão preventiva (art. 312 CPP), o juiz deverá conceder a liberdade provisória.

# DOS PEDIDOS

Requer a concessão da liberdade provisória, com a expedição do alvará de soltura.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CONSUM-002",
      slug: "repeticao-indebito-cobranca-indevida",
      titulo: "Repetição de Indébito - Cobrança Indevida",
      area: "Direito do Consumidor",
      categoria: "Repetição de Indébito",
      subcategoria: "Cobrança Indevida",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Consumidor", "Cobrança", "Indébito"],
      variaveis: ["CLIENTE", "EMPRESA", "VALOR_COBRADO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE REPETIÇÃO DE INDÉBITO C/C DANOS MORAIS

em face de **{{EMPRESA}}**, pelos motivos seguintes:

# DOS FATOS

O Autor foi cobrado indevidamente pela Ré no valor de R$ {{VALOR_COBRADO}}, referente a serviço nunca contratado/já cancelado. O Autor efetuou o pagamento sob pena de negativação.

# DO DIREITO

O consumidor cobrado em quantia indevida tem direito à repetição do indébito, por valor igual ao dobro do que pagou em excesso (art. 42, parágrafo único do CDC).

# DOS PEDIDOS

Requer a devolução em dobro do valor pago e indenização por danos morais.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "ADMIN-002",
      slug: "defesa-previa-improbidade",
      titulo: "Defesa Prévia - Improbidade Administrativa",
      area: "Direito Administrativo",
      categoria: "Improbidade",
      subcategoria: "Defesa Prévia",
      tipo: "Petição Intermediária",
      versao: "1.0",
      tags: ["Administrativo", "Improbidade", "Defesa"],
      variaveis: ["REU", "PROCESSO", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DA FAZENDA PÚBLICA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{REU}}**, já qualificado nos autos da AÇÃO DE IMPROBIDADE ADMINISTRATIVA nº {{PROCESSO}}, vem apresentar sua:

# DEFESA PRÉVIA

com fulcro no art. 17, § 7º da Lei 8.429/92, pelos fundamentos seguintes:

# DOS FATOS

O Ministério Público alega que o Requerido teria praticado ato de improbidade consistente em {{ALEGACAO_MP}}. Contudo, tal alegação não condiz com a realidade, pois {{FUNDAMENTO_DEFESA}}.

# DO DIREITO

Para a configuração do ato de improbidade, exige-se a demonstração do dolo (nos casos de enriquecimento ilícito e prejuízo ao erário) ou da má-fé do agente.

# DOS PEDIDOS

Requer a rejeição da petição inicial, ante a inexistência de ato de improbidade.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "CONST-001",
      slug: "habeas-data",
      titulo: "Habeas Data",
      area: "Direito Constitucional",
      categoria: "Habeas Data",
      subcategoria: "Informação Pessoal",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Constitucional", "Habeas Data", "Informação"],
      variaveis: ["IMPETRANTE", "ORGAO_PUBLICO", "INFORMACAO_NEGADA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ FEDERAL DA ____ VARA FEDERAL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{IMPETRANTE}}**, devidamente qualificado, vem impetrar o presente:

# HABEAS DATA

em face do **{{ORGAO_PUBLICO}}**, pelos motivos de fato e de direito seguintes:

# DOS FATOS

O Impetrante requereu administrativamente o acesso às informações relativas à sua pessoa constantes nos registros da Ré, especificamente {{INFORMACAO_NEGADA}}, o que foi negado.

# DO DIREITO

O Habeas Data (art. 5º, LXXII da CF) é o remédio constitucional para assegurar o conhecimento de informações relativas à pessoa do impetrante.

# DOS PEDIDOS

Requer a concessão da ordem para determinar o fornecimento das informações.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "IMOB-002",
      slug: "extincao-de-condominio",
      titulo: "Ação de Extinção de Condomínio",
      area: "Direito Imobiliário",
      categoria: "Condomínio",
      subcategoria: "Extinção",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Imobiliário", "Condomínio", "Alienação"],
      variaveis: ["AUTOR", "REU", "IMOVEL", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{AUTOR}}**, coproprietário do imóvel situado na {{IMOVEL}}, vem propor a presente:

# AÇÃO DE EXTINÇÃO DE CONDOMÍNIO C/C ALIENAÇÃO JUDICIAL

em face de **{{REU}}**, pelos motivos seguintes:

# DOS FATOS

As partes são proprietárias em comum do referido imóvel, o qual é indivisível. Não havendo mais interesse na manutenção do condomínio e não tendo havido acordo para a venda amigável, resta a via judicial.

# DO DIREITO

O art. 1.322 do Código Civil estabelece que, quando a coisa for indivisível e os consortes não quiserem adjudicá-la a um só, será vendida e repartido o apurado.

# DOS PEDIDOS

Requer a extinção do condomínio e a alienação judicial do bem.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "BANC-002",
      slug: "exibicao-documentos-bancarios",
      titulo: "Ação de Exibição de Documentos",
      area: "Direito Bancário",
      categoria: "Exibição",
      subcategoria: "Documentos",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Bancário", "Exibição", "Contrato"],
      variaveis: ["CLIENTE", "BANCO", "DOCUMENTO_SOLICITADO", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA CÍVEL DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, devidamente qualificado, vem propor a presente:

# AÇÃO DE EXIBIÇÃO DE DOCUMENTOS

em face do **{{BANCO}}**, pelos motivos seguintes:

# DOS FATOS

O Autor solicitou administrativamente a cópia do {{DOCUMENTO_SOLICITADO}}, o que foi negado pela instituição financeira Ré, impedindo o Autor de verificar a regularidade dos lançamentos.

# DO DIREITO

O dever de exibir decorre da relação contratual e da boa-fé objetiva, bem como do direito à informação previsto no CDC.

# DOS PEDIDOS

Requer a condenação da Ré à exibição do referido documento.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "MED-002",
      slug: "fornecimento-medicamentos-estado",
      titulo: "Obrigação de Fazer - Fornecimento de Medicamentos",
      area: "Direito Médico",
      categoria: "Obrigação de Fazer",
      subcategoria: "Medicamentos",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Médico", "Medicamento", "Saúde"],
      variaveis: ["CLIENTE", "MEDICAMENTO", "ESTADO_REU", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ____ VARA DA FAZENDA PÚBLICA DA COMARCA DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, portador da doença {{DOENCA}}, vem propor a presente:

# AÇÃO DE OBRIGAÇÃO DE FAZER COM PEDIDO DE TUTELA DE URGÊNCIA

em face do **ESTADO DE {{ESTADO_REU}}**, pelos motivos seguintes:

# DOS FATOS

O Autor necessita do uso contínuo do medicamento **{{MEDICAMENTO}}**, conforme prescrição médica anexa, mas não possui condições financeiras para adquiri-lo, tendo o Estado negado o fornecimento.

# DO DIREITO

A saúde é direito de todos e dever do Estado (art. 196 da CF). O fornecimento de medicamentos é obrigação solidária dos entes federados.

# DOS PEDIDOS

Requer a concessão da tutela de urgência para determinar o fornecimento imediato do medicamento.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  },
  {
    metadata: {
      id: "TRAB-002",
      slug: "indenizacao-doenca-ocupacional",
      titulo: "Indenização - Doença Ocupacional",
      area: "Direito Trabalhista",
      categoria: "Indenização",
      subcategoria: "Doença Ocupacional",
      tipo: "Petição Inicial",
      versao: "1.0",
      tags: ["Trabalhista", "Doença", "Indenização"],
      variaveis: ["CLIENTE", "EMPRESA", "DOENCA", "VALOR_CAUSA", "COMARCA"]
    },
    markdown: `# EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DA ____ VARA DO TRABALHO DE {{COMARCA}} - {{ESTADO}}

**{{CLIENTE}}**, já qualificado, vem propor a presente:

# RECLAMAÇÃO TRABALHISTA INDENIZATÓRIA POR DOENÇA OCUPACIONAL

em face de **{{EMPRESA}}**, pelos motivos seguintes:

# DOS FATOS

O Reclamante adquiriu a doença {{DOENCA}} em razão das condições inadequadas de trabalho e da ausência de EPIs/ergonomia, conforme laudo médico anexo.

# DO DIREITO

A responsabilidade da empresa pelos danos decorrentes de acidente do trabalho ou doença ocupacional é subjetiva (art. 7º, XXVIII da CF) ou objetiva em atividades de risco.

# DOS PEDIDOS

Requer a condenação ao pagamento de danos morais, materiais (pensão mensal) e estéticos.

Dá-se à causa o valor de R$ {{VALOR_CAUSA}}.

Nestes termos, pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{ADVOGADO}}**
OAB/{{ESTADO}} nº {{OAB}}`
  }
];
