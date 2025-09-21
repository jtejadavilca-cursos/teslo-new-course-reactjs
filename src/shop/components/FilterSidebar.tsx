import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
//import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";

// const categories = [
//     { id: "tshirts", label: "Camisetas", count: 12 },
//     { id: "hoodies", label: "Sudaderas", count: 8 },
//     { id: "jackets", label: "Chaquetas", count: 6 },
//     { id: "accessories", label: "Accesorios", count: 15 },
// ];

const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
];

// const colors = [
//     { id: "black", label: "Negro", color: "bg-black" },
//     { id: "white", label: "Blanco", color: "bg-white border" },
//     { id: "grey", label: "Gris", color: "bg-gray-400" },
//     { id: "navy", label: "Azul Marino", color: "bg-blue-900" },
// ];

export const FilterSidebar = () => {
    const { setUrlParam, getStringUrlParam, getStringUrlParamOrDefault } = useCustomSearchParams();
    const currentSizes = getStringUrlParam("sizes")?.split(",") || []; // xs,s,l,xl
    const priceRate = getStringUrlParamOrDefault("price-rate", "any");

    const handleSizeChanged = (size: string) => {
        const newSizes = currentSizes.includes(size) //
            ? currentSizes.filter((s) => s !== size) //
            : [...currentSizes, size]; //

        setUrlParam("sizes", newSizes.join(","));
        setUrlParam("page", "1");
    };

    const handlePriceChange = (selectedPriceRate: string) => {
        setUrlParam("price-rate", selectedPriceRate === "any" ? "" : selectedPriceRate);
    };

    return (
        <div className="w-64 space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-4">Filtros</h3>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <h4 className="font-medium">Tallas</h4>
                <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size.id}
                            //variant="outline"
                            variant={currentSizes.includes(size.id) ? "default" : "outline"}
                            size="sm"
                            className="h-8"
                            onClick={() => handleSizeChanged(size.id)}
                        >
                            {size.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-medium">Precio</h4>
                <RadioGroup defaultValue={priceRate} className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="any"
                            id="priceAny"
                            checked={priceRate === "any"}
                            onClick={() => handlePriceChange("any")}
                        />
                        <Label htmlFor="priceAny" className="text-sm cursor-pointer">
                            Cualquier precio
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="0-50"
                            id="price1"
                            checked={priceRate === "price1"}
                            onClick={() => handlePriceChange("price1")}
                        />
                        <Label htmlFor="price1" className="text-sm cursor-pointer">
                            $0 - $50
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="50-100"
                            id="price2"
                            checked={priceRate === "price2"}
                            onClick={() => handlePriceChange("price2")}
                        />
                        <Label htmlFor="price2" className="text-sm cursor-pointer">
                            $50 - $100
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="100-200"
                            id="price3"
                            checked={priceRate === "price3"}
                            onClick={() => handlePriceChange("price3")}
                        />
                        <Label htmlFor="price3" className="text-sm cursor-pointer">
                            $100 - $200
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="200+"
                            id="price4"
                            checked={priceRate === "price4"}
                            onClick={() => handlePriceChange("price4")}
                        />
                        <Label htmlFor="price4" className="text-sm cursor-pointer">
                            $200+
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};
