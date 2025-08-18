"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Polex Hotel",
    description:
      "Modern and responsive hotel booking website built with HTML, CSS and JavaScript.",
    image: "/polexhotel.png",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://polexhotel.vercel.app/",
  },
  {
    title: "Cyber Security Tool",
    description:
      "Track and improve your website and Organization from cyberattack.",
    image: "/securitycyber.png",
    tech: ["React", "Node.js", "MySQL"],
    live: "https://cyber-secure-ivory.vercel.app/",
  },
  {
    title: "Mobile Health Tracker",
    description: "A mobile-first app for tracking fitness and health data.",
    image: "/pieets.png",
    tech: ["Next.js", "Phython"],
    live: "https://psl-jobboard-frontend.vercel.app/  ",
  },
];

export default function PortfolioSection() {
  return (
    <section
      className="bg-gradient-to-b from-white to-blue-50 py-20 px-6"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-blue-600">Portfolio</span> <br /> Some of Our
          Work
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
