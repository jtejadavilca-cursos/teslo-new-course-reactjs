import type { Gender } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useCustomSearchParams } from "@/shop/hooks/useCustomSearchParams";
import { usePaginatedProducts } from "@/shop/hooks/usePaginatedProducts";
import { useParams } from "react-router";

const genderLabels = new Map();
genderLabels.set("men", "Hombres");
genderLabels.set("women", "Mujeres");
genderLabels.set("kid", "Niños");

export const GenderPage = () => {
    const { gender } = useParams();
    const genderLabel = genderLabels.get(gender) || "Todos";

    const { getNumberUrlParamOrDefault } = useCustomSearchParams();
    const page = getNumberUrlParamOrDefault("page", 1);
    const limit = getNumberUrlParamOrDefault("limit", 6);

    const { data: paginatedProducts } = usePaginatedProducts(page, limit, gender as Gender);
    return (
        <>
            <CustomJumbotron title={`Productos para ${genderLabel}`} />

            <ProductsGrid products={paginatedProducts} />
        </>
    );
};
