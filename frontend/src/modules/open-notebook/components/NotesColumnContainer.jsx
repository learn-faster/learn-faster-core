import { NotesColumn } from './NotesColumn'
import { useNotes } from '@/modules/open-notebook/lib/hooks/use-notes'

export default function NotesColumnContainer({ notebookId, contextSelections, onContextModeChange }) {
  const { data: notes = [], isLoading } = useNotes(notebookId)

  return (
    <NotesColumn
      notes={notes}
      isLoading={isLoading}
      notebookId={notebookId}
      contextSelections={contextSelections?.notes || {}}
      onContextModeChange={onContextModeChange}
    />
  )
}
