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
function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editlastname, setEditLastname] = useState("");
  const [editfirstname, setEditFirstname] = useState("");
  const [editrole, setEditRole] = useState("");

  const handleUserClick = (user) => {
    setSelectedUser(user);

    if (user) {
      setEditLastname(user.lastname);
      setEditFirstname(user.firstname);
      setEditRole(user.role);
      setEditRole(user.userId);
    }
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
  const [toggleValue, setToggleValue] = useState("Inactive");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the value of isChecked
    setToggleValue(isChecked ? "Inactive" : "Active");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function with input values
      await doCreateUserWithEmailAndPassword(
        firstname,
        lastname,
        role,
        toggleValue
      );
      setFirstname("");
      setLastname("");
      setRole("");
      setToggleValue("");
      window.location.reload();
    } catch (error) {
      // Handle errors here
      console.error("Error creating user:", error);
    }
  };

  const onEditSubmit = async () => {
    try {
      // Call the function with input values
      await doUpdateUsers(
        editfirstname,
        editlastname,
        role,
        // fileName,
        selectedUser.id,
        toggleValue
      );
      // setFirstname("");
      // setLastname("");
      // setRole("");
    } catch (error) {
      // Handle errors here
      console.error("Error creating user:", error);
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
    // columnHelper.accessor("createdAt", {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: "Date",
    // }),
    {
      header: "Action",
      cell: (info) => (
        <button
          type="button"
          className="btn "
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          onClick={() => handleUserClick(info.row)}
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
                                className="form-control"
                                id="editfirstname"
                                value={editfirstname}
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
                                className="form-control"
                                id="editlastname"
                                value={editlastname}
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
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
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
                            className="form-control"
                            id="firstname"
                            placeholder="Ex. John"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="lastname" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
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
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
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
