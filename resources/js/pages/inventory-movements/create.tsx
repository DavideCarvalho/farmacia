import { Head, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    quantity_in_stock: number;
}

interface CreateProps {
    products: Product[];
}

export default function Create({ products }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        type: 'entry',
        quantity: 1,
        unit_price: 0,
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('inventory-movements.store'));
    };

    return (
        <>
            <Head title="Nova Movimentação" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Nova Movimentação</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
                                            Produto
                                        </label>
                                        <select
                                            id="product_id"
                                            value={data.product_id}
                                            onChange={(e) => setData('product_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Selecione um produto</option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name} (Estoque: {product.quantity_in_stock})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.product_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.product_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Tipo
                                        </label>
                                        <select
                                            id="type"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="entry">Entrada</option>
                                            <option value="exit">Saída</option>
                                        </select>
                                        {errors.type && (
                                            <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                            Quantidade
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', Number(e.target.value))}
                                            min="1"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.quantity && (
                                            <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="unit_price" className="block text-sm font-medium text-gray-700">
                                            Preço Unitário
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="unit_price"
                                            value={data.unit_price}
                                            onChange={(e) => setData('unit_price', Number(e.target.value))}
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.unit_price && (
                                            <p className="mt-1 text-sm text-red-600">{errors.unit_price}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                            Motivo
                                        </label>
                                        <textarea
                                            id="reason"
                                            value={data.reason}
                                            onChange={(e) => setData('reason', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.reason && (
                                            <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('inventory-movements.index'))}
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
        </>
    );
} 