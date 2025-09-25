import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/interfaces/product.interface";
import { currecyFormatter } from "@/lib/currency-formatter";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
    products: Product[];
}

export const AdminProductsGrid = ({ products }: Props) => {
    return (
        <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Inventario</TableHead>
                    <TableHead>Tallas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((prod, index) => (
                    <TableRow key={prod.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                            <img src={prod.images[0]} alt={prod.title} className="w-20 h-20 object-cover rounded-md" />
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/products/${prod.id}`} className="hover:text-blue-500 underline">
                                {prod.title}
                            </Link>
                        </TableCell>
                        <TableCell>{currecyFormatter(prod.price)}</TableCell>
                        <TableCell>{prod.gender}</TableCell>
                        <TableCell>{prod.stock} stock</TableCell>
                        <TableCell>{prod.sizes.join(",")}</TableCell>
                        <TableCell className="text-right">
                            <Link to={`/admin/products/${prod.id}`}>
                                <PencilIcon className="w-4 h-4 text-blue-500" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
