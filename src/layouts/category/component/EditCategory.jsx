import React, { useEffect } from "react";
import { Modal, Input, Select, Button, Form as AntForm } from "antd";
import { useForm, Controller } from "react-hook-form";
import { apiUpdateCategory } from "../../../services/CategoryApi";

const { Option } = Select;

const EditCategory = ({
  visible,
  onCancel,
  initialValues,
  fetchData,
  handleAlert,
  handleAlertError,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_name: "",
      category_type: "",
      user_id: "",
      id: "",
    },
  });

  // Set initial form values when modal opened
  useEffect(() => {
    if (initialValues && visible) {
      reset(initialValues);
    }
  }, [initialValues, visible]);

  const onSubmit = async (values) => {
    try {
      const response = await apiUpdateCategory(values);
      if (response.status === 200) {
        handleAlert(`Category "${values.category_name}" updated successfully.`);
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

  const handleClose = () => {
    onCancel();
    reset();
  };

  return (
    <Modal
      title="Edit Category"
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
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
          Update
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
            render={({ field }) => <Input {...field} placeholder="Enter name" />}
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
        <Controller
          name="id"
          control={control}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
      </AntForm>
    </Modal>
  );
};

export default EditCategory;
