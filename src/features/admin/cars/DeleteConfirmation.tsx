import { Button } from '@/components/ui/button'

interface DeleteConfirmationProps {
  onConfirm: () => Promise<void>
  onCancel: () => void
}

export function DeleteConfirmation({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Delete Car?</h2>
        <p className="mb-6 text-gray-600">This action cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
