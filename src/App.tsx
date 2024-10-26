import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function getTodos() {
            const categories = await supabase.from('categories').select();

            console.log(categories);

            setTodos(categories);
        }

        getTodos();
    }, []);

    return <></>;
};
