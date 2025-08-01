import React, { useState } from "react";

// Complete constellationStories object
const constellationStories = {
  "Test": "This is a test constellation story to verify the modal functionality is working correctly.",
  "Orion": "Orion was a giant and a boastful hunter in Greek mythology. He was the son of Poseidon and was known for his arrogance. In one of the most famous myths, he claimed he would kill every beast on Earth, which angered Gaia, the Earth goddess. She sent a giant scorpion to kill him. Orion fought the scorpion but was ultimately defeated by its sting. As a tribute to the battle, Zeus placed both Orion and the Scorpion in the night sky as constellations, forever chasing each other across the heavens.",
  "Cassiopeia": "In Greek mythology, Cassiopeia was the beautiful and vain queen of Aethiopia. She was so proud of her beauty that she boasted she was more beautiful than the Nereids, the sea nymphs. To punish her for this hubris, the sea god Poseidon sent a sea monster to ravage her kingdom. To appease the monster, Cassiopeia's daughter Andromeda was to be sacrificed. Cassiopeia was placed in the sky as a constellation, condemned to spin upside down on her throne for half the year as a constant reminder of her vanity.",
  "Ursa Major": "Greek mythology tells the story of Callisto, a beautiful nymph who was one of the goddess Artemis's followers. Zeus, the king of the gods, fell in love with her, which enraged his jealous wife, Hera. To punish Callisto, Hera turned her into a bear. Years later, Callisto's son, Arcas, was about to hunt and kill the bear, not knowing it was his mother. To prevent this tragedy, Zeus turned Arcas into a smaller bear and placed both mother and son in the sky as the constellations Ursa Major (the Great Bear) and Ursa Minor (the Little Bear), where they would be safe from Hera's wrath.",
  "Perseus": "Perseus was a great hero in Greek mythology, famous for slaying the Gorgon Medusa. With help from the gods, he obtained special items like a winged sandals and a reflective shield to help him complete his quest. On his way home, he saw the princess Andromeda chained to a rock, about to be sacrificed to a sea monster. He fell in love with her, turned the monster to stone with Medusa's head, and rescued her. Perseus and Andromeda later married, and both were honored with their own constellations, along with Andromeda's parents, Cassiopeia and Cepheus."
};

const Background = () => {
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  console.log('Component rendered, selectedConstellation:', selectedConstellation);

  const openModal = () => {
    console.log('Opening modal...');
    setSelectedConstellation({ name: 'Test' });
  };

  const closeModal = () => {
    console.log('Closing modal...');
    setSelectedConstellation(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-900">
      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-white text-black p-2 text-xs rounded z-50">
        <div>Selected: {selectedConstellation?.name || 'None'}</div>
      </div>

      {/* Test button */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold"
        >
          Open Modal
        </button>
      </div>

      {/* Modal with error handling */}
      {selectedConstellation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">{selectedConstellation.name}</h2>
            <p className="mb-4">
              {constellationStories[selectedConstellation.name] || "No story available for this constellation."}
            </p>

            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1"
              >
                Close Modal
              </button>
              <button
                onClick={() => {
                  console.log('Alternative close clicked');
                  setSelectedConstellation(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex-1"
              >
                Alt Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced test button with more debugging */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="bg-red-500 p-4 rounded-lg"
          onMouseEnter={() => console.log('Mouse entered button area')}
          onMouseLeave={() => console.log('Mouse left button area')}
        >
          <button
            onClick={(e) => {
              console.log('Button clicked!', e);
              console.log('Event target:', e.target);
              openModal();
            }}
            onMouseDown={() => console.log('Mouse down on button')}
            onMouseUp={() => console.log('Mouse up on button')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold"
            style={{ pointerEvents: 'auto', zIndex: 1000 }}
          >
            Open Modal
          </button>
        </div>
      </div>

    </div>
  );
};

export default Background;
