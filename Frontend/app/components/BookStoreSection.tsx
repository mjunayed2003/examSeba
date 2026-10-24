'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  CheckCircle,
  Truck,
  Check
} from 'lucide-react';
import { SAMPLE_BOOKS, Book } from '../data/examData';

export default function BookStoreSection() {
  const [orderedBooks, setOrderedBooks] = useState<Record<string, boolean>>({});
  const [selectedBookForOrder, setSelectedBookForOrder] = useState<Book | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = (book: Book) => {
    setSelectedBookForOrder(book);
    setOrderSuccess(false);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookForOrder) {
      setOrderedBooks((prev) => ({ ...prev, [selectedBookForOrder.id]: true }));
      setOrderSuccess(true);
      setTimeout(() => {
        setSelectedBookForOrder(null);
        setOrderSuccess(false);
      }, 1800);
    }
  };

  return (
    <section id="books" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            বিদ্যাবাড়ি প্রকাশনী ও বই সম্ভার
          </span>
          <h2 className="bijoy-section-title mt-2">চাকরি প্রস্তুতির সেরা বইসমূহ</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            বিসিএস ও শিক্ষক নিয়োগের পূর্ণাঙ্গ সিলেবাসভিত্তিক বুলেট ডাইজেস্ট ও প্রশ্নব্যাংক হোম ডেলিভারিতে পান।
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_BOOKS.map((book) => {
            const isOrdered = orderedBooks[book.id];
            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-slate-100 relative">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow z-10">
                      {book.edition}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mb-1.5">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-800 line-clamp-2 leading-snug mb-1 group-hover:text-[#007bff] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{book.author}</p>

                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                      <span>{book.pages} পৃষ্ঠা</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">ইন স্টক</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black text-[#007bff]">৳{book.price}</span>
                    <span className="text-xs text-slate-400 line-through">৳{book.originalPrice}</span>
                  </div>

                  <button
                    onClick={() => handleOrder(book)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      isOrdered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004085] text-white'
                    }`}
                  >
                    {isOrdered ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>অর্ডার সম্পন্ন হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>এখনই অর্ডার করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Order Modal */}
        {selectedBookForOrder && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
              
              {!orderSuccess ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      বই অর্ডার ফরম
                    </span>
                    <button
                      onClick={() => setSelectedBookForOrder(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Image
                      src={selectedBookForOrder.coverImage}
                      alt={selectedBookForOrder.title}
                      width={48}
                      height={64}
                      className="w-12 h-16 object-cover rounded-md shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                        {selectedBookForOrder.title}
                      </h4>
                      <p className="text-xs text-slate-500">{selectedBookForOrder.author}</p>
                      <span className="font-black text-sm text-[#007bff]">
                        মূল্য: ৳{selectedBookForOrder.price}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmOrder} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">আপনার নাম *</label>
                      <input
                        type="text"
                        required
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        defaultValue="আব্দুল্লাহ আল মামুন"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">মোবাইল নম্বর *</label>
                      <input
                        type="tel"
                        required
                        placeholder="০১XXXXXXXXX"
                        defaultValue="01712345678"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        সম্পূর্ণ ডেলিভারি ঠিকানা *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="বাসা নং, রোড নং, থানা, জেলা"
                        defaultValue="মিরপুর ১০, ঢাকা"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
                      />
                    </div>

                    <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-blue-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>ক্যাশ অন ডেলিভারি সুবিধা (বই হাতে পেয়ে মূল্য পরিশোধ করুন)</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBookForOrder(null)}
                        className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold rounded-xl shadow-md"
                      >
                        অর্ডার কনফার্ম করুন
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">
                    অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
                  </h4>
                  <p className="text-xs text-slate-500">
                    আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
