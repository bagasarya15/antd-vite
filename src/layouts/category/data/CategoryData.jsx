import { useEffect, useState, useRef } from "react";
import { message } from "antd";
import Swal from "sweetalert2";
import debounce from "lodash/debounce";

const dummyDataList = [
  { id: 1, category_name: "Food", category_type: "Expense" },
  { id: 2, category_name: "Salary", category_type: "Income" },
  { id: 3, category_name: "Transport", category_type: "Expense" },
  { id: 4, category_name: "Freelance", category_type: "Income" },
  { id: 5, category_name: "Shopping", category_type: "Expense" },
  { id: 6, category_name: "Investment", category_type: "Income" },
];

const CategoryData = () => {
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

  const debounceSearch = useRef(
    debounce((val) => {
      setSearchValue(val);
    }, 2000)
  ).current;

  const handleSearchChange = (e) => {
    const val = e.target.value;
    debounceSearch(val);
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

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return {
    data,
    err,
    loading,
    pagination,
    selectedRow,
    searchValue,
    setSelectedRow,
    handleAlert,
    handleAlertError,
    handleSearchChange,
    handlePaginationChange,
    fetchData,
    handleDelete,
  };
};

export default CategoryData;
