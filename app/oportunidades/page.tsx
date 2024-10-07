'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Search, FileText, X } from 'lucide-react';
import Header from '@/components/layout/header';
import { Opportunity, opportunityTypes, areasOfInterest } from '@/data/types';
import Link from 'next/link';

// Sample data
const sampleOpportunities: Opportunity[] = [
  {
    id: 1,
    type: 'Festival',
    title: 'Festival de Música Independente',
    areasOfInterest: ['Música', 'Produção Cultural'],
    linkedEntity: 'evento',
    registrationDeadline: '2023-12-31',
  },
  {
    id: 2,
    type: 'Edital',
    title: 'Edital de Apoio às Artes Visuais',
    areasOfInterest: ['Artes Visuais', 'Fotografia'],
    linkedEntity: 'projeto',
    registrationDeadline: '2023-11-30',
  },
  {
    id: 3,
    type: 'Oficina',
    title: 'Oficina de Teatro para Iniciantes',
    areasOfInterest: ['Teatro', 'Artes Integradas'],
    linkedEntity: 'espaco',
    registrationDeadline: '2023-10-15',
  },
  {
    id: 4,
    type: 'Concurso',
    title: 'Concurso de Curtas-Metragens',
    areasOfInterest: ['Audiovisual', 'Cinema'],
    linkedEntity: 'agente',
    registrationDeadline: '2023-09-30',
  },
  {
    id: 5,
    type: 'Residência',
    title: 'Residência Artística em Dança Contemporânea',
    areasOfInterest: ['Dança', 'Pesquisa'],
    linkedEntity: 'espaco',
    registrationDeadline: '2023-11-15',
  },
];

export default function OpportunitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(sampleOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newOpportunity, setNewOpportunity] = useState<Opportunity>({
    id: 0,
    type: '',
    title: '',
    areasOfInterest: [],
    linkedEntity: '',
    registrationDeadline: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    filterOpportunities();
  }, [opportunities, searchTerm, selectedType, selectedAreas, isRegistrationOpen, currentPage]);

  const filterOpportunities = () => {
    let filtered = [...opportunities].reverse(); // Reverse the array to show latest items first

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.type.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType) {
      filtered = filtered.filter((opp) => opp.type === selectedType);
    }

    if (selectedAreas.length > 0) {
      filtered = filtered.filter((opp) => opp.areasOfInterest.some((area) => selectedAreas.includes(area)));
    }

    if (isRegistrationOpen) {
      filtered = filtered.filter((opp) => new Date(opp.registrationDeadline) > new Date());
    }

    setFilteredOpportunities(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedAreas([]);
    setIsRegistrationOpen(false);
  };

  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = opportunities.length > 0 ? Math.max(...opportunities.map((o) => o.id)) + 1 : 1;
    const createdOpportunity = { ...newOpportunity, id: newId };
    setOpportunities([createdOpportunity, ...opportunities]); // Add new opportunity to the beginning of the array
    setIsModalOpen(false);
    toast({
      title: 'Oportunidade criada',
      description: `A oportunidade "${createdOpportunity.title}" foi criada com sucesso.`,
      duration: 5000,
    });
    setNewOpportunity({
      id: 0,
      type: '',
      title: '',
      areasOfInterest: [],
      linkedEntity: '',
      registrationDeadline: new Date().toISOString().split('T')[0],
    });
    setCurrentPage(1); // Reset to first page to show the new item
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <FileText className="w-8 h-8 text-orange-500" />
            <span>Oportunidades</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Criar Oportunidade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Oportunidade</DialogTitle>
                <DialogDescription>
                  Crie uma oportunidade com informações básicas e de forma rápida
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="type">Selecione o tipo da oportunidade</Label>
                  <Select onValueChange={(value) => setNewOpportunity({ ...newOpportunity, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newOpportunity.title}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                    placeholder="Digite o título da oportunidade"
                  />
                </div>
                <div>
                  <Label>Área de Interesse</Label>
                  <ScrollArea className="h-[200px] overflow-y-auto">
                    <div className="space-y-2">
                      {areasOfInterest.map((area) => (
                        <div key={area} className="flex items-center">
                          <Checkbox
                            id={area}
                            checked={newOpportunity.areasOfInterest.includes(area)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewOpportunity({
                                  ...newOpportunity,
                                  areasOfInterest: [...newOpportunity.areasOfInterest, area],
                                });
                              } else {
                                setNewOpportunity({
                                  ...newOpportunity,
                                  areasOfInterest: newOpportunity.areasOfInterest.filter((a) => a !== area),
                                });
                              }
                            }}
                          />
                          <Label htmlFor={area} className="ml-2">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <Label>Vincule a oportunidade a uma entidade:</Label>
                  <RadioGroup
                    onValueChange={(value) => setNewOpportunity({ ...newOpportunity, linkedEntity: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="projeto" id="projeto" />
                      <Label htmlFor="projeto">Projeto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="evento" id="evento" />
                      <Label htmlFor="evento">Evento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="espaco" id="espaco" />
                      <Label htmlFor="espaco">Espaço</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agente" id="agente" />
                      <Label htmlFor="agente">Agente</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="registrationDeadline">Data limite de inscrição</Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={newOpportunity.registrationDeadline}
                    onChange={(e) =>
                      setNewOpportunity({ ...newOpportunity, registrationDeadline: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Criar</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Palavra-chave</Label>
                  <div className="flex items-center">
                    <Input
                      id="search"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="area">Área de interesse</Label>
                  <Select onValueChange={(value) => setSelectedAreas((prev) => [...prev, value])}>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasOfInterest.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Inscrições</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="abertas"
                      checked={isRegistrationOpen}
                      onCheckedChange={(checked) => setIsRegistrationOpen(checked as boolean)}
                    />
                    <label
                      htmlFor="abertas"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Abertas
                    </label>
                  </div>
                </div>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Limpar filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          <section className="w-full md:w-3/4">
            <div className="space-y-6">
              {paginatedOpportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>
                      {opportunity.type} • Inscrições até{' '}
                      {new Date(opportunity.registrationDeadline).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Áreas de interesse: {opportunity.areasOfInterest.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Entidade vinculada: {opportunity.linkedEntity}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/oportunidades/${opportunity.id}/`}>
                      <Button>Acessar</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">Acesse</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Editais e oportunidades
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Agentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Espaços
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Projetos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Painel</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Editais e oportunidades
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Meus eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Meus agentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Meus espaços
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Sair
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Ajuda e privacidade</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Dúvidas frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Dúvidas e problemas com o sistema podem ser resolvidos pelo e-mail
                    suporte@mapasculturais.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Plataforma livre e colaborativa mapas culturais, desenvolvida por Hacklab e mantida pelo MINC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
