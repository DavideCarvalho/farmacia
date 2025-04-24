<?php

namespace App\Data\Dashboard;

use App\Models\Department;
use Illuminate\Support\Facades\Log;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class HighOccupancyDepartmentData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $code,
        public readonly int $totalCapacity,
        public readonly int $totalOccupancy,
        public readonly int $occupancyPercentage,
    ) {}

    public static function make(Department $department): self
    {
        $totalCapacity = $department->getTotalCapacity();
        $totalOccupancy = $department->getTotalOccupancy();
        $occupancyPercentage = $totalCapacity > 0
            ? round(($totalOccupancy / $totalCapacity) * 100)
            : 0;

        Log::info('Department data', [
            'department' => $department->name,
            'totalCapacity' => $totalCapacity,
            'totalOccupancy' => $totalOccupancy,
            'occupancyPercentage' => $occupancyPercentage,
            'rooms' => $department->rooms->map(fn ($room) => [
                'name' => $room->name,
                'capacity' => $room->capacity,
                'patients' => $room->patients()->whereNull('patient_room.check_out_at')->count(),
            ])->toArray(),
        ]);

        return new self(
            id: $department->id,
            name: $department->name,
            code: $department->code,
            totalCapacity: $totalCapacity,
            totalOccupancy: $totalOccupancy,
            occupancyPercentage: $occupancyPercentage,
        );
    }
}
