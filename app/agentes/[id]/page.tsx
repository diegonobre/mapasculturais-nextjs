'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Facebook, Twitter, Send, MapPin, Edit2 } from 'lucide-react';
import Header from '@/components/layout/header';

type Agent = {
  id: string;
  name: string;
  type: string;
  description: string;
  personalInfo: {
    fullName: string;
    publicPhone: string;
    privatePhone: string;
    email: string;
  };
  sensitiveInfo: {
    birthDate: string;
    gender: string;
    sexualOrientation: string;
    race: string;
    disability: string;
  };
  areasOfExpertise: string[];
  address: string;
};

const sampleAgent: Agent = {
  id: '225756',
  name: 'Diego Nobre',
  type: 'INDIVIDUAL',
  description:
    "Trabalho com desenvolvimento de sistemas desde 2003 e atuo na área de Produção Cultural desde 2005. Desde 2017, trabalho em projetos de software com equipes multiculturais, de diversos países, com uso predominante dos idiomas inglês e espanhol. Atualmente ocupo a posição de 'Research and Development Engineer' na BairesDev - empresa fundada na Argentina, com aproximadamente 4 mil profissionais.",
  personalInfo: {
    fullName: 'Diego Cristofoli Nobre',
    publicPhone: '(83) 98820-5707',
    privatePhone: '(83) 98820-5707',
    email: 'dcnobre@gmail.com',
  },
  sensitiveInfo: {
    birthDate: '4 de setembro de 1984',
    gender: 'Homem Cis',
    sexualOrientation: 'Heterossexual',
    race: 'Parda',
    disability: 'Não sou',
  },
  areasOfExpertise: [
    'Jogos Eletrônicos',
    'História',
    'Educação',
    'Produção Cultural',
    'Cultura Digital',
    'Mídias Sociais',
    'Patrimônio Cultural',
  ],
  address: 'Rua Poeta Luiz Raimundo Batista de Carvalho - Jardim Oceania - João Pessoa/PB - CEP: 58037-530',
};

export default function AgentDetailPage() {
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the agent data based on the ID
    // For this example, we're using the sample data
    setAgent(sampleAgent);
  }, [params.id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Image src="/placeholder.svg" alt={agent.name} width={100} height={100} className="rounded-full" />
            <div>
              <CardTitle className="text-2xl">{agent.name}</CardTitle>
              <CardDescription>
                ID: {agent.id} • TIPO: <Badge variant="outline">{agent.type}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{agent.description}</p>

            <Tabs defaultValue="info" className="w-full">
              <TabsList>
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="sensitive">Dados pessoais sensíveis</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-2">Dados Pessoais</h3>
                    <p>
                      <strong>Nome Completo:</strong> {agent.personalInfo.fullName}
                    </p>
                    <p>
                      <strong>Telefone Público:</strong> {agent.personalInfo.publicPhone}
                    </p>
                    <p>
                      <strong>Telefone Privado:</strong> {agent.personalInfo.privatePhone}
                    </p>
                    <p>
                      <strong>Email Pessoal:</strong> {agent.personalInfo.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Áreas de atuação</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.areasOfExpertise.map((area, index) => (
                        <Badge key={index} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold mt-4 mb-2">Compartilhar</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar agente
                </Button>
              </TabsContent>
              <TabsContent value="sensitive">
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Data de Nascimento:</strong> {agent.sensitiveInfo.birthDate}
                  </p>
                  <p>
                    <strong>Pessoa idosa:</strong> Não
                  </p>
                  <p>
                    <strong>Gênero:</strong> {agent.sensitiveInfo.gender}
                  </p>
                  <p>
                    <strong>Orientação Sexual:</strong> {agent.sensitiveInfo.sexualOrientation}
                  </p>
                  <p>
                    <strong>Raça/Cor:</strong> {agent.sensitiveInfo.race}
                  </p>
                  <p>
                    <strong>Pessoa portadora de deficiência:</strong> {agent.sensitiveInfo.disability}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Endereço</h3>
              <p className="mb-4">{agent.address}</p>
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
                <span className="ml-2">Mapa não disponível nesta visualização</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Denúncia</Button>
            <Button variant="outline">Contato</Button>
          </CardFooter>
        </Card>
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
