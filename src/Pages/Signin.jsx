import axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();

  async function handleLogin(e) {
    let { data, status } = await axios.post("/users/signin", e).catch((err) => {
      if (err) {
        toast(err?.response?.data?.message, { type: "error" });
      }
    });

    if (status === 201 && data.token) {
      localStorage.setItem("widerai-token", data.token);
      toast("Logged in successfully", { type: "success" });
      return navigate("/test");
    }
  }

  return (
    <section className="absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-300 bg-opacity-40">
        <div className="hidden md:block w-1/2">
          <img
            className="aspect-square object-cover rounded-xl"
            src="/login-image.png"
            alt="sign-up"
          />
        </div>
      <div className="w-full md:w-1/2">
        <Form onFinish={handleLogin}>
          <h2 className="text-white text-center text-3xl font-serif mb-5">
            Sign In to{" "}
            <span className="landing-title" style={{ fontSize: 40 }}>
              WiderAI
            </span>
          </h2>
          <Form.Item
            name="user_email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              type="email"
              className="placeholder:text-gray-500"
              placeholder="Your Email"
            />
          </Form.Item>
          <Form.Item
            name="user_password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password placeholder="*******" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ background: "#0077ff" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Link className="ml-5 text-white" to="/signup">
              Don't have an account? Sign up
            </Link>
          </Form.Item>
        </Form>
      </div>
      </div>
    </section>
  );
};

export default Signin;
