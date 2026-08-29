import React from 'react';
import { TbTerminal2, TbCode } from 'react-icons/tb';
import { FiShare2, FiMessageSquare } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f0f3ff] text-slate-600 px-8 py-12 text-sm font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-[#4f46e5] font-bold text-xl">
              <div className="bg-[#4f46e5] text-white p-1 rounded">
                <TbTerminal2 className="w-5 h-5" />
              </div>
              <span className="text-[#3b35a6]">DevHub</span>
            </div>
            
            <p className="text-slate-600 max-w-sm leading-relaxed">
              The professional network for developers. Build your portfolio, find answers, and connect with peers worldwide.
            </p>

            <div className="flex items-center gap-4 text-slate-600 pt-2">
              <button aria-label="Code" className="hover:text-slate-900 transition-colors">
                <TbCode className="w-5 h-5" />
              </button>
              <button aria-label="Share" className="hover:text-slate-900 transition-colors">
                <FiShare2 className="w-4 h-4" />
              </button>
              <button aria-label="Community" className="hover:text-slate-900 transition-colors">
                <FiMessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-xs tracking-wider text-slate-800 uppercase mb-4 font-mono">
                Product
              </h3>
              <ul className="space-y-3">
                {['Features', 'Integrations', 'Pricing', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-xs tracking-wider text-slate-800 uppercase mb-4 font-mono">
                Resources
              </h3>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Community Forum', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-xs tracking-wider text-slate-800 uppercase mb-4 font-mono">
                Company
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Legal', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-600">
            © 2024 DevHub Inc. All rights reserved.
          </p>

          <div className="bg-[#e4e9fc] text-slate-700 px-3 py-1 rounded font-mono text-[11px]">
            System Status: All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;