import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import useCreatePostComment from '../../_hooks/use-create-post-comment'

interface CommentInputProps {
  postId: number
  placeholder?: string
  onCancel?: () => void
}

const createCommentSchema = z.object({
  body: z.string().min(1, { message: 'Body is required' })
})

export default function CommentInput({ placeholder = 'Write a comment...', onCancel, postId }: CommentInputProps) {
  const [focus, setFocus] = useState(false)
  const { createComment } = useCreatePostComment(postId)

  const formMethods = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      body: ''
    }
  })

  const handleCancel = () => {
    setFocus(false)
    onCancel?.()
  }

  const handleSubmit = (data: z.infer<typeof createCommentSchema>) => {
    createComment(data.body)
    handleCancel()
    formMethods.reset()
  }

  return (
    <form className='space-y-3' onSubmit={formMethods.handleSubmit(handleSubmit)}>
      <Textarea {...formMethods.register('body')} rows={3} placeholder={placeholder} onFocus={() => setFocus(true)} />
      {focus && (
        <div className='flex justify-end items-center gap-3'>
          <Button variant='outline' onClick={handleCancel} type='button'>
            Cancel
          </Button>
          <Button type='submit' disabled={!formMethods.formState.isDirty}>
            Submit
          </Button>
        </div>
      )}
    </form>
  )
}
