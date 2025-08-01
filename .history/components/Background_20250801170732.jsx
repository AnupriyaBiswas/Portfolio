import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

const constellationData = [
  {
    name: "Orion",
    stars: [
      { x: 50, y: 10 }, { x: 60, y: 20 }, { x: 55, y: 30 },
      { x: 45, y: 30 }, { x: 40, y: 20 }, { x: 50, y: 40 },
      { x: 60, y: 50 }
    ]
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 20, y: 20 }, { x: 30, y: 15 }, { x: 40, y: 25 },
      { x: 50, y: 35 }, { x: 60, y: 25 }, { x: 70, y: 20 }, { x: 80, y: 30 }
    ]
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 70, y: 60 }, { x: 75, y: 55 }, { x: 80, y: 60 },
      { x: 85, y: 55 }, { x: 90, y: 60 }
    ]
  },
  {
    name: "Perseus",
    stars: [
      { x: 30, y: 70 }, { x: 35, y: 75 }, { x: 40, y: 72 },
      { x: 45, y: 78 }, { x: 50, y: 74 }, { x: 55, y: 79 }
    ]
  }
];

const constellationStories = {
  "Orion": "Orion was a giant and a boastful hunter in Greek mythology. He was the son of Poseidon and was known for his arrogance. In one of the most famous myths, he claimed he would kill every beast on Earth, which angered Gaia, the Earth goddess. She sent a giant scorpion to kill him. Orion fought the scorpion but was ultimately defeated by its sting. As a tribute to the battle, Zeus placed both Orion and the Scorpion in the night sky as constellations, forever chasing each other across the heavens.",
  "Cassiopeia": "In Greek mythology, Cassiopeia was the beautiful and vain queen of Aethiopia. She was so proud of her beauty that she boasted she was more beautiful than the Nereids, the sea nymphs. To punish her for this hubris, the sea god Poseidon sent a sea monster to ravage her kingdom. To appease the monster, Cassiopeia's daughter Andromeda was to be sacrificed. Cassiopeia was placed in the sky as a constellation, condemned to spin upside down on her throne for half the year as a constant reminder of her vanity.",
  "Ursa Major": "Greek mythology tells the story of Callisto, a beautiful nymph who was one of the goddess Artemis's followers. Zeus, the king of the gods, fell in love with her, which enraged his jealous wife, Hera. To punish Callisto, Hera turned her into a bear. Years later, Callisto's son, Arcas, was about to hunt and kill the bear, not knowing it was his mother. To prevent this tragedy, Zeus turned Arc
