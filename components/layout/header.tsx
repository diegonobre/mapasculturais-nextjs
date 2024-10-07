import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Home, Users, Calendar, MapPin, FileText, Scissors, ChevronDown, Search, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg" alt="Mapa da Cultura Logo" width={40} height={40} />
            <span className="text-xl font-bold">MAPA DA CULTURA</span>
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <NavItem href="/" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavItem href="/oportunidades" icon={<FileText className="w-4 h-4" />} label="Oportunidades" isActive />
            <NavItem href="/agentes" icon={<Users className="w-4 h-4" />} label="Agentes" />
            <NavItem href="/eventos" icon={<Calendar className="w-4 h-4" />} label="Eventos" />
            <NavItem href="/espacos" icon={<MapPin className="w-4 h-4" />} label="Espaços" />
            <NavItem href="/projetos" icon={<FileText className="w-4 h-4" />} label="Projetos" />
            <NavItem href="https://www.gov.br/culturaviva/pt-br" icon={<Scissors className="w-4 h-4" />} label="Cultura Viva" />
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">1</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <span>Minha conta</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container mx-auto px-4 py-2">
          <nav className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li><Link href="/" className="text-gray-500 hover:text-gray-700">INÍCIO</Link></li>
              <li className="before:content-['>'] before:mx-2 before:text-gray-500">
                <Link href="/oportunidades" className="text-gray-900 font-semibold">OPORTUNIDADES</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <FileText className="w-8 h-8 text-orange-500" />
              <span>Oportunidades</span>
            </h1>
            <div className="flex space-x-4">
              <div className="relative flex-grow max-w-md">
                <Input type="text" placeholder="Buscar..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Criar Oportunidade
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, icon, label, isActive = false }: { href: string; icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'text-orange-500 bg-orange-50'
          : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
