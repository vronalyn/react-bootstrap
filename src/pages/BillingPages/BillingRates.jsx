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
import "./rate.css";
import {
  fetchBillingRates,
  fetchRateChangeLog,
  updateBillingRates,
} from "../../firebase/function";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/authContext";
import { format } from "date-fns";

function BillingRates() {
  const { currentUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [billingRates, setBillingRates] = useState([]);
  const [rateChangeLog, setRateChangeLog] = useState([]);
  const [values, setValues] = useState({
    liters: "", // Assuming these are your input fields
    rate: "",
  });

  useEffect(() => {
    const unsubscribe = fetchRateChangeLog(setRateChangeLog);
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   // Extracting necessary properties into a new array
  //   const newList = billing.map((item) => ({
  //     building: item.building,
  //     rate: item.rate,
  //     total_billed: item.total_billed,
  //     total_volume: item.total_volume,
  //   }));

  //   setBillingList(newList);
  //   // console.log("Billing List:");
  //   // newList.forEach((obj, index) => {
  //   //   console.log(`Item ${index}:`, obj);
  //   // });
  // }, [billing]);

  useEffect(() => {
    const unsubscribe = fetchBillingRates(setBillingRates);
    console.log("data rates: " + billingRates);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check if billingRates is not empty
    if (billingRates.length > 0) {
      const firstResult = billingRates[0];
      console.log("data rates for the first item: " + firstResult.no_of_liters);

      // Update the input values using the data from the first result
      setValues({
        liters: firstResult.no_of_liters,
        rate: firstResult.rate,
        // Set other values as needed
      });
    }
  }, [billingRates]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(editMode);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBillingRates(values, currentUser.email);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated successfully!",
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>
          {info.getValue() &&
            format(info.getValue().toDate(), "yyyy-MM-dd HH:mm:ss")}
        </span>
      ),
      header: "Date Modified",
    }),
    // columnHelper.accessor("date", {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: "Date",
    // }),
    columnHelper.accessor("no_of_liters", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "No. Of Liters",
    }),
    columnHelper.accessor("rate", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Rate",
    }),
    columnHelper.accessor("createdBy", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Modified By",
    }),
  ];
  const [globalFilter, setGlobalFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const table = useReactTable({
    data: rateChangeLog,
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
      <div className="">
        <div className="rateContainer">
          <div className="rateHeader">
            <h5 className="title">Billing Rates</h5>{" "}
            <span onClick={handleEditClick}>
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
          </div>
          <div className="">
            {editMode ? (
              <form className="mt-3">
                <div className="mb-3 row ">
                  <label htmlFor="litersInput" className="form-label col-4">
                    No. Of Liters:
                  </label>
                  <input
                    type="number"
                    className="form-control w-50 col-4"
                    id="litersInput"
                    name="liters"
                    value={values.liters}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3 row ">
                  <label htmlFor="rateInput" className="form-label col-4 ">
                    Rate Per Liters:
                  </label>
                  <input
                    type="number"
                    className="form-control w-50 col-4 "
                    id="rateInput"
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </div>
                {editMode && (
                  <div className="d-flex gap-2 mt-2">
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-light "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <div className="mt-3">
                <div className="mb-3 row ">
                  <label htmlFor="litersInput" className="form-label col-4">
                    No. Of Liters:
                  </label>
                  <input
                    type="number"
                    className="form-control w-50 col-4 bg-light "
                    id="litersInput"
                    name="liters"
                    value={values.liters}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-3 row ">
                  <label htmlFor="rateInput" className="form-label col-4 ">
                    Rate Per Liters:
                  </label>
                  <input
                    type="number"
                    className="form-control w-50 col-4 bg-light"
                    id="rateInput"
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rateChangeLog mb-4">
        <h5 className="mb-4">Rate Change Log</h5>
        <div className="p-3 bg-white rounded">
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
                    key={row.i}
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
                <tr className="text-center">
                  <td colSpan={12}>No Records Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillingRates;
