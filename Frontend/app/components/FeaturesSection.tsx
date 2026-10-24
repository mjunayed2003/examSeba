'use client';

import React from 'react';
import {
  Radio,
  CheckCircle2,
  Lightbulb,
  Gauge,
  Trophy,
  TrendingUp
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Radio,
      title: 'লাইভ এক্সাম',
      description:
        'রিয়েল টাইমে পরীক্ষা দিন এবং তাৎক্ষণিক ফলাফল পান। আমাদের লাইভ এক্সাম সিস্টেম আপনাকে প্রকৃত পরীক্ষার অভিজ্ঞতা দেবে।',
    },
    {
      icon: CheckCircle2,
      title: 'সঠিক উত্তর ভুল উত্তর মার্কিং',
      description:
        'স্বয়ংক্রিয় মার্কিং সিস্টেম যা তাৎক্ষণিকভাবে আপনার সঠিক ও ভুল উত্তর চিহ্নিত করে এবং নম্বর প্রদান করে।',
    },
    {
      icon: Lightbulb,
      title: 'বিস্তারিত ব্যাখ্যা',
      description:
        'প্রতিটি প্রশ্নের জন্য বিস্তারিত ব্যাখ্যা এবং সমাধান পান। আপনার ভুলগুলো থেকে শিখুন এবং উন্নতি করুন।',
    },
    {
      icon: Gauge,
      title: 'লাইভ স্কোরবোর্ড',
      description:
        'পরীক্ষার সময় রিয়েল টাইমে আপনার স্কোর এবং অগ্রগতি দেখুন। লাইভ আপডেট পেতে থাকুন।',
    },
    {
      icon: Trophy,
      title: 'লিডারবোর্ড',
      description:
        'অন্য পরীক্ষার্থীদের সাথে আপনার অবস্থান তুলনা করুন। র‍্যাঙ্কিং সিস্টেমে আপনার অবস্থান জানুন।',
    },
    {
      icon: TrendingUp,
      title: 'অগ্রগতি ট্র্যাকিং',
      description:
        'আপনার পারফরম্যান্স ট্র্যাক করুন এবং উন্নতির ক্ষেত্রগুলো চিহ্নিত করুন। বিস্তারিত রিপোর্ট ও বিশ্লেষণ পান।',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="bijoy-section-title">আমাদের বৈশিষ্ট্যসমূহ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bijoy-feature-card group hover:border-[#007bff]/40 transition-all duration-300"
              >
                <div className="bijoy-feature-icon shadow-md group-hover:scale-105 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#007bff] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
