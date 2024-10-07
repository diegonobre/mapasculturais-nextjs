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
import { toast } from '@/hooks/use-toast';
import { Search, Folder, X } from 'lucide-react';
import Header from '@/components/layout/header';

type Project = {
  id: number;
  name: string;
  culturalLanguage: string;
  description: string;
  status: string;
};

const culturalLanguages = [
  'Festival',
  'Exposição',
  'Concerto',
  'Oficina',
  'Sarau',
  'Mostra',
  'Feira',
  'Residência Artística',
  'Seminário',
  'Encontro',
];

// Sample data
const sampleProjects: Project[] = [
  {
    id: 1,
    name: 'Festival de Jazz na Praça',
    culturalLanguage: 'Festival',
    description: 'Um festival de jazz ao ar livre com artistas locais e internacionais.',
    status: 'Em andamento',
  },
  {
    id: 2,
    name: 'Exposição de Arte Contemporânea',
    culturalLanguage: 'Exposição',
    description: 'Uma exposição de arte contemporânea com obras de artistas emergentes.',
    status: 'Planejado',
  },
  {
    id: 3,
    name: 'Oficina de Teatro para Jovens',
    culturalLanguage: 'Oficina',
    description: 'Uma série de oficinas de teatro para jovens de comunidades carentes.',
    status: 'Concluído',
  },
  {
    id: 4,
    name: 'Sarau Literário Noturno',
    culturalLanguage: 'Sarau',
    description: 'Um evento mensal de leitura de poesia e prosa em um café local.',
    status: 'Em andamento',
  },
  {
    id: 5,
    name: 'Feira de Artesanato Regional',
    culturalLanguage: 'Feira',
    description: 'Uma feira anual que promove o artesanato local e regional.',
    status: 'Planejado',
  },
];

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: '',
    culturalLanguage: '',
    description: '',
    status: 'Planejado',
  });

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedLanguage, currentPage]);

  const filterProjects = () => {
    let filtered = [...projects].reverse(); // Reverse the array to show latest items first

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedLanguage) {
      filtered = filtered.filter((project) => project.culturalLanguage === selectedLanguage);
    }

    setFilteredProjects(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('');
  };

  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const createdProject = { ...newProject, id: newId };
    setProjects([createdProject, ...projects]); // Add new project to the beginning of the array
    setIsModalOpen(false);
    toast({
      title: 'Projeto criado',
      description: `O projeto "${createdProject.name}" foi criado com sucesso.`,
      duration: 5000,
    });
    setNewProject({
      id: 0,
      name: '',
      culturalLanguage: '',
      description: '',
      status: 'Planejado',
    });
    setCurrentPage(1); // Reset to first page to show the new item
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Folder className="w-8 h-8 text-yellow-500" />
            <span>Projetos</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Folder className="w-4 h-4 mr-2" />
                Criar Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Projeto</DialogTitle>
                <DialogDescription>Crie um projeto com informações básicas e de forma rápida</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Digite o nome do projeto"
                  />
                </div>
                <div>
                  <Label htmlFor="culturalLanguage">Linguagem cultural</Label>
                  <Select onValueChange={(value) => setNewProject({ ...newProject, culturalLanguage: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a linguagem cultural" />
                    </SelectTrigger>
                    <SelectContent>
                      {culturalLanguages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Adicione uma Descrição curta para o Projeto</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Descrição do projeto"
                    className="h-[100px]"
                    maxLength={400}
                  />
                  <div className="text-sm text-gray-500 text-right">{newProject.description.length}/400</div>
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
                  <Label htmlFor="language">Linguagem Cultural</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione a linguagem" />
                    </SelectTrigger>
                    <SelectContent>
                      {culturalLanguages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
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
              {paginatedProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>
                      {project.culturalLanguage} • {project.status}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Acessar</Button>
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
              Plataforma livre e colaborativa map as culturais, desenvolvida por Hacklab e mantida pelo MINC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
