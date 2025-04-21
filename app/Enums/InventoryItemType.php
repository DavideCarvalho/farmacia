<?php

namespace App\Enums;

enum InventoryItemType: string
{
    case MEDICINE = 'medicine';
    case MEDICAL_SUPPLY = 'medical_supply';
    case EQUIPMENT = 'equipment';
    case OTHER = 'other';
}
