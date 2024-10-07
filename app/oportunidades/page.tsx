import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search } from 'lucide-react'
import Header from '@/components/layout/header'

const opportunities = [
  {
    id: 1,
    title: "Qualificação de projetos de saúde da população",
    description: "Estão abertas as inscrições para o processo de qualificação de projetos de saúde da população negra, quilombola, cigana e de terreiro/povos tradicionais de matriz africana.",
    type: "Edital",
    registrationDeadline: "10/05/2023",
  },
  {
    id: 2,
    title: "Edital da Política Nacional LGBT Brasil (PNLGBT)",
    description: "O Ministério dos Direitos Humanos e da Cidadania (MDHC), por meio da Secretaria Nacional dos Direitos das Pessoas LGBTQIA+, torna público o presente Edital de Chamamento Público para a seleção de propostas...",
    type: "Edital",
    registrationDeadline: "15/05/2023",
  },
  // Add more opportunities here...
]

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
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
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edital">Edital</SelectItem>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="curso">Curso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="area">Área de interesse</Label>
                  <Select>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artes">Artes</SelectItem>
                      <SelectItem value="musica">Música</SelectItem>
                      <SelectItem value="literatura">Literatura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Inscrições</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="abertas" />
                    <label htmlFor="abertas" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Abertas</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="encerradas" />
                    <label htmlFor="encerradas" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Encerradas</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="w-full md:w-3/4">
            <div className="space-y-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.type} • Inscrições até {opportunity.registrationDeadline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{opportunity.description}</p>
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
                <li><Link href="#" className="text-blue-500 hover:underline">Editais e oportunidades</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Eventos</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Agentes</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Espaços</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Projetos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Painel</h3>
              <ul className="space-y-1">
                <li><Link href="#" className="text-blue-500 hover:underline">Editais e oportunidades</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Meus eventos</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Meus agentes</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Meus espaços</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Sair</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Ajuda e privacidade</h3>
              <ul className="space-y-1">
                <li><Link href="#" className="text-blue-500 hover:underline">Dúvidas frequentes</Link></li>
                <li><Link href="#" className="text-blue-500 hover:underline">Dúvidas e problemas com o sistema podem ser resolvidos pelo e-mail suporte@mapasculturais.com.br</Link></li>
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
