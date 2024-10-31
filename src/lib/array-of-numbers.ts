export const arrayOfNumbers = (from: number, to: number): number[] => {
    if (to < from) {
        throw new Error('To should be bigger than from');
    }

    if (to === from) {
        return [to];
    }

    const numberArrays: number[] = [];

    for (let index = from; index <= to; index++) {
        numberArrays.push(index);
    }

    return numberArrays;
};
