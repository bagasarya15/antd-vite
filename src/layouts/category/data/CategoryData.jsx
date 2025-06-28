import Swal from "sweetalert2";
import { Badge, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import EditCategory from "../component/EditCategory";

const dummyDataList = [
  { id: 1, category_name: "Food", category_type: "Expense" },
  { id: 2, category_name: "Salary", category_type: "Income" },
  { id: 3, category_name: "Transport", category_type: "Expense" },
  { id: 4, category_name: "Freelance", category_type: "Income" },
  { id: 5, category_name: "Shopping", category_type: "Expense" },
  { id: 6, category_name: "Investment", category_type: "Income" },
];

const CategoryData = ({ render }) => {
  const user = {
    data: {
      id: 1,
      name: "John Doe",
    },
  };

  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleAlert = (valMessage) => message.success(valMessage);
  const handleAlertError = (errorMessage) => message.error(errorMessage);

  const fetchData = () => {
    setLoading(true);
    try {
      let filtered = [...dummyDataList];
      if (searchValue) {
        filtered = filtered.filter((item) =>
          item.category_name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      const start = (pagination.current - 1) * pagination.pageSize;
      const paginated = filtered.slice(start, start + pagination.pageSize);

      setData(paginated);
      setPagination((prev) => ({
        ...prev,
        total: filtered.length,
      }));
    } catch (error) {
      setErr("Failed to load data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, searchValue]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));
  };

  const handleSearchChange = (e) => {
    const searchInput = e.target.value;
    if (searchInput.length >= 4 || searchInput === "") {
      setSearchValue(searchInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData();
    }
  };

  const handleEdit = (record) => {
    setSelectedRow(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: `Are you sure you want to delete "${record?.category_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== record.id));
        message.success(`Category "${record.category_name}" has been deleted.`);
        setPagination((prev) => ({
          ...prev,
          total: prev.total - 1,
        }));
      }
    });
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => text,
    },
    {
      title: "Type",
      dataIndex: "category_type",
      key: "category_type",
      render: (type) => {
        let color = type === "Expense" ? "#bf3952" : "#3b82f6";
        let display = type === "Expense" ? "Expense" : "Income";
        return <Badge color={color} text={display} />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span className="flex justify-center gap-2">
          <Button
            onClick={() => handleEdit(record)}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      {editModalVisible && (
        <EditCategory
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          user={user}
          fetchData={fetchData}
          initialValues={selectedRow}
          handleAlert={handleAlert}
          handleAlertError={handleAlertError}
        />
      )}
      {render({
        err,
        data,
        columns,
        loading,
        pagination,
        searchValue,
        selectedRow,
        fetchData,
        handleAlert,
        handleAlertError,
        handleSearchChange,
        handleKeyDown,
        handlePaginationChange,
      })}
    </>
  );
};

export default CategoryData;
