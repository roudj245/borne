import { useState } from "react";
import Steck from "./assets/steck.png";


interface RestaurantElement {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface SelectedItem {
  id: string;
  qty: number;
}

interface Step {
  number: number;
  title: string;
  subtitle: string;
  category: string;
}

const steps: Step[] = [
  { number: 1, title: "Viande", subtitle: "Choisis ta", category: "viande" },
  { number: 2, title: "EXTRAS", subtitle: "Choisis tes", category: "extras" },
  { number: 3, title: "Sauces", subtitle: "Choisis tes", category: "sauces" },
  { number: 4, title: "Frites", subtitle: "Choisis tes", category: "frites" },
  { number: 5, title: "Boissons", subtitle: "Choisis tes", category: "boissons" },
];

const restaurantElements: Record<string, RestaurantElement> = {
  pouletHache: {
    id: "1",
    name: "Poulet Haché",
    image: Steck,
    price: 2,
    category: "viande",
  },
  boeuf: {
    id: "2",
    name: "Boeuf",
    image: Steck,
    price: 3,
    category: "viande",
  },
  fromage: {
    id: "3",
    name: "Fromage",
    image: Steck,
    price: 1.5,
    category: "extras",
  },
  salade: {
    id: "4",
    name: "Salade",
    image: Steck,
    price: 1,
    category: "extras",
  },
  tomate: {
    id: "5",
    name: "Tomate",
    image: Steck,
    price: 1,
    category: "sauces",
  },
  oignon: {
    id: "6",
    name: "Oignon",
    image: Steck,
    price: 0.5,
    category: "sauces",
  },
  cornichon: {
    id: "7",
    name: "Cornichon",
    image: Steck,
    price: 0.5,
    category: "frites",
  },
  cheddar: {
    id: "8",
    name: "Cheddar",
    image: Steck,
    price: 1.5,
    category: "frites",
  },
  bacon: {
    id: "9",
    name: "Bacon",
    image: Steck,
    price: 2,
    category: "boissons",
  },
};

interface ElementCardProps {
  element: RestaurantElement;
  onSelect: () => void;
}

function ElementCard({ element, onSelect }: ElementCardProps) {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col items-center justify-center p-2 cursor-pointer rounded-lg border-2 hover:border-gray-300 transition"
    >
      <img
        src={element.image}
        className="h-[110px] w-[110px] object-cover"
        alt={element.name}
      />
      <p className="font-baloo text-lg font-bold mt-2">{element.name}</p>
      <p className="font-bold text-[#FF7D0C] mt-1">+{element.price} €</p>
    </div>
  );
}

export default function Elements() {
  const [selectedElements, setSelectedElements] = useState<SelectedItem[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Modal state
  const [selectedDetail, setSelectedDetail] = useState<RestaurantElement | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const currentCategory = steps[currentStep].category;
  const filteredElements = Object.values(restaurantElements).filter(
    (el) => el.category === currentCategory
  );

  // Add element with quantity
  const confirmSelection = () => {
    if (!selectedDetail) return;

    setSelectedElements((prev) => {
      const exists = prev.find((p) => p.id === selectedDetail.id);
      if (exists) {
        return prev.map((p) =>
          p.id === selectedDetail.id ? { ...p, qty: p.qty + quantity } : p
        );
      }
      return [...prev, { id: selectedDetail.id, qty: quantity }];
    });

    setSelectedDetail(null);
  };

  const totalPrice = selectedElements.reduce((sum, item) => {
    const element = restaurantElements[
      Object.keys(restaurantElements).find(
        (key) => restaurantElements[key].id === item.id
      )!
    ];
    return sum + element.price * item.qty;
  }, 0);

  // Navigation buttons
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* ----------- STEPPER ----------- */}
      <div className="bg-white border-b-4 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between relative">
            <div
              className="absolute top-5 left-0 right-0 h-1 bg-gray-300 -z-10"
              style={{
                width: "calc(100% - 120px)",
                left: "60px",
              }}
            />

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  onClick={() => setCurrentStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer transition
                    ${
                      index === currentStep
                        ? "bg-[#FF7D0C] text-white scale-110"
                        : index < currentStep
                        ? "bg-[#FFE5D0] text-[#FF7D0C]"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {step.number}
                </div>
                <p
                  className={`mt-2 font-bold text-sm ${
                    index === currentStep ? "text-black" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------- TITLE ----------- */}
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold">
          <span className="text-[#FF7D0C]">
            {steps[currentStep].subtitle}
          </span>
          <br />
          <span className="text-black">{steps[currentStep].title} !</span>
        </h2>
      </div>

      {/* ----------- GRID ----------- */}
      <div className="p-4 h-4/6">
        <div className="grid grid-cols-3 gap-4 w-full mx-auto">
          {filteredElements.map((element) => (
            <ElementCard
              key={element.id}
              element={element}
              onSelect={() => {
                setSelectedDetail(element);
                setQuantity(1);
              }}
            />
          ))}
        </div>
      </div>

    {/* ----------- NAVIGATION BUTTONS ----------- */}
      <div className=" bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-4 py-3 bg-white z-40">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className={`px-6 sm:px-8 md:px-12 py-3 rounded-xl font-baloo font-bold text-base sm:text-lg md:text-xl border-2 transition
            ${
              currentStep === 0
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-[#FF7D0C] text-[#FF7D0C] hover:bg-[#FFF5ED]"
            }`}
        >
          Retour
        </button>

        <button
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
          className={`px-6 sm:px-8 md:px-12 py-3 rounded-xl font-baloo font-bold text-base sm:text-lg md:text-xl transition
            ${
              currentStep === steps.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#FF7D0C] text-white hover:bg-[#E66D00]"
            }`}
        >
          Suivant
        </button>
      </div>

      {/* ----------- SUMMARY ----------- */}
      {selectedElements.length > 0 && (
        <div className="buttom-0  p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-md w-full mx-auto border-2 border-gray-200">
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-4">
            <h3 className="font-baloo text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#FF7D0C] whitespace-nowrap">
              Résumé de la commande
            </h3>

            <div className="bg-[#FF7D0C] text-white px-5 sm:px-4 md:px-6 py-1.5 sm:py-1.5 md:py-2 rounded-full font-bold font-baloo text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              {totalPrice.toFixed(2)} €
            </div>

            <button
              onClick={() => setSelectedElements([])}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 sm:px-5 md:px-7 py-1 sm:py-1.5 md:py-2 rounded-full font-baloo font-bold transition text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Annuler ✕
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {selectedElements.map((item) => {
              const element = Object.values(restaurantElements).find(
                (el) => el.id === item.id
              );
              return (
                element && (
                  <div
                    key={item.id}
                    className="flex flex-col items-center min-w-[120px] bg-gray-50 p-3 rounded-lg relative"
                  >
                    <button
                      onClick={() => setSelectedElements(prev => prev.filter(el => el.id !== item.id))}
                      className="absolute top-1 right-1 bg-[#FF7D0C] hover:bg-[#E66D00] text-white w-7 h-7 rounded-full text-base font-bold transition flex items-center justify-center shadow-md"
                    >
                      ✕
                    </button>
                    <img
                      src={element.image}
                      className="h-[80px] w-[80px] object-cover rounded-lg mb-2"
                      alt={element.name}
                    />
                    <p className="font-bold text-base text-center">
                      {element.name}
                    </p>
                    <p className="text-gray-600 font-semibold text-sm">x {item.qty}</p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      )}

      {/* ----------- MODAL ----------- */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[320px] flex flex-col items-center">
            <img
              src={selectedDetail.image}
              alt={selectedDetail.name}
              className="w-[180px] h-[180px] object-contain"
            />

            <h2 className="font-baloo text-2xl font-bold mt-4">
              {selectedDetail.name}
            </h2>

            <p className="text-gray-600 text-lg">Quantité désirée</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 my-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-lg text-2xl"
              >
                –
              </button>

              <span className="text-2xl font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-lg text-2xl"
              >
                +
              </button>
            </div>

            {/* Confirm Button */}
            <button
              onClick={confirmSelection}
              className="bg-[#FF7D0C] text-white w-full py-3 rounded-xl font-baloo text-xl mt-4"
            >
              Confirmer
            </button>

            <button
              onClick={() => setSelectedDetail(null)}
              className="mt-3 text-gray-500"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}