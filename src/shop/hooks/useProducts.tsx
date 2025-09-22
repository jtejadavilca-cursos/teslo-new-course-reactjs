import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useCustomSearchParams } from "./useCustomSearchParams";

const priceRates = new Map();
priceRates.set("price1", { minPrice: 0, maxPrice: 50 });
priceRates.set("price2", { minPrice: 50, maxPrice: 100 });
priceRates.set("price3", { minPrice: 100, maxPrice: 200 });
priceRates.set("price4", { minPrice: 200 });

export const useProducts = () => {
    const { getPathVariable, getStringUrlParam, getNumberUrlParamOrDefault } = useCustomSearchParams();

    const limit = getNumberUrlParamOrDefault("limit", 9);
    const page = getNumberUrlParamOrDefault("page", 1);
    const sizes = getStringUrlParam("sizes");
    const gender = getPathVariable("gender");
    const rates = priceRates.get(getStringUrlParam("price-rate", ""));
    const query = getStringUrlParam("query");

    const offset = (Number(page) - 1) * Number(limit);

    const { minPrice, maxPrice } = rates ?? {};

    return useQuery({
        queryKey: ["products", { offset, limit, sizes, gender, minPrice, maxPrice, query }],
        queryFn: () =>
            getProductsAction({
                limit: isNaN(+limit) ? 9 : limit,
                offset: isNaN(offset) ? 0 : offset,
                sizes,
                gender,
                minPrice,
                maxPrice,
                query,
            }),
    });
};
