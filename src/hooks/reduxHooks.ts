import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



