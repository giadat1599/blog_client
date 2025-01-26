import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import useCurrentUser from '@/hooks/use-current-user'
import { useToast } from '@/hooks/use-toast'
import { logout } from '@/services/client/auth'

interface LogoutAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LogoutAlertDialog({ open, onOpenChange }: LogoutAlertDialogProps) {
  const { mutate } = useCurrentUser()
  const { toast } = useToast()

  const onLogout = async () => {
    try {
      await logout()
      mutate(null)
    } catch {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again'
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
