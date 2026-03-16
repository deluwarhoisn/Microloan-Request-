import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const BASE_URL = "https://microloan-request-server.vercel.app";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const cardStyle = {
    style: {
        base: {
            color: "currentColor",
            fontSize: "16px",
            fontFamily: "inherit",
            "::placeholder": { color: "#9ca3af" },
        },
        invalid: { color: "#ef4444" },
    },
};

// ─── Inner payment form (needs Stripe context) ────────────────────────
const PaymentForm = ({ loan, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setCardError("");

        try {
            // 1. Ask backend to create a PaymentIntent for $10 (1000 cents)
            const intentRes = await axios.post(`${BASE_URL}/create-payment-intent`, {
                amount: 1000,
                currency: "usd",
                applicationId: loan._id,
                email: user?.email,
            });
            const { clientSecret } = intentRes.data;

            // 2. Confirm the payment on the client
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: user?.displayName || user?.email, email: user?.email },
                },
            });

            if (error) {
                setCardError(error.message);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                // 3. Mark fee as paid on backend (try multiple endpoints)
                const payload = { applicationFeeStatus: "Paid", transactionId: paymentIntent.id };
                const updateEndpoints = [
                    () => axios.patch(`${BASE_URL}/loan-applications/${loan._id}`, payload),
                    () => axios.put(`${BASE_URL}/loan-applications/${loan._id}`, payload),
                    () => axios.patch(`${BASE_URL}/applications/${loan._id}`, payload),
                ];
                for (const req of updateEndpoints) {
                    try { await req(); break; } catch { /* try next */ }
                }
                onSuccess(paymentIntent.id);
            }
        } catch (err) {
            // If the backend doesn't yet have the payment-intent endpoint, guide the user
            if (err?.response?.status === 404 || err?.code === "ERR_NETWORK") {
                setCardError("Payment service unavailable. Please contact support.");
            } else {
                setCardError(err?.response?.data?.message || "Payment failed. Please try again.");
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3">
                <CardElement options={cardStyle} />
            </div>
            {cardError && (
                <p className="text-sm text-error">{cardError}</p>
            )}
            <p className="text-xs text-base-content/50">
                Test card: <code className="font-mono">4242 4242 4242 4242</code> · any future date · any CVC
            </p>
            <button
                type="submit"
                disabled={!stripe || processing}
                className="btn btn-primary w-full"
            >
                {processing ? "Processing…" : "Pay $10.00"}
            </button>
        </form>
    );
};

// ─── Page wrapper ─────────────────────────────────────────────────────
const Checkout = () => {
    const { loanId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) { setLoading(false); return; }
        axios
            .get(`${BASE_URL}/loan-applications?email=${user.email}`)
            .then((res) => {
                const list = Array.isArray(res.data) ? res.data : [];
                setLoan(list.find((item) => String(item._id) === String(loanId)) || null);
            })
            .catch(() => setLoan(null))
            .finally(() => setLoading(false));
    }, [loanId, user?.email]);

    const handleSuccess = (transactionId) => {
        Swal.fire({
            icon: "success",
            title: "Payment Successful! 🎉",
            html: `<p>Your $10 application fee has been paid.</p><p class="text-xs mt-2 text-gray-400">Transaction: ${transactionId}</p>`,
            confirmButtonText: "View My Loans",
        }).then(() => navigate("/dashboard/my-loans"));
    };

    if (loading) return <LoadingSpinner />;

    if (!loan) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-6 bg-base-100 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-3">Checkout</h2>
                <p className="text-error">Loan application not found.</p>
                <button className="btn btn-outline mt-4" onClick={() => navigate("/dashboard/my-loans")}>
                    Go Back
                </button>
            </div>
        );
    }

    if (loan.applicationFeeStatus === "Paid") {
        return (
            <div className="max-w-xl mx-auto mt-12 p-6 bg-base-100 rounded-xl shadow text-center space-y-4">
                <div className="text-5xl">✅</div>
                <h2 className="text-2xl font-bold">Already Paid</h2>
                <p className="text-base-content/60">The $10 application fee for this loan has already been paid.</p>
                <button className="btn btn-primary" onClick={() => navigate("/dashboard/my-loans")}>
                    View My Loans
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-base-100 rounded-xl shadow space-y-5">
            <h2 className="text-2xl font-bold">Application Fee Checkout</h2>

            <div className="rounded-lg border border-base-300 p-4 bg-base-200 space-y-1 text-sm">
                <p><span className="font-medium">Loan:</span> {loan.loanTitle || loan.loanName || loan.title || "N/A"}</p>
                <p><span className="font-medium">Application ID:</span> {loan._id}</p>
                <p><span className="font-medium">Status:</span> {loan.status || "Pending"}</p>
                <p className="text-lg font-semibold mt-2">Fee: $10.00</p>
            </div>

            {!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? (
                <div className="alert alert-warning">
                    <span>⚠️ Stripe key missing. Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your <code>.env</code> file.</span>
                </div>
            ) : (
                <Elements stripe={stripePromise}>
                    <PaymentForm loan={loan} onSuccess={handleSuccess} />
                </Elements>
            )}

            <button className="btn btn-outline btn-sm w-full" onClick={() => navigate(-1)}>
                Cancel
            </button>
        </div>
    );
};

export default Checkout;