import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { AdminProductsGrid } from "@/admin/components/products/AdminProductsGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/shop/hooks/useProducts";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";

export const AdminProductsPage = () => {
    const { data, isLoading } = useProducts();
    if (isLoading) {
        return <CustomFullScreenLoading />;
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Productos" subtitle="Aquí puedes ver y administrar tus productos" />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to={"/admin/products/new"}>
                        <Button>
                            <PlusIcon />
                            Nuevo producto
                        </Button>
                    </Link>
                </div>
            </div>

            <AdminProductsGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 1} />
        </>
    );
};
