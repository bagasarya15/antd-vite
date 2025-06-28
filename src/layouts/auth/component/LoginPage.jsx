import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Button, Spin, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleComponent from "../../utils/ToggleComponent";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { showPassword, togglePasswordVisibility } = ToggleComponent();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameOrEmail: "demo",
      password: "demo",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("token", JSON.stringify(values));
      navigate("/", { replace: true });
    }, 1500);
  };

  const handleCloseAlert = () => {
    setErr(null);
    navigate("/login", { replace: true, state: null });
  };

  useEffect(() => {
    if (state?.isLogout) {
      const timeout = setTimeout(() => {
        navigate("/login", { replace: true, state: null });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">Ant</span>
            <span className="text-gray-800">Dash</span>
          </h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8"
        >
          {state?.isLogout && (
            <Alert
              message="Successfully logged out"
              type="success"
              showIcon
              closable
              className="mb-4"
              onClose={handleCloseAlert}
            />
          )}

          {err?.message && (
            <Alert
              message={err.message}
              type="error"
              showIcon
              closable
              className="mb-4"
              onClose={handleCloseAlert}
            />
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Username or Email
            </label>
            <Controller
              name="usernameOrEmail"
              control={control}
              rules={{ required: "Username or Email is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your username or email"
                  className={errors.usernameOrEmail ? "border-red-500" : ""}
                />
              )}
            />
            {errors.usernameOrEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <IconEye /> : <IconEyeOff />
                  }
                  visibilityToggle={{
                    visible: showPassword,
                    onVisibleChange: togglePasswordVisibility,
                  }}
                  className={errors.password ? "border-red-500" : ""}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            style={{
              backgroundColor: "#1677ff",
              borderColor: "#1677ff",
              color: "#fff",
            }}
            disabled={loading}
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ color: "white", fontSize: 20 }}
                    spin
                  />
                }
              />
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;