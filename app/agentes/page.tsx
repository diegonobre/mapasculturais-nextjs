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
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Search, Users, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Link from 'next/link';
import Footer from '@/components/layout/footer';

type Agent = {
  id: number;
  name: string;
  type: string;
  areasOfExpertise: string[];
  description: string;
};

const agentTypes = ['Pessoa Física', 'Pessoa Jurídica', 'Coletivo', 'Grupo', 'Instituição', 'Empresa'];

const areasOfExpertise = [
  'Artes Visuais',
  'Audiovisual',
  'Circo',
  'Dança',
  'Literatura',
  'Música',
  'Patrimônio Cultural',
  'Teatro',
  'Produção Cultural',
  'Gestão Cultural',
  'Educação',
  'Artesanato',
  'Cultura Popular',
  'Cultura Digital',
];

// Sample data
const sampleAgents: Agent[] = [
  {
    id: 1,
    name: 'Maria Silva',
    type: 'Pessoa Física',
    areasOfExpertise: ['Música', 'Produção Cultural'],
    description: 'Musicista e produtora cultural com 10 anos de experiência em festivais independentes.',
  },
  {
    id: 2,
    name: 'Instituto Cultural Aruanda',
    type: 'Instituição',
    areasOfExpertise: ['Dança', 'Cultura Popular'],
    description:
      'Organização dedicada à preservação e promoção da cultura afro-brasileira através da dança e música.',
  },
  {
    id: 3,
    name: 'Coletivo Arte Urbana',
    type: 'Coletivo',
    areasOfExpertise: ['Artes Visuais', 'Cultura Digital'],
    description: 'Grupo de artistas que trabalham com intervenções urbanas e arte digital em espaços públicos.',
  },
  {
    id: 4,
    name: 'Teatro Novo Horizonte',
    type: 'Pessoa Jurídica',
    areasOfExpertise: ['Teatro', 'Educação'],
    description: 'Companhia teatral que combina produções profissionais com programas educacionais para jovens.',
  },
  {
    id: 5,
    name: 'João Pereira',
    type: 'Pessoa Física',
    areasOfExpertise: ['Literatura', 'Patrimônio Cultural'],
    description: 'Escritor e pesquisador especializado em literatura regional e patrimônio cultural do Nordeste.',
  },
];

export default function AgentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(sampleAgents);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newAgent, setNewAgent] = useState<Agent>({
    id: 0,
    name: '',
    type: '',
    areasOfExpertise: [],
    description: '',
  });

  useEffect(() => {
    filterAgents();
  }, [agents, searchTerm, selectedType, selectedAreas, currentPage]);

  const filterAgents = () => {
    let filtered = [...agents].reverse(); // Reverse the array to show latest items first

    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType) {
      filtered = filtered.filter((agent) => agent.type === selectedType);
    }

    if (selectedAreas.length > 0) {
      filtered = filtered.filter((agent) => agent.areasOfExpertise.some((area) => selectedAreas.includes(area)));
    }

    setFilteredAgents(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedAreas([]);
  };

  const paginatedAgents = filteredAgents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = agents.length > 0 ? Math.max(...agents.map((a) => a.id)) + 1 : 1;
    const createdAgent = { ...newAgent, id: newId };
    setAgents([createdAgent, ...agents]); // Add new agent to the beginning of the array
    setIsModalOpen(false);
    toast({
      title: 'Agente criado',
      description: `O agente "${createdAgent.name}" foi criado com sucesso.`,
      duration: 5000,
    });
    setNewAgent({
      id: 0,
      name: '',
      type: '',
      areasOfExpertise: [],
      description: '',
    });
    setCurrentPage(1); // Reset to first page to show the new item
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Users className="w-8 h-8 text-purple-500" />
            <span>Agentes</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Criar Agente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Agente</DialogTitle>
                <DialogDescription>Crie um agente com informações básicas e de forma rápida</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="type">Selecione o tipo do agente</Label>
                  <Select onValueChange={(value) => setNewAgent({ ...newAgent, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {agentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    placeholder="Digite o nome do agente"
                  />
                </div>
                <div>
                  <Label>Área de Atuação</Label>
                  <ScrollArea className="h-[200px] w-full border rounded-md">
                    {areasOfExpertise.map((area) => (
                      <div key={area} className="flex items-center space-x-2 p-4">
                        <Checkbox
                          id={area}
                          checked={newAgent.areasOfExpertise.includes(area)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewAgent({ ...newAgent, areasOfExpertise: [...newAgent.areasOfExpertise, area] });
                            } else {
                              setNewAgent({
                                ...newAgent,
                                areasOfExpertise: newAgent.areasOfExpertise.filter((a) => a !== area),
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={area}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <Label htmlFor="description">Adicione uma Descrição curta para o Agente</Label>
                  <Textarea
                    id="description"
                    value={newAgent.description}
                    onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                    placeholder="Descrição do agente"
                    className="h-[100px]"
                    maxLength={400}
                  />
                  <div className="text-sm text-gray-500 text-right">{newAgent.description.length}/400</div>
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
                  <Label htmlFor="type">Tipo de Agente</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {agentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="area">Área de Atuação</Label>
                  <Select onValueChange={(value) => setSelectedAreas((prev) => [...prev, value])}>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasOfExpertise.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
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
              {paginatedAgents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader>
                    <CardTitle>{agent.name}</CardTitle>
                    <CardDescription>{agent.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Áreas de atuação: {agent.areasOfExpertise.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{agent.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/agentes/${agent.id}/`}>
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

      <Footer />
    </div>
  );
}
