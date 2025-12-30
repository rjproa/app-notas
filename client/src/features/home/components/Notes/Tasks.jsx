import { useState } from 'react';
import GroupModal from './components/GroupModal'
import TaskItem from './components/TaskItem';
import ItemModal from './components/ItemModal'
import BtnAddItem from './components/BtnAddItem'
import BtnAddGroup from './components/BtnAddGroup'
import GroupSkeleton from './components/GroupSkeleton'

export default function TaskGroups({ userId }) {

  const getInitialGroups = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('group_'))
      .map(key => JSON.parse(localStorage.getItem(key)))
      .filter(group => group.user === userId)
      .sort((a, b) => a.createdAt - b.createdAt)

  };

  const [groups, setGroups] = useState(getInitialGroups());
  const [expandedGroups, setExpandedGroups] = useState({});
  const [showCreateItem, setShowCreateItem] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const createGroup = (name) => {
    const newGroup = {
      id: `group_${Date.now()}`,
      name,
      user: userId,
      color: '#daffe8ff',
      items: [],
      createdAt: Date.now()
    };

    localStorage.setItem(newGroup.id, JSON.stringify(newGroup));
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    const pendingItems = group.items.filter(item => !item.completed).length;

    if (pendingItems > 0) {
      showNotification(`No se puede eliminar. Hay ${pendingItems} tarea(s) pendiente(s).`);
      return;
    }

    localStorage.removeItem(groupId);
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const createItem = (groupId, itemData) => {
    const newItem = {
      id: `item_${Date.now()}`,
      ...itemData,
      completed: false,
      createdAt: Date.now()
    };

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        const updatedGroup = {
          ...group,
          items: [...group.items, newItem]
        };
        localStorage.setItem(groupId, JSON.stringify(updatedGroup));
        return updatedGroup;
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  const toggleItemComplete = (groupId, itemId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        const items = group.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );

        const sortedItems = [
          ...items.filter(item => !item.completed),
          ...items.filter(item => item.completed)
        ];

        const updatedGroup = { ...group, items: sortedItems };
        localStorage.setItem(groupId, JSON.stringify(updatedGroup));

        const completedItem = items.find(item => item.id === itemId);
        if (completedItem?.completed && window.updateTaskCompletion) {
          window.updateTaskCompletion();
        }

        return updatedGroup;
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  const deleteItem = (groupId, itemId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        const updatedGroup = {
          ...group,
          items: group.items.filter(item => item.id !== itemId)
        };
        localStorage.setItem(groupId, JSON.stringify(updatedGroup));
        return updatedGroup;
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  const handleDragStart = (e, groupId, itemId) => {
    setDraggedItem({ groupId, itemId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetGroupId, targetItemId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;
    if (draggedItem.groupId === targetGroupId && draggedItem.itemId === targetItemId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const position = e.clientY < midpoint ? 'top' : 'bottom';

    setDragOverItem({ groupId: targetGroupId, itemId: targetItemId });
    setDragPosition(position);
  };

  const handleDrop = (e, targetGroupId, targetItemId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !dragPosition) {
      setDraggedItem(null);
      setDragOverItem(null);
      setDragPosition(null);
      return;
    }

    const { groupId: sourceGroupId, itemId: sourceItemId } = draggedItem;

    if (sourceGroupId === targetGroupId && sourceItemId === targetItemId) {
      setDraggedItem(null);
      setDragOverItem(null);
      setDragPosition(null);
      return;
    }

    const sourceGroup = groups.find(g => g.id === sourceGroupId);
    const movedItem = sourceGroup.items.find(i => i.id === sourceItemId);

    if (!movedItem) {
      setDraggedItem(null);
      setDragOverItem(null);
      setDragPosition(null);
      return;
    }

    let updatedGroups = [...groups];

    // Paso 1: Remover del grupo origen
    updatedGroups = updatedGroups.map(group => {
      if (group.id === sourceGroupId) {
        return {
          ...group,
          items: group.items.filter(item => item.id !== sourceItemId)
        };
      }
      return group;
    });

    // Paso 2: Insertar en el grupo destino
    updatedGroups = updatedGroups.map(group => {
      if (group.id === targetGroupId) {
        const targetIndex = group.items.findIndex(i => i.id === targetItemId);
        const newItems = [...group.items];

        // Calcular el índice correcto de inserción
        let insertIndex = dragPosition === 'top' ? targetIndex : targetIndex + 1;

        // Si es el mismo grupo, ajustar el índice si es necesario
        if (sourceGroupId === targetGroupId) {
          const originalIndex = sourceGroup.items.findIndex(i => i.id === sourceItemId);
          if (originalIndex < targetIndex) {
            insertIndex = dragPosition === 'top' ? targetIndex - 1 : targetIndex;
          }
        }

        newItems.splice(insertIndex, 0, movedItem);

        const updatedGroup = { ...group, items: newItems };
        localStorage.setItem(group.id, JSON.stringify(updatedGroup));
        return updatedGroup;
      }
      return group;
    });

    // Guardar el grupo origen actualizado
    const updatedSourceGroup = updatedGroups.find(g => g.id === sourceGroupId);
    if (updatedSourceGroup) {
      localStorage.setItem(sourceGroupId, JSON.stringify(updatedSourceGroup));
    }

    setGroups(updatedGroups);
    setDraggedItem(null);
    setDragOverItem(null);
    setDragPosition(null);
  };

  const toggleGroupExpansion = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const pendingCount = (group) => group.items.filter(item => !item.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF9F1] to-white p-4 md:p-8 mb-16">
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-down">
          {notification}
        </div>
      )}

      <div className="pt-[64px] max-w-6xl mx-auto">
        {groups.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <GroupSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups.map(group => {
              const isExpanded = expandedGroups[group.id] !== false;
              const visibleItems = isExpanded ? group.items : group.items.slice(0, 2);

              return (
                <div
                  key={group.id}
                  style={{ backgroundColor: group.color }}
                  className="rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <h3
                      onClick={() => toggleGroupExpansion(group.id)}
                      className="text-xl font-bold text-[#1C5A33] flex-1 text-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {group.name}
                    </h3>

                    <div className="w-8 h-8 bg-[#3CC370] rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">{pendingCount(group)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {visibleItems.map(item => (
                      <div
                        key={item.id}
                        onDragOver={(e) => handleDragOver(e, group.id, item.id)}
                        onDrop={(e) => handleDrop(e, group.id, item.id)}
                      >
                        <TaskItem
                          item={item}
                          groupId={group.id}
                          onToggleComplete={toggleItemComplete}
                          onDelete={deleteItem}
                          onDragStart={handleDragStart}
                          isDragging={draggedItem?.itemId === item.id}
                          dragPosition={
                            dragOverItem?.groupId === group.id &&
                              dragOverItem?.itemId === item.id
                              ? dragPosition
                              : null
                          }
                        />
                      </div>
                    ))}

                    {!isExpanded && group.items.length > 2 && (
                      <div className="text-center py-2 text-[#267D48] text-sm font-medium opacity-50">
                        +{group.items.length - 2} más...
                      </div>
                    )}
                  </div>

                  <BtnAddItem setShowCreateItem={() => setShowCreateItem(group.id)} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BtnAddGroup setShowCreateGroup={() => setShowCreateGroup(true)} />

      <ItemModal
        isOpen={showCreateItem !== null}
        onClose={() => setShowCreateItem(null)}
        onCreateItem={(itemData) => createItem(showCreateItem, itemData)}
      />
      <GroupModal
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreateGroup={createGroup}
      />

      <style>{`
  @keyframes slide-down {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
`}</style>

    </div>
  );
}