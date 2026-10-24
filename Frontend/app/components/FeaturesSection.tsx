'use client';

import React from 'react';
import {
  FaBroadcastTower,
  FaCheckCircle,
  FaLightbulb,
  FaTachometerAlt,
  FaTrophy,
  FaChartLine
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: FaBroadcastTower,
      title: t.features.card1Title,
      description: t.features.card1Desc,
    },
    {
      icon: FaCheckCircle,
      title: t.features.card2Title,
      description: t.features.card2Desc,
    },
    {
      icon: FaLightbulb,
      title: t.features.card3Title,
      description: t.features.card3Desc,
    },
    {
      icon: FaTachometerAlt,
      title: t.features.card4Title,
      description: t.features.card4Desc,
    },
    {
      icon: FaTrophy,
      title: t.features.card5Title,
      description: t.features.card5Desc,
    },
    {
      icon: FaChartLine,
      title: t.features.card6Title,
      description: t.features.card6Desc,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t.features.badge}
          </span>
          <h2 className="bijoy-section-title mt-2">{t.features.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            {t.features.subtitle}
          </p>
        </div>

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
