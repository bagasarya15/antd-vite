import React from "react";
import { Modal, Button, Input, Select, Form as AntForm } from "antd";
import { Controller, useForm } from "react-hook-form";
import { apiCreateCategory } from "../../../services/CategoryApi";

const { Option } = Select;

const AddCategory = ({
  visible,
  onCancel,
  user,
  fetchData,
  handleAlert,
  handleAlertError,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_name: "",
      category_type: "",
      user_id: user?.data?.id || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await apiCreateCategory(values);
      if (response.status === 201) {
        handleAlert(`Category "${values.category_name}" has been added successfully.`);
        fetchData();
        onCancel();
        reset();
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data?.status === 400) {
        handleAlertError(`Category "${values.category_name}" already exists.`);
      }
    }
  };

  return (
    <Modal
      title="Add New Category"
      open={visible}
      onCancel={() => {
        onCancel();
        reset();
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "#1677ff",
            borderColor: "#1677ff",
            color: "#fff",
          }}
        >
          Add
        </Button>,
      ]}
    >
      <AntForm layout="vertical">
        <AntForm.Item
          label="Category Name"
          validateStatus={errors.category_name ? "error" : ""}
          help={errors.category_name?.message}
        >
          <Controller
            name="category_name"
            control={control}
            rules={{ required: "Category name is required." }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter category name" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Category Type"
          validateStatus={errors.category_type ? "error" : ""}
          help={errors.category_type?.message}
        >
          <Controller
            name="category_type"
            control={control}
            rules={{ required: "Category type is required." }}
            render={({ field }) => (
              <Select {...field} placeholder="Select category type">
                <Option value="Expense">Expense</Option>
                <Option value="Income">Income</Option>
              </Select>
            )}
          />
        </AntForm.Item>

        <Controller
          name="user_id"
          control={control}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
      </AntForm>
    </Modal>
  );
};

export default AddCategory;
