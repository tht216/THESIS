export const GOONG_API_KEY = 'zGzzh9DlBQ3uiVT6Inro2wkW5nKWTSdgGKjbufkJ';
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const OUTER_CARD_HEIGHT = 170;
export const OUTER_CARD_WIDTH = width;

export const INNER_CARD_HEIGHT = 160
export const INNER_CARD_WIDTH = width * 0.8;

export const categories = [
  {
    id: 1,
    title: 'Organic',
  },
  {
    id: 2,
    title: 'Plastic',
  },
  {
    id: 3,
    title: 'Paper',
  },
  {
    id: 4,
    title: 'Metal',
  },
  {
    id: 5,
    title: 'Glass',
  },
  {
    id: 6,
    title: 'E-Waste',
  },
  {
    id: 7,
    title: 'Hazardous',
  },
];

export const wasteItems = [
  {
    id: 1,
    name: 'Organic',
    label: 'organic',
    image: require('../assets/images/organic.png'),
    desc: 'Food scraps, yard waste, and other biodegradable materials.',
    onPress: ()=>{},
  },

  {
    id: 2,
    name: 'Plastic',
    label: 'recycle',
    image: require('../assets/images/plastic.png'),
    desc: 'This includes any discarded plastic material, such as bags, bottles, and packaging. Plastic waste is a major environmental concern because it can take hundreds of years to decompose and can harm wildlife.',
    onPress: ()=>{},
  },

  {
    id: 3,
    name: 'Paper',
    label: 'recycle',
    image: require('../assets/images/paper.png'),
    desc: 'This includes any discarded paper material, such as newspapers, magazines, and cardboard boxes. Paper waste can also be recycled and reused, which helps to conserve natural resources and reduce landfill space.',
  },

  {
    id: 4,
    name: 'Metal',
    label: 'recycle',
    image: require('../assets/images/metal.png'),
    desc: 'This includes any discarded metal object, such as aluminum cans, steel scrap, and appliances. Metal waste can be recycled and reused, which is beneficial for the environment and can save energy.',
    onPress: ()=>{},
  },

  {
    id: 5,
    name: 'Glass',
    label: 'recycle',
    image: require('../assets/images/glass.png'),
    desc: 'This includes any discarded glass material, such as bottles and jars. Glass waste can also be recycled and reused, which is beneficial for the environment and can save energy.',
    onPress: ()=>{},
  },

  {
    id: 6,
    name: 'E-waste',
    label: 'e-waste',
    image: require('../assets/images/e-waste.png'),
    desc: 'Electronic waste, such as computers, televisions, and cell phones.',
    onPress: ()=>{},
  },
  {
    id: 7,
    name: 'Hazardous',
    label: 'hazardous',
    image: require('../assets/images/harzadous.png'),
    desc: 'Products that are potentially dangerous to human health or the environment, such as batteries, cleaning agents, and pesticides.',
    onPress: ()=>{},
  },
];
