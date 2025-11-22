import { useEffect, useState, useContext } from "react";
import { getMyProfile, updateUserProfile, changeUserPassword } from "../api/userApi";
import { useToast } from "../hooks/useToast";

export default function Profile() {
    const { toast } = useToast();
    const [profile, setProfile] = useState({ fullName: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getMyProfile();
            setProfile(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile({ fullName: profile.fullName });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update profile");
        }
    };

    const handleChangePassword = async () => {
        if (!passwords.oldPassword || !passwords.newPassword) return toast.error("Both password fields are required");
        try {
            await changeUserPassword(passwords);
            toast.success("Password updated successfully");
            setPasswords({ oldPassword: "", newPassword: "" });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update password");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="mb-6">
                <label className="block mb-1">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
                <label className="block mb-1 mt-3">Email</label>
                <input type="email" value={profile.email} disabled className="w-full border rounded p-2 bg-gray-100" />
                <button
                    onClick={handleUpdateProfile}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Update Profile
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Change Password</h2>
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded p-2 mb-2"
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded p-2 mb-2"
                />
                <button
                    onClick={handleChangePassword}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}
