import { Button, ButtonProps } from './ui/button'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

export default function LoadingButton({ loading, disabled, ...props }: LoadingButtonProps) {
  return <Button {...props} disabled={disabled || loading} />
}
