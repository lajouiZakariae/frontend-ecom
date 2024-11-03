import { arrayOfNumbers } from './array-of-numbers'

const MAX_OF_PAGES = 7

interface LinkObject {
    link: number | string
    active: boolean
    isSeperator: boolean
}

export const getPaginationLinksObjects = (
    currentPage: number,
    pagesCount: number,
    seperator: string = '...',
): LinkObject[] => {
    if (pagesCount <= 0 || currentPage <= 0) {
        return []
    }

    if (pagesCount >= 1 && pagesCount <= MAX_OF_PAGES) {
        return [...Array(pagesCount).keys()]
            .map(link => link + 1)
            .map(link => ({
                link: link,
                active: link === currentPage,
                isSeperator: false,
            }))
    }

    const links: LinkObject[] = []

    const isCursorNearTheBegining = currentPage - 5 < 1

    const isCursorNearTheEnd = currentPage + 5 > pagesCount

    if (isCursorNearTheBegining) {
        arrayOfNumbers(1, 7).forEach(link =>
            links.push({
                link,
                active: link === currentPage,
                isSeperator: false,
            }),
        )
        links.push({ link: seperator, active: false, isSeperator: true })
        links.push({
            link: pagesCount,
            active: currentPage === pagesCount,
            isSeperator: false,
        })
    } else if (isCursorNearTheEnd) {
        links.push({ link: 1, active: currentPage === 1, isSeperator: false })

        links.push({ link: seperator, active: false, isSeperator: true })

        arrayOfNumbers(pagesCount - 5, pagesCount).forEach(link =>
            links.push({
                link,
                active: link === currentPage,
                isSeperator: false,
            }),
        )
    } else {
        links.push({ link: 1, active: currentPage === 1, isSeperator: false })

        links.push({ link: seperator, active: false, isSeperator: true })

        arrayOfNumbers(currentPage - 2, currentPage + 2).forEach(link =>
            links.push({
                link,
                active: link === currentPage,
                isSeperator: false,
            }),
        )

        links.push({ link: seperator, active: false, isSeperator: true })

        links.push({
            link: pagesCount,
            active: pagesCount === currentPage,
            isSeperator: false,
        })
    }

    return links
}
