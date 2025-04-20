// Arquivo para inserir registros ficticios na nossa aplicação
import { client, db } from "."
import { cep, cliente, endereco, ordemServico, usuario } from "./schema"

async function seed() {
  // Realizado o delete inicialmente, pois o seed pode ser realizado diversas vezes
  // Atenção: Os deletes tem que ser nesta ordem, pois se não pode dar erro de chave estrangeiras
  await db.delete(ordemServico)
  await db.delete(cliente)
  await db.delete(endereco)
  await db.delete(cep)
  await db.delete(usuario)

  // 1. Cria usuário
  await db.insert(usuario).values({
    nomeUsuario: "eletronica.barg",
    tipoUsuario: "admin",
    senha: "eletronica.barg123"
  })

  // 2. CEPs
  const ceps = await db.insert(cep).values([
    { codigoCep: "88360000", estado: "SC", cidade: "Brusque" },
    { codigoCep: "88350000", estado: "SC", cidade: "Guabiruba" },
    { codigoCep: "89000000", estado: "SC", cidade: "Blumenau" }
  ]).returning()

  // 3. Endereços
  const enderecos = await db.insert(endereco).values([
    {
      cep: ceps[0].codigoCep,
      bairro: "Centro",
      logradouro: "Rua das Flores",
      numeroEndereco: 123,
      complemento: "Apto 101"
    },
    {
      cep: ceps[1].codigoCep,
      bairro: "Imigrantes",
      logradouro: "Rua XV de Novembro",
      numeroEndereco: 45,
      complemento: "Casa"
    },
    {
      cep: ceps[2].codigoCep,
      bairro: "Velha",
      logradouro: "Rua São Paulo",
      numeroEndereco: 678,
      complemento: "Fundos"
    }
  ]).returning()

  // 4. Clientes
  const clientes = await db.insert(cliente).values([
    {
      idEndereco: enderecos[0].id,
      tipoPessoa: "Física",
      sexo: "Masculino",
      dataNascimento: "1985-11-15",
      nomeCompleto: "João da Silva",
      cpf: "12345678901",
      rg: "MG1234567",
      filiacao: "Maria da Silva e Eduardo da Silva",
      celular1: "47999990001"
    },
    {
      idEndereco: enderecos[1].id,
      tipoPessoa: "Física",
      sexo: "Feminino",
      dataNascimento: "1985-11-15",
      nomeCompleto: "Ana Beatriz Souza",
      cpf: "23456789012",
      rg: "SP7654321",
      filiacao: "Caetana Souza e Carlos Souza",
      celular1: "47999990002",
      celular2: "47988880002",
    },
    {
      idEndereco: enderecos[2].id,
      tipoPessoa: "Física",
      sexo: "Masculino",
      dataNascimento: "2000-03-10",
      nomeCompleto: "Pedro Henrique Lima",
      cpf: "34567890123",
      rg: "RJ3456789",
      filiacao: "Helena Lima e Guilherma Lima",
      celular1: "47999990003",
      telefone1: "4733250003",
      telefone2: "4733250004",
    }
  ]).returning();

  // 5. Ordens de Serviço
  await db.insert(ordemServico).values([
    {
      idCliente: clientes[0].id,
      aparelho: "Televisão",
      marca: "Samsung",
      modelo: "UN40J5200",
      serie: "SN123456789",
      defeito: "Sem imagem",
      acessorios: "Controle remoto",
      localizacaoAparelho: "Prateleira 1 - lado direito",
      situacao: "Aguardando orçamento",
      preOrcamento: "250.00",
      notas: "Cliente disse que problema começou após queda de energia."
    },
    {
      idCliente: clientes[1].id,
      aparelho: "Televisão",
      marca: "LG",
      modelo: "MS2044U",
      serie: "SN987654321",
      defeito: "Não liga",
      acessorios: "Cabo energia",
      localizacaoAparelho: "Prateleira 2 - lado direito",
      situacao: "Pendente aprovação",
      preOrcamento: "180.00",
      valorMaoDeObra: "100.00",
      valorPecas: "80.00",
      valorTotal: "180.00",
      motivos: "Problema no barramento do backlight",
    },
    {
      idCliente: clientes[2].id,
      aparelho: "Televisão",
      marca: "Philips",
      modelo: "In153000",
      serie: "SN1122334455",
      defeito: "Tela",
      acessorios: "Sem acessórios",
      localizacaoAparelho: "Prateleira 2 - lado esquerdo",
      situacao: "Consertado e retirado",
      preOrcamento: "400.00",
      valorMaoDeObra: "200.00",
      valorPecas: "150.00",
      valorTotal: "350.00",
      motivos: "Tela",
      notas: "50% do pagamento foi realizado na entrega do aparelho."
    }
  ])
}

seed().finally(() => {
  client.end()
})