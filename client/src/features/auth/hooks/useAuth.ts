import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const auth = useAppSelector((state) => state.auth)

    return {
        dispatch,
        ...auth
    }
}