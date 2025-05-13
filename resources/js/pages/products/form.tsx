import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

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
    [key: string]: string | number | undefined;
}

interface FormProps {
    product?: Product;
    categories: Category[];
    suppliers: Supplier[];
}

export default function Form({ product, categories, suppliers }: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Product>({
        defaultValues: {
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
        },
    });

    const onSubmit = (data: Product) => {
        if (product?.id) {
            router.put(route('products.update', product.id), data);
        } else {
            router.post(route('products.store'), data);
        }
    };

    return (
        <>
            <Head title={product?.id ? 'Editar Produto' : 'Novo Produto'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-2xl font-bold">{product?.id ? 'Editar Produto' : 'Novo Produto'}</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register('name', { required: 'Nome é obrigatório' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                                            Código de Barras
                                        </label>
                                        <input
                                            type="text"
                                            id="barcode"
                                            {...register('barcode')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.barcode && <p className="mt-1 text-sm text-red-600">{errors.barcode.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                                            Categoria
                                        </label>
                                        <select
                                            id="category_id"
                                            {...register('category_id', { required: 'Categoria é obrigatória' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700">
                                            Fornecedor
                                        </label>
                                        <select
                                            id="supplier_id"
                                            {...register('supplier_id', { required: 'Fornecedor é obrigatório' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Selecione um fornecedor</option>
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.supplier_id && <p className="mt-1 text-sm text-red-600">{errors.supplier_id.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700">
                                            Preço de Compra
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="purchase_price"
                                            {...register('purchase_price', { required: 'Preço de compra é obrigatório' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.purchase_price && <p className="mt-1 text-sm text-red-600">{errors.purchase_price.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">
                                            Preço de Venda
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="selling_price"
                                            {...register('selling_price', { required: 'Preço de venda é obrigatório' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.selling_price && <p className="mt-1 text-sm text-red-600">{errors.selling_price.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="minimum_quantity" className="block text-sm font-medium text-gray-700">
                                            Quantidade Mínima
                                        </label>
                                        <input
                                            type="number"
                                            id="minimum_quantity"
                                            {...register('minimum_quantity', { required: 'Quantidade mínima é obrigatória' })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.minimum_quantity && <p className="mt-1 text-sm text-red-600">{errors.minimum_quantity.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-700">
                                            Data de Validade
                                        </label>
                                        <input
                                            type="date"
                                            id="expiration_date"
                                            {...register('expiration_date')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.expiration_date && <p className="mt-1 text-sm text-red-600">{errors.expiration_date.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="batch_number" className="block text-sm font-medium text-gray-700">
                                            Número do Lote
                                        </label>
                                        <input
                                            type="text"
                                            id="batch_number"
                                            {...register('batch_number')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.batch_number && <p className="mt-1 text-sm text-red-600">{errors.batch_number.message}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Descrição
                                        </label>
                                        <textarea
                                            id="description"
                                            {...register('description')}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('products.index'))}
                                        className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Salvando...' : 'Salvar'}
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

Form.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
