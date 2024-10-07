'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Facebook, Twitter, Send, MapPin, Calendar, Info } from 'lucide-react';
import Header from '@/components/layout/header';

type Event = {
  id: string;
  title: string;
  organizer: string;
  description: string;
  projectInfo: string;
  ageClassification: string;
  location: {
    name: string;
    address: string;
  };
  date: string;
  accessibility: {
    libras: boolean;
    audioDescription: boolean;
  };
  additionalInfo: {
    totalAudience: string;
    phone: string;
    registrationInfo: string;
  };
  culturalLanguages: string[];
  publishedBy: {
    name: string;
    avatar: string;
  };
  administeredBy: {
    name: string;
    avatar: string;
  };
};

const sampleEvent: Event = {
  id: '9308',
  title: 'CURSO: AGÊNCIA DE TALENTOS - RAP CULTURAL BR',
  organizer: 'Rap Cultural BR',
  description:
    'Sejam todos bem vindos(a) ao Projeto Rap Cultural BR, é com apoio do Governo Federal do Brasil, e junto ao Minc - Ministério da Cultura através da Lei Paulo Gustavo. Assinado Termo de Execução em 10 de janeiro 2023 com aprovação do EDITAL DE CHAMAMENTO PÚBLICO 02/2023 - CULTURA\n\nEDITAL CECILIO FERREIRA DE GOMES\nFOMENTO A EXECUÇÃO DE AÇÕES CULTURAIS E PREMIAÇÕES NAS DEMAIS ÁREAS DA CULTURA\n\nEdital: CATEGORIA X - FOMENTO A CURSOS E OFICINAS DE CUNHO ARTÍSTICO E CULTURAL, ATIVIDADES DE ECONOMIA CRIATIVA E ECONOMIA SOLIDÁRIA\n\nApresentamos o Curso de Introdução ao Movimento Hip Hop no Brasil, parabenizamos o movimento Cultural pelos seus 50 Anos de Hip Hop, parabenizamos todos os artistas que vivem e expressão a sua capacidade técnica de artista, em sua respectiva linguagem cultural.\n\nDisponível totalmente Online.\n\n1ª Edição',
  projectInfo: 'Todo artista tem um talento, e é aqui começa aqui.',
  ageClassification: 'Livre',
  location: {
    name: 'Rap Cultural BR',
    address: 'Loteamento Hélio Jambá II Quadra 2-C, 40, Casa, Hélio Jambá, 57246-394, São Miguel dos Campos, AL',
  },
  date: 'O Site Oficial - Rap Cultural BR - Agência de Talentos estará disponível até 2024-01-17 podendo ser renovado de acordo com o resultado alcançado pelo projeto através de recursos provenientes do Ministério da Cultura no Brasil.',
  accessibility: {
    libras: true,
    audioDescription: false,
  },
  additionalInfo: {
    totalAudience: '24',
    phone: '(64) 98418-4036',
    registrationInfo:
      'As inscrições são totalmente gratuita, podendo o aluno acessar o curso e o site oficial do curso a qualquer momento, inicialmente o curso apresenta uma forma inovadora de apresentação, utilizando-se de um site completo apresentando o movimento cultural Hip Hop no Brasil e no Mundo disponibilizado totalmente de forma virtual.',
  },
  culturalLanguages: [
    'Artes Visuais',
    'Cultura Digital',
    'Curso ou Oficina',
    'Hip Hop',
    'Exposição',
    'Música Popular',
    'Audiovisual',
    'Dança',
    'Cultura Tradicional',
    'Cultura Indígena',
    'Outros',
  ],
  publishedBy: {
    name: 'Daniel Henrique',
    avatar: '/placeholder.svg',
  },
  administeredBy: {
    name: 'Daniel Henrique',
    avatar: '/placeholder.svg',
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the event data based on the ID
    // For this example, we're using the sample data
    setEvent(sampleEvent);
  }, [params.id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Image
            src="/placeholder.svg"
            alt="Event Banner"
            width={1200}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-6 h-6 text-gray-400" />
              <Badge variant="outline">{event.ageClassification}</Badge>
              <Badge variant="secondary">ID: {event.id}</Badge>
            </div>
            <CardTitle className="text-2xl">{event.title}</CardTitle>
            <CardDescription>{event.organizer}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList>
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="description">Descrição Detalhada</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-2">Informações do Evento</h3>
                    <p className="mb-2">{event.projectInfo}</p>
                    <p className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" /> {event.location.name}
                    </p>
                    <p className="mb-2">{event.location.address}</p>
                    <p className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2" /> {event.date}
                    </p>

                    <h3 className="font-semibold mt-4 mb-2">Acessibilidade</h3>
                    <p>LIBRAS: {event.accessibility.libras ? 'Sim' : 'Não'}</p>
                    <p>ÁUDIO DE DESCRIÇÃO: {event.accessibility.audioDescription ? 'Sim' : 'Não'}</p>

                    <h3 className="font-semibold mt-4 mb-2">Informações adicionais</h3>
                    <p>
                      <strong>TOTAL DE PÚBLICO:</strong> {event.additionalInfo.totalAudience}
                    </p>
                    <p>
                      <strong>TELEFONE:</strong> {event.additionalInfo.phone}
                    </p>
                    <p>
                      <strong>INFORMAÇÕES SOBRE A INSCRIÇÃO:</strong> {event.additionalInfo.registrationInfo}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Linguagem cultural</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.culturalLanguages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-semibold mt-4 mb-2">Compartilhar</h3>
                    <div className="flex space-x-2 mb-4">
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

                    <h3 className="font-semibold mt-4 mb-2">Publicado por</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Image
                        src={event.publishedBy.avatar}
                        alt={event.publishedBy.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span>{event.publishedBy.name}</span>
                    </div>

                    <h3 className="font-semibold mt-4 mb-2">Administrado por</h3>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={event.administeredBy.avatar}
                        alt={event.administeredBy.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span>{event.administeredBy.name}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description">
                <h3 className="font-semibold text-lg mb-2">Descrição Detalhada</h3>
                <p>{event.description}</p>
              </TabsContent>
            </Tabs>

            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Links</h3>
              <a href="#" className="text-blue-500 hover:underline flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Curso: Rap Cultural BR - Agência de Talentos
              </a>
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
