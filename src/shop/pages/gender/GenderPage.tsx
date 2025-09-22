import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

const genderLabels = new Map();
genderLabels.set("men", "Hombres");
genderLabels.set("women", "Mujeres");
genderLabels.set("kid", "Niños");

export const GenderPage = () => {
    const { gender } = useParams();
    const { data } = useProducts();

    const genderLabel = genderLabels.get(gender) || "Todos";

    return (
        <>
            <CustomJumbotron title={`Productos para ${genderLabel}`} />

            <ProductsGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 1} />
        </>
    );
};
