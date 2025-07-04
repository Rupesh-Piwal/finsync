"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Table from "../../../public/transaction-table.png";

const TransactionTableSection = () => {
  return (
    <section className="bg-black py-14 md:py-18 px-6 overflow-hidden relative">
      <div className="absolute top-1/16 left-1/12 w-52 h-52 md:w-56 md:h-56 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight text-center md:text-start">
            Recurring Transactions, Smartly Managed.
          </h2>
          <p className="text-[16px] sm:text-xl bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent mb-8 max-w-lg text-center md:text-start">
            FinsyncAI automatically detects your recurring bills, subscriptions,
            and salary credits — helping you stay on top of your finances with
            no effort.
          </p>

          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex gap-3">
              <span className="text-emerald-400 font-medium">✓</span>
              Detects recurring patterns in your transactions
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-medium">✓</span>
              Notifies you before recurring charges hit
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 font-medium">✓</span>
              Suggests subscriptions you may want to cancel
            </li>
          </ul>
        </motion.div>

        {/* Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl shadow-2xl border border-white/10 overflow-hidden"
        >
          <Image
            src={Table}
            alt="Recurring transactions UI"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TransactionTableSection;
