import { queryOptions } from '@tanstack/react-query';
import { UserService } from './service';

export const userQueryKeys = {
    filtered: (params: Record<string, unknown>) => ['users', params],
};

export const userQueryOptions = {
    filtered: (params: Record<string, unknown>) =>
        queryOptions({
            queryKey: ['users', params],
            queryFn: async () =>
                await UserService.getPaginatedAndFilteredUsers(params),
        }),
};
