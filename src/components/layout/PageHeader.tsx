"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  className?: string;
}

export function PageHeader({ title, className = "" }: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <Image
              src="/Ring.png"
              alt="Notifications"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/TopProfile.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900">
                Mahfuzul Nabil
              </span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Image
                  src="/Dropdown.png"
                  alt="Dropdown"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
