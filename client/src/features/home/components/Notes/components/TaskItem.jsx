export default function TaskItem({ item, groupId, onToggleComplete, onDelete, onDragStart, isDragging, dragPosition }) {
  return (
    <div className="relative">
      {/* Indicador de zona de drop superior */}
      {dragPosition === 'top' && (
        <div className="absolute -top-2 left-0 right-0 h-1 bg-[#3CC370] rounded-full shadow-md" />
      )}

      <div
        draggable
        onDragStart={(e) => onDragStart(e, groupId, item.id)}
        className={`
          bg-white/80 backdrop-blur-sm rounded-xl p-3 transition-all cursor-move
          ${isDragging ? 'opacity-40 scale-95' : 'hover:shadow-md hover:bg-white'}
          ${item.completed ? 'opacity-60' : ''}
        `}
      >
        <div className="flex items-start gap-3">
          {/* Icono de arrastre */}
          <div className="text-gray-400 pt-1 flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-16h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
            </svg>
          </div>

          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(groupId, item.id)}
            className="flex-shrink-0 mt-0.5"
          >
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${item.completed
                ? 'bg-[#3CC370] border-[#3CC370]'
                : 'border-gray-300 hover:border-[#3CC370]'
              }
            `}>
              {item.completed && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className={`
              text-sm font-medium text-[#1C5A33] break-words
              ${item.completed ? 'line-through opacity-60' : ''}
            `}>
              {item.name}
            </p>
            {item.description && (
              <p className="text-xs text-gray-600 mt-1 break-words">
                {item.description}
              </p>
            )}
          </div>

          {/* Botón eliminar */}
          <button
            onClick={() => onDelete(groupId, item.id)}
            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicador de zona de drop inferior */}
      {dragPosition === 'bottom' && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#3CC370] rounded-full shadow-md" />
      )}
    </div>
  );
};