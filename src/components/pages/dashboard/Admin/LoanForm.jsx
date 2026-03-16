import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const LoanForm = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const userEmail = user?.email || "";

    // Accept loan data from router state (passed from LoanDetails "Apply Now")
    const selectedLoan = location.state?.loan || null;

    const [showConfetti, setShowConfetti] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const defaultValues = { status: "Pending", applicationFeeStatus: "Unpaid" };

    const onSubmit = async (data) => {
        const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");

        const finalData = {
            ...data,
            status: "Pending",
            applicationFeeStatus: "Unpaid",
            name: fullName,
            amount: data.loanAmount,
            additionalInfo: data.extraNotes || data.reason || "",
            loanId: selectedLoan?._id || "",
            category: selectedLoan?.category || data.category || "General",
            loanTitle: selectedLoan?.loanTitle || selectedLoan?.title || "",
            interestRate: selectedLoan?.interest,
            email: userEmail,
            createdAt: new Date().toISOString(),
            appliedDate: new Date().toISOString(),
        };

        setLoading(true);

        // Try multiple endpoint patterns
        const endpoints = [
            "https://microloan-request-server.vercel.app/loan-application",
            "https://microloan-request-server.vercel.app/loan-applications",
        ];

        let submitted = false;
        for (const url of endpoints) {
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                });
                const result = await res.json();
                if (result.insertedId || result.success || result.acknowledged) {
                    submitted = true;
                    break;
                }
            } catch { /* try next */ }
        }

        setLoading(false);

        if (submitted) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            Swal.fire({
                title: "Application Submitted! 🎉",
                text: "Your loan application has been submitted successfully. Check your dashboard.",
                icon: "success",
                confirmButtonText: "View My Loans",
            }).then(() => navigate("/dashboard/my-loans"));
            reset();
        } else {
            Swal.fire({
                title: "Submission Failed",
                text: "Could not submit your application. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 shadow-lg p-10 rounded-xl mt-10 mb-10">
            {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
            <h2 className="text-3xl font-bold text-center mb-8">Loan Application Form</h2>

            {!selectedLoan && (
                <div className="alert alert-warning mb-6 text-sm">
                    No loan selected. Please go to <a href="/loans" className="underline font-medium">All Loans</a> and click "View Details" → "Apply Now".
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Auto-Filled Fields */}
                <div className="bg-base-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Loan Information (Read Only)</h3>
                    <input readOnly value={userEmail} className="w-full p-3 border rounded mb-3 bg-base-300 text-base-content" />
                    <input readOnly value={selectedLoan?.loanTitle || selectedLoan?.title || "N/A"} placeholder="Loan Title" className="w-full p-3 border rounded mb-3 bg-base-300 text-base-content" />
                    <input readOnly value={selectedLoan?.interest ? `${selectedLoan.interest}% Interest Rate` : "N/A"} className="w-full p-3 border rounded bg-base-300 text-base-content" />
                </div>

                {/* User Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input {...register("firstName", { required: true })} placeholder="First Name *" className="input input-bordered w-full" />
                        <input {...register("lastName", { required: true })} placeholder="Last Name *" className="input input-bordered w-full" />
                    </div>
                    <input {...register("contactNumber", { required: true })} placeholder="Contact Number *" className="input input-bordered w-full" />
                    <input {...register("nationalID", { required: true })} placeholder="National ID / Passport Number *" className="input input-bordered w-full" />
                    <input {...register("incomeSource", { required: true })} placeholder="Income Source *" className="input input-bordered w-full" />
                    <input {...register("monthlyIncome", { required: true })} type="number" placeholder="Monthly Income ($) *" className="input input-bordered w-full" />
                    <input {...register("loanAmount", { required: true })} type="number" placeholder="Requested Loan Amount ($) *" className="input input-bordered w-full" />
                    <textarea {...register("reason", { required: true })} placeholder="Reason for Loan *" rows={3} className="textarea textarea-bordered w-full"></textarea>
                    <textarea {...register("address", { required: true })} placeholder="Address *" rows={2} className="textarea textarea-bordered w-full"></textarea>
                    <textarea {...register("extraNotes")} placeholder="Additional Notes (optional)" rows={3} className="textarea textarea-bordered w-full"></textarea>

                {/* Hidden Fields */}
                <input type="hidden" value="Pending" {...register("status")} />
                <input type="hidden" value="Unpaid" {...register("applicationFeeStatus")} />

                <button type="submit" disabled={loading} className="btn btn-primary w-full text-base">
                    {loading ? "Submitting..." : "🚀 Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
