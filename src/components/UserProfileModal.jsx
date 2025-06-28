import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Upload,
  Button,
  Avatar,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import DefaultUsersImage from "../../public/assets/default.jpg";

const UserProfileModal = ({
  visible,
  onCancel,
  userData,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(DefaultUsersImage);

  useEffect(() => {
    if (visible && userData) {
      reset({
        name: userData.name,
        email: userData.email,
        username: userData.username,
      });

      setPreviewImage(
        userData.image !== "default.jpg" ? userData.image : DefaultUsersImage
      );
    }
  }, [visible, userData, reset]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  };

  const onSubmit = (data) => {
    message.success("Profile updated!");
    onSave(data, fileList[0]);
  };

  return (
    <Modal
      title="User Profile"
      open={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
      style: {
        backgroundColor: "#1677ff",
        borderColor: "#1677ff",
        color: "#fff",
      },
  }}
      centered
    >
      <div className="flex justify-center mb-4">
        <Avatar size={80} src={previewImage} />
      </div>

      <Upload
        listType="picture"
        beforeUpload={() => false}
        fileList={fileList}
        maxCount={1}
        onChange={handleUploadChange}
        showUploadList={false}
      >
        <Button 
        block icon={<UploadOutlined />}>
          Upload New Photo
        </Button>
      </Upload>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please enter your name" }}
            render={({ field }) => (
              <Input {...field} placeholder="Full name" />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Username</label>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Please enter your username" }}
            render={({ field }) => (
              <Input {...field} placeholder="Username" />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Email address" />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
