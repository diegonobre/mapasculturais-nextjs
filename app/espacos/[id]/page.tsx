'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Facebook, Twitter, Send, MapPin, Clock } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

type Space = {
  id: string;
  name: string;
  type: string;
  description: string;
  operatingHours: string;
  address: string;
  accessibilityResources: string[];
  additionalInfo: {
    capacity: string;
    phone: string;
    email: string;
  };
  areasOfExpertise: string[];
  publishedBy: {
    name: string;
    avatar: string;
  };
};

const sampleSpace: Space = {
  id: '100289',
  name: 'Associação Comunitária do Quilombo da Família Flores',
  type: 'CENTRO DE TRADIÇÕES',
  description: 'Associação Comunitária do Quilombo da Família Flores',
  operatingHours: 'Finais de semana',
  address: 'Rua Manduca Rodrigues, 283, Quilombo da Família Flores - Glória - Porto Alegre/RS - CEP: 91720-080',
  accessibilityResources: ['Rampa de acesso'],
  additionalInfo: {
    capacity: '80',
    phone: '(51) 99199-6341',
    email: 'quilombodosflores283@gmail.com',
  },
  areasOfExpertise: [
    'Artes Visuais',
    'Artesanato',
    'Audiovisual',
    'Cinema',
    'Cultura Negra',
    'Cultura Popular',
    'Dança',
    'Educação',
    'Economia Criativa',
    'Esporte',
    'Literatura',
    'Leitura',
    'Meio Ambiente',
    'Patrimônio Cultural',
    'Patrimônio Imaterial',
    'Patrimônio Material',
    'Teatro',
  ],
  publishedBy: {
    name: 'Gercei de Lourdes Flores da Silva',
    avatar: '/placeholder.svg',
  },
};

export default function SpaceDetailPage() {
  const params = useParams();
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the space data based on the ID
    // For this example, we're using the sample data
    setSpace(sampleSpace);
  }, [params.id]);

  if (!space) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Image src="/placeholder.svg" alt={space.name} width={100} height={100} className="rounded-full" />
            <div>
              <CardTitle className="text-2xl">{space.name}</CardTitle>
              <CardDescription>
                ID: {space.id} • TIPO: <Badge variant="outline">{space.type}</Badge>
              </CardDescription>
            </div>
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
                    <h3 className="font-semibold mb-2">Horário de funcionamento</h3>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> {space.operatingHours}
                    </p>

                    <h3 className="font-semibold mt-4 mb-2">Recursos de acessibilidade</h3>
                    <div className="flex flex-wrap gap-2">
                      {space.accessibilityResources.map((resource, index) => (
                        <Badge key={index} variant="secondary">
                          {resource}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-semibold mt-4 mb-2">Informações adicionais</h3>
                    <p>
                      <strong>Capacidade do espaço:</strong> {space.additionalInfo.capacity}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {space.additionalInfo.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {space.additionalInfo.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Áreas de atuação</h3>
                    <div className="flex flex-wrap gap-2">
                      {space.areasOfExpertise.map((area, index) => (
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

                    <h3 className="font-semibold mt-4 mb-2">Publicado por</h3>
                    <div className="flex items-center space-x-2">
                      <Image
                        src={space.publishedBy.avatar}
                        alt={space.publishedBy.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span>{space.publishedBy.name}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Endereço</h3>
                  <p className="mb-4">{space.address}</p>
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-400" />
                    <span className="ml-2">Mapa não disponível nesta visualização</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description">
                <h3 className="font-semibold text-lg mb-2">Descrição Detalhada</h3>
                <p>{space.description}</p>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Denúncia</Button>
            <Button variant="outline">Contato</Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
