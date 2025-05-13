import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

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
        <>
            <Head title="Produtos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Produtos</h2>
                                <Link
                                    href={route('products.create')}
                                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                >
                                    Novo Produto
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Nome</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Código de Barras
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Categoria
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Fornecedor
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Estoque
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Preço de Venda
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {products.data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.barcode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{product.supplier.name}</td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">{product.quantity_in_stock}</td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">R$ {product.selling_price.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
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
                                                className={`mx-1 rounded px-4 py-2 ${
                                                    link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
