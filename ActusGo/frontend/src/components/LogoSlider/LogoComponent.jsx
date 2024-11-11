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
      src: "./assets/peugeot-logo.png",
      alt: "Peugeot"
    }
  ];

  // Convert logo objects to React elements
  const logoElements = logos.map((logo, index) => (
    <div className="w-24 md:w-32 flex justify-center items-center aspect-square bg-white rounded-full p-2 opacity-95" key={index}>
      <img src={logo.src} alt={logo.alt} className="w-4/5" />
    </div>
  ));

  return (
    <div className="slider !relative flex flex-col items-start">
      <h1 className="text-2xl font-bold text-white mb-6">Brands</h1>
      <LogoSlider logos={logoElements} />
    </div>
  );
}
