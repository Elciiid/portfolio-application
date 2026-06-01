"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col md:flex-row items-baseline justify-between py-6 border-b border-black/[0.08] transition-colors hover:bg-black/[0.02] cursor-pointer px-4 -mx-4"
      >
        <div className="flex flex-col md:flex-row md:items-baseline md:gap-12 w-full pr-12">
          <h3 className="text-base font-semibold text-black tracking-tight md:w-1/4 shrink-0 mb-2 md:mb-0">
            {project.title}
          </h3>
          
          <p className="text-[14px] text-text-muted leading-relaxed max-w-xl group-hover:text-black transition-colors duration-300">
            {project.description}
          </p>

          <div className="hidden lg:flex items-center gap-2 ml-auto shrink-0 justify-end w-1/4">
            {project.tech.slice(0, 3).map((t) => (
              <span 
                key={t} 
                className="text-[10px] font-bold tracking-widest uppercase text-text-subtle group-hover:text-text-muted transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-4 text-text-subtle group-hover:text-black group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
          <ArrowUpRight size={18} strokeWidth={2} />
        </div>
      </motion.div>
    </Link>
  );
}
