import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./history.css";
import { format } from "date-fns";
import { fetchBilling } from "../../firebase/function";

function BillingHistory() {
  const columnHelper = createColumnHelper();
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchBilling(setBilling);
    return () => unsubscribe();
  }, []);

  const columns = [
    columnHelper.accessor("month", {
      cell: (info) => (
        <span>
          {info.getValue() && format(info.getValue().toDate(), "MMMM dd, yyyy")}
        </span>
      ),
      header: "Month",
    }),
    columnHelper.accessor("total_volume", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Water Usage (L)",
    }),
    columnHelper.accessor("rate", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Rate",
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Billing",
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const table = useReactTable({
    data: billing,
    columns,
    state: {
      globalFilter: searchTerm,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        // pageIndex: 2,
        pageSize: 5,
      },
    },
  });

  return (
    <div>
      <div className="historyContainer">
        <div className="form-group has-search mb-3 search-container">
          <span className="fa fa-search form-control-feedback"></span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search"
          />
        </div>
        {/* <div className="mb-3  ">
          <input
            type="search"
            className="rounded-pill ps-2 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <div className="tableWrap">
          <table className="">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="tableHead">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-100 cursor-pointer font-medium"
                  >
                    {row.getVisibleCells().map((cell, j, cells) => (
                      <td
                        key={cell.id}
                        className={`px-3.5 py-2 border-b ${
                          j === cells.length - 1
                            ? "border-gray-300"
                            : "border-r border-gray-300"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className=" text-center  ">
                  <td colSpan={12}>No Records Found!</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex align-items-center justify-content-end mt-2 gap-2">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="btn btn-outline-secondary p-1 disabled:opacity-30"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="btn btn-outline-secondary p-1 disabled:opacity-30"
            >
              {">"}
            </button>

            <span className="d-flex align-items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="d-flex align-items-center gap-1 ">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="form-control rounded bg-transparent PaginationPage"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="form-select bg-transparent w-auto"
            >
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
