import { matchQuery, MutationCache, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            queryClient.invalidateQueries({
                predicate: query =>
                    // invalidate all matching tags at once
                    // or everything if no meta is provided
                    Array.isArray(mutation.meta?.invalidates)
                        ? mutation.meta.invalidates.some(queryKey => matchQuery({ queryKey }, query))
                        : true,
            })
        },
    }),
})

export { queryClient }
