import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.response";

const apiUrl = import.meta.env.VITE_API_URL;

interface Options {
    limit?: number | string;
    offset?: number | string;
    sizes?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
}

export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {
    const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options;

    const { data } = await tesloApi.get<ProductsResponse>("/products", {
        params: {
            limit,
            offset,
            sizes,
            gender,
            minPrice,
            maxPrice,
            q: query,
        },
    });

    const productsWithImageUrls = data.products.map((prod) => ({
        ...prod,
        images: prod.images.map((image) => `${apiUrl}/files/product/${image}`),
    }));

    return {
        ...data,
        products: productsWithImageUrls,
    };
};
