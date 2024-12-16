"use client";

import { useSession, signIn } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import Image from "next/image";

export default function AuthModal() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSignin = () => {
    setLoading(true);
    signIn("google");
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsOpen(true);
    }
  }, [status]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={() => {}} className="dialog-container">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <div className="flex justify-center">
              <Image
                src="/assets/icons/logo.svg"
                alt="TrackItNow Logo"
                width={40}
                height={40}
              />
            </div>
            <Dialog.Title className="text-3xl tracking-wide font-bold text-center mt-4">
              Get started with
            </Dialog.Title>
            <Dialog.Title className="text-3xl text-primary tracking-wider font-bold text-center mt-1">
              TrackItNow
            </Dialog.Title>

            <Dialog.Description className="mt-5 text-gray-600 text-center">
              Sign in to unlock powerful price tracking and comprehensive market
              analysis tools.
            </Dialog.Description>

            <div className="mt-6 space-y-4">
              {/* Google Sign In */}
              <button
                onClick={handleSignin}
                className="w-full px-5 py-3 text-white text-base font-semibold bg-secondary rounded-lg flex items-center justify-center tracking-wide gap-3"
              >
                <Image
                  src="/assets/icons/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                {isLoading ? "Logging in..." : "Continue with Google"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
