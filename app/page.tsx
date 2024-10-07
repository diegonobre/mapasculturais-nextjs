import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, BookOpen, FileText, ChevronRight, Github } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Image src="/logo.svg" alt="Mapa da Cultura Logo" width={100} height={40} />
          <nav className="hidden md:flex space-x-4">
            <Link href="/oportunidades" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Oportunidades</Link>
            <Link href="/eventos" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Eventos</Link>
            <Link href="/espacos" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Espaços</Link>
            <Link href="/agentes" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Agentes</Link>
            <Link href="/projetos" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Projetos</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Entrar</Button>
            <Button>Cadastrar</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-orange-400 to-red-500">
          <div className="container mx-auto px-4 py-12">
            <Image src="/placeholder.svg" alt="Banner" width={1200} height={300} className="w-full h-48 object-cover rounded-lg" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Aqui você encontra informações de editais e oportunidades do Ministério da Cultura</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Você também pode cadastrar seus projetos, espaços e eventos, e contribuir para o mapeamento cultural brasileiro.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: 'Oportunidades', description: 'Aqui você pode fazer sua inscrição nos editais e oportunidades do Ministério da Cultura (MinC), bem como acompanhar o andamento da sua inscrição. Você também pode acessar outras oportunidades da cultura.' },
              { icon: Calendar, title: 'Eventos', description: 'Você pode pesquisar eventos culturais cadastrados na plataforma Mapas da Cultura, por região, data ou área de interesse. Você também pode incluir seus eventos na plataforma e divulgá-los gratuitamente.' },
              { icon: MapPin, title: 'Espaços', description: 'Aqui você pode cadastrar ou localizar espaços culturais incluídos no Sistema Nacional de Informações e Indicadores Culturais (SNIIC).' },
              { icon: Users, title: 'Agentes', description: 'Neste espaço, é possível encontrar e colaborar com agentes culturais e instituições com ou sem CNPJ. Artistas, produtores, gestores e outros profissionais da cultura podem divulgar seu trabalho.' },
              { icon: BookOpen, title: 'Projetos', description: 'Aqui você encontra projetos culturais cadastrados pelos agentes culturais usuários da plataforma Mapas da Cultura.' },
            ].map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <item.icon className="w-12 h-12 text-blue-500 mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="mt-2">Ver mais <ChevronRight className="ml-1 w-4 h-4" /></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-green-100 dark:bg-green-900 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Em destaque</h2>
            <Tabs defaultValue="todos" className="w-full">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="agentes">Agentes</TabsTrigger>
                <TabsTrigger value="espacos">Espaços</TabsTrigger>
                <TabsTrigger value="projetos">Projetos</TabsTrigger>
              </TabsList>
              <TabsContent value="todos">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {[
                    { title: '"Cordel 2.0: a Periferia e a Literatura" oficina em IFPB(CNPJ: 244715)', description: 'O projeto abordará a história da literatura de cordel, sua importância cultural e sua evolução na era digital.' },
                    { title: 'ASSOCIAÇÃO BENEFICENTE NOSSA SENHORA DE FÁTIMA', description: 'Associação sem fins lucrativos que atua na promoção da cultura e assistência social.' },
                    { title: 'ASSOCIAÇÃO CULTURAL SANTA EDWIGES', description: 'Entidade dedicada à preservação e promoção da cultura local.' },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button>Acessar</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-orange-100 dark:bg-orange-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Faça seu cadastro e colabore com o Mapa da Cultura!</h2>
            <p className="mb-6">Participe dessa plataforma livre, colaborativa e interativa de mapeamento cultural brasileiro. Ao se cadastrar no Mapa da Cultura, você poderá inserir e editar informações sobre eventos, espaços e agentes culturais em todo o Brasil.</p>
            <Button size="lg">Fazer Cadastro</Button>
          </div>
        </section>
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
            <Link href="https://github.com/mapasculturais/mapasculturais" className="inline-flex items-center text-blue-500 hover:underline mt-2">
              <Github className="w-4 h-4 mr-1" />
              Conheça o repositório
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
