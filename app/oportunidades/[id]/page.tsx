'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Link, Facebook, Twitter, Send } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

type Opportunity = {
  id: string;
  title: string;
  type: string;
  agent: string;
  description: string;
  registrationPeriod: {
    start: string;
    end: string;
  };
  areasOfInterest: string[];
  publishedBy: {
    name: string;
    logo: string;
  };
};

const sampleOpportunity: Opportunity = {
  id: '5112',
  title: 'Editais da Política Nacional Aldir Blanc (PNAB)',
  type: 'EDITAL',
  agent: 'Intendência de Cultura, Turismo e Eventos',
  description:
    'A Lei Aldir Blanc 2, ou Política Nacional Aldir Blanc (PNAB), é uma lei que estabelece o repasse de recursos financeiros para o fomento à cultura em todo o Brasil. A lei foi instituída pela Lei nº 14.399, de 8 de julho de 2022.\n\nNo total, o governo federal vai repassar na ordem de R$ 3 bilhões a Estados, Distrito Federal e Municípios para aplicação em ações culturais. O Fundo Municipal de Cultura',
  registrationPeriod: {
    start: '18/09/2024',
    end: '10/10/2024',
  },
  areasOfInterest: [
    'Arte Digital',
    'Arte de Rua',
    'Artes Circenses',
    'Artes Visuais',
    'Artesanato',
    'Audiovisual',
    'Circo',
    'Cultura Cigana',
    'Cultura Digital',
    'Cultura Indígena',
    'Cultura LGBT',
    'Cultura Negra',
    'Cultura Popular',
    'Dança',
    'Economia Criativa',
  ],
  publishedBy: {
    name: 'Intendência de Cultura, Turismo e Eventos',
    logo: '/placeholder.svg',
  },
};

export default function OpportunityDetailPage() {
  const params = useParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the opportunity data based on the ID
    // For this example, we're using the sample data
    setOpportunity(sampleOpportunity);
  }, [params.id]);

  if (!opportunity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Image
            src="/placeholder.svg"
            alt="Banner"
            width={1200}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-6 h-6 text-gray-400" />
              <Badge variant="secondary">{opportunity.type}</Badge>
              <Badge variant="outline">ID: {opportunity.id}</Badge>
            </div>
            <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
            <CardDescription>{opportunity.agent}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{opportunity.description}</p>

            <h3 className="font-semibold text-lg mb-2">Informações</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Período de inscrição</h4>
              <p>
                Inscrições abertas de {opportunity.registrationPeriod.start} a {opportunity.registrationPeriod.end}
              </p>
            </div>

            <h3 className="font-semibold text-lg mb-2">Inscreva-se</h3>
            <p className="mb-2">Clique no botão para se inscrever</p>
            <Button className="mb-4">Fazer inscrição</Button>

            <h3 className="font-semibold text-lg mb-2">Links</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Link className="w-4 h-4" />
              <a href="#" className="text-blue-500 hover:underline">
                Link para Inscrições
              </a>
            </div>

            <h3 className="font-semibold text-lg mb-2">Área de Interesse</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.areasOfInterest.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>

            <h3 className="font-semibold text-lg mb-2">Publicado por</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={opportunity.publishedBy.logo}
                alt={opportunity.publishedBy.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <span>{opportunity.publishedBy.name}</span>
            </div>

            <h3 className="font-semibold text-lg mb-2">Compartilhar</h3>
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
