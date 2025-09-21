import { products, type Gender } from "@/mocks/products.mock";

export const usePaginatedProducts = (page: number, limit: number, gender: Gender = "all") => {
    const sanitizedPage = isNaN(page) ? 1 : +page;
    const sanitizedLimit = isNaN(limit) ? 6 : +limit;

    // Calculate pagination
    const startIndex = (sanitizedPage - 1) * sanitizedLimit;
    const endIndex = startIndex + sanitizedLimit;
    return {
        data: products.filter((p) => gender === "all" || p.gender === gender).slice(startIndex, endIndex),
    };
};
