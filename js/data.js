'use strict';

const produtos = [
  {
    id: 1,
    nome: 'Dior Homme Parfum 100ml',
    marca: 'Dior',
    categoria: 'Perfumes',
    preco: 489.9,
    destaque: true,
    maisVendido: true,
    nota: 'Parfum masculino com assinatura amadeirada e ambarada.',
    imagem: 'assets/images/dior home perfume.jpeg'
  },
  {
    id: 2,
    nome: 'Silver Crystal Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 249.9,
    destaque: false,
    maisVendido: false,
    nota: 'Frasco cristalino com perfil fresco, limpo e elegante.',
    imagem: 'assets/images/perfume 2.jpeg'
  },
  {
    id: 3,
    nome: 'Floral Crystal Eau de Parfum 75ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 279.9,
    destaque: true,
    maisVendido: false,
    nota: 'Frasco floral com proposta delicada, luminosa e feminina.',
    imagem: 'assets/images/perfume 3.jpeg'
  },
  {
    id: 4,
    nome: 'Amber Square Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 259.9,
    destaque: false,
    maisVendido: false,
    nota: 'Perfume ambarado em frasco quadrado com acabamento classico.',
    imagem: 'assets/images/perfume4.avif'
  },
  {
    id: 5,
    nome: 'Clear Diamond Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 269.9,
    destaque: false,
    maisVendido: false,
    nota: 'Frasco transparente com tampa lapidada e perfil leve.',
    imagem: 'assets/images/perfume 5.jpeg'
  },
  {
    id: 6,
    nome: 'Golden Drop Eau de Parfum 90ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 229.9,
    destaque: false,
    maisVendido: false,
    nota: 'Fragrancia dourada com visual delicado e toque solar.',
    imagem: 'assets/images/perfume 6.jpeg'
  },
  {
    id: 7,
    nome: 'AVK3 No. 1 Eau de Parfum 100ml',
    marca: 'AVK3',
    categoria: 'Perfumes',
    preco: 189.9,
    destaque: false,
    maisVendido: false,
    nota: 'Eau de parfum em frasco minimalista rosado.',
    imagem: 'assets/images/perfume 7.jpeg'
  },
  {
    id: 8,
    nome: 'Amber Wood Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 239.9,
    destaque: false,
    maisVendido: false,
    nota: 'Perfume amadeirado ambarado em frasco quadrado.',
    imagem: 'assets/images/perfume 8.jpeg'
  },
  {
    id: 9,
    nome: 'Noir Silver Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 299.9,
    destaque: false,
    maisVendido: false,
    nota: 'Frasco preto com placa prateada e perfil intenso.',
    imagem: 'assets/images/perfume9.jpeg'
  },
  {
    id: 10,
    nome: 'Fattah Dar El Ward Eau de Parfum 100ml',
    marca: 'Fattah',
    categoria: 'Perfumes',
    preco: 219.9,
    destaque: false,
    maisVendido: false,
    nota: 'Eau de parfum Dar El Ward em frasco e caixa prateados.',
    imagem: 'assets/images/perfume10.jpeg'
  },
  {
    id: 11,
    nome: 'Natura Kaiak Extremo 100ml',
    marca: 'Natura',
    categoria: 'Perfumes',
    preco: 174.9,
    destaque: true,
    maisVendido: true,
    nota: 'Perfume Kaiak Extremo com visual masculino e esportivo.',
    imagem: 'assets/images/perfume11.jpeg'
  },
  {
    id: 12,
    nome: 'Fator 5 No. 33 Sandalo Cardamomo Baunilha 60ml',
    marca: 'Fator 5',
    categoria: 'Perfumes',
    preco: 139.9,
    destaque: false,
    maisVendido: false,
    nota: 'Deo parfum com sandalo, cardamomo e baunilha.',
    imagem: 'assets/images/perfume12.jpeg'
  },
  {
    id: 13,
    nome: 'Rose Glass Eau de Parfum 100ml',
    marca: 'Maison Essenza',
    categoria: 'Perfumes',
    preco: 249.9,
    destaque: false,
    maisVendido: false,
    nota: 'Frasco rosado com perfil floral suave e luminoso.',
    imagem: 'assets/images/perfume13.jpeg'
  },
  {
    id: 14,
    nome: 'Lattafa Victoria Eau de Parfum 100ml',
    marca: 'Lattafa',
    categoria: 'Perfumes',
    preco: 289.9,
    destaque: true,
    maisVendido: false,
    nota: 'Victoria Lattafa em frasco dourado com acabamento sofisticado.',
    imagem: 'assets/images/perfume 14.jpeg'
  },
  {
    id: 15,
    nome: 'WePink Choices VF 100ml',
    marca: 'WePink',
    categoria: 'Perfumes',
    preco: 199.9,
    destaque: false,
    maisVendido: true,
    nota: 'Perfume Choices VF em frasco rosado com 100ml.',
    imagem: 'assets/images/perfume15.jpeg'
  },
  {
    id: 16,
    nome: 'CeraVe Creme Hidratante Pele Seca a Extra Seca 200g',
    marca: 'CeraVe',
    categoria: 'Cremes',
    preco: 109.9,
    destaque: true,
    maisVendido: true,
    nota: 'Creme sem perfume com 3 ceramidas essenciais e acido hialuronico.',
    imagem: 'assets/images/creme1.jpeg'
  },
  {
    id: 17,
    nome: 'Creamy Calming Cream 40g',
    marca: 'Creamy',
    categoria: 'Cremes',
    preco: 69.9,
    destaque: false,
    maisVendido: false,
    nota: 'Creme hidratante com Hypskin e vitamina E.',
    imagem: 'assets/images/creme2.jpeg'
  },
  {
    id: 18,
    nome: 'Vinilady Rosto Creme Nutritivo 100g',
    marca: 'Vinilady',
    categoria: 'Cremes',
    preco: 49.9,
    destaque: false,
    maisVendido: false,
    nota: 'Creme nutritivo vegano com colageno vegetal e efeito tensor.',
    imagem: 'assets/images/creme3.jpeg'
  },
  {
    id: 19,
    nome: 'Genom Derma Dermon Creme 20g',
    marca: 'Genom Derma',
    categoria: 'Cremes',
    preco: 59.9,
    destaque: false,
    maisVendido: false,
    nota: 'Creme de protecao e hidratacao com dexpantenol.',
    imagem: 'assets/images/creme4.jpeg'
  },
  {
    id: 20,
    nome: 'Oceane Vitamin C Cream 50g',
    marca: 'Oceane',
    categoria: 'Cremes',
    preco: 84.9,
    destaque: true,
    maisVendido: false,
    nota: 'Hidratante facial com vitamina C e acao antioxidante.',
    imagem: 'assets/images/creme5.jpeg'
  },
  {
    id: 21,
    nome: 'CeraVe Locao Hidratante Pele Seca a Extra Seca 473ml',
    marca: 'CeraVe',
    categoria: 'Hidratantes',
    preco: 119.9,
    destaque: true,
    maisVendido: true,
    nota: 'Locao sem perfume para rosto e corpo com ceramidas essenciais.',
    imagem: 'assets/images/hidratante1.jpeg'
  },
  {
    id: 22,
    nome: 'NIVEA Soft Milk Locao Deo-Hidratante 400ml',
    marca: 'NIVEA',
    categoria: 'Hidratantes',
    preco: 34.9,
    destaque: false,
    maisVendido: true,
    nota: 'Hidratacao profunda com manteiga de karite para pele seca.',
    imagem: 'assets/images/hidratante2.jpeg'
  },
  {
    id: 23,
    nome: 'Needs Hidratante Corporal Nutritivo D-Pantenol 200ml',
    marca: 'Needs',
    categoria: 'Hidratantes',
    preco: 24.9,
    destaque: false,
    maisVendido: false,
    nota: 'Hidratante corporal nutritivo com D-pantenol.',
    imagem: 'assets/images/hidratante3.jpeg'
  },
  {
    id: 24,
    nome: 'Phytoervas Dia a Dia Locao Hidratante 500ml',
    marca: 'Phytoervas',
    categoria: 'Hidratantes',
    preco: 46.9,
    destaque: false,
    maisVendido: false,
    nota: 'Locao hidratante Verbena e Capim-Limao com hidratacao 24h.',
    imagem: 'assets/images/hidratante4.jpeg'
  },
  {
    id: 25,
    nome: 'Mantecorp Hydraporin AI Locao Hidratante 450ml',
    marca: 'Mantecorp',
    categoria: 'Hidratantes',
    preco: 89.9,
    destaque: false,
    maisVendido: false,
    nota: 'Locao hidratante para pele seca e extrasseca.',
    imagem: 'assets/images/hidratante5.jpeg'
  },
  {
    id: 26,
    nome: 'Natura Tododia Nutricao Prebiotica Acerola e Hibisco 400ml',
    marca: 'Natura',
    categoria: 'Hidratantes',
    preco: 54.9,
    destaque: true,
    maisVendido: false,
    nota: 'Creme sorbet para o corpo com nutricao prebiotica.',
    imagem: 'assets/images/hidratante6.jpeg'
  }
];

produtos.forEach((produto, index) => {
  produto.numero = index + 1;
});
