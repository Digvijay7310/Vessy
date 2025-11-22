import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../api/userApi";
import { useToast } from "../hooks/useToast";

export default function Register() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await userRegister(form);
            toast.success("Registered successfully!");
            navigate("/login"); // redirect to login after registration
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone no."
                    value={form.phone}
                    accept="number"
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-6 border rounded"
                    required
                />

                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
