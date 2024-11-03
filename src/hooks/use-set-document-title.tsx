import { useDocumentTitle } from '@uidotdev/usehooks'

export const useSetDocumentTitle = (title: string): void => {
    useDocumentTitle(`App | ${title}`)
}
