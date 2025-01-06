import { GSTCalculation } from '../types/gst';
import { formatGSTAmount } from './gst';

export function exportToCSV(calculations: GSTCalculation[], filename: string) {
  // Define CSV headers
  const headers = [
    'Driver ID',
    'Driver Name',
    'Total Earnings',
    'GST Amount (5%)',
    'Last Updated'
  ];

  // Convert data to CSV format
  const csvData = calculations.map(calc => [
    calc.driverId,
    calc.driverName,
    formatGSTAmount(calc.earnings),
    formatGSTAmount(calc.gstAmount),
    new Date(calc.timestamp).toLocaleString()
  ]);

  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}