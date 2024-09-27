"use client";
import React, { Fragment } from "react";
import { useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { addUserEmailToProduct } from "@/lib/actions";

const Modal = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addUserEmailToProduct(productId, email);
    setIsSubmitting(false);
    setEmail("");
    close();
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={open} className="btn">
        Track Product
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={close} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={close}
                    />
                  </div>

                  <h4 className="dialog-head_text mt-4 text-lg font-medium text-gray-900">
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="dialog-input_container mt-2 flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="mail"
                      width={18}
                      height={18}
                    />
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="dialog-input ml-2 flex-1 border-none focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="dialog-btn mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    {isSubmitting ? "Processing..." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
