<?php

namespace App\Http\Controllers\Api\InventoryMovement;

use App\Http\Controllers\Controller;

use App\Data\InventoryMovementData;
use App\Models\InventoryMovement;
use App\Models\InventoryItem;
use App\Models\DepartmentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreateInventoryMovementController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:entry,exit',
            'quantity' => 'required|numeric|min:0.01',
            'unit_price' => 'required|numeric|min:0',
            'reason' => 'required|string',
            'lot_number' => 'nullable|string',
            'expiration_date' => 'nullable|date',
            'department_id' => 'required_if:type,exit|exists:departments,id',
            'supplier_id' => 'required_if:type,entry|exists:suppliers,id',
        ]);

        $data['user_id'] = $request->user()->id;

        return DB::transaction(function () use ($data) {
            // For incoming movements, create a new inventory item
            if ($data['type'] === 'entry') {
                $inventoryItem = InventoryItem::create([
                    'product_id' => $data['product_id'],
                    'supplier_id' => $data['supplier_id'],
                    'quantity' => $data['quantity'],
                    'remaining_quantity' => $data['quantity'],
                    'unit_price' => $data['unit_price'],
                    'lot_number' => $data['lot_number'],
                    'expiration_date' => $data['expiration_date'],
                    'status' => 'available',
                ]);

                $data['inventory_item_id'] = $inventoryItem->id;
            } else {
                // For outgoing movements, find the best inventory item
                // Prioritize items with:
                // 1. Closest expiration date
                // 2. Lowest remaining quantity
                $inventoryItem = InventoryItem::where('product_id', $data['product_id'])
                    ->where('status', 'available')
                    ->where('remaining_quantity', '>=', $data['quantity'])
                    ->orderBy('expiration_date', 'asc')
                    ->orderBy('remaining_quantity', 'asc')
                    ->first();

                if (!$inventoryItem) {
                    return response()->json([
                        'message' => 'No available inventory item found with sufficient quantity',
                    ], 422);
                }

                // Create individual DepartmentItems for each unit
                for ($i = 0; $i < $data['quantity']; $i++) {
                    DepartmentItem::create([
                        'department_id' => $data['department_id'],
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                        'expired_at' => $inventoryItem->expiration_date,
                    ]);
                }

                // Update the remaining quantity
                $inventoryItem->remaining_quantity -= $data['quantity'];

                // Update status if depleted
                if ($inventoryItem->remaining_quantity <= 0) {
                    $inventoryItem->status = 'depleted';
                }

                $inventoryItem->save();
                $data['inventory_item_id'] = $inventoryItem->id;
                $data['unit_price'] = $inventoryItem->unit_price;
            }

            $movement = InventoryMovement::create($data);

            return response()->json(InventoryMovementData::make($movement));
        });
    }
}
