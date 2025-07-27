
import React, { useState } from "react";
import { Badge, Button, Input, Table } from "antd";
import AddCategory from "./component/AddCategory";
import EditCategory from "./component/EditCategory";
import CategoryData from "./data/CategoryData";

const CategoryIndex = ({ isDarkMode }) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const user = { id: 1, name: "John Doe" };

  const {
    data,
    err,
    loading,
    pagination,
    selectedRow,
    setSelectedRow,
    handleAlert,
    handleAlertError,
    handleSearchChange,
    handlePaginationChange,
    fetchData,
    handleDelete,
  } = CategoryData();

  const handleEdit = (record) => {
    setSelectedRow(record);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Type",
      dataIndex: "category_type",
      key: "category_type",
      render: (type) => {
        const color = type === "Expense" ? "#bf3952" : "#3b82f6";
        return <Badge color={color} text={type} />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
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
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 rounded-md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          backgroundColor: isDarkMode ? "#1E1E2D" : "white",
          padding: 10,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          gap: 8,
        }}
      >
        <Input
          placeholder="Search"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <Button onClick={() => setAddModalVisible(true)}>Add</Button>
      </div>

      <Table
        columns={columns.map((col) => ({
          ...col,
          align: "center",
          render: col.render
            ? (text, record) => <div style={{ textAlign: "center" }}>{col.render(text, record)}</div>
            : undefined,
        }))}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          onChange: handlePaginationChange,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
        }}
        locale={{
          emptyText: err || "No data",
        }}
        scroll={{ x: "100%" }}
        rowKey="id"
      />

      <AddCategory
        visible={isAddModalVisible}
        onCancel={() => setAddModalVisible(false)}
        user={user}
        fetchData={fetchData}
        handleAlert={handleAlert}
        handleAlertError={handleAlertError}
      />

      <EditCategory
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        user={user}
        fetchData={fetchData}
        initialValues={selectedRow}
        handleAlert={handleAlert}
        handleAlertError={handleAlertError}
      />
    </div>
  );
};

export default CategoryIndex;
