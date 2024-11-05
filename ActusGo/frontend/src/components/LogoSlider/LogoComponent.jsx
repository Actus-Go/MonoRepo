import LogoSlider from './LogoSlider';

export default function LogoComponent() {
  // Array of logo objects
  const logos = [
    {
      src: "./assets/netflix-logo.png",
      alt: "Netflix"
    },
    {
      src: "./assets/panda-logo.png",
      alt: "Panda"
    },
    {
      src: "./assets/samsung-logo.png",
      alt: "Samsung"
    },
    {
      src: "./assets/mi-logo.png",
      alt: "MI"
    },
    {
      src: "./assets/levis-logo.png",
      alt: "Levi's"
    },
    {
      src: "./assets/peugeot-logo.jpg",
      alt: "Peugeot"
    }
  ];

  // Convert logo objects to React elements
  const logoElements = logos.map((logo, index) => (
    <div className="w-24 h-auto md:w-20" key={index}>
      <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
    </div>
  ));

  return (
    <div className="slider !relative flex flex-col items-start">
      <h1 className="text-white pl-2 text-xl md:text-3xl mb-6">Brands</h1>
      <LogoSlider logos={logoElements} />
    </div>
  );
}
