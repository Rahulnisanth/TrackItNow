"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

const ProductAlert = ({ alertOpen, setAlertOpen, productId }) => {
  const router = useRouter();
  const close = () => {
    setAlertOpen(false);
  };
  const handleClick = () => {
    close();
    router.push(`/product/${productId}`);
  };

  return (
    <Transition appear show={alertOpen} as={Fragment}>
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
                <h4 className="dialog-head mt-2 text-2xl font-bold text-gray-900">
                  Product Found!
                </h4>

                <p className="text-sm text-gray-600 mt-2">
                  We’ve successfully retrieved the details of the product you
                  were looking for. Stay updated with the latest price changes
                  and offers.
                </p>
              </div>

              <button
                onClick={handleClick}
                className="px-5 py-3 text-white text-base font-semibold border border-secondary bg-secondary rounded-lg mt-4"
              >
                View Product Details
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductAlert;
