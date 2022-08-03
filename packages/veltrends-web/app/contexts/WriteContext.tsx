import { createContext, useContext, useMemo, useState } from 'react'

interface WriteContextState {
  link: string
}

interface WriteContextActions {
  setLink(link: string): void
  reset(): void
}

interface WriteContextType {
  state: WriteContextState
  actions: WriteContextActions
}

const WriteContext = createContext<WriteContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export function WriteProvider({ children }: Props) {
  const [state, setState] = useState<WriteContextState>({
    link: '',
  })

  const actions = useMemo(
    () => ({
      reset() {
        setState({
          link: '',
        })
      },
      setLink(link: string) {
        setState((prev) => ({ ...prev, link }))
      },
    }),
    [],
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return <WriteContext.Provider value={value}>{children}</WriteContext.Provider>
}

export function useWriteContext() {
  const context = useContext(WriteContext)
  if (context === null) {
    throw new Error('useWriteContext must be used within a WriteProvider')
  }
  return context
}
