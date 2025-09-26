import React from 'react';
import { Calendar, Truck, Building2, Star } from 'lucide-react';

const StatsGrid = () => {
  return (
    <section
      className="relative overflow-hidden py-36"
    >
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
        style={{ height: '64px', backgroundColor: '#38B6FF', zIndex: 10 }}
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex justify-center px-6">
        <div className="grid w-full max-w-[1280px] grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-32 md:gap-y-32 md:items-stretch">
          <div className="flex justify-center md:justify-end">
            <div
              className="group flex w-[420px] md:w-[540px] items-center justify-between rounded-[32px] px-10 py-10 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: '#E5E7EB' }}
            >
              <div className="text-[64px] md:text-[72px] font-extrabold leading-none text-[#132D51] transition-colors duration-300 group-hover:text-blue-500">+35</div>
              <div className="flex items-center gap-4 text-[#132D51] transition-colors duration-300 group-hover:text-blue-500">
                <div className="text-[16px] font-medium leading-tight text-[#132D51]">
                  ANOS NO
                  <br />
                  MERCADO
                </div>
                <Calendar className="h-10 w-10 text-[#132D51] transition-colors duration-300 group-hover:text-blue-500" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div
              className="group flex w-[340px] md:w-[400px] flex-col rounded-[32px] px-10 py-10 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: '#132D51' }}
            >
              <div className="text-[56px] md:text-[64px] font-extrabold leading-none text-white transition-colors duration-300 group-hover:text-sky-400">+1.4M</div>
              <div className="mt-4 text-[16px] font-medium leading-tight text-white transition-colors duration-300 group-hover:text-sky-400">
                VEÍCULOS
                <br />
                TRANSPORTADOS
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div
              className="group flex w-[340px] md:w-[400px] flex-col rounded-[32px] px-10 py-10 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: '#132D51' }}
            >
              <div className="text-[56px] md:text-[64px] font-extrabold leading-none text-white transition-colors duration-300 group-hover:text-sky-400">14</div>
              <div className="mt-4 text-[16px] font-medium leading-tight text-white transition-colors duration-300 group-hover:text-sky-400">
                UNIDADES
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div
              className="group flex w-[420px] md:w-[540px] items-center justify-between gap-6 rounded-[32px] px-10 py-10 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: '#E5E7EB' }}
            >
              <div className="flex items-center gap-5">
                <Star className="h-14 w-14 text-[#132D51] transition-colors duration-300 group-hover:text-blue-500" strokeWidth={2.5} />
                <div className="text-[64px] md:text-[72px] font-extrabold leading-none text-[#132D51] transition-colors duration-300 group-hover:text-blue-500">99%</div>
              </div>
              <div className="text-[16px] font-medium leading-tight text-[#132D51] transition-colors duration-300 group-hover:text-blue-500">
                SATISFAÇÃO
                <br />
                CLIENTES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;