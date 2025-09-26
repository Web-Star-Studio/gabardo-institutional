'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FleetSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-12 text-center"
        >
          Nossa frota de caminhões possui em média 3 anos. Por que isso é relevante?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="p-6">
            <h3 className="text-2xl font-bold text-gabardo-blue mb-4">VANTAGENS SOCIAIS</h3>
            <ul className="text-gray-600 font-light space-y-2">
              <li>Melhorar a condição de empregabilidade para o caminhoneiro autônomo;</li>
              <li>Maior segurança e redução de acidentes;</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="p-6">
            <h3 className="text-2xl font-bold text-gabardo-blue mb-4">VANTAGENS AMBIENTAIS</h3>
            <ul className="text-gray-600 font-light space-y-2">
              <li>Redução das emissões de poluentes;</li>
              <li>Redução do consumo de combustível.</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="p-6">
            <h3 className="text-2xl font-bold text-gabardo-blue mb-4">VANTAGENS ECONÔMICAS</h3>
            <ul className="text-gray-600 font-light space-y-2">
              <li>Redução de custos operacionais (combustíveis e manutenção);</li>
              <li>Aumento de produtividade/qualidade dos serviços de transporte;</li>
              <li>Contribuição para o desenvolvimento do país com arrecadações de impostos.</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image src="/images/Trans Gabardo - Framers produtora -5818.JPG" alt="Vantagens Sociais" fill className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image src="/images/gabardo-truck-fleet.JPG" alt="Vantagens Ambientais" fill className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image src="/images/Trans Gabardo - Framers produtora -5475.JPG" alt="Vantagens Econômicas" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
