import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { Mail, Linkedin, Phone, Github, ExternalLink } from 'lucide-react'
import wallockImage from '../assets/wallock.png'
import parkingImage from '../assets/Parksmart.png'
import nubaImage from '../assets/nuba.png'
import { LucideProps } from 'lucide-react'

interface ContactCardProps {
  href: string;
  icon: React.ComponentType<LucideProps>;
  label: string;
  description: string;
}

const projects = [
  {
    name: "Gestión de estacionamiento",
    image: parkingImage,
    href: "https://estacionamientopriv.netlify.app/",
    description:
      "Este es el front-end del proyecto Estacionamiento Privado, una aplicación web desarrollada en React que permite a los usuarios gestionar el acceso y disponibilidad de un estacionamiento privado. El diseño es moderno y responsivo, utilizando Tailwind CSS para los estilos.",
    technologies: ["ReactJS", "Tailwind CSS", "NodeJS", "JavaScript"],
  },
  {
    name: "Nuba",
    image: nubaImage,
    href: "https://nuba.com/",
    description:
      "Nuba es una página web dedicada a la planificación y organización de viajes personalizados de lujo. Su principal objetivo es crear experiencias únicas para sus clientes, enfocándose en ofrecer itinerarios exclusivos diseñados a medida.",
    technologies: ["HTML", "CSS", "JavaScript", "ReactJS"],
  },
  {
    name: "Wallock",
    image: wallockImage,
    href: "https://wallock.netlify.app/",
    description:
      "Wallock es una aplicación de administración de contraseñas basada en la web, diseñada para almacenar y organizar credenciales de manera segura.",
    technologies: ["ReactJS", "Tailwind CSS", "Firebase"],
  },
];

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "bg-black text-green-200" : "bg-gray-100 text-gray-900"}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 origin-[0%] z-50"
        style={{ scaleX }}
      />
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 z-50"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <Hero isDarkMode={isDarkMode} />
      <AboutMe isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <ProjectsCarousel isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
    </div>
  );
}

function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hola, soy Nico
        </motion.h1>
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Frontend Developer
        </motion.h2>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
    </section>
  )
}

function AboutMe({ isDarkMode }: { isDarkMode: boolean }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Sobre Mí
      </h2>
      <motion.p 
        className={`text-lg sm:text-xl md:text-2xl max-w-2xl text-center leading-relaxed mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Soy un desarrollador frontend apasionado por crear experiencias web innovadoras y atractivas. Mi enfoque se centra en la intersección entre diseño y tecnología, buscando siempre nuevas formas de mejorar la interacción del usuario con la web.
      </motion.p>
      <motion.a
        href="https://github.com/Nicodeveloper97"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg transform transition-transform duration-300 group-hover:shadow-2xl">
          <Github className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </motion.a>
    </motion.section>
  );
}

function Experience({ isDarkMode }: { isDarkMode: boolean }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    'Desarrollo de componentes personalizados',
    'Integración eficiente de APIs',
    'Creación de interfaces responsivas',
    'Optimización de código para maximizar el rendimiento',
    'Desarrollo de aplicaciones de una sola página (SPAs) con React',
    'Migraciones a React',
    'Soluciones avanzadas para mejorar la experiencia y funcionalidad de proyectos web',
  ]

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Experiencia
      </h2>
      <div className="space-y-8 max-w-3xl">
        <ExperienceItem
          title="Freelancer en plataformas"
          description="Ofrezco servicios especializados en desarrollo frontend, enfocándome en crear soluciones web de alta calidad y rendimiento."
          isDarkMode={isDarkMode}
        />
        <ul className="list-disc pl-6 space-y-2">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className={`text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

function ExperienceItem({ title, description, isDarkMode }: { title: string; description: string; isDarkMode: boolean }) {
  return (
    <motion.div
      className={`${isDarkMode ? 'bg-gradient-to-r from-green-900 to-blue-900' : 'bg-gradient-to-r from-green-100 to-blue-100'} bg-opacity-20 p-4 sm:p-6 rounded-lg backdrop-blur-sm shadow-lg`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-green-200' : 'text-gray-600'}`}>{description}</p>
    </motion.div>
  )
}

function ProjectsCarousel({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 10000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextProject = () => {
    setDirection(1);
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden ${
        isDarkMode ? "bg-black" : "bg-gray-100"
      }`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Proyectos Destacados
      </h2>

      <div className="relative w-full max-w-4xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div
              className={`w-full ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row`}
            >
              <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative">
                <img
                  src={projects[activeIndex].image}
                  alt={projects[activeIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {projects[activeIndex].name}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } mb-4`}
                  >
                    {projects[activeIndex].description}
                  </p>
                  <div className="mb-4">
                    <h4
                      className={`text-lg font-semibold mb-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Tecnologías:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeIndex].technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 ${
                              isDarkMode
                                ? "bg-gray-700 text-green-300"
                                : "bg-gray-200 text-green-700"
                            } rounded-full text-sm`}
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <a
                  href={projects[activeIndex].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  <span>Ver Proyecto</span>
                  {/* Icono de enlace externo */}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>       
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex
                ? "bg-green-400"
                : isDarkMode
                ? "bg-gray-600"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
}

function Contact({ isDarkMode }: { isDarkMode: boolean }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-8 sm:py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        ¿Listo para empezar?
      </h2>
      <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-green-300' : 'text-gray-700'} text-center max-w-2xl mb-8 sm:mb-12`}>
        Si quieres llevar tu proyecto al siguiente nivel, no dudes en{" "}
        <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold`}>contactarme</span>. Estoy aquí para ayudarte a hacer tus ideas realidad.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
        <ContactCard
          href="mailto:nicoiglesiasdeveloper@gmail.com"
          icon={Mail}
          label="Email"
          description="Envíame un correo y discutamos tus ideas."
          isDarkMode={isDarkMode}
        />
        <ContactCard
          href="https://www.linkedin.com/in/nicolasiglesias97"
          icon={Linkedin}
          label="LinkedIn"
          description="Conecta conmigo y explora mi experiencia profesional."
          isDarkMode={isDarkMode}
        />
        <ContactCard
          href="https://wa.me/542804334435"
          icon={Phone}
          label="WhatsApp"
          description="Contáctame rápidamente a través de WhatsApp."
          isDarkMode={isDarkMode}
        />
      </div>
    </motion.section>
  );
}

function ContactCard({ href, icon: Icon, label, description, isDarkMode }: ContactCardProps & { isDarkMode: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center p-4 sm:p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-100'} rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74, 222, 128, 0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
        <Icon size={32} className="text-white" />
      </div>
      <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-1 sm:mb-2`}>{label}</h3>
      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>{description}</p>
    </motion.a>
  );
}