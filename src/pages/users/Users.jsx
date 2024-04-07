import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  doCreateUserWithEmailAndPassword,
  doUpdateUsers,
} from "../../firebase/auth";
import "./user.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar2 from "../../components/Navbar2";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";

function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editlastname, setEditLastname] = useState("");
  const [editfirstname, setEditFirstname] = useState("");
  const [editrole, setEditRole] = useState("");
  const [userId, setUserId] = useState("");

  const handleUserClick = (info) => {
    const user = info.row.original;
    console.log("Row data:", user);

    setSelectedUser(user);
    setEditFirstname(user.firstname);
    setEditLastname(user.lastname);
    setEditRole(user.role);
    setIsChecked(user.status === "Active");
    setUserId(user.id);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log("Data log " + data);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [toggleValue, setToggleValue] = useState("Deactivate");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the value of isChecked
    setToggleValue(isChecked ? "Inactive" : "Active");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstname: firstname,
      lastname: lastname,
      role: role,
      status: toggleValue,
    };

    try {
      const response = await axios.post(
        "https://us-central1-msu-iit-watermonitoringsystem.cloudfunctions.net/createUser/createUser",
        userData
      );
      console.log(response.data);
      setFirstname("");
      setLastname("");
      setRole("");
      setToggleValue("");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User created successfully!",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating user:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();

    const editUserData = {
      firstname: editfirstname,
      lastname: editlastname,
      role: editrole,
      status: toggleValue,
    };

    try {
      // Send updated user data to the server
      const response = await axios.put(
        `https://us-central1-msu-iit-watermonitoringsystem.cloudfunctions.net/updateUser/updateUser/${userId}`,
        editUserData
      );
      // Handle success
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User updated successfully!",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstname", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Water Usage",
    }),
    columnHelper.accessor("role", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Role(s)",
    }),
    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>
          {info.getValue() &&
            format(info.getValue().toDate(), "yyyy-MM-dd HH:mm:ss")}
        </span>
      ),
      header: "Date Added",
    }),
    {
      header: "Action",
      cell: (info) => (
        <button
          type="button"
          className="btn "
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          onClick={() => handleUserClick(info)}
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      ),
    },
  ];
  const [globalFilter, setGlobalFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const table = useReactTable({
    data: data,
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
    <div className="wrapper">
      <Sidebar sidebarCollapsed={sidebarCollapsed} />
      <section className="main">
        <Navbar2 toggleSidebar={toggleSidebar} />
        <main className="content px-3 py-2 bg-secondary bg-opacity-10">
          <div className="container-fluid">
            <div className="mb-3">
              <h1 className="fw-bold">Users</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
            </div>

            <div className="">
              <div className=" mt-5 bg-white p-3 ">
                <div className="w-100 d-flex justify-content-end mb-4">
                  <button
                    type="button"
                    className="btn btn-primary "
                    data-bs-toggle="modal"
                    data-bs-target="#addUserModal"
                  >
                    <i className="bx bx-plus-circle text-light "></i> &nbsp; Add
                    users
                  </button>
                </div>

                <div className="user p-2">
                  <table className="w-100 ">
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
                          const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
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

              {/* edit modal */}
              <div
                className="modal fade"
                id="editUserModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Edit
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      {selectedUser && (
                        <div>
                          <form action="">
                            <div className="mb-3">
                              <label
                                htmlFor="editfirstname"
                                className="form-label"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control text-capitalize "
                                id="editfirstname"
                                value={selectedUser.firstname}
                                onChange={(e) =>
                                  setEditFirstname(e.target.value)
                                }
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="editlastname"
                                className="form-label"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control text-capitalize "
                                id="editlastname"
                                value={selectedUser.lastname}
                                onChange={(e) =>
                                  setEditLastname(e.target.value)
                                }
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="role" className="form-label">
                                User Role:
                              </label>
                              <select
                                id="role"
                                className="form-select"
                                value={editrole}
                                onChange={(e) => setEditRole(e.target.value)}
                                required
                              >
                                <option value=""></option>
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                                {/* Add more role options as needed */}
                              </select>
                            </div>
                            <div className=" d-flex justify-content-between">
                              <label
                                className="form-check-label"
                                htmlFor="editoggle"
                              >
                                Status:
                              </label>
                              <div className="form-check form-switch ">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="editoggle"
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                  required
                                />

                                <p>{isChecked ? "Active" : "Inactive"}</p>
                              </div>
                            </div>
                          </form>

                          {/* Add more user details here */}
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={onEditSubmit}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add Modal */}
              <div
                className="modal "
                id="addUserModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add user
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body px-4">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="firstname" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control text-capitalize "
                            id="firstname"
                            placeholder="Ex. John"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="lastname" className="form-label  ">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control text-capitalize"
                            id="lastname"
                            placeholder="Ex. Gonzales"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="role" className="form-label">
                            User Role:
                          </label>
                          <select
                            id="role"
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            {/* Add more role options as needed */}
                          </select>
                        </div>
                        <div className=" d-flex justify-content-between">
                          <label
                            className="form-check-label"
                            htmlFor="toggleInput"
                          >
                            Status:
                          </label>
                          <div className="form-check form-switch ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="toggleInput"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />

                            <p>{isChecked ? "Active" : "Inactive"}</p>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            onClick={onSubmit}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Users;
