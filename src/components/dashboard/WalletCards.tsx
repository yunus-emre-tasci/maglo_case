"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import {
  formatCardNumber,
  formatCardNumberHidden,
  formatTransactionDate,
} from "@/lib/utils";
import { WalletCardsSkeleton } from "@/components/ui/Skeleton";
import {
  CreditCard,
  MoreHorizontal,
  AlertCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export function WalletCards() {
  const {
    data: wallet,
    isLoading: walletLoading,
    error: walletError,
  } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => apiClient.getWallet(),
  });

  const {
    data: scheduledTransfers,
    isLoading: transfersLoading,
    error: transfersError,
  } = useQuery({
    queryKey: ["scheduled-transfers"],
    queryFn: () => apiClient.getScheduledTransfers(),
  });

  if (walletLoading || transfersLoading) {
    return <WalletCardsSkeleton />;
  }

  if (walletError || transfersError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading wallet data
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {walletError?.message ||
                transfersError?.message ||
                "An unknown error occurred."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = wallet?.data;

  if (!data || !data.cards || data.cards.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cards</h3>
          <p className="text-gray-600">You don't have any wallet cards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 -mt-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Wallet</h3>
        <button className="text-gray-600 hover:text-gray-900">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="relative h-96">
        {/* First Card - Maglo Universal Bank */}
        <div
          className="relative rounded-2xl p-6 text-white shadow-lg"
          style={{
            width: "354px",
            height: "210px",
            background:
              "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
            borderRadius: "15px",
          }}
        >
          {/* Bank Name */}
          <div className="absolute top-4 left-4">
            <h4 className="text-xs font-medium opacity-80">
              <span className="text-base font-bold">Maglo.</span>{" "}
              <span className="text-sm">|</span> Universal Bank
            </h4>
          </div>

          {/* Chip */}
          <div className="absolute top-12 left-4">
            <div className="w-8 h-6 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <Image
                src="/Chip.png"
                alt="Chip"
                width={32}
                height={24}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Wifi Icon */}
          <div className="absolute top-12 right-4">
            <Image
              src="/Wifi.png"
              alt="Contactless"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Card Number */}
          <div className="absolute bottom-16 left-4">
            <p
              className="text-base font-bold"
              style={{
                fontFamily: "Gordita",
                lineHeight: "100%",
                letterSpacing: "0.2em",
              }}
            >
              {formatCardNumber(
                data.cards[0]?.cardNumber || "5495 7381 3759 2321"
              )}
            </p>
          </div>

          {/* Mastercard Logo */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center">
              <div
                className="relative"
                style={{ width: "32px", height: "20px" }}
              >
                {/* Red Circle */}
                <div
                  className="w-5 h-5 rounded-full absolute"
                  style={{
                    backgroundColor: "#EB001B",
                    left: "0px",
                    top: "2px",
                    zIndex: 1,
                  }}
                ></div>
                {/* Yellow Circle */}
                <div
                  className="w-5 h-5 rounded-full absolute"
                  style={{
                    backgroundColor: "#F79E1B",
                    left: "6px",
                    top: "2px",
                    zIndex: 2,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - Maglo Commercial Bank */}
        <div
          className="absolute rounded-2xl p-6 text-white shadow-lg"
          style={{
            width: "324px",
            height: "172px",
            top: "150px",
            left: "15px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            border: "0.5px solid rgba(255, 255, 255, 0.2)",
            zIndex: 10,
          }}
        >
          {/* Bank Name */}
          <div className="absolute top-4 left-4">
            <h4 className="text-xs font-medium opacity-80">
              <span className="text-base font-bold">Maglo.</span>{" "}
              <span className="text-sm">|</span> Commercial Bank
            </h4>
          </div>

          {/* Chip */}
          <div className="absolute top-12 left-4">
            <div className="w-8 h-6 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <Image
                src="/Chip.png"
                alt="Chip"
                width={32}
                height={24}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Wifi Icon */}
          <div className="absolute top-12 right-4">
            <Image
              src="/Wifi.png"
              alt="Contactless"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Card Number */}
          <div className="absolute bottom-8 left-4">
            <p
              className="text-base font-bold tracking-wider text-gray-800"
              style={{ fontFamily: "Gordita" }}
            >
              {formatCardNumberHidden(
                data.cards[1]?.cardNumber || "4532 1234 5678 9012"
              )}
            </p>
          </div>

          {/* Expiry Date */}
          <div className="absolute bottom-4 left-4">
            <p
              className="text-xs font-medium"
              style={{ fontFamily: "Gordita", color: "#929EAE" }}
            >
              09/25
            </p>
          </div>

          {/* Visa Logo */}
          <div className="absolute bottom-4 right-4">
            <Image
              src="/Visa.png"
              alt="Visa"
              width={40}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Scheduled Transfers Section */}
      <div className="-mt-16">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Scheduled Transfers
          </h3>
          <button
            className="flex items-center space-x-1 text-sm font-semibold hover:text-gray-900 cursor-pointer"
            style={{ color: "#29A073", cursor: "pointer" }}
          >
            <span>View All</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-3">
          {scheduledTransfers?.data?.transfers?.map(
            (transfer: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={`/avatar-${index + 1}.png`}
                      alt={transfer.name}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback to initials if avatar not found
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget.nextElementSibling;
                        if (nextElement) {
                          (nextElement as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                    <div
                      className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600"
                      style={{ display: "none" }}
                    >
                      {transfer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {transfer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTransactionDate(transfer.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {transfer.amount > 0 ? "+" : "-"}
                    {transfer.currency === "USD" ? "$" : "₺"}
                    {Math.abs(transfer.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            )
          ) || (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No scheduled transfers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
