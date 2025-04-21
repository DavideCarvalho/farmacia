import Form from './form';

interface CreateProps {
    categories: Array<{
        id: number;
        name: string;
    }>;
    suppliers: Array<{
        id: number;
        name: string;
    }>;
}

export default function Create({ categories, suppliers }: CreateProps) {
    return <Form categories={categories} suppliers={suppliers} />;
} 