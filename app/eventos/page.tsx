'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Search, Calendar, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Link from 'next/link';

type Event = {
  id: number;
  name: string;
  culturalLanguages: string[];
  description: string;
  ageClassification: string;
  date: string;
};

const ageClassifications = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];

const culturalLanguages = [
  'Artes Visuais',
  'Audiovisual',
  'Circo',
  'Dança',
  'Literatura',
  'Música',
  'Patrimônio Cultural',
  'Teatro',
  'Cultura Popular',
  'Cultura Digital',
];

// Sample data
const sampleEvents: Event[] = [
  {
    id: 1,
    name: 'Festival de Jazz',
    culturalLanguages: ['Música'],
    description: 'Um festival de jazz com artistas locais e internacionais.',
    ageClassification: 'Livre',
    date: '2023-08-15',
  },
  {
    id: 2,
    name: 'Exposição de Arte Moderna',
    culturalLanguages: ['Artes Visuais'],
    description: 'Uma exposição de arte moderna com obras de artistas contemporâneos.',
    ageClassification: '12 anos',
    date: '2023-09-01',
  },
  {
    id: 3,
    name: "Peça de Teatro: 'O Fantasma da Ópera'",
    culturalLanguages: ['Teatro', 'Música'],
    description: "Uma adaptação do clássico musical 'O Fantasma da Ópera'.",
    ageClassification: '14 anos',
    date: '2023-10-10',
  },
  {
    id: 4,
    name: 'Workshop de Dança Contemporânea',
    culturalLanguages: ['Dança'],
    description: 'Um workshop intensivo de dança contemporânea para todos os níveis.',
    ageClassification: '16 anos',
    date: '2023-11-05',
  },
  {
    id: 5,
    name: 'Ciclo de Cinema Brasileiro',
    culturalLanguages: ['Audiovisual', 'Cultura Popular'],
    description: 'Uma mostra de filmes brasileiros clássicos e contemporâneos.',
    ageClassification: '18 anos',
    date: '2023-12-01',
  },
];

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgeClassification, setSelectedAgeClassification] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    name: '',
    culturalLanguages: [],
    description: '',
    ageClassification: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedAgeClassification, currentPage]);

  const filterEvents = () => {
    let filtered = [...events].reverse(); // Reverse the array to show latest items first

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedAgeClassification) {
      filtered = filtered.filter((event) => event.ageClassification === selectedAgeClassification);
    }

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAgeClassification('');
  };

  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const createdEvent = { ...newEvent, id: newId };
    setEvents([createdEvent, ...events]); // Add new event to the beginning of the array
    setIsModalOpen(false);
    toast({
      title: 'Evento criado',
      description: `O evento "${createdEvent.name}" foi criado com sucesso.`,
      duration: 5000,
    });
    setNewEvent({
      id: 0,
      name: '',
      culturalLanguages: [],
      description: '',
      ageClassification: '',
      date: new Date().toISOString().split('T')[0],
    });
    setCurrentPage(1); // Reset to first page to show the new item
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-green-500" />
            <span>Eventos</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Criar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Evento</DialogTitle>
                <DialogDescription>Crie um evento com informações básicas e de forma rápida</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    placeholder="Digite o nome do evento"
                  />
                </div>
                <div>
                  <Label>Linguagem cultural</Label>
                  <ScrollArea className="h-[200px] w-full border rounded-md">
                    {culturalLanguages.map((language) => (
                      <div key={language} className="flex items-center space-x-2 p-4">
                        <Checkbox
                          id={language}
                          checked={newEvent.culturalLanguages.includes(language)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewEvent({
                                ...newEvent,
                                culturalLanguages: [...newEvent.culturalLanguages, language],
                              });
                            } else {
                              setNewEvent({
                                ...newEvent,
                                culturalLanguages: newEvent.culturalLanguages.filter((l) => l !== language),
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={language}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <Label htmlFor="description">Adicione uma Descrição curta para o Evento</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Descrição do evento"
                    className="h-[100px]"
                    maxLength={400}
                  />
                  <div className="text-sm text-gray-500 text-right">{newEvent.description.length}/400</div>
                </div>
                <div>
                  <Label htmlFor="ageClassification">Classificação Etária</Label>
                  <Select onValueChange={(value) => setNewEvent({ ...newEvent, ageClassification: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a classificação" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageClassifications.map((classification) => (
                        <SelectItem key={classification} value={classification}>
                          {classification}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="button" variant="secondary">
                    Criar em Rascunho
                  </Button>
                  <Button type="submit">Criar e Publicar</Button>
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
                  <Label htmlFor="ageClassification">Classificação Etária</Label>
                  <Select value={selectedAgeClassification} onValueChange={setSelectedAgeClassification}>
                    <SelectTrigger id="ageClassification">
                      <SelectValue placeholder="Selecione a classificação" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageClassifications.map((classification) => (
                        <SelectItem key={classification} value={classification}>
                          {classification}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              {paginatedEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>
                      {event.date} • {event.ageClassification}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Linguagem cultural: {event.culturalLanguages.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/eventos/${event.id}/`}>
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
                  <a
                    href="#"
                    className="text-blue-500 hover:under
line"
                  >
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
