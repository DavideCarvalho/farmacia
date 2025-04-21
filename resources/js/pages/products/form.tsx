import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
}

interface Supplier {
    id: number;
    name: string;
}

interface Product {
    id?: number;
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
}

interface FormProps {
    product?: Product;
    categories: Category[];
    suppliers: Supplier[];
}

export default function Form({ product, categories, suppliers }: FormProps) {
    const { data, setData, post, put, processing, errors } = useForm<Product>({
        name: product?.name || '',
        description: product?.description || '',
        barcode: product?.barcode || '',
        purchase_price: product?.purchase_price || 0,
        selling_price: product?.selling_price || 0,
        minimum_quantity: product?.minimum_quantity || 0,
        expiration_date: product?.expiration_date || '',
        batch_number: product?.batch_number || '',
        category_id: product?.category_id || 0,
        supplier_id: product?.supplier_id || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product?.id) {
            put(route('products.update', product.id));
        } else {
            post(route('products.store'));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={product?.id ? 'Editar Produto' : 'Novo Produto'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">
                                {product?.id ? 'Editar Produto' : 'Novo Produto'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                                            Código de Barras
                                        </label>
                                        <input
                                            type="text"
                                            id="barcode"
                                            value={data.barcode}
                                            onChange={(e) => setData('barcode', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.barcode && (
                                            <p className="mt-1 text-sm text-red-600">{errors.barcode}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                                            Categoria
                                        </label>
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', Number(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">
                                            Fornecedor
                                        </label>
                                        <select
                                            id="supplier_id"
                                            value={data.supplier_id}
                                            onChange={(e) => setData('supplier_id', Number(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Selecione um fornecedor</option>
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.supplier_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.supplier_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700">
                                            Preço de Compra
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="purchase_price"
                                            value={data.purchase_price}
                                            onChange={(e) => setData('purchase_price', Number(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.purchase_price && (
                                            <p className="mt-1 text-sm text-red-600">{errors.purchase_price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">
                                            Preço de Venda
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="selling_price"
                                            value={data.selling_price}
                                            onChange={(e) => setData('selling_price', Number(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.selling_price && (
                                            <p className="mt-1 text-sm text-red-600">{errors.selling_price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="minimum_quantity" className="block text-sm font-medium text-gray-700">
                                            Quantidade Mínima
                                        </label>
                                        <input
                                            type="number"
                                            id="minimum_quantity"
                                            value={data.minimum_quantity}
                                            onChange={(e) => setData('minimum_quantity', Number(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.minimum_quantity && (
                                            <p className="mt-1 text-sm text-red-600">{errors.minimum_quantity}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-700">
                                            Data de Validade
                                        </label>
                                        <input
                                            type="date"
                                            id="expiration_date"
                                            value={data.expiration_date}
                                            onChange={(e) => setData('expiration_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.expiration_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.expiration_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="batch_number" className="block text-sm font-medium text-gray-700">
                                            Número do Lote
                                        </label>
                                        <input
                                            type="text"
                                            id="batch_number"
                                            value={data.batch_number}
                                            onChange={(e) => setData('batch_number', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.batch_number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.batch_number}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Descrição
                                        </label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('products.index'))}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        {processing ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 