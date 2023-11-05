import { useEffect, type RefObject } from 'react'

type Event = MouseEvent | TouchEvent

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current
            if (el == null || el.contains((event?.target as Node) || null)) {
                return
            }

            setTimeout(() => {
                handler(event)
            }, 200)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}
export default useOutsideClick
