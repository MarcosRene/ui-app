import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import * as Dialog from '@radix-ui/react-dialog'

import { queryClient } from '../services/queryClient'
import { getSlugFromString } from '../utils/getSlugFromString'

import { Button } from './ui/button'

const createTagSchema = z.object({
  title: z.string().min(3, 'Minimal 3 characteres.'),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

export function CreateTagForm() {
  const { formState: { isSubmitting, errors }, handleSubmit, register, watch } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema)
  })

  const slug = watch('title') 
    ? getSlugFromString(watch('title')) 
    : ''
    
  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: CreateTagSchema) => {
      await new Promise(resolve => setTimeout(resolve, 2000))

      await fetch('http://localhost:3333/tags', {
        method: 'POST',
        body: JSON.stringify({
          title, 
          slug,
          amountOfVideos: 0,
        })
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    }
  })
  
  async function createTag({ title }: CreateTagSchema) {
    await mutateAsync({ title })
  }

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium block">
          Tag name
        </label>
        <input
          id="title"
          className="w-full bg-zinc-800/20 border border-zinc-800 rounded-lg px-1.5 py-2"
          {...register('title')}
       />

        {errors?.title && 
          <span className="text-sm text-red-400">
            {errors.title.message}
          </span>
        }
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium block">
          Slug
        </label>
        <input
          id="slug"
          value={slug}
          readOnly
          className="w-full bg-zinc-800/20 border border-zinc-800 rounded-lg px-1.5 py-2"
        />
      </div>

      <div className="flex justify-end gap-2">
       <Dialog.Close asChild>
          <Button>
              <X size={12} />
              Cancel
          </Button>
       </Dialog.Close>
        <Button type="submit" className="bg-teal-400 text-teal-950" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
          Salve
        </Button>
      </div>
    </form>
  )
}
