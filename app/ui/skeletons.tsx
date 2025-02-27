// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const orangeShimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-orange-50/50 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}



export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function DropdownSkeleton() {
  return (
    <div className={`${orangeShimmer} max-w-xs h-[52px] overflow-hidden bg-white relative w-full rounded-t-lg`}>
      <div className="group relative block px-3.5 py-1.5  border rounded-t-lg cursor-pointer">
        <div className="flex flex-wrap items-center justify-between -m-2">
          <div className="w-auto p-2">

          </div>
          <div className="w-auto p-2">
            <span className='inline-block transform rotate-0'>
              <svg className="relative -top-px text-neutral-300 group-hover:text-neutral-400" width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6673 9.5L8.00065 14.1667L3.33398 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableWordRowSkeleton() {
  return (
    <tr className={`inline-flex flex-col md:table-row`}>
      <td className="p-0">
        <div 
          className='flex items-center pl-9 p-5 h-20 min-w-max bg-gray-50 border-l border-t border-b border-gray-100 rounded-bl-xl rounded-tl-xl'
        >

          {/* <input className="border border-gray-200 focus:outline-0 focus:ring-offset-0 focus:ring-0 !focus:shadow-none focus:ring-transparent focus:ring-opacity-0 w-6 h-6 mr-9 text-orange-500 rounded-md" type="checkbox"/> */}
          <div className="flex items-center justify-start">
            <div>
              <div className="flex items-center flex-row font-heading font-medium"></div>
            </div>
          </div>
        </div>
      </td>
      <td className="p-0">
        <div 
          className='flex flex-col items-start justify-center p-5 h-20 text-center min-w-max bg-gray-50 border-t border-b border-gray-100'
        >
          <span className="font-heading font-medium custom-line-clamp cursor-pointer"></span>

          <div className="absolute left-1/2 -translate-x-1/2 whitespace-normal break-words top-full z-40 mt-2 w-full text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </td>
      <td className="p-0">
        <div 
          className='flex flex-col items-start justify-center p-5 h-20 text-center min-w-max bg-gray-50 border-t border-b border-gray-100'
        >
          <span className="font-heading font-medium"></span>
          <span className="text-sm text-darkBlueGray-400 font-heading"></span>
        </div>
      </td>
      <td className="p-0">
        <div 
          className='flex items-center w-full p-5 pr-12 h-20 min-w-max bg-gray-50 border-t border-b border-r border-gray-100 rounded-br-xl rounded-tr-xl'
        >
          <div className="flex-1 pr-20">
            <div className="relative w-full h-1 bg-orange-100 rounded-sm">
              <div className={`absolute top-0 left-0 w-[15%]  h-full bg-orange-300 rounded-sm`}></div>
            </div>
            <span className="block mt-2 text-sm text-darkBlueGray-400 font-heading"></span>
          </div>
        </div>
      </td>
    </tr>
  )
}

export function TableWordsSkeleton() {
  return (
    <>
      <div className={`container px-4 mx-auto`}>
        <div className="2xl:h-full bg-white rounded-3xl">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className={`table-auto w-full mb-8`}>
                <thead>
                  <tr className="hidden md:table-row">
                    <th className="flex items-center pl-9 h-20 bg-white text-left">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Word</span>
                    </th>
                    <th className="p-5  h-20 text-left bg-white">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Explanation</span>
                    </th>
                    <th className="p-5  h-20 text-left bg-white">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Translation</span>
                    </th>
                    <th className="p-5 h-20 bg-white text-left">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Progress</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <TableWordRowSkeleton />
                  <TableWordRowSkeleton />
                  <TableWordRowSkeleton />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableCustomerRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Total Invoices */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Total Pending */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Total Paid */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>      
    </tr>
  );
}

export function CustomersMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function CustomersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Invoices
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Pending
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Paid
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableCustomerRowSkeleton />
              <TableCustomerRowSkeleton />
              <TableCustomerRowSkeleton />
              <TableCustomerRowSkeleton />
              <TableCustomerRowSkeleton />
              <TableCustomerRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}