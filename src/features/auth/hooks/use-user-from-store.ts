import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useUserFromStore = () => {
    const user = useSelector<RootState>(state => state.user);

    return user ?? null;
};
