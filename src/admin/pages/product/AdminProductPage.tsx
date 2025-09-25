// https://github.com/Klerith/bolt-product-editor

import { Navigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { AdminProductForm } from "./ui/AdminProductForm";

export const AdminProductPage = () => {
    const { id } = useParams();

    const { isLoading, isError, data: product } = useProduct(id || "-");

    const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
    const productSubtitle = id === "new" ? "Aquí puedes crear un nuevo producto." : "Aquí puedes editar el producto.";

    if (isError) {
        return <Navigate to="/admin/products" />;
    }

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }

    if (!product) {
        return <Navigate to="/admin/products" />;
    }

    return <AdminProductForm product={product} title={productTitle} subtitle={productSubtitle} />;
};
