"use client";

import { Project } from "@/types";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectRowProps {
  project: Project;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <div className="group relative border-t border-border transition-colors hover:bg-muted/50">
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Label/Category */}
          <div className="md:col-span-3">
            <span className="text-[12px] font-medium tracking-widest uppercase text-muted-foreground">
              {project.category}
            </span>
          </div>

          {/* Title and Description */}
          <div className="md:col-span-6 space-y-2">
            <h3 className="text-[18px] font-medium leading-tight">
              {project.title}
            </h3>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech and Link */}
          <div className="md:col-span-3 flex flex-col md:items-end gap-4">
            <div className="flex flex-wrap md:justify-end gap-2">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[11px] font-medium px-2 py-1 rounded-md bg-muted border border-border">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 md:justify-end">
              <Link 
                href={`/projects/${project.id}`}
                className="resend-link inline-flex items-center gap-1 text-[13px] font-medium"
              >
                View Case Study <ArrowUpRight className="w-3 h-3" />
              </Link>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Live Site <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
