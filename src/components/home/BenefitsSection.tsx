"use client";
import { BiSolidHomeCircle } from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: FaTruckFast,
    title: "پرداخت درب منزل",
    description: "پرداخت امن و مطمئن در محل تحویل کالا",
  },
  {
    icon: FaPaypal,
    title: "پرداخت قسطی",
    description: "امکان پرداخت اقساطی با شرایط ویژه",
  },
  {
    icon: BiSolidHomeCircle,
    title: "ارسال سریع",
    description: "ارسال سریع به سراسر کشور",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary-150 absolute -top-40 -left-40 h-80 w-80 rounded-full opacity-50 blur-3xl" />
        <div className="bg-primary-150 absolute -right-40 -bottom-40 h-80 w-80 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <div className="bg-primary-150 text-primary-600 inline-block rounded-full px-4 py-1.5 text-sm font-medium">مزایای خرید از ما</div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">با بیش از ده سال سابقه فروش لوازم ورزشی و لباس‌های ورزشی</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="from-primary to-primary-600 group-hover:shadow-primary-300 mb-6 inline-flex rounded-2xl bg-gradient-to-br p-4 text-white shadow-lg transition-all duration-300"
                >
                  <benefit.icon size={32} />
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>

              <div className="from-primary-50 absolute inset-0 bg-gradient-to-br to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="from-primary to-primary-400 absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
