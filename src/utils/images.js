export const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

// Map of product IDs to image keys/paths for fallback resolution without circular imports
const productIdMap = {
  1: "/images/bats/kookaburra-kahuna.jpg",
  2: "/images/balls/kookaburra-turf.jpg",
  3: "/images/protective/keeper-gloves.jpg",
  4: "/images/footwear/kookaburra-spikes.jpg",
  5: "/images/accessories/kookaburra-bag.jpg",
  6: "/images/bats/gn-pro-bat.jpg",
  7: "/images/balls/gn-training.jpg",
  8: "/images/protective/gn-helmet.jpg",
  9: "/images/footwear/gn-prestige-shoes.jpg",
  10: "/images/accessories/gn-bat-grip.jpg",
  11: "/images/bats/ss-ton.jpg",
  12: "/images/balls/ss-practice-ball.jpg",
  13: "/images/protective/ss-arm-guard.jpg",
  14: "/images/footwear/ss-cricket-shoes.jpg",
  15: "/images/accessories/ss-sunglasses.jpg",
  16: "/images/bats/sg-test.png",
  17: "/images/balls/sg-test.jpg",
  18: "/images/protective/sg-leg-guards.jpg",
  19: "/images/footwear/sg-spikes.jpg",
  20: "/images/accessories/sg-scorebook.jpg",
  21: "/images/bats/nb-1080.jpg",
  22: "/images/balls/nb-training-ball.jpg",
  23: "/images/protective/nb-pads.jpg",
  24: "/images/footwear/nb-ck10.jpg",
  25: "/images/accessories/nb-bag.jpg",
};

export const images = {
  // BATS
  "kookaburra-kahuna": "/images/bats/kookaburra-kahuna.jpg",
  "gn-pro-bat": "/images/bats/gn-pro-bat.jpg",
  "ss-ton": "/images/bats/ss-ton.jpg",
  "sg-test": "/images/bats/sg-test.png",
  "nb-1080": "/images/bats/nb-1080.jpg",

  // BALLS
  "kookaburra-turf": "/images/balls/kookaburra-turf.jpg",
  "gn-training": "/images/balls/gn-training.jpg",
  "ss-practice-ball": "/images/balls/ss-practice-ball.jpg",
  "sg-test-ball": "/images/balls/sg-test.jpg",
  "nb-training-ball": "/images/balls/nb-training-ball.jpg",

  // PROTECTIVE GEAR
  "keeper-gloves": "/images/protective/keeper-gloves.jpg",
  "gn-helmet": "/images/protective/gn-helmet.jpg",
  "ss-arm-guard": "/images/protective/ss-arm-guard.jpg",
  "sg-leg-guards": "/images/protective/sg-leg-guards.jpg",
  "nb-pads": "/images/protective/nb-pads.jpg",

  // FOOTWEAR
  "kookaburra-spikes": "/images/footwear/kookaburra-spikes.jpg",
  "gn-prestige-shoes": "/images/footwear/gn-prestige-shoes.jpg",
  "ss-cricket-shoes": "/images/footwear/ss-cricket-shoes.jpg",
  "sg-spikes": "/images/footwear/sg-spikes.jpg",
  "nb-ck10": "/images/footwear/nb-ck10.jpg",

  // ACCESSORIES
  "kookaburra-bag": "/images/accessories/kookaburra-bag.jpg",
  "gn-bat-grip": "/images/accessories/gn-bat-grip.jpg",
  "ss-sunglasses": "/images/accessories/ss-sunglasses.jpg",
  "sg-scorebook": "/images/accessories/sg-scorebook.jpg",
  "nb-bag": "/images/accessories/nb-bag.jpg",

  // JOURNALS
  "donald-steve": "/images/journals/Donald_Steve.jpg",
  "individual-and-team-performance":
    "/images/journals/individual_and_team_performance.jpg",
  "modelling-career-trajectorie":
    "/images/journals/modelling_career_trajectorie.jpg",
  "physical-profiling": "/images/journals/physical_profiling.jpg",

  // PLACEHOLDER
  placeholder: PLACEHOLDER_IMAGE,
};

export const getImage = (keyOrPath) => {
  if (!keyOrPath || typeof keyOrPath !== "string") {
    return PLACEHOLDER_IMAGE;
  }

  if (images[keyOrPath]) {
    return images[keyOrPath];
  }
  if (keyOrPath.startsWith("/images/") || keyOrPath.startsWith("http")) {
    return keyOrPath;
  }

  return PLACEHOLDER_IMAGE;
};

export const getItemImage = (itemOrPath) => {
  if (!itemOrPath) return PLACEHOLDER_IMAGE;

  // Case 1: Passed a string (key or URL)
  if (typeof itemOrPath === "string") {
    return getImage(itemOrPath);
  }

  // Case 2: Passed an item object with an image property
  if (itemOrPath.image && typeof itemOrPath.image === "string") {
    const resolved = getImage(itemOrPath.image);
    if (resolved !== PLACEHOLDER_IMAGE) {
      return resolved;
    }
  }

  // Case 3: Fallback by item ID from productIdMap (great for legacy orders in localStorage!)
  if (itemOrPath.id && productIdMap[itemOrPath.id]) {
    return productIdMap[itemOrPath.id];
  }

  return PLACEHOLDER_IMAGE;
};

export const getImageSrc = getItemImage;

export const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = PLACEHOLDER_IMAGE;
};
