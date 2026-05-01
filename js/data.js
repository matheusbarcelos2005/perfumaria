'use strict';

const produtos = [
  {
    id: 1,
    nome: 'Aurea No. 7 Eau de Parfum 90ml',
    marca: 'Maison Aurea',
    categoria: 'Perfumes',
    preco: 489.9,
    destaque: true,
    maisVendido: true,
    nota: 'Floral ambarado com bergamota, peonia e baunilha.',
    imagem: 'assets/images/dior home perfume.jpeg',
    visual: { tipo: 'perfume', cor: '#d7b56d', acento: '#111216', label: 'AUREA' }
  },
  {
    id: 2,
    nome: 'Velours Blanc Parfum de Peau 75ml',
    marca: 'Velours Blanc',
    categoria: 'Perfumes',
    preco: 429.9,
    destaque: true,
    maisVendido: false,
    nota: 'Almiscar limpo, iris e madeira cremosa.',
    visual: { tipo: 'perfume', cor: '#f2ead8', acento: '#c9a45f', label: 'VELOURS' }
  },
  {
    id: 3,
    nome: 'Jardin Noir Extrait 60ml',
    marca: 'Jardin Noir',
    categoria: 'Perfumes',
    preco: 559.9,
    destaque: false,
    maisVendido: true,
    nota: 'Rosa escura, oud suave e patchouli.',
    visual: { tipo: 'perfume', cor: '#17181c', acento: '#d9b56e', label: 'NOIR' }
  },
  {
    id: 4,
    nome: 'Lumiere Rose Eau de Parfum 80ml',
    marca: 'Lumiere Rose',
    categoria: 'Perfumes',
    preco: 389.9,
    destaque: true,
    maisVendido: false,
    nota: 'Rosas frescas, lichia e champagne seco.',
    visual: { tipo: 'perfume', cor: '#e9b7aa', acento: '#6f4148', label: 'ROSE' }
  },
  {
    id: 5,
    nome: 'Santal Prive Intense 100ml',
    marca: 'Maison Aurea',
    categoria: 'Perfumes',
    preco: 619.9,
    destaque: false,
    maisVendido: false,
    nota: 'Sandalo, couro claro e cardamomo.',
    visual: { tipo: 'perfume', cor: '#8b6b4a', acento: '#f4d28c', label: 'SANTAL' }
  },
  {
    id: 6,
    nome: 'Creme Corporal Velvet Cashmere 240g',
    marca: 'Velours Blanc',
    categoria: 'Cremes corporais',
    preco: 189.9,
    destaque: true,
    maisVendido: true,
    nota: 'Creme denso com manteiga de karite e toque acetinado.',
    visual: { tipo: 'pote', cor: '#f7efe3', acento: '#c9a45f', label: 'VELVET' }
  },
  {
    id: 7,
    nome: 'Creme Corporal Fleur d Or 220g',
    marca: 'Maison Aurea',
    categoria: 'Cremes corporais',
    preco: 209.9,
    destaque: false,
    maisVendido: false,
    nota: 'Flor de laranjeira, oleo de argan e brilho discreto.',
    visual: { tipo: 'pote', cor: '#ead09a', acento: '#171719', label: 'FLEUR' }
  },
  {
    id: 8,
    nome: 'Creme Corporal Rose Satin 250g',
    marca: 'Lumiere Rose',
    categoria: 'Cremes corporais',
    preco: 174.9,
    destaque: true,
    maisVendido: false,
    nota: 'Rosa damascena, ceramidas e finalizacao sedosa.',
    visual: { tipo: 'pote', cor: '#f1c4bb', acento: '#7b4750', label: 'SATIN' }
  },
  {
    id: 9,
    nome: 'Creme Corporal Neroli Silk 200g',
    marca: 'Belle Rive',
    categoria: 'Cremes corporais',
    preco: 159.9,
    destaque: false,
    maisVendido: true,
    nota: 'Neroli, aloe vera e textura leve de alta absorcao.',
    visual: { tipo: 'pote', cor: '#fff2d7', acento: '#b78644', label: 'NEROLI' }
  },
  {
    id: 10,
    nome: 'Creme Corporal Ambre Nuit 230g',
    marca: 'Jardin Noir',
    categoria: 'Cremes corporais',
    preco: 229.9,
    destaque: false,
    maisVendido: false,
    nota: 'Ambar, tonka e hidratacao perfumada para noite.',
    visual: { tipo: 'pote', cor: '#2b2426', acento: '#d4aa63', label: 'AMBRE' }
  },
  {
    id: 11,
    nome: 'Hidratante Maos Creme de Perles 60ml',
    marca: 'Velours Blanc',
    categoria: 'Hidratantes',
    preco: 79.9,
    destaque: true,
    maisVendido: true,
    nota: 'Hidratante para maos com peptideos e acabamento aveludado.',
    visual: { tipo: 'tubo', cor: '#f4efe5', acento: '#c9a45f', label: 'PERLES' }
  },
  {
    id: 12,
    nome: 'Hidratante Corporal Lait d Aurea 300ml',
    marca: 'Maison Aurea',
    categoria: 'Hidratantes',
    preco: 149.9,
    destaque: false,
    maisVendido: false,
    nota: 'Locao fluida com niacinamida e fragrancia floral dourada.',
    visual: { tipo: 'pump', cor: '#e6c477', acento: '#111216', label: 'LAIT' }
  },
  {
    id: 13,
    nome: 'Hidratante Corporal Brume Rose 280ml',
    marca: 'Lumiere Rose',
    categoria: 'Hidratantes',
    preco: 139.9,
    destaque: false,
    maisVendido: true,
    nota: 'Leite corporal leve com rosa, pantenol e toque luminoso.',
    visual: { tipo: 'pump', cor: '#f0beb7', acento: '#7c4650', label: 'BRUME' }
  },
  {
    id: 14,
    nome: 'Hidratante Maos Bois Prive 75ml',
    marca: 'Jardin Noir',
    categoria: 'Hidratantes',
    preco: 89.9,
    destaque: true,
    maisVendido: false,
    nota: 'Maos e cuticulas com cedro, esqualano e toque seco.',
    visual: { tipo: 'tubo', cor: '#24262c', acento: '#d5af69', label: 'BOIS' }
  },
  {
    id: 15,
    nome: 'Hidratante Corporal Riviera Fig 300ml',
    marca: 'Belle Rive',
    categoria: 'Hidratantes',
    preco: 129.9,
    destaque: false,
    maisVendido: false,
    nota: 'Figo verde, leite de aveia e hidratacao diaria elegante.',
    visual: { tipo: 'pump', cor: '#dfe8d1', acento: '#66724f', label: 'FIG' }
  }
];

produtos.forEach((produto, index) => {
  produto.numero = index + 1;
});
