import { useState } from 'react'

interface IDisclosure {
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  onConfirm?: (data: boolean) => void
  confirm?: boolean
}

const useDisclosure = (): IDisclosure => {
  const [open, setOpen] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const onConfirm = (confirm: boolean) => {
    setConfirm(confirm)
  }

  return { open, onOpen, onClose, onConfirm, confirm }
}

export default useDisclosure
