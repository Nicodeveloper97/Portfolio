import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { Mail, Linkedin, Phone, Github, ExternalLink, Sun, Moon } from 'lucide-react'
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card"
import wallockImage from '../assets/wallock.png'
import parkingImage from '../assets/Parksmart.png'
import nubaImage from '../assets/nuba.png'

const projects = [
  {
    name: "Gestión de estacionamiento",
    image: parkingImage,
    href: "https://estacionamientopriv.netlify.app/",
    description: "Aplicación web en React para gestionar el acceso y disponibilidad de un estacionamiento privado.",
    technologies: ["ReactJS", "Tailwind CSS", "NodeJS", "JavaScript"],
  },
  {
    name: "Nuba",
    image: nubaImage,
    href: "https://nuba.com/",
    description: "Página web para planificación y organización de viajes personalizados de lujo.",
    technologies: ["HTML", "CSS", "JavaScript", "ReactJS"],
  },
  {
    name: "Wallock",
    image: wallockImage,
    href: "https://wallock.netlify.app/",
    description: "Aplicación web de administración de contraseñas para almacenar y organizar credenciales de manera segura.",
    technologies: ["ReactJS", "Tailwind CSS", "Firebase"],
  },
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUpVariants}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

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
    <div className={isDarkMode ? "bg-black text-green-200" : "bg-white text-gray-800"}>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 ${
          isDarkMode
            ? "bg-gradient-to-r from-green-400 to-blue-500"
            : "bg-gray-200"
        } origin-[0%] z-50`}
        style={{ scaleX }}
      />
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 z-50 transition-all duration-300 ${
          isDarkMode
            ? "bg-green-400 text-black focus:ring-green-400 hover:bg-green-300"
            : "bg-gray-100 text-gray-800 focus:ring-gray-300 hover:bg-gray-200"
        }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <Hero isDarkMode={isDarkMode} />
      <AboutMe isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <ProjectsSection isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
    </div>
  );
}

function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      <div className="relative z-10">
        <motion.h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 ${
            isDarkMode
              ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
              : "text-gray-900"
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hola, soy Nico
        </motion.h1>
        <motion.h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${isDarkMode ? 'text-white' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Frontend Developer
        </motion.h2>
      </div>
      <div className="absolute inset-0 z-0">
        {isDarkMode ? (
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={150} depth={100} count={5000} factor={5} saturation={0} fade speed={2} />
          </Canvas>
        ) : null}
      </div>
    </section>
  )
}

function AboutMe({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <AnimatedSection className={`py-16 flex flex-col justify-center items-center p-8 sm:p-16 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-12 ${
        isDarkMode
          ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          : "text-gray-800"
      }`}>
        Sobre Mí
      </h2>
      <p className={`text-xl sm:text-2xl md:text-3xl max-w-3xl text-center leading-relaxed mb-12 ${
        isDarkMode ? 'text-white' : 'text-gray-600'
      }`}>
        Soy un desarrollador frontend apasionado por crear experiencias web innovadoras y atractivas. Mi enfoque se centra en la intersección entre diseño y tecnología, buscando siempre nuevas formas de mejorar la interacción del usuario con la web.
      </p>
      <motion.a
        href="https://github.com/Nicodeveloper97"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full shadow-lg transform transition-all duration-300 group-hover:shadow-2xl ${
          isDarkMode
            ? "bg-gradient-to-r from-green-400 to-blue-500"
            : "bg-gray-200"
        }`}>
          <Github className={`w-8 h-8 sm:w-10 sm:h-10 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
        </div>
      </motion.a>
    </AnimatedSection>
  );
}

function Experience({ isDarkMode }: { isDarkMode: boolean }) {
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
    <AnimatedSection className={`py-16 flex flex-col justify-center items-center p-8 sm:p-16 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-16 ${
        isDarkMode
          ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          : "text-gray-800"
      }`}>
        Experiencia
      </h2>
      <div className="space-y-12 max-w-4xl w-full">
        {isDarkMode ? (
          <motion.div
            className="bg-gradient-to-r from-green-900 to-blue-900 p-8 rounded-xl shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Freelancer en plataformas</h3>
            <p className="text-base sm:text-lg text-green-200 mb-8">
              Ofrezco servicios especializados en desarrollo frontend, enfocándome en crear soluciones web de alta calidad y rendimiento. Mi experiencia abarca una amplia gama de tecnologías y metodologías modernas.
            </p>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-green-400 mr-2">•</span>
                  <span className="text-white">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Freelancer en plataformas</CardTitle>
              <CardDescription className="text-gray-600">
                Servicios especializados en desarrollo frontend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Me enfoco en crear soluciones web de alta calidad y rendimiento, abarcando una amplia gama de tecnologías y metodologías modernas.
              </p>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {service}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </AnimatedSection>
  )
}

function ProjectsSection({ isDarkMode }: { isDarkMode: boolean }) {
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
    <AnimatedSection className={`py-16 flex flex-col items-center justify-center p-8 sm:p-16 overflow-hidden ${
      isDarkMode ? "bg-black" : "bg-gray-50"
    }`}>
      <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center ${
        isDarkMode
          ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          : "text-gray-800"
      }`}>
        Proyectos Destacados
      </h2>

      {isDarkMode ? (
        <div className="relative w-full max-w-5xl">
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
              <div className="w-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-64 md:h-full relative">
                  <img
                    src={projects[activeIndex].image}
                    alt={projects[activeIndex].name}
className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-green-400">
                      {projects[activeIndex].name}
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg">
                      {projects[activeIndex].description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3 text-blue-400">
                        Tecnologías:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[activeIndex].technologies.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-700 text-green-300 rounded-full text-sm font-medium"
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
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 text-lg font-semibold"
                  >
                    <span>Ver Proyecto</span>
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>       
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Ver Proyecto
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {isDarkMode && (
        <div className="flex justify-center mt-8 space-x-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-4 h-4 rounded-full ${
                index === activeIndex
                  ? "bg-green-400"
                  : "bg-gray-600"
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      )}
    </AnimatedSection>
  );
}

function Contact({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <AnimatedSection className={`py-16 flex flex-col justify-center items-center px-8 sm:px-16 py-16 sm:py-24 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      <h2 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 ${
        isDarkMode
          ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          : "text-gray-800"
      }`}>
        ¿Listo para empezar?
      </h2>
      <p className={`text-lg sm:text-xl md:text-2xl ${
        isDarkMode ? 'text-green-300' : 'text-gray-600'
      } text-center max-w-3xl mb-12 sm:mb-16`}>
        Si quieres llevar tu proyecto al siguiente nivel, no dudes en{" "}
        <span className={`${isDarkMode ? 'text-green-400' : 'text-gray-800'} font-semibold`}>contactarme</span>. Estoy aquí para ayudarte a hacer tus ideas realidad.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 w-full max-w-5xl">
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
    </AnimatedSection>
  );
}

function ContactCard({ href, icon: Icon, label, description, isDarkMode }: { href: string; icon: React.ComponentType<any>; label: string; description: string; isDarkMode: boolean }) {
  if (isDarkMode) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center p-6 sm:p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(74, 222, 128, 0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 sm:p-5 rounded-full mb-4 sm:mb-6">
          <Icon size={36} className="text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2 sm:mb-3">{label}</h3>
        <p className="text-sm sm:text-base text-gray-300 text-center">{description}</p>
      </motion.a>
    );
  } else {
    return (
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <div className="bg-gray-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Icon size={24} className="text-gray-600" />
          </div>
          <CardTitle className="text-gray-800">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              Contactar
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

