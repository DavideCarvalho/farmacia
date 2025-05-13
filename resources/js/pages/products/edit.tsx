import AppLayout from '@/layouts/app-layout';
import Form from './form';

interface EditProps {
    product: {
        id: number;
        name: string;
        description: string;
        barcode: string;
        purchase_price: number;
        selling_price: number;
        minimum_quantity: number;
        expiration_date?: string;
        batch_number?: string;
        category_id: number;
        supplier_id: number;
    };
    categories: Array<{
        id: number;
        name: string;
    }>;
    suppliers: Array<{
        id: number;
        name: string;
    }>;
}

export default function Edit({ product, categories, suppliers }: EditProps) {
    return <Form product={product} categories={categories} suppliers={suppliers} />;
}

Edit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
