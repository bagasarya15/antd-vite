import React, { useState } from "react";
import {
  Button,
  Alert,
  Spin,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setIsSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Ant</span>
            <span className="text-gray-800">Dash</span>
          </h1>
          <p className="text-gray-500 mt-2">Create your new account</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8">
          {isSuccess && (
            <Alert
              message="Account created successfully!"
              type="success"
              showIcon
              className="mb-4"
              action={
                <Button type="text" size="small" onClick={() => navigate("/login")}>Go to Login</Button>
              }
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label>Full Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your full name" />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="Choose a username" />
                )}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="mb-4">
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your email address" />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Enter your password"
                    iconRender={(visible) =>
                      visible ? <IconEye /> : <IconEyeOff />
                    }
                    visibilityToggle={{
                      visible: showPassword,
                      onVisibleChange: setShowPassword,
                    }}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="mb-6">
              <label>Confirm Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Confirm your password"
                    iconRender={(visible) =>
                      visible ? <IconEye /> : <IconEyeOff />
                    }
                    visibilityToggle={{
                      visible: showConfirm,
                      onVisibleChange: setShowConfirm,
                    }}
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              disabled={loading}
              style={{ backgroundColor: "#1677ff", borderColor: "#1677ff" }}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />}
                />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign in here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;