import Link from 'next/link';
import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">Acesse</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-black hover:underline">
                  Editais e oportunidades
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Agentes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Espaços
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Projetos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Painel</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-black hover:underline">
                  Editais e oportunidades
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Meus eventos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Meus agentes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Meus espaços
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Sair
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Ajuda e privacidade</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-black hover:underline">
                  Dúvidas frequentes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black hover:underline">
                  Dúvidas e problemas com o sistema podem ser resolvidos pelo e-mail suporte@mapasculturais.com.br
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Plataforma livre e colaborativa mapas culturais, desenvolvida por Hacklab e mantida pelo MINC.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Versão Cleodon Silva por Recursive Solutions.</p>
          <Link
            href="https://github.com/diegonobre/mapasculturais-nextjs"
            target="_blank"
            className="inline-flex items-center text-black hover:underline mt-2"
          >
            <Github className="w-4 h-4 mr-1" />
            Conheça o repositório
          </Link>
        </div>
      </div>
    </footer>
  );
}
