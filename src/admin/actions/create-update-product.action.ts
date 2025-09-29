import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { getNumberOrDefault } from "@/lib/utils";

export const createUpdateProductAction = async (
    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === "new";

    rest.stock = getNumberOrDefault(rest.stock, 0);
    rest.price = getNumberOrDefault(rest.price, 0);

    // Prepare the images
    if (files.length > 0) {
        const newImagesNames = await uploadFiles(files);
        images.push(...newImagesNames);
    }

    const imageToSave = images
        .map((image) => {
            if (image.includes("http")) return image.split("/").pop() || "";

            return image;
        })
        .filter((image) => image.trim().length > 0);

    const { data } = await tesloApi<Product>({
        url: isCreating ? "/products" : `/products/${id}`,
        method: isCreating ? "POST" : "PATCH",
        data: {
            ...rest,
            images: imageToSave,
        },
    });

    return {
        ...data,
        images: data.images.map((image) => {
            if (image.includes("http")) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
        }),
    };
};

const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await tesloApi({
            url: "/files/product",
            method: "POST",
            data: formData,
        });

        return data.fileName;
    });

    const uploadFileNames = await Promise.all(uploadPromises);
    return uploadFileNames;
};
