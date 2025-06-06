declare namespace App.Data {
export type DepartmentData = {
id: number;
name: string;
code: string;
description: string;
created_at: string;
updated_at: string;
};
export type InventoryMovementData = {
id: number | null;
product_id: number;
type: App.Enums.InventoryMovementType;
quantity: number;
unit_price: number;
reason: string;
created_at: string;
product: App.Data.ProductData | null;
user: App.Data.UserData | null;
};
export type PatientApplicationData = {
id: number;
patient_id: number;
product_id: number;
quantity: number;
application_date: string;
notes: string | null;
created_at: string;
updated_at: string;
patient: App.Data.PatientData | null;
product: App.Data.ProductData | null;
};
export type PatientBiologicalMetricData = {
id: number;
metric_type: string;
value: number;
unit: string;
notes: string | null;
};
export type PatientData = {
id: number;
slug: string;
name: string;
cpf: string;
birth_date: string;
phone: string;
address: string;
medical_record: string;
created_at: string;
updated_at: string;
hospital_stays: Array<App.Data.PatientHospitalStayData>;
observations: Array<App.Data.PatientObservationData>;
};
export type PatientHospitalStayData = {
id: number;
patient_id: number;
entry_at: string;
exit_at: string | null;
notes: string | null;
created_at: string;
updated_at: string;
observations: Array<App.Data.PatientObservationData>;
};
export type PatientObservationData = {
id: number;
observation: string;
observation_type: string;
created_at: string;
user: App.Data.UserData;
biological_metrics: Array<App.Data.PatientBiologicalMetricData>;
};
export type PotentialSavingsData = {
total_savings: number;
currency: string;
last_month_savings: number;
is_higher_than_last_month: boolean;
unused_products_count: number;
};
export type ProductData = {
id: number;
name: string;
description: string;
barcode: string;
purchase_price: number;
selling_price: number;
quantity_in_stock: number;
minimum_quantity: number;
expiration_date: string | null;
batch_number: string | null;
category_id: number;
supplier_id: number;
is_active: boolean;
unit_of_measurement: App.Enums.UnitOfMeasurement | null;
quantity_per_unit: number | null;
};
export type SupplierData = {
id: number;
name: string;
email: string | null;
phone: string | null;
address: string | null;
city: string | null;
state: string | null;
zip_code: string | null;
description: string | null;
is_active: boolean;
created_at: string;
updated_at: string;
};
export type UserData = {
id: number;
name: string;
};
}
declare namespace App.Data.Dashboard {
export type ExpiringMedicineData = {
id: number;
productName: string;
expirationDate: string;
remainingQuantity: number;
lotNumber: string;
};
export type HighOccupancyDepartmentData = {
id: number;
name: string;
code: string;
totalCapacity: number;
totalOccupancy: number;
occupancyPercentage: number;
};
}
declare namespace App.Enums {
export type InventoryMovementType = 'entry' | 'exit';
export type ProductType = 'medicine' | 'medical_supply' | 'equipment' | 'other';
export type UnitOfMeasurement = 'mg' | 'g' | 'kg' | 'un' | 'cp' | 'cx' | 'ml' | 'l' | 'amp' | 'fr';
}
