import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Checkout = () => {
    const { loanId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        axios
            .get(`https://microloan-request-server.vercel.app/loan-applications?email=${user.email}`)
            .then((res) => {
                const list = Array.isArray(res.data) ? res.data : [];
                const matched = list.find((item) => String(item._id) === String(loanId));
                setLoan(matched || null);
            })
            .catch(() => setLoan(null))
            .finally(() => setLoading(false));
    }, [loanId, user?.email]);

    const handleConfirm = () => {
        Swal.fire({
            icon: "success",
            title: "Payment Gateway Placeholder",
            text: "Checkout page is working. Connect your Stripe session endpoint here.",
        });
    };

    if (loading) return <LoadingSpinner />;

    if (!loan) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-3">Checkout</h2>
                <p className="text-red-500">Loan application not found.</p>
                <button className="btn btn-outline mt-4" onClick={() => navigate("/dashboard/my-loans")}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-5">
            <h2 className="text-2xl font-bold">Application Fee Checkout</h2>

            <div className="rounded-lg border p-4 bg-slate-50">
                <p><strong>Loan:</strong> {loan.loanTitle || loan.loanName || loan.title || "N/A"}</p>
                <p><strong>Application ID:</strong> {loan._id}</p>
                <p><strong>Status:</strong> {loan.status || "Pending"}</p>
                <p><strong>Fee:</strong> $10</p>
            </div>

            <div className="flex gap-3">
                <button className="btn btn-primary" onClick={handleConfirm}>Confirm Payment</button>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </div>
    );
};

export default Checkout;