"use client"

import type { DrawerNavigation } from "./DrawerHeaderActions"
import { useRef, useState } from "react"

export default function useDrawerStack<T>() {
  const [stack, setStack] = useState<{ contentKey: number; item: T }[]>([])
  const nextContentKey = useRef(0)
  const close = () => setStack([])
  const back = () => setStack((items) => items.slice(0, -1))
  const navigation: DrawerNavigation = {
    onBack: stack.length > 1 ? back : undefined,
    onClose: close,
  }

  return {
    isOpen: stack.length > 0,
    drawer: stack[stack.length - 1]?.item,
    contentKey: stack[stack.length - 1]?.contentKey,
    navigation,
    open: (item: T) => setStack([{ contentKey: nextContentKey.current++, item }]),
    push: (item: T) => setStack((items) => [...items, { contentKey: nextContentKey.current++, item }]),
  }
}
