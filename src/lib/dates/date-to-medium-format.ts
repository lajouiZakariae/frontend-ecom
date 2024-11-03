export const dateToMediumFormat = (date: Date): string => {
    const formmatter = new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
    })

    return formmatter.format(date)
}
