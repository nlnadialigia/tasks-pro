"use client";

import DashboardLayout from '@/components/layout/DashboardLayout';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {RoleBadge} from '@/components/ui/status-badges';
import {mockUsers} from '@/data/mockData';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {
  Crown,
  Mail,
  MoreHorizontal,
  Shield,
  UserMinus,
  UserPlus
} from 'lucide-react';

export default function TeamPage() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout
      title="Equipe"
      description="Gerencie os membros do projeto e suas permissões"
      headerAction={
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Membro
        </Button>
      }
    >
      <div className="p-6 space-y-6">

        <Card>
          <CardHeader>
            <CardTitle>Membros do Projeto</CardTitle>
            <CardDescription>
              {mockUsers.length} membros ativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        {user.role === 'owner' && (
                          <Crown className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <RoleBadge role={user.role} />
                      <p className="text-xs text-muted-foreground mt-1">
                        Desde {format(user.createdAt, "MMM yyyy", {locale: ptBR})}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Alterar permissão
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <UserMinus className="w-4 h-4 mr-2" />
                          Remover do projeto
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Info */}
        <Card>
          <CardHeader>
            <CardTitle>Níveis de Permissão</CardTitle>
            <CardDescription>
              Entenda os diferentes níveis de acesso no projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <RoleBadge role="owner" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Acesso total ao projeto. Pode gerenciar membros, configurações e excluir o projeto.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <RoleBadge role="editor" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Pode criar, editar e excluir tarefas. Não pode gerenciar membros ou configurações.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <RoleBadge role="viewer" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Apenas visualização. Pode ver tarefas e comentários, mas não pode fazer alterações.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
