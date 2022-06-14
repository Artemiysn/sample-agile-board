import { useContext } from 'react';
import { storeContext } from './../index';

export default function useStore() {
    return useContext(storeContext);
}