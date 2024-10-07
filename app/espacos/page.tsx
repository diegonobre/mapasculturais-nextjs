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
import { Search, MapPin, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Link from 'next/link';
import Footer from '@/components/layout/footer';

type Space = {
  id: number;
  name: string;
  type: string;
  areasOfOperation: string[];
  description: string;
  location: string;
};

const spaceTypes = [
  'Biblioteca',
  'Centro Cultural',
  'Cinema',
  'Museu',
  'Teatro',
  'Galeria de Arte',
  'Espaço Multiuso',
  'Auditório',
  'Parque',
  'Praça',
];

const areasOfOperation = [
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
const sampleSpaces: Space[] = [
  {
    id: 1,
    name: 'Centro Cultural Paulo Freire',
    type: 'Centro Cultural',
    areasOfOperation: ['Literatura', 'Música', 'Teatro'],
    description: 'Espaço dedicado à promoção da educação e cultura popular.',
    location: 'São Paulo, SP',
  },
  {
    id: 2,
    name: 'Museu de Arte Moderna',
    type: 'Museu',
    areasOfOperation: ['Artes Visuais', 'Cultura Digital'],
    description: 'Museu com exposições de arte contemporânea e moderna.',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: 3,
    name: 'Teatro Municipal',
    type: 'Teatro',
    areasOfOperation: ['Teatro', 'Dança', 'Música'],
    description: 'Principal teatro da cidade, com programação diversificada.',
    location: 'Belo Horizonte, MG',
  },
  {
    id: 4,
    name: 'Biblioteca Pública Estadual',
    type: 'Biblioteca',
    areasOfOperation: ['Literatura', 'Patrimônio Cultural'],
    description: 'Acervo diversificado e espaços para estudo e pesquisa.',
    location: 'Porto Alegre, RS',
  },
  {
    id: 5,
    name: 'Parque das Artes',
    type: 'Parque',
    areasOfOperation: ['Artes Visuais', 'Música', 'Cultura Popular'],
    description: 'Área verde com espaços para exposições e apresentações ao ar livre.',
    location: 'Recife, PE',
  },
];

export default function SpacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>(sampleSpaces);
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [newSpace, setNewSpace] = useState<Space>({
    id: 0,
    name: '',
    type: '',
    areasOfOperation: [],
    description: '',
    location: '',
  });

  useEffect(() => {
    filterSpaces();
  }, [spaces, searchTerm, selectedType, currentPage]);

  const filterSpaces = () => {
    let filtered = [...spaces].reverse(); // Reverse the array to show latest items first

    if (searchTerm) {
      filtered = filtered.filter(
        (space) =>
          space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType) {
      filtered = filtered.filter((space) => space.type === selectedType);
    }

    setFilteredSpaces(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
  };

  const paginatedSpaces = filteredSpaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = spaces.length > 0 ? Math.max(...spaces.map((s) => s.id)) + 1 : 1;
    const createdSpace = { ...newSpace, id: newId };
    setSpaces([createdSpace, ...spaces]); // Add new space to the beginning of the array
    setIsModalOpen(false);
    toast({
      title: 'Espaço criado',
      description: `O espaço "${createdSpace.name}" foi criado com sucesso.`,
      duration: 5000,
    });
    setNewSpace({
      id: 0,
      name: '',
      type: '',
      areasOfOperation: [],
      description: '',
      location: '',
    });
    setCurrentPage(1); // Reset to first page to show the new item
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-blue-500" />
            <span>Espaços</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <MapPin className="w-4 h-4 mr-2" />
                Criar Espaço
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Espaço</DialogTitle>
                <DialogDescription>Crie um espaço com informações básicas e de forma rápida</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                    placeholder="Digite o nome do espaço"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Selecione o tipo do espaço</Label>
                  <Select onValueChange={(value) => setNewSpace({ ...newSpace, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Área de Atuação</Label>
                  <ScrollArea className="h-[200px] w-full border rounded-md">
                    {areasOfOperation.map((area) => (
                      <div key={area} className="flex items-center space-x-2 p-4">
                        <Checkbox
                          id={area}
                          checked={newSpace.areasOfOperation.includes(area)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewSpace({ ...newSpace, areasOfOperation: [...newSpace.areasOfOperation, area] });
                            } else {
                              setNewSpace({
                                ...newSpace,
                                areasOfOperation: newSpace.areasOfOperation.filter((a) => a !== area),
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
                  <Label htmlFor="description">Adicione uma Descrição curta para o Espaço</Label>
                  <Textarea
                    id="description"
                    value={newSpace.description}
                    onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                    placeholder="Descrição do espaço"
                    className="h-[100px]"
                    maxLength={400}
                  />
                  <div className="text-sm text-gray-500 text-right">{newSpace.description.length}/400</div>
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
                  <Label htmlFor="type">Tipo de Espaço</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              {paginatedSpaces.map((space) => (
                <Card key={space.id}>
                  <CardHeader>
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>
                      {space.type} • {space.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Áreas de atuação: {space.areasOfOperation.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{space.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/espacos/${space.id}/`}>
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
