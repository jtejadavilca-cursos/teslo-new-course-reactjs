import { useSearchParams } from "react-router";

export const useCustomSearchParams = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const setUrlParam = (key: string, value?: string) => {
        if (!value || value.trim().length === 0) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
        setSearchParams(searchParams);
    };

    const getUrlParam = (key: string) => {
        return searchParams.get(key);
    };

    const clearUrlParams = () => {
        searchParams = new URLSearchParams();
        setSearchParams(searchParams);
    };

    const getStringUrlParam = (key: string, defaultValue?: string): string | undefined => {
        return getUrlParam(key) || defaultValue;
    };

    const getStringUrlParamOrDefault = (key: string, defaultValue: string): string => {
        return getStringUrlParam(key) || defaultValue;
    };

    const getNumberUrlParam = (key: string, defaultValue?: number): number | undefined => {
        const value = getUrlParam(key) || defaultValue;

        return !value || isNaN(+value) ? defaultValue : Number(value);
    };

    const getNumberUrlParamOrDefault = (key: string, defaultValue: number): number => {
        return getNumberUrlParam(key) || defaultValue;
    };

    const getBooleanUrlParam = (key: string, defaultValue?: boolean): boolean | undefined => {
        const value = getUrlParam(key) || defaultValue;

        return Boolean(value);
    };

    const removeUrlParam = (key: string) => setUrlParam(key);

    return {
        setUrlParam,
        getStringUrlParam,
        getStringUrlParamOrDefault,
        getNumberUrlParam,
        getNumberUrlParamOrDefault,
        getBooleanUrlParam,
        removeUrlParam,
        clearUrlParams,
    };
};
