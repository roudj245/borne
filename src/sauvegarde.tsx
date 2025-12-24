import { useState } from 'react';
import Steck from './assets/steck.png'

// Définir le type pour un élément
interface RestaurantElement {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

// Définir le type pour une étape
interface Step {
  number: number;
  title: string;
  subtitle: string;
  category: string;
}

// Créer les étapes
const steps: Step[] = [
  {
    number: 1,
    title: 'Viande',
    subtitle: 'Choisis ta',
    category: 'tacos'
  },
  {
    number: 2,
    title: 'EXTRAS',
    subtitle: 'Choisis tes',
    category: 'tacos'
  },
  {
    number: 3,
    title: 'Sauces',
    subtitle: 'Choisis tes',
    category: 'tacos'
  },
  {
    number: 4,
    title: 'Frites',
    subtitle: 'Choisis tes',
    category: 'tacos'
  },
  {
    number: 5,
    title: 'Boissons',
    subtitle: 'Choisis tes',
    category: 'tacos'
  },
];


const restaurantElements: Record<string, RestaurantElement> = {
  pouletHache: {
    id: '1',
    name: 'Poulet Haché',
    image: Steck,
    price: 2,
    category: 'tacos'
  },
  boeuf: {
    id: '2',
    name: 'Boeuf',
    image: Steck,
    price: 3,
    category: 'tacos'
  },
  fromage: {
    id: '3',
    name: 'Fromage',
    image: Steck,
    price: 1.5,
    category: 'tacos'
  },
  salade: {
    id: '4',
    name: 'Salade',
    image: Steck,
    price: 1,
    category: 'tacos'
  },
  tomate: {
    id: '5',
    name: 'Tomate',
    image: Steck,
    price: 1,
    category: 'tacos'
  },
  oignon: {
    id: '6',
    name: 'Oignon',
    image: Steck,
    price: 0.5,
    category: 'tacos'
  },
  cornichon: {
    id: '7',
    name: 'Cornichon',
    image: Steck,
    price: 0.5,
    category: 'tacos'
  },
  cheddar: {
    id: '8',
    name: 'Cheddar',
    image: Steck,
    price: 1.5,
    category: 'tacos'
  },
  bacon: {
    id: '9',
    name: 'Bacon',
    image: Steck,
    price: 2,
    category: 'tacos'
  },
};


interface ElementCardProps {
  element: RestaurantElement;
  isSelected: boolean;
  onToggle: () => void;
}

function ElementCard({ element, isSelected, onToggle }: ElementCardProps) {
  return (
    <div 
      onClick={onToggle}
      className={`flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 rounded-lg
        ${isSelected 
          ? 'border-4 border-[#FF7D0C] bg-blue-50 shadow-lg scale-105' 
          : 'border-2 border-transparent hover:border-gray-300'
        }`}
    >
      <img 
        src={element.image} 
        className="h-[110px] w-[110.99px] object-cover" 
        alt={element.name} 
      />
      <p className="font-baloo text-lg font-bold mt-2">{element.name}</p>
      <p className="font-bold text-[#FF7D0C] mt-1">+{element.price} €</p>
    </div>
  );
}


export default function Elements() {
  const [selectedElements, setSelectedElements] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const toggleElement = (elementId: string) => {
    setSelectedElements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(elementId)) {
        newSet.delete(elementId);
      } else {
        newSet.add(elementId);
      }
      return newSet;
    });
  };

  // Calculer le total
  const totalPrice = Array.from(selectedElements).reduce((sum, id) => {
    const element = Object.values(restaurantElements).find(el => el.id === id);
    return sum + (element?.price || 0);
  }, 0);

  // Filtrer les éléments par catégorie actuelle
  const currentCategory = steps[currentStep].category;
  const filteredElements = Object.values(restaurantElements).filter(
    el => el.category === currentCategory
  );

  return (
    <div className="w-full">
      {/* Barre de progression des étapes */}
      <div className="bg-white border-b-4 border-[#ffffff] py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between relative">
            {/* Ligne de connexion */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 -z-10" 
                style={{ 
                  width: 'calc(100% - 120px)', 
                  left: '60px' 
                }} 
            />
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  onClick={() => setCurrentStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer transition-all
                    ${index === currentStep 
                      ? 'bg-[#FF7D0C] text-white scale-110' 
                      : index < currentStep 
                        ? 'bg-[#FFE5D0] text-[#FF7D0C]'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  {step.number}
                </div>
                <p className={`mt-2 font-bold text-sm
                  ${index === currentStep ? 'text-black' : 'text-gray-400'}
                `}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Titre dynamique */}
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold">
          <span className="text-[#FF7D0C]">{steps[currentStep].subtitle}</span>
          <br />
          <span className="text-black">{steps[currentStep].title} !</span>
        </h2>
      </div>

      {/* Grille des éléments */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {filteredElements.map((element) => (
            <ElementCard 
              key={element.id} 
              element={element}
              isSelected={selectedElements.has(element.id)}
              onToggle={() => toggleElement(element.id)}
            />
          ))}
        </div>
      </div>
      
      {selectedElements.size > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-4xl mx-auto border-2 border-gray-200">
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <h3 className="font-baloo text-xl md:text-2xl font-bold text-[#FF7D0C] text-center md:text-left">
              Résumé de la commande
            </h3>
            <div className="bg-[#FF7D0C] text-white px-4 py-2 rounded-full font-bold text-lg md:text-xl">
              {totalPrice.toFixed(2)} €
            </div>
            <button 
              onClick={() => setSelectedElements(new Set())}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 md:px-4 md:py-2 rounded-full font-bold flex items-center gap-2 transition-colors text-sm md:text-base"
            >
              <span className="hidden sm:inline">Annuler ma commande</span>
              <span className="sm:hidden">Annuler</span>
              <span>✕</span>
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from(selectedElements).map(id => {
              const element = Object.values(restaurantElements).find(el => el.id === id);
              return element ? (
                <div key={id} className="flex flex-col items-center min-w-[120px] bg-gray-50 p-3 rounded-lg">
                  <img 
                    src={element.image} 
                    className="h-[80px] w-[80px] object-cover rounded-lg mb-2" 
                    alt={element.name} 
                  />
                  <p className="font-bold text-sm text-center">{element.name}</p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

