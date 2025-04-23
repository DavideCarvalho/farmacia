<?php

namespace App\Enums;

enum ProductType: string
{
    case MEDICINE = 'medicine';
    case MEDICAL_SUPPLY = 'medical_supply';
    case EQUIPMENT = 'equipment';
    case OTHER = 'other';
}
