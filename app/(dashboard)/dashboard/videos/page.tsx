'use client';

import { useActionState, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Video,
  FolderOpen,
} from 'lucide-react';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryActive,
  addVideo,
  updateVideo,
  deleteVideo,
  toggleVideoActive,
} from './actions';
import type { VideoCategory, Video as VideoType } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type ActionState = { error?: string; success?: string };

// ===== CATÉGORIES TAB =====

function CategoriesTab() {
  const { data, isLoading } = useSWR<{ categories: VideoCategory[] }>(
    '/api/admin/video-categories',
    fetcher
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<VideoCategory | null>(null);

  const [addState, addAction, isAdding] = useActionState<ActionState, FormData>(
    addCategory,
    {}
  );
  const [editState, editAction, isEditing] = useActionState<ActionState, FormData>(
    updateCategory,
    {}
  );

  useEffect(() => {
    if (addState.success || editState.success) {
      setDialogOpen(false);
      setEditing(null);
      mutate('/api/admin/video-categories');
    }
  }, [addState.success, editState.success]);

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(cat: VideoCategory) {
    setEditing(cat);
    setDialogOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cette catégorie et toutes ses vidéos ?')) return;
    const fd = new FormData();
    fd.set('id', String(id));
    await deleteCategory({}, fd);
    mutate('/api/admin/video-categories');
  }

  async function handleToggle(id: number, currentActive: boolean) {
    const fd = new FormData();
    fd.set('id', String(id));
    fd.set('active', String(!currentActive));
    await toggleCategoryActive({}, fd);
    mutate('/api/admin/video-categories');
  }

  const categories = data?.categories || [];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catégories vidéo</CardTitle>
          <Button
            onClick={openAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune catégorie
              </h3>
              <p className="text-sm text-gray-500">
                Ajoutez votre première catégorie pour commencer.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-500 w-6 text-center">
                      {cat.order}
                    </span>
                    <span className="text-sm text-gray-500">{cat.icon}</span>
                    <span className="font-medium text-gray-900">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(cat.id, cat.active)}
                      title={cat.active ? 'Désactiver' : 'Activer'}
                    >
                      {cat.active ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Dialog Add/Edit Category */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </DialogTitle>
          </DialogHeader>
          <form action={editing ? editAction : addAction} className="space-y-4">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <div>
              <Label htmlFor="cat-name" className="mb-2">Nom</Label>
              <Input
                id="cat-name"
                name="name"
                placeholder="Ex: Coran"
                defaultValue={editing?.name || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="cat-icon" className="mb-2">
                Icône (MaterialCommunityIcons)
              </Label>
              <Input
                id="cat-icon"
                name="icon"
                placeholder="Ex: book-open-variant"
                defaultValue={editing?.icon || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="cat-order" className="mb-2">Ordre</Label>
              <Input
                id="cat-order"
                name="order"
                type="number"
                defaultValue={editing?.order ?? 0}
              />
            </div>
            {(addState.error || editState.error) && (
              <p className="text-red-500 text-sm">
                {addState.error || editState.error}
              </p>
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isAdding || isEditing}
              >
                {isAdding || isEditing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : editing ? (
                  'Modifier'
                ) : (
                  'Ajouter'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ===== VIDÉOS TAB =====

function VideosTab() {
  const { data: catData } = useSWR<{ categories: VideoCategory[] }>(
    '/api/admin/video-categories',
    fetcher
  );
  const { data: vidData, isLoading } = useSWR<{ videos: (VideoType & { categoryName?: string })[] }>(
    '/api/admin/videos',
    fetcher
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<VideoType | null>(null);

  const [addState, addAction, isAdding] = useActionState<ActionState, FormData>(
    addVideo,
    {}
  );
  const [editState, editAction, isEditing] = useActionState<ActionState, FormData>(
    updateVideo,
    {}
  );

  useEffect(() => {
    if (addState.success || editState.success) {
      setDialogOpen(false);
      setEditing(null);
      mutate('/api/admin/videos');
    }
  }, [addState.success, editState.success]);

  function openAdd() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(vid: VideoType) {
    setEditing(vid);
    setDialogOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cette vidéo ?')) return;
    const fd = new FormData();
    fd.set('id', String(id));
    await deleteVideo({}, fd);
    mutate('/api/admin/videos');
  }

  async function handleToggle(id: number, currentActive: boolean) {
    const fd = new FormData();
    fd.set('id', String(id));
    fd.set('active', String(!currentActive));
    await toggleVideoActive({}, fd);
    mutate('/api/admin/videos');
  }

  const categories = catData?.categories || [];
  const videosList = vidData?.videos || [];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vidéos</CardTitle>
          <Button
            onClick={openAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
          ) : videosList.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Video className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune vidéo
              </h3>
              <p className="text-sm text-gray-500">
                Ajoutez votre première vidéo YouTube.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {videosList.map((vid) => (
                <li
                  key={vid.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        vid.thumbnailUrl ||
                        `https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`
                      }
                      alt={vid.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {vid.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {vid.categoryName || `Cat. #${vid.categoryId}`} · Ordre: {vid.order}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span title={vid.hasSound ? 'Avec son' : 'Sans son'}>
                      {vid.hasSound ? (
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      ) : (
                        <VolumeX className="h-4 w-4 text-gray-400" />
                      )}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(vid.id, vid.active)}
                      title={vid.active ? 'Désactiver' : 'Activer'}
                    >
                      {vid.active ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(vid)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(vid.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Dialog Add/Edit Video */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Modifier la vidéo' : 'Nouvelle vidéo'}
            </DialogTitle>
          </DialogHeader>
          <form action={editing ? editAction : addAction} className="space-y-4">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            {!editing && (
              <div>
                <Label htmlFor="vid-url" className="mb-2">Lien YouTube</Label>
                <Input
                  id="vid-url"
                  name="youtubeUrl"
                  placeholder="https://youtube.com/watch?v=... ou ID directement"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="vid-title" className="mb-2">Titre</Label>
              <Input
                id="vid-title"
                name="title"
                placeholder="Ex: Sourate Al-Fatiha - Récitation"
                defaultValue={editing?.title || ''}
                required
              />
            </div>
            <div>
              <Label htmlFor="vid-cat" className="mb-2">Catégorie</Label>
              <select
                id="vid-cat"
                name="categoryId"
                defaultValue={editing?.categoryId || ''}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">-- Choisir --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="vid-order" className="mb-2">Ordre</Label>
                <Input
                  id="vid-order"
                  name="order"
                  type="number"
                  defaultValue={editing?.order ?? 0}
                />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <input
                  type="checkbox"
                  id="vid-sound"
                  name="hasSound"
                  value="true"
                  defaultChecked={editing?.hasSound ?? true}
                  className="h-4 w-4"
                />
                <Label htmlFor="vid-sound">Avec son</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="vid-thumb" className="mb-2">
                URL Thumbnail (optionnel)
              </Label>
              <Input
                id="vid-thumb"
                name="thumbnailUrl"
                placeholder="Laisser vide = thumbnail YouTube auto"
                defaultValue={editing?.thumbnailUrl || ''}
              />
            </div>
            {(addState.error || editState.error) && (
              <p className="text-red-500 text-sm">
                {addState.error || editState.error}
              </p>
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isAdding || isEditing}
              >
                {isAdding || isEditing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : editing ? (
                  'Modifier'
                ) : (
                  'Ajouter'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ===== PAGE PRINCIPALE =====

export default function VideosAdminPage() {
  const { data: user, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading) {
    return (
      <section className="flex-1 p-4 lg:p-8">
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      </section>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <section className="flex-1 p-4 lg:p-8">
        <div className="flex flex-col items-center py-20 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Accès refusé
          </h1>
          <p className="text-sm text-gray-500">
            Cette page est réservée aux administrateurs.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Gestion des vidéos
      </h1>

      <Tabs defaultValue="categories">
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="videos">Vidéos</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoriesTab />
        </TabsContent>

        <TabsContent value="videos">
          <VideosTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
