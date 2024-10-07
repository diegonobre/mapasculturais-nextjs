'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Facebook, Twitter, Send } from 'lucide-react';
import Header from '@/components/layout/header';

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  objective: string;
  bannerImage: string;
  projectImage: string;
  publishedBy: {
    name: string;
    avatar: string;
  };
};

const sampleProject: Project = {
  id: '10155',
  title: 'Recilarte lixo é luxo',
  type: 'JORNADA',
  description: 'Aula Mensal Arte sustentável',
  objective:
    'promover uma maior interação entre visitantes e artesãs, estimulando a aprendizagem de técnicas sustentáveis e a criação colaborativa. A estrutura do workshop seria assim:',
  bannerImage: '/placeholder.svg',
  projectImage: '/placeholder.svg',
  publishedBy: {
    name: 'Cibele de Sousa Santos',
    avatar: '/placeholder.svg',
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the project data based on the ID
    // For this example, we're using the sample data
    setProject(sampleProject);
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 relative">
          <Image
            src={project.bannerImage}
            alt="Project Banner"
            width={1200}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute -bottom-10 left-4">
            <Image
              src={project.projectImage}
              alt={project.title}
              width={100}
              height={100}
              className="rounded-full border-4 border-white"
            />
          </div>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary">{project.type}</Badge>
              <Badge variant="outline">ID: {project.id}</Badge>
            </div>
            <CardTitle className="text-2xl">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList>
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="subprojects">Subprojetos</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Objetivo</h3>
                    <p>{project.objective}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Workshop Quinzenal de ReciclArte: do lixo ao luxo a proposta é
                    </h3>
                    <p>
                      Realizar workshops mensais que promovam a aprendizagem de técnicas de artesanais c/matérias
                      que seriam descartados
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="subprojects">
                <p>Não há subprojetos disponíveis no momento.</p>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Compartilhar</h3>
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

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Publicado por</h3>
              <div className="flex items-center space-x-2">
                <Image
                  src={project.publishedBy.avatar}
                  alt={project.publishedBy.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{project.publishedBy.name}</span>
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
