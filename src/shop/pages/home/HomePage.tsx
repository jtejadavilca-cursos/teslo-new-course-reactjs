import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useCustomSearchParams } from "@/shop/hooks/useCustomSearchParams";
import { usePaginatedProducts } from "@/shop/hooks/usePaginatedProducts";

export const HomePage = () => {
    const { getNumberUrlParamOrDefault } = useCustomSearchParams();
    const page = getNumberUrlParamOrDefault("page", 1);
    const limit = getNumberUrlParamOrDefault("limit", 6);

    const { data: paginatedProducts } = usePaginatedProducts(page, limit);
    return (
        <>
            <CustomJumbotron title="Todos los productos" />

            <ProductsGrid products={paginatedProducts} />
            <CustomPagination totalPages={5} />
        </>
    );
};
