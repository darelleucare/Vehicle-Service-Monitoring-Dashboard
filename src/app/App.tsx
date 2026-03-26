import { useState } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { StatsCards } from './components/StatsCards';
import { VehicleTable, VehicleData } from './components/VehicleTable';
import { OverdueAlerts } from './components/OverdueAlerts';
import { HistoryPanel } from './components/HistoryPanel';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Mock vehicle data
const mockVehicles: VehicleData[] = [
  {
    id: '1',
    model: 'Toyota Corolla',
    cvNumber: 'CV-2024-001',
    plateNumber: 'ABC 1234',
    color: 'White',
    year: 2024,
    receivedDate: new Date('2024-03-15'),
    poNumber: 'PO-2024-1001',
    vinNumber: '1HGBH41JXMN109186',
    dealer: 'Shaw Motors Manila',
    status: 'On Process',
    remarks: 'Regular maintenance and oil change required',
    location: 'Bay 1',
    unit: 'Service Unit A',
    pullOut: null,
    overdue: false,
  },
  {
    id: '2',
    model: 'Honda Civic',
    cvNumber: 'CV-2024-002',
    plateNumber: 'XYZ 5678',
    color: 'Red',
    year: 2023,
    receivedDate: new Date('2024-03-10'),
    poNumber: 'PO-2024-1002',
    vinNumber: '2HGFC2F59LH123456',
    dealer: 'Shaw Motors Quezon',
    status: 'Overdue',
    remarks: 'Waiting for parts delivery - brake system repair',
    location: 'Bay 3',
    unit: 'Service Unit B',
    pullOut: null,
    overdue: true,
  },
  {
    id: '3',
    model: 'Ford Ranger',
    cvNumber: 'CV-2024-003',
    plateNumber: 'DEF 9012',
    color: 'Black',
    year: 2024,
    receivedDate: new Date('2024-03-20'),
    poNumber: 'PO-2024-1003',
    vinNumber: '1FTYR10D2XPA12345',
    dealer: 'Shaw Motors Cebu',
    status: 'Pending',
    remarks: 'Initial inspection pending technician assignment',
    location: 'Bay 5',
    unit: 'Service Unit C',
    pullOut: null,
    overdue: false,
  },
  {
    id: '4',
    model: 'Mitsubishi Montero',
    cvNumber: 'CV-2024-004',
    plateNumber: 'GHI 3456',
    color: 'Silver',
    year: 2023,
    receivedDate: new Date('2024-03-22'),
    poNumber: 'PO-2024-1004',
    vinNumber: 'JA4MT31R7XJ012345',
    dealer: 'Shaw Motors Manila',
    status: 'On Process',
    remarks: 'Transmission service in progress',
    location: 'Bay 2',
    unit: 'Service Unit A',
    pullOut: new Date('2024-03-28'),
    overdue: false,
  },
  {
    id: '5',
    model: 'Nissan Navara',
    cvNumber: 'CV-2024-005',
    plateNumber: 'JKL 7890',
    color: 'Blue',
    year: 2024,
    receivedDate: new Date('2024-03-24'),
    poNumber: 'PO-2024-1005',
    vinNumber: '3N6DD23T9XK012345',
    dealer: 'Shaw Motors Davao',
    status: 'Completed',
    remarks: 'All services completed, ready for pull-out',
    location: 'Bay 7',
    unit: 'Service Unit D',
    pullOut: new Date('2024-03-26'),
    overdue: false,
  },
  {
    id: '6',
    model: 'Toyota Corolla',
    cvNumber: 'CV-2024-006',
    plateNumber: 'MNO 2345',
    color: 'Gray',
    year: 2024,
    receivedDate: new Date('2024-03-08'),
    poNumber: 'PO-2024-1006',
    vinNumber: '1HGBH41JXMN109999',
    dealer: 'Shaw Motors Manila',
    status: 'Overdue',
    remarks: 'Customer delayed parts approval - engine repair needed',
    location: 'Bay 4',
    unit: 'Service Unit B',
    pullOut: null,
    overdue: true,
  },
  {
    id: '7',
    model: 'Honda Civic',
    cvNumber: 'CV-2024-007',
    plateNumber: 'PQR 6789',
    color: 'White',
    year: 2023,
    receivedDate: new Date('2024-03-19'),
    poNumber: 'PO-2024-1007',
    vinNumber: '2HGFC2F59LH888888',
    dealer: 'Shaw Motors Quezon',
    status: 'On Process',
    remarks: 'Electrical system diagnostics in progress',
    location: 'Bay 6',
    unit: 'Service Unit C',
    pullOut: null,
    overdue: false,
  },
  {
    id: '8',
    model: 'Ford Ranger',
    cvNumber: 'CV-2024-008',
    plateNumber: 'STU 1122',
    color: 'Orange',
    year: 2024,
    receivedDate: new Date('2024-03-25'),
    poNumber: 'PO-2024-1008',
    vinNumber: '1FTYR10D2XPA99999',
    dealer: 'Shaw Motors Cebu',
    status: 'Pending',
    remarks: 'Scheduled for tomorrow morning',
    location: 'Bay 8',
    unit: 'Service Unit D',
    pullOut: null,
    overdue: false,
  },
  {
    id: '9',
    model: 'Mitsubishi Montero',
    cvNumber: 'CV-2024-009',
    plateNumber: 'VWX 3344',
    color: 'Green',
    year: 2023,
    receivedDate: new Date('2024-03-12'),
    poNumber: 'PO-2024-1009',
    vinNumber: 'JA4MT31R7XJ077777',
    dealer: 'Shaw Motors Manila',
    status: 'Overdue',
    remarks: 'Parts on backorder - awaiting supplier delivery',
    location: 'Bay 9',
    unit: 'Service Unit A',
    pullOut: null,
    overdue: true,
  },
  {
    id: '10',
    model: 'Nissan Navara',
    cvNumber: 'CV-2024-010',
    plateNumber: 'YZA 5566',
    color: 'Black',
    year: 2024,
    receivedDate: new Date('2024-03-23'),
    poNumber: 'PO-2024-1010',
    vinNumber: '3N6DD23T9XK066666',
    dealer: 'Shaw Motors Davao',
    status: 'On Process',
    remarks: 'Suspension repair in final stages',
    location: 'Bay 10',
    unit: 'Service Unit B',
    pullOut: new Date('2024-03-27'),
    overdue: false,
  },
];

export default function App() {
  const [vehicles] = useState<VehicleData[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedDealer, setSelectedDealer] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);

  // Filter vehicles based on all criteria
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        vehicle.cvNumber.toLowerCase().includes(search) ||
        vehicle.plateNumber.toLowerCase().includes(search) ||
        vehicle.vinNumber.toLowerCase().includes(search) ||
        vehicle.dealer.toLowerCase().includes(search) ||
        vehicle.model.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Model filter
    if (selectedModel !== 'all' && vehicle.model !== selectedModel) {
      return false;
    }

    // Dealer filter
    if (selectedDealer !== 'all' && vehicle.dealer !== selectedDealer) {
      return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && vehicle.status !== selectedStatus) {
      return false;
    }

    // Date from filter
    if (dateFrom && vehicle.receivedDate < dateFrom) {
      return false;
    }

    // Date to filter
    if (dateTo && vehicle.receivedDate > dateTo) {
      return false;
    }

    return true;
  });

  const handleRefresh = () => {
    toast.success('Dashboard refreshed successfully');
  };

  const handleExport = () => {
    toast.success('Exporting data to CSV...');
  };

  const handleViewHistory = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        selectedDealer={selectedDealer}
        onDealerChange={setSelectedDealer}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <main className="px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards vehicles={filteredVehicles} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <VehicleTable data={filteredVehicles} onViewHistory={handleViewHistory} />
            
            {filteredVehicles.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500">No vehicles found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Overdue Alerts - Takes 1 column */}
          <div className="lg:col-span-1">
            <OverdueAlerts vehicles={filteredVehicles} />
          </div>
        </div>
      </main>

      {/* History Panel Overlay */}
      {selectedVehicle && (
        <HistoryPanel
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      <Toaster />
    </div>
  );
}
