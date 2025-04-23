<?php

namespace App\Enums;

enum UnitOfMeasurement: string
{
    // Sólidos
    case MG = 'mg';
    case G = 'g';
    case KG = 'kg';
    case UN = 'un'; // unidade
    case CP = 'cp'; // comprimido
    case CX = 'cx'; // caixa

        // Líquidos
    case ML = 'ml';
    case L = 'l';
    case AMP = 'amp'; // ampola
    case FR = 'fr'; // frasco

    public function label(): string
    {
        return match ($this) {
            self::MG => 'Miligrama',
            self::G => 'Grama',
            self::KG => 'Quilograma',
            self::UN => 'Unidade',
            self::CP => 'Comprimido',
            self::CX => 'Caixa',
            self::ML => 'Mililitro',
            self::L => 'Litro',
            self::AMP => 'Ampola',
            self::FR => 'Frasco',
        };
    }

    public function isLiquid(): bool
    {
        return match ($this) {
            self::ML, self::L, self::AMP, self::FR => true,
            default => false,
        };
    }

    public function isSolid(): bool
    {
        return !$this->isLiquid();
    }

    public static function liquids(): array
    {
        return [
            self::ML,
            self::L,
            self::AMP,
            self::FR,
        ];
    }

    public static function solids(): array
    {
        return [
            self::MG,
            self::G,
            self::KG,
            self::UN,
            self::CP,
            self::CX,
        ];
    }
}
