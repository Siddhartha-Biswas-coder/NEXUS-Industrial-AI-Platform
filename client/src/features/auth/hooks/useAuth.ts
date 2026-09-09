import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

import { loginService, signUpService, getCurrentUserService, logoutService } from "../services/auth.service";
import {
    loginSuccess,
    logoutSuccess,
    setLoading,
} from "../state/authSlice";

import type { LoginData, SignupData } from "../state/types";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const auth = useAppSelector((state) => state.auth);

    const signupUser = useCallback(async (data: SignupData) => {
        dispatch(setLoading(true));

        try {
            const result = await signUpService(data);

            dispatch(loginSuccess(result.user));

            navigate("/dashboard");
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    }, [dispatch, navigate]);

    const loginUser = useCallback(async (data: LoginData) => {
        dispatch(setLoading(true));

        try {
            const result = await loginService(data);

            dispatch(loginSuccess(result.user));

            navigate("/dashboard");
        } catch (error) {
            dispatch(setLoading(false));
            throw error;
        }
    }, [dispatch, navigate]);

    const checkAuth = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const user = await getCurrentUserService();
            dispatch(loginSuccess(user));
        } catch {
            dispatch(logoutSuccess());
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const logoutUser = useCallback(async () => {
        try {
            await logoutService();
        } finally {
            dispatch(logoutSuccess());
            navigate("/");
        }
    }, [dispatch, navigate]);

    return {
        ...auth,
        signupUser,
        loginUser,
        logoutUser,
        checkAuth
    };
};