"use client";

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {mockUsers} from '@/data/mockData';
import {cn} from '@/lib/utils';
import {Task, TaskPriority, TaskStatus} from '@/types';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {CalendarIcon, Loader2, Upload} from 'lucide-react';
import {useEffect, useState} from 'react';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (task: Partial<Task>) => void;
}

const statusOptions: {value: TaskStatus; label: string;}[] = [
  {value: 'todo', label: 'A Fazer'},
  {value: 'in_progress', label: 'Em Progresso'},
  {value: 'review', label: 'Revisão'},
  {value: 'done', label: 'Concluído'},
];

const priorityOptions: {value: TaskPriority; label: string;}[] = [
  {value: 'low', label: 'Baixa'},
  {value: 'medium', label: 'Média'},
  {value: 'high', label: 'Alta'},
  {value: 'urgent', label: 'Urgente'},
];

export default function TaskDialog({open, onOpenChange, task, onSave}: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [tags, setTags] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setAssigneeId(task.assignee?.id);
      setDueDate(task.dueDate);
      setTags(task.tags.join(', '));
    } else {
      resetForm();
    }
  }, [task, open]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setAssigneeId(undefined);
    setDueDate(undefined);
    setTags('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const assignee = assigneeId ? mockUsers.find(u => u.id === assigneeId) : undefined;
    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    onSave({
      id: task?.id,
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
      tags: tagArray,
    });

    setIsLoading(false);
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Atualize os detalhes da tarefa abaixo.'
              : 'Preencha os detalhes para criar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Main Info - Left Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da tarefa"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva os detalhes da tarefa"
                rows={12}
                className="resize-none"
              />
            </div>
          </div>

          {/* Details - Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Responsável</Label>
              <Select value={assigneeId || 'unassigned'} onValueChange={(v) => setAssigneeId(v === 'unassigned' ? undefined : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Não atribuído</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prazo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'PPP', {locale: ptBR}) : 'Selecione'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="frontend, backend, urgente"
              />
            </div>

            <div className="space-y-2">
              <Label>Anexos</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer h-24 flex flex-col items-center justify-center">
                <Upload className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">
                  Clique para selecionar (max 10MB)
                </p>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading || !title.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              isEditing ? 'Salvar Alterações' : 'Criar Tarefa'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
