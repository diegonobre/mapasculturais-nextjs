'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Search, MapPin, Building } from 'lucide-react'
import Header from '@/components/layout/header'

const spaces = [
  {
    id: 1,
    name: "Teatro Livre - OngArteDuca",
    location: "São Paulo, SP",
    description: "Espaço cultural dedicado às artes cênicas, oferecendo apresentações teatrais, oficinas e cursos para a comunidade.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Associação Comunitária de Quilombo da Família Thomé",
    location: "Salvador, BA",
    description: "Centro cultural que preserva e promove a cultura quilombola, oferecendo atividades educativas e culturais.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Centro Cultural Banco Bradesco",
    location: "Rio de Janeiro, RJ",
    description: "Espaço multifuncional que abriga exposições de arte, apresentações musicais e palestras sobre diversos temas culturais.",
    imageUrl: "/placeholder.svg",
  },
  // Add more spaces here...
]

export default function SpacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    console.log('Form data:', { name })
    setIsModalOpen(false)
    toast({
      title: "Espaço criado",
      description: `O espaço "${name}" foi criado com sucesso.`,
      duration: 5000,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Building className="w-8 h-8 text-green-500" />
            <span>Espaços</span>
          </h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Building className="w-4 h-4 mr-2" />
                Criar Espaço
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Espaço</DialogTitle>
                <DialogDescription>
                  Preencha o formulário abaixo para criar um novo espaço cultural.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Espaço</Label>
                  <Input id="name" name="name" placeholder="Digite o nome do espaço" required />
                </div>
                <Button type="submit">Criar Espaço</Button>
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
                    <Input id="search" placeholder="Buscar..." />
                    <Button size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="area">Área de atuação</Label>
                  <Select>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artes-visuais">Artes Visuais</SelectItem>
                      <SelectItem value="teatro">Teatro</SelectItem>
                      <SelectItem value="musica">Música</SelectItem>
                      <SelectItem value="danca">Dança</SelectItem>
                      <SelectItem value="literatura">Literatura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Tipo de espaço</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teatro">Teatro</SelectItem>
                      <SelectItem value="museu">Museu</SelectItem>
                      <SelectItem value="biblioteca">Biblioteca</SelectItem>
                      <SelectItem value="centro-cultural">Centro Cultural</SelectItem>
                      <SelectItem value="galeria">Galeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="w-full md:w-3/4">
            <div className="space-y-6">
              {spaces.map((space) => (
                <Card key={space.id}>
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <Image
                      src={space.imageUrl}
                      alt={`Imagem de ${space.name}`}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <CardTitle>{space.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {space.location}
                      </CardDescription>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{space.description}</p>
                    </div>
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
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
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
                <li><a href="#" className="text-blue-500 hover:underline">Editais e oportunidades</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Eventos</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Agentes</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Espaços</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Projetos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Painel</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-500 hover:underline">Editais e oportunidades</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Meus eventos</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Meus agentes</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Meus espaços</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Sair</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Ajuda e privacidade</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-500 hover:underline">Dúvidas frequentes</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Dúvidas e problemas com o sistema podem ser resolvidos pelo e-mail suporte@mapasculturais.com.br</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Plataforma livre e colaborativa mapas culturais, desenvolvida por Hacklab e mantida pelo MINC</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
