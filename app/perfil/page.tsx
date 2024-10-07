/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Plus } from 'lucide-react';
import Header from '@/components/layout/header';

const areasOfExpertise = [
  'Artes Visuais',
  'Audiovisual',
  'Circo',
  'Dança',
  'Literatura',
  'Música',
  'Patrimônio Cultural',
  'Teatro',
  'Cultura Popular',
  'Cultura Digital',
];

export default function EditProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    socialName: '',
    areasOfExpertise: [],
    bio: '',
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    publicEmail: '',
    phone: '',
    publicPhone: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    race: '',
    gender: '',
    sexualOrientation: '',
    disability: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: '',
    },
    publicInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data submitted:', profileData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edição do agente individual</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Apresentação</CardTitle>
              <CardDescription>As informações inseridas aqui serão exibidas publicamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-grow space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                    <Button>Adicionar imagem de Capa</Button>
                  </div>
                  <div>
                    <Label htmlFor="name">Nome do Agente</Label>
                    <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="socialName">Nome Social</Label>
                    <Input
                      id="socialName"
                      name="socialName"
                      value={profileData.socialName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label>Áreas de atuação</Label>
                    <ScrollArea className="h-[200px] w-full border rounded-md p-4">
                      {areasOfExpertise.map((area) => (
                        <div key={area} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={area}
                            // checked={profileData.areasOfExpertise.includes(area)}
                            // onCheckedChange={(checked) => {
                            //   if (checked) {
                            //     setProfileData((prev) => ({
                            //       ...prev,
                            //       areasOfExpertise: [...prev.areasOfExpertise, area],
                            //     }));
                            //   } else {
                            //     setProfileData((prev) => ({
                            //       ...prev,
                            //       areasOfExpertise: prev.areasOfExpertise.filter((a) => a !== area),
                            //     }));
                            //   }
                            // }}
                          />
                          <label
                            htmlFor={area}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {area}
                          </label>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      className="h-32"
                    />
                  </div>
                </div>
                <div className="w-full md:w-64 space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Adicionar redes sociais</h3>
                    <div className="space-y-2">
                      {Object.entries(profileData.socialMedia).map(([network, value]) => (
                        <div key={network} className="flex items-center space-x-2">
                          {network === 'facebook' && <Facebook className="w-4 h-4" />}
                          {network === 'twitter' && <Twitter className="w-4 h-4" />}
                          {network === 'instagram' && <Instagram className="w-4 h-4" />}
                          {network === 'youtube' && <Youtube className="w-4 h-4" />}
                          {network === 'linkedin' && <Linkedin className="w-4 h-4" />}
                          <Input
                            placeholder={`URL do ${network}`}
                            name={network}
                            value={value}
                            onChange={handleSocialMediaChange}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Agentes relacionados</h3>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar agente
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Tags</h3>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar tag
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>Não se preocupe, esses dados não serão exibidos publicamente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" name="fullName" value={profileData.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={profileData.cpf} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail principal</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="publicEmail">E-mail público</Label>
                <Input
                  id="publicEmail"
                  name="publicEmail"
                  type="email"
                  value={profileData.publicEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone principal</Label>
                <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="publicPhone">Telefone público</Label>
                <Input
                  id="publicPhone"
                  name="publicPhone"
                  value={profileData.publicPhone}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" name="cep" value={profileData.address.cep} onChange={handleAddressChange} />
              </div>
              <div>
                <Label htmlFor="street">Logradouro</Label>
                <Input
                  id="street"
                  name="street"
                  value={profileData.address.street}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={profileData.address.number}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={profileData.address.complement}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={profileData.address.neighborhood}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="city">Município</Label>
                  <Input id="city" name="city" value={profileData.address.city} onChange={handleAddressChange} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="state">Estado</Label>
                  <Select
                    onValueChange={(value) => handleAddressChange({ target: { name: 'state', value } } as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados pessoais sensíveis</CardTitle>
              <CardDescription>Essas informações não serão exibidas publicamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="race">Raça/Cor</Label>
                <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, race: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a raça/cor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branca">Branca</SelectItem>
                    <SelectItem value="preta">Preta</SelectItem>
                    <SelectItem value="parda">Parda</SelectItem>
                    <SelectItem value="amarela">Amarela</SelectItem>
                    <SelectItem value="indigena">Indígena</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender">Identidade de Gênero</Label>
                <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a identidade de gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mulher_cis">Mulher Cis</SelectItem>
                    <SelectItem value="homem_cis">Homem Cis</SelectItem>
                    <SelectItem value="mulher_trans">Mulher Trans</SelectItem>
                    <SelectItem value="homem_trans">Homem Trans</SelectItem>
                    <SelectItem value="nao_binario">Não-binário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sexualOrientation">Orientação Sexual</Label>
                <Select
                  onValueChange={(value) => setProfileData((prev) => ({ ...prev, sexualOrientation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a orientação sexual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heterossexual">Heterossexual</SelectItem>
                    <SelectItem value="homossexual">Homossexual</SelectItem>
                    <SelectItem value="bissexual">Bissexual</SelectItem>
                    <SelectItem value="pansexual">Pansexual</SelectItem>
                    <SelectItem value="assexual">Assexual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="disability">Pessoa com deficiência</Label>
                <Select onValueChange={(value) => setProfileData((prev) => ({ ...prev, disability: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="auditiva">Auditiva</SelectItem>
                    <SelectItem value="visual">Visual</SelectItem>
                    <SelectItem value="intelectual">Intelectual</SelectItem>
                    <SelectItem value="multipla">Múltipla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações públicas</CardTitle>
              <CardDescription>As informações inseridas aqui serão exibidas publicamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="publicInfo">Descrição curta</Label>
                <Textarea
                  id="publicInfo"
                  name="publicInfo"
                  value={profileData.publicInfo}
                  onChange={handleInputChange}
                  className="h-32"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Salvar rascunho
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
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
