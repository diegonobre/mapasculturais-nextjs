export type Opportunity = {
  id: number;
  type: string;
  title: string;
  areasOfInterest: string[];
  linkedEntity: string;
  registrationDeadline: string;
};

export const opportunityTypes = [
  'Festival',
  'Edital',
  'Oficina',
  'Convocatória',
  'Concurso',
  'Chamada Pública',
  'Programa',
  'Curso',
  'Encontro',
  'Reunião',
  'Mostra',
  'Seminário',
  'Congresso',
  'Residência',
  'Exposição',
  'Exibição',
  'Consulta Pública',
  'Intercâmbio',
  'Sarau',
  'Feira',
  'Jornada',
  'Conferência',
  'Simpósio',
  'Fórum',
  'Circuito',
  'Outros',
];

export const areasOfInterest = [
  'Artes Circenses',
  'Artes Integradas',
  'Artes Visuais',
  'Audiovisual',
  'Cinema',
  'Cultura Alimentar',
  'Cultura Digital',
  'Cultura Indígena',
  'Cultura LGBTQIA+',
  'Cultura Negra',
  'Cultura Popular',
  'Dança',
  'Design',
  'Fotografia',
  'Gestão Cultural',
  'Literatura',
  'Livro e Leitura',
  'Moda',
  'Música',
  'Ópera',
  'Patrimônio Imaterial',
  'Patrimônio Material',
  'Pesquisa',
  'Produção Cultural',
  'Rádio',
  'Teatro',
  'Outros',
];
