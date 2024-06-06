"use client"

import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

//Assets
import logo from "../../../public/OnlyBees_light.svg"
import Image from "next/image";

const LoginPage = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [confirmationResult, setConfirmationResult] = useState(null)

    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== "undefined") {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: (response) => {
                    onSignup();
                },
                "expired-callback": () => { },
            });
        }
    }, [auth])


    const onSignup = async () => {

        setLoading(true);
        // onCaptchVerify();

        // const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        try {
            if (typeof window !== "undefined") {
                const confirmation = await signInWithPhoneNumber(auth, formatPh, window.RecaptchaVerifier)
                setConfirmationResult(confirmation);
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const onOTPVerify = async () => {
        setLoading(true);
        confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <section className="bg-black flex items-center justify-center h-[90svh]">
            <div className="w-[80svw] flex justify-center">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {user ? (
                    <h2 className="text-center text-white font-medium text-2xl">
                        👍Login Success
                    </h2>
                ) : (
                    <div className="w-[80svw] flex flex-col gap-4 rounded-lg">
                        <h1 className="-mt-20 text-center leading-normal text-white font-medium text-3xl">
                            Welcome to
                        </h1>
                        <Image
                            src={logo}
                            priority
                            width={300}
                            height="auto"
                            alt="Onlybees logo"
                            className="mb-1 mx-auto"
                        />
                        <p className="text-center font-light mb-28">Discover the best nights out in your city with us. Explore events all in one place.</p>

                        {showOTP ? (
                            <div className="md:w-[30svw] w-full mx-auto text-center">
                                <div className="bg-white text-[#00FF38] w-fit mx-auto rounded-full">
                                    <BsFillShieldLockFill size={30} />
                                </div>
                                <label
                                    htmlFor="otp"
                                    className="font-bold text-xl text-white text-center"
                                >
                                    Enter your OTP
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    style={{ "margin": "0 auto", "padding": "0", "justifyContent": "between", "alignItems": "center" }}
                                    inputStyles={{ "background": "none", "borderBottom": "solid 1px white", "margin": "1.2rem auto" }}
                                    className="opt-container text-white"
                                ></OtpInput>
                                <button
                                    onClick={onOTPVerify}
                                    className="bg-[#00FF38] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    )}
                                    <span className="text-black">Verify OTP</span>
                                </button>
                            </div>
                        ) : (
                            <div className="md:w-[30svw] mx-auto">
                                <PhoneInput country={"in"}
                                    value={ph}
                                    onChange={setPh}
                                    inputStyle={{ "color": "white", "background": "none", "border": "none" }}
                                    buttonStyle={{ "background": "none", "border": "none" }}
                                    dropdownStyle={{ "color": "white", "background": "black" }}
                                    autoFocus
                                />
                                <hr />
                                <button
                                    onClick={onSignup}
                                    className="mt-5 bg-white w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    )}
                                    <span>Send code via SMS</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LoginPage;
