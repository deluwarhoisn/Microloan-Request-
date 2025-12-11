import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

const LoanForm = ({ selectedLoan }) => {
    const userEmail = "user@example.com"; // Replace with real auth context

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const defaultValues = { status: "Pending", applicationFeeStatus: "Unpaid" };

    const onSubmit = async (data) => {
        const finalData = {
            ...data,
            ...defaultValues,
            loanTitle: selectedLoan?.loanTitle,
            interestRate: selectedLoan?.interest,
            email: userEmail,
            appliedDate: new Date(),
        };

        setLoading(true);

        try {
            const res = await fetch("https://microloan-request-server.vercel.app/loan-application", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    title: "Application Submitted!",
                    text: "Your loan application has been submitted successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                reset(); // Clear form
            } else {
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg p-10 rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">Loan Application Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Auto-Filled Fields */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Loan Information (Read Only)</h3>
                    <input readOnly value={userEmail} className="w-full p-3 border rounded mb-3 bg-gray-200" />
                    <input readOnly value={selectedLoan?.loanTitle} className="w-full p-3 border rounded mb-3 bg-gray-200" />
                    <input readOnly value={`${selectedLoan?.interest}% Interest Rate`} className="w-full p-3 border rounded bg-gray-200" />
                </div>

                {/* User Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input {...register("firstName")} placeholder="First Name" required className="input" />
                    <input {...register("lastName")} placeholder="Last Name" required className="input" />
                </div>
                <input {...register("contactNumber")} placeholder="Contact Number" required className="input" />
                <input {...register("nationalID")} placeholder="National ID / Passport Number" required className="input" />
                <input {...register("incomeSource")} placeholder="Income Source" required className="input" />
                <input {...register("monthlyIncome")} type="number" placeholder="Monthly Income" required className="input" />
                <input {...register("loanAmount")} type="number" placeholder="Requested Loan Amount" required className="input" />
                <textarea {...register("reason")} placeholder="Reason for Loan" rows={3} className="input"></textarea>
                <textarea {...register("address")} placeholder="Address" rows={2} className="input"></textarea>
                <textarea {...register("extraNotes")} placeholder="Additional Notes (optional)" rows={3} className="input"></textarea>

                {/* Hidden Fields */}
                <input type="hidden" value="Pending" {...register("status")} />
                <input type="hidden" value="Unpaid" {...register("applicationFeeStatus")} />

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition">
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
