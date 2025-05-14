import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Trophy,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// INTERFACES
interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  liked?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  participants: number;
  daysLeft: number;
  category: string;
  joined: boolean;
}

interface Group {
  id: string;
  title: string;
  members: number;
  joined: boolean;
}

type DetailView = { type: 'group' | 'challenge'; item: Group | Challenge } | null;

interface Profile {
  user: {
    name: string;
    avatar?: string;
  };
}

// Componente para mostrar el perfil de usuario con opción de seguir
const ProfileViewComponent: React.FC<{ profile: Profile; onClose: () => void }> = ({ profile, onClose }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={onClose} className="p-2">
          <ChevronLeft size={24} className="text-primary-600" />
        </button>
        <h1 className="text-2xl font-bold text-neutral-900 ml-2">{profile.user.name}</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        {profile.user.avatar ? (
          <img
            src={profile.user.avatar}
            alt={profile.user.name}
            className="w-20 h-20 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <User size={24} className="text-primary-600" />
          </div>
        )}
        <p className="text-neutral-700 mb-2">Gustos: Fitness, Nutrición, Meditación.</p>
        <p className="text-neutral-700 mb-2">Bio: Apasionado por el deporte y la vida saludable.</p>
        <button onClick={() => setIsFollowing(!isFollowing)} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'groups'>('feed');

  // Publicaciones: se agregan 5 posts de ejemplo.
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Ana García',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      },
      content:
        '¡Acabo de completar mi primera carrera de 5K! Gracias a todos por el apoyo 🏃‍♀️',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: new Date(),
      liked: false,
    },
    {
      id: '2',
      user: {
        name: 'Carlos Ruiz',
      },
      content:
        'Día 30 del reto de meditación. La consistencia es clave para el cambio 🧘‍♂️',
      likes: 15,
      comments: 5,
      shares: 1,
      timestamp: new Date(),
      liked: false,
    },
    {
      id: '3',
      user: {
        name: 'Elena Pérez',
        avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
      },
      content: 'Acabo de probar una nueva receta saludable y me encantó! 🍲',
      likes: 32,
      comments: 4,
      shares: 2,
      timestamp: new Date(),
      liked: false,
    },
    {
      id: '4',
      user: { name: 'Jorge López' },
      content: 'Retando a mis amigos a un desafío de sentadillas hoy! 💪',
      likes: 18,
      comments: 3,
      shares: 0,
      timestamp: new Date(),
      liked: false,
    },
    {
      id: '5',
      user: {
        name: 'Mariana Díaz',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      },
      content: 'Compartiendo mi playlist para entrenar y motivarme durante el gym. 🎶',
      likes: 27,
      comments: 6,
      shares: 5,
      timestamp: new Date(),
      liked: false,
    },
  ]);

  // Estado para comentarios
  const [commentOpenFor, setCommentOpenFor] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Estado para crear nueva publicación
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  // Estado para ver perfil de usuario
  const [profileView, setProfileView] = useState<Profile | null>(null);

  // Estado para vista detalle (grupo/reto)
  const [detailView, setDetailView] = useState<DetailView>(null);

  // Datos de retos
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Reto 30 días sin azúcar',
      participants: 156,
      daysLeft: 12,
      category: 'Nutrición',
      joined: false,
    },
    {
      id: '2',
      title: 'Desafío de yoga diario',
      participants: 89,
      daysLeft: 20,
      category: 'Fitness',
      joined: false,
    },
  ]);

  // Datos de grupos
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      title: 'Runners Club',
      members: 1200,
      joined: false,
    },
    {
      id: '2',
      title: 'Yoga & Meditación',
      members: 856,
      joined: false,
    },
  ]);

  // FUNCIONES

  // Toggle like con cambio de color (verde al dar like)
  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          if (post.liked) {
            return { ...post, liked: false, likes: post.likes - 1 };
          } else {
            return { ...post, liked: true, likes: post.likes + 1 };
          }
        }
        return post;
      })
    );
  };

  // Mostrar/Ocultar input de comentario
  const toggleCommentInput = (postId: string) => {
    setCommentOpenFor(prev => (prev === postId ? null : postId));
    setCommentText('');
  };

  // Enviar comentario (simula respuesta automatizada)
  const handleCommentSubmit = (postId: string) => {
    if (!commentText.trim()) return;
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
    setCommentText('');
    setCommentOpenFor(null);
    setTimeout(() => {
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, comments: post.comments + 1 } : post
        )
      );
    }, 1000);
  };

  // Al hacer click en avatar/nombre se abre el perfil
  const openProfileView = (user: { name: string; avatar?: string }) => {
    setProfileView({ user });
  };

  // Toggle unir en retos (actualiza participantes)
  const toggleChallengeJoin = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(ch =>
        ch.id === challengeId
          ? {
              ...ch,
              joined: !ch.joined,
              participants: ch.joined ? ch.participants - 1 : ch.participants + 1,
            }
          : ch
      )
    );
  };

  // Toggle unir en grupos (actualiza miembros)
  const toggleGroupJoin = (groupId: string) => {
    setGroups(prev =>
      prev.map(gr =>
        gr.id === groupId
          ? {
              ...gr,
              joined: !gr.joined,
              members: gr.joined ? gr.members - 1 : gr.members + 1,
            }
          : gr
      )
    );
  };

  // Abrir detalle de reto o grupo
  const openDetailView = (type: 'group' | 'challenge', item: Group | Challenge) => {
    setDetailView({ type, item });
  };

  // Cierre de vista detalle
  const closeDetailView = () => {
    setDetailView(null);
  };

  // Crear nueva publicación: el post se asigna con el usuario "On-life" y avatar "logo.png"
  const handleNewPostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      user: { name: 'On-life', avatar: 'Public/logo.png' },
      content: newPostContent,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      liked: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowNewPostForm(false);
  };

  // Si se abre vista de perfil, se muestra el componente de perfil
  if (profileView) {
    return (
      <ProfileViewComponent profile={profileView} onClose={() => setProfileView(null)} />
    );
  }

  // Si se abre detalle de grupo/reto, se muestra la vista detalle
  if (detailView) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center mb-4">
          <button onClick={closeDetailView} className="p-2">
            <ChevronLeft size={24} className="text-primary-600" />
          </button>
          <h1 className="text-2xl font-bold text-neutral-900 ml-2">
            {detailView.type === 'group'
              ? (detailView.item as Group).title
              : (detailView.item as Challenge).title}
          </h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-neutral-700 mb-4">
            {detailView.type === 'group'
              ? `¡Bienvenido al grupo "${(detailView.item as Group).title}"! Aquí podrás compartir logros, noticias y conectar con otros miembros.`
              : `Detalles del reto "${(detailView.item as Challenge).title}". Prepárate para mejorar tus hábitos y alcanzar nuevos objetivos en este desafío.`}
          </p>
          <p className="text-sm text-neutral-500">
            {detailView.type === 'group'
              ? `Miembros: ${(detailView.item as Group).members}`
              : `Participantes: ${(detailView.item as Challenge).participants}. Días restantes: ${(detailView.item as Challenge).daysLeft}`}
          </p>
        </div>
      </div>
    );
  }

  // Ordenar grupos: los que ya se han unido aparecen primero
  const sortedGroups = [...groups].sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? -1 : 1));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Comunidad</h1>
          <p className="text-neutral-500 text-sm mt-1">Conecta y comparte con otros</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} className="mr-1" />
          Crear Publicación
        </button>
      </div>

      {/* Formulario para nueva publicación */}
      {showNewPostForm && (
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
          <textarea
            placeholder="¿Qué quieres compartir?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setShowNewPostForm(false)}
              className="mr-2 text-neutral-600 hover:text-neutral-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleNewPostSubmit}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Publicar
            </button>
          </div>
        </div>
      )}

      {/* Tabs de navegación */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-neutral-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'feed'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <MessageSquare size={16} className="inline-block mr-1" />
            Feed
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'challenges'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Trophy size={16} className="inline-block mr-1" />
            Retos
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'groups'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Users size={16} className="inline-block mr-1" />
            Grupos
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Zona izquierda: Feed y Retos */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center mb-4">
                    {post.user.avatar ? (
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={() => openProfileView(post.user)}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center cursor-pointer"
                        onClick={() => openProfileView(post.user)}
                      >
                        <User size={20} className="text-primary-600" />
                      </div>
                    )}
                    <div className="ml-3 cursor-pointer" onClick={() => openProfileView(post.user)}>
                      <h3 className="font-medium">{post.user.name}</h3>
                      <p className="text-sm text-neutral-500">{post.timestamp.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-neutral-800 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <button onClick={() => handleLike(post.id)} className="flex items-center hover:text-primary-600 transition-colors">
                      <Heart size={18} className={`mr-1 ${post.liked ? 'text-green-500' : 'text-neutral-600'}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button onClick={() => toggleCommentInput(post.id)} className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors">
                      <MessageCircle size={18} className="mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors">
                      <Share2 size={18} className="mr-1" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  {commentOpenFor === post.id && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Escribe un comentario..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full border rounded p-2"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="mt-2 bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors"
                      >
                        Enviar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{challenge.title}</h3>
                    <span className="text-sm text-primary-600 font-medium">{challenge.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-500">Participantes</p>
                      <p className="font-semibold">{challenge.participants}</p>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-500">Días Restantes</p>
                      <p className="font-semibold">{challenge.daysLeft}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleChallengeJoin(challenge.id)}
                      className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {challenge.joined ? 'Ya eres parte' : 'Unirse'}
                    </button>
                    <button
                      onClick={() => openDetailView('challenge', challenge)}
                      className="w-full py-2 px-4 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zona derecha: Grupos y Mentores */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="font-semibold mb-4">Grupos Sugeridos</h2>
            <div className="space-y-4">
              {sortedGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Users size={20} className="text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{group.title}</h3>
                      <p className="text-sm text-neutral-500">{group.members} miembros</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleGroupJoin(group.id)}
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      {group.joined ? 'Ya eres parte' : 'Unirse'}
                    </button>
                    <button
                      onClick={() => openDetailView('group', group)}
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="font-semibold mb-4">Mentores Destacados</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  alt="Mentor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium">Laura Martínez</h3>
                  <p className="text-sm text-neutral-500">Nutricionista Deportiva</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg"
                  alt="Mentor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium">Roberto Sánchez</h3>
                  <p className="text-sm text-neutral-500">Entrenador Personal</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={20} className="text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">David Torres</h3>
                  <p className="text-sm text-neutral-500">Entrenador Personal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

