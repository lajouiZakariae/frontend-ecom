import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();

    const page = useMemo(() => {
        const currentPageFromSearchParams = urlSearchParams.get('page');

        const currentPageAsNumber = Number(currentPageFromSearchParams);

        return currentPageAsNumber > 0 ? currentPageAsNumber : 1;
    }, [urlSearchParams.get('page')]);

    const setPage = (page: number) => {
        setUrlSearchParams(prev => {
            prev.set('page', page.toString());
            return prev;
        });
    };

    const prevPage = () => setPage(page + 1);

    const nextPage = () => setPage(page + 1);

    return {
        page,
        setPage,
        nextPage,
        prevPage,
    };
};
