import { useToast } from '@/hooks/use-toast'

export default function useSomethingWentWrongToast() {
  const { toast } = useToast()

  const errorToast = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request. Please try again'
    })
  }

  return errorToast
}
