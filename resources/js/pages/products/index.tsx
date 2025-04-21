import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    barcode: string;
    quantity_in_stock: number;
    selling_price: number;
    category: {
        name: string;
    };
    supplier: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ProductsProps {
    products: {
        data: Product[];
        links: Record<string, PaginationLink>;
    };
}

export default function Index({ products }: ProductsProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Produtos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Produtos</h2>
                                <Link
                                    href={route('products.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Novo Produto
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nome
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Código de Barras
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Categoria
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fornecedor
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Estoque
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Preço de Venda
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.barcode}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.supplier.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    {product.quantity_in_stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    R$ {product.selling_price.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex justify-center space-x-2">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (confirm('Tem certeza que deseja excluir este produto?')) {
                                                                    router.delete(route('products.destroy', product.id));
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                {products.links && (
                                    <div className="flex justify-center">
                                        {Object.entries(products.links).map(([key, link]) => (
                                            <Link
                                                key={key}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 mx-1 rounded ${
                                                    link.active
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 