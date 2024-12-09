<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridVue } from 'ag-grid-vue3'
import { useDataStore } from '@/stores/data'
import { ModuleRegistry } from '@ag-grid-community/core'
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export'
import 'ag-grid-enterprise'
import Button from '../ui/button/Button.vue'
// import { GridApi } from '@ag-grid-community/core'
// import { GridApi } from 'ag-grid-enterprise'
// Use type-only import for GridApi
import type { GridApi } from 'ag-grid-enterprise'

const gridApi = ref<GridApi | null>(null) // or whatever type you are using

// Define the RowData interface
interface RowData {
  id: number
  gender: string
  account_holder: string
  city: string
  branch: string
  branch_type: string
  staff_interaction: string
  purpose_of_visit: string
  turn_around_time: string
  over_all_satisfactory: string
  existing_customers: string
  widrawing_money: string
  opening_new_acc: string
  deposit: string
  update_personal_info: string
  closing_acc: string
  transferring_fund: string
  loan_service: string
  complain_resolution: string
  foreign_exchange: string
  credit_card: string
  investment_service: string
  financial_advice: string
  customer_support: string
  digital_banking: string
  money_pay_order: string
  safe_deposit: string
  payment_dues: string
  cheque_deposit: string
  issuance_cheque_book: string
  bank_statement: string
  online_transaction: string
  installment_plot: string
  receive_ATM: string
  credit_card_payment: string
  Date: string
  turn_around_time_mins: string
  biometric_purpose: string
  tax_payment: string
  info_new_account: string
  reactivation_dormant_acc: string
  policy_cancellation: string
  receive_maintenance_certificate: string
  activation_atm_card: string
}

// Register the Excel export module
ModuleRegistry.registerModules([ExcelExportModule])

const dataStore = useDataStore()

// const gridApi = ref(null)
const excelStyles = ref()
// Sample Data
const rowData = ref<RowData[]>([]) // Specify the type here

const colDefs = ref([
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    editable: false,
    pinned: 'left',
    filter: 'agNumberColumnFilter',
    cellClass: 'data' // Assigning the 'data' style to this column
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 130,
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'account_holder',
    headerName: 'Account Holder',
    width: 180,
    filter: 'agTextColumnFilter',
    cellClass: 'data' // Assigning the 'data' style to this column
  },
  {
    field: 'city',
    headerName: 'City',
    width: 120,
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'branch_type',
    headerName: 'Branch Type',
    width: 200,
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'branch',
    headerName: 'Branch',
    width: 200,
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'staff_interaction',
    headerName: 'Staff Interaction',
    width: 200,
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'purpose_of_visit',
    headerName: 'Purpose of Visit',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'turn_around_time',
    headerName: 'Turnaround Time',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'over_all_satisfactory',
    headerName: 'Overall Satisfactory',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'existing_customers',
    headerName: 'Existing Customers',
    filter: 'agTextColumnFilter',
    cellClass: 'data',
    valueFormatter: (params: any) => {
      // Return "Existing Customer" for 1 and "New Customer" for 2
      return params.value === '1'
        ? 'Yes'
        : params.value === '2'
          ? 'No'
          : params.value !== '1' && params.value !== '2'
            ? 'null'
            : 'null'
    }
  },
  {
    field: 'widrawing_money',
    headerName: 'Withdrawing Money',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'opening_new_acc',
    headerName: 'Opening New Account',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  { field: 'deposit', headerName: 'Deposit', filter: 'agTextColumnFilter', cellClass: 'data' },
  {
    field: 'update_personal_info',
    headerName: 'Update Personal Info',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'closing_acc',
    headerName: 'Closing Account',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'transferring_fund',
    headerName: 'Transferring Fund',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'loan_service',
    headerName: 'Loan Service',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'complain_resolution',
    headerName: 'Complain Resolution',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'foreign_exchange',
    headerName: 'Foreign Exchange',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'credit_card',
    headerName: 'Credit Card',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'investment_service',
    headerName: 'Investment Service',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'financial_advice',
    headerName: 'Financial Advice',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'customer_support',
    headerName: 'Customer Support',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'digital_banking',
    headerName: 'Digital Banking',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'money_pay_order',
    headerName: 'Money Pay Order',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'safe_deposit',
    headerName: 'Safe Deposit',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'payment_dues',
    headerName: 'Payment Dues',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'cheque_deposit',
    headerName: 'Cheque Deposit',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'issuance_cheque_book',
    headerName: 'Issuance of Cheque Book',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'bank_statement',
    headerName: 'Bank Statement',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'online_transaction',
    headerName: 'Online Transaction',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'installment_plot',
    headerName: 'Installment Plot',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'receive_ATM',
    headerName: 'Receive ATM',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'credit_card_payment',
    headerName: 'Credit Card Payment',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'biometric_purpose',
    headerName: 'Biometric Purpose',
    width: 200, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'tax_payment',
    headerName: 'Tax Payment',
    width: 150, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'info_new_account',
    headerName: 'Info New Account',
    width: 200, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'reactivation_dormant_acc',
    headerName: 'Reactivation Dormant Acc',
    width: 250, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'policy_cancellation',
    headerName: 'Policy Cancellation',
    width: 200, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'receive_maintenance_certificate',
    headerName: 'Receive Maintenance Certificate',
    width: 250, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'activation_atm_card',
    headerName: 'Activation ATM Card',
    width: 200, // Adjust width as needed
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'Date',
    headerName: 'Date of field data',
    filter: 'agTextColumnFilter',
    cellClass: 'data'
  },
  {
    field: 'turn_around_time_mins',
    headerName: 'Turnaround Time (Mins)',
    filter: 'agTextColumnFilter',
    cellClass: 'data',
    valueFormatter: (params: any) => {
      return params.value === '1'
        ? 'Less than 10 minutes'
        : params.value === '2'
          ? '10 – 15 minutes'
          : params.value === '3'
            ? '16 – 20 minutes'
            : params.value === '4'
              ? '21 – 25 minutes'
              : params.value === '5'
                ? '26 – 30 minutes'
                : params.value === '6'
                  ? '31 – 45 minutes'
                  : params.value === '7'
                    ? '46 – 60 minutes'
                    : 'More than 60 minutes'
    }
  }
])

const gridOptions = {
  pagination: true,
  paginationPageSize: 20
}

// Capture the grid API when grid is ready
const onGridReady = (params: any) => {
  gridApi.value = params.api
}

// Function to export to Excel
const onBtExport = () => {
  const params = {
    columnWidth: 200,
    fileName: `Exported_Alflah_data_${new Date().toLocaleDateString()}`,
    sheetName: 'Data',
    excelStyles: excelStyles.value, // Ensure excelStyles are applied
    styleLink: true // Ensure styles are linked correctly
  }
  if (gridApi.value) {
    gridApi.value.exportDataAsExcel(params)
  } else {
    console.warn('Grid API is not ready')
  }
}

const paginationPageSizeSelector = [
  10, 20, 50, 100, 200, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500
]

onMounted(() => {
  dataStore.data.forEach((element: any) => {
    // Ensure element is of type RowData
    rowData.value.push(element)
  })

  // Excel styles for headers and data
  excelStyles.value = [
    // Style for the header row
    {
      id: 'header',
      alignment: {
        vertical: 'Center',
        horizontal: 'Center'
      },
      interior: {
        color: '#4B535E', // Dark background color
        pattern: 'Solid'
      },
      font: {
        color: '#ffffff', // White text color
        bold: true
      },
      borders: {
        borderBottom: {
          color: 'black',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderLeft: {
          color: 'black',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderRight: {
          color: 'black',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderTop: {
          color: 'black',
          lineStyle: 'Continuous',
          weight: 2
        }
      }
    },
    // Style for the data rows
    {
      id: 'data',
      alignment: {
        vertical: 'Center',
        horizontal: 'Center'
      },
      borders: {
        borderBottom: {
          color: 'red',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderLeft: {
          color: 'red',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderRight: {
          color: 'red',
          lineStyle: 'Continuous',
          weight: 2
        },
        borderTop: {
          color: 'red',
          lineStyle: 'Continuous',
          weight: 2
        }
      }
    }
  ]
})
</script>

<template>
  <div>
    <!-- Excel Export Button -->
    <div class="flex justify-end">
      <Button
        @click="onBtExport"
        style="margin-bottom: 5px; font-weight: bold; background-color: #344870; color: white"
      >
        Export to Excel
      </Button>
    </div>

    <!-- AG Grid -->
    <ag-grid-vue
      ref="gridRef"
      :rowData="rowData"
      :columnDefs="colDefs"
      :gridOptions="gridOptions"
      :paginationPageSizeSelector="paginationPageSizeSelector"
      style="height: 800px; width: 100%"
      class="ag-theme-quartz"
      :excelStyles="excelStyles"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<style scoped>
:deep .ag-header-cell {
  background-color: #455984 !important;
  color: white !important; /* For text color */
}
:deep .ag-icon-menu-alt::before {
  color: white !important;
}
:deep .ag-icon-filter::before {
  color: #f3989d !important;
}
</style>
