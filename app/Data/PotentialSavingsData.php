<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;


#[TypeScript]
class PotentialSavingsData extends Data
{
    public function __construct(
        public float $total_savings,
        public string $currency,
        public float $last_month_savings,
        public bool $is_higher_than_last_month,
        public int $unused_products_count,
    ) {}

    public static function make(
        float $totalSavings,
        string $currency = 'R$',
        float $lastMonthSavings = 0,
        bool $isHigherThanLastMonth = false,
        int $unusedProductsCount = 0,
    ): self {
        return new self(
            $totalSavings,
            $currency,
            $lastMonthSavings,
            $isHigherThanLastMonth,
            $unusedProductsCount,
        );
    }
}
