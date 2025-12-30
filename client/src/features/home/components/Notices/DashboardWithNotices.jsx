import { useState } from 'react';

// Modal para crear avisos
function NoticeModal({ isOpen, onClose, onCreateNotice }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (title.trim() && deadline) {
      onCreateNotice({
        title: title.trim(),
        description: description.trim(),
        deadline
      });
      setTitle('');
      setDescription('');
      setDeadline('');
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-[#1C5A33] mb-4">Nuevo Aviso</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Título del aviso"
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-3"
          autoFocus
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-3 resize-none"
          rows={3}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-[#3CC370] text-white rounded-xl hover:bg-[#2BA862] transition-colors"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

// Item de aviso
function NoticeItem({ notice, onDelete }) {
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getColorIndicator = (daysRemaining) => {
    if (daysRemaining < 0) return 'bg-gray-400'; // Vencido
    if (daysRemaining <= 2) return 'bg-red-500';
    if (daysRemaining <= 5) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} de ${months[date.getMonth()]}`;
  };

  const daysRemaining = getDaysRemaining(notice.deadline);
  const colorClass = getColorIndicator(daysRemaining);

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow relative">
      {/* Indicador de color */}
      <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${colorClass}`} />

      {/* Botón eliminar */}
      <button
        onClick={() => onDelete(notice.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contenido */}
      <div className="ml-5 mr-5">
        <h3 className="font-bold text-[#1C5A33] mb-2 pr-2">{notice.title}</h3>
        {notice.description && (
          <p className="text-sm text-gray-600 mb-3">{notice.description}</p>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{formatDate(notice.deadline)}</span>
          <div className="flex items-center gap-1 text-[#3CC370] font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {daysRemaining < 0
                ? 'Vencido'
                : daysRemaining === 0
                  ? 'Hoy'
                  : daysRemaining === 1
                    ? 'Mañana'
                    : `Faltan ${daysRemaining} días`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar de avisos
function NoticesSidebar({ isVisible }) {
  const getInitialNotices = () => {
    const loadedNotices = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('notice_')) {
        const notice = JSON.parse(localStorage.getItem(key));
        loadedNotices.push(notice);
      }
    }
    // Ordenar por fecha más cercana primero
    loadedNotices.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return loadedNotices;
  };

  const [notices, setNotices] = useState(getInitialNotices);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const createNotice = (noticeData) => {
    const newNotice = {
      id: `notice_${Date.now()}`,
      ...noticeData,
      createdAt: Date.now()
    };

    localStorage.setItem(newNotice.id, JSON.stringify(newNotice));

    const updatedNotices = [...notices, newNotice];
    updatedNotices.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    setNotices(updatedNotices);
  };

  const deleteNotice = (noticeId) => {
    localStorage.removeItem(noticeId);
    setNotices(notices.filter(n => n.id !== noticeId));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`
          hidden md:block fixed top-1/2 -translate-y-1/2 right-0 h-[60vh] max-h-[600px] bg-gradient-to-b from-[#EBF9F1] to-white shadow-2xl rounded-l-3xl
          transition-transform duration-300 ease-in-out z-30 w-80
          ${isOpen ? 'translate-x-0' : 'translate-x-[65%]'}
        `}
      >
        {/* Botón toggle para abrir/cerrar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-4 top-4 text-[#3CC370] hover:text-[#2BA862] transition-colors z-10"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col h-full p-6 pt-14">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1C5A33]">Avisos</h2>
            <p className="text-sm text-gray-600 mt-1">{notices.length} avisos</p>
          </div>

          {/* Lista de avisos */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {notices.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p>No hay avisos</p>
              </div>
            ) : (
              notices.map(notice => (
                <NoticeItem key={notice.id} notice={notice} onDelete={deleteNotice} />
              ))
            )}
          </div>

          {/* Botón agregar */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 bg-[#3CC370] text-white rounded-xl hover:bg-[#2BA862] transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Aviso
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Full Screen */}
      <div className={`
        md:hidden fixed inset-0 bg-gradient-to-br from-[#EBF9F1] to-white z-20
        transition-transform duration-300
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6 pb-24">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1C5A33]">Avisos</h2>
            <p className="text-sm text-gray-600 mt-1">{notices.length} avisos</p>
          </div>

          {/* Lista de avisos */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {notices.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p>No hay avisos</p>
              </div>
            ) : (
              notices.map(notice => (
                <NoticeItem key={notice.id} notice={notice} onDelete={deleteNotice} />
              ))
            )}
          </div>

          {/* Botón agregar */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 bg-[#3CC370] text-white rounded-xl hover:bg-[#2BA862] transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Aviso
          </button>
        </div>
      </div>

      <NoticeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreateNotice={createNotice}
      />
    </>
  );
}

// Barra de navegación inferior (Mobile/Tablet)
function BottomNav({ activeView, onViewChange }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-2xl z-30 border-t border-gray-200">
      <div className="flex items-center justify-around h-full px-8">
        {/* Botón Home */}
        <button
          onClick={() => onViewChange('home')}
          className={`
            flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-2xl
            transition-all duration-300
            ${activeView === 'home'
              ? 'bg-[#3CC370]/20 text-[#1C5A33]'
              : 'text-gray-400'
            }
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Tareas</span>
        </button>

        {/* Botón Avisos */}
        <button
          onClick={() => onViewChange('notices')}
          className={`
            flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-2xl
            transition-all duration-300
            ${activeView === 'notices'
              ? 'bg-[#3CC370]/20 text-[#1C5A33]'
              : 'text-gray-400'
            }
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="text-xs font-medium">Avisos</span>
        </button>
      </div>
    </div>
  );
}

// Componente principal integrado
export default function DashboardWithNotices({ children }) {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="relative">
      {/* Contenido principal (TaskGroups) */}
      <div className={`
        transition-opacity duration-300
        ${activeView === 'home' ? 'opacity-100' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto'}
      `}>
        {children}
      </div>

      {/* Sidebar de avisos */}
      <NoticesSidebar isVisible={activeView === 'notices'} />

      {/* Bottom Navigation (solo mobile/tablet) */}
      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
}