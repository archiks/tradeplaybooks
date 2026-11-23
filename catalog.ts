// Product catalog: 20 box styles sold from the catalog section.
// Prices are EUR per box at the 100-box tier, excl. VAT. Edit freely.

export type Category = 'Mailers & shipping' | 'Gift & rigid' | 'Special shapes' | 'Food & drink' | 'Retail';

export interface CatalogProduct {
  slug: string;
  name: string;
  category: Category;
  blurb: string;        // one line for the card
  description: string;  // product page paragraph
  unitPrice: number;    // EUR per box at 100 boxes, one-colour print, medium size
  sizes: { label: string; dims: string }[]; // S / M / L, internal dimensions in cm
  board: string;
  bestFor: string;
}

export const CATEGORIES: Category[] = ['Mailers & shipping', 'Gift & rigid', 'Special shapes', 'Food & drink', 'Retail'];

export const QUANTITIES = [50, 100, 250, 500, 1000];
// Price per box gets cheaper as the run gets bigger
const QTY_FACTOR: Record<number, number> = { 50: 1.2, 100: 1, 250: 0.88, 500: 0.78, 1000: 0.7 };
const SIZE_FACTOR = [0.88, 1, 1.22];

export const PRINTS = [
  { id: 'one', label: 'One-colour logo', note: 'A single solid ink', factor: 1 },
  { id: 'full', label: 'Full colour', note: 'Photos, patterns, edge to edge', factor: 1.25 },
] as const;
export type PrintId = typeof PRINTS[number]['id'];

export const unitPriceFor = (p: CatalogProduct, qty: number, sizeIndex: number, print: PrintId) => {
  const printFactor = PRINTS.find(x => x.id === print)?.factor ?? 1;
  const raw = p.unitPrice * (QTY_FACTOR[qty] ?? 1) * (SIZE_FACTOR[sizeIndex] ?? 1) * printFactor;
  return Math.round(raw * 100) / 100;
};

export const lineTotalFor = (p: CatalogProduct, qty: number, sizeIndex: number, print: PrintId) =>
  Math.round(unitPriceFor(p, qty, sizeIndex, print) * qty * 100) / 100;

export const formatEUR = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n);

export const imageFor = (slug: string) => `/assets/catalog/${slug}.jpg`;

const s = (a: string, b: string, c: string) => [
  { label: 'Small', dims: a }, { label: 'Medium', dims: b }, { label: 'Large', dims: c },
];

export const CATALOG: CatalogProduct[] = [
  { slug: 'mailer-white', name: 'White mailer box', category: 'Mailers & shipping', unitPrice: 1.9,
    blurb: 'The classic unboxing box in bright white.',
    description: 'A tuck-front corrugated mailer with a clean white surface that makes colours pop. Strong enough to post without an outer box, with room to print inside the lid.',
    sizes: s('20 × 15 × 6', '30 × 20 × 10', '40 × 30 × 12'), board: 'White E-flute corrugated, 1.5 mm', bestFor: 'Subscription boxes, apparel, cosmetics' },
  { slug: 'mailer-kraft', name: 'Kraft mailer box', category: 'Mailers & shipping', unitPrice: 1.7,
    blurb: 'Natural brown board with an earthy feel.',
    description: 'The same tuck-front mailer in uncoated kraft. One-colour prints look especially sharp on the natural brown board.',
    sizes: s('20 × 15 × 6', '30 × 20 × 10', '40 × 30 × 12'), board: 'Kraft E-flute corrugated, 1.5 mm', bestFor: 'Eco brands, coffee, handmade goods' },
  { slug: 'shipping-carton', name: 'Shipping carton', category: 'Mailers & shipping', unitPrice: 1.45,
    blurb: 'Brown boxes that still say who sent them.',
    description: 'A standard flap-top shipping carton printed with your logo. Ships flat, tapes shut in seconds, and stacks neatly on a pallet.',
    sizes: s('30 × 20 × 20', '40 × 30 × 30', '60 × 40 × 40'), board: 'Kraft B-flute corrugated, single wall', bestFor: 'E-commerce orders, wholesale, warehouses' },
  { slug: 'heavy-duty-carton', name: 'Heavy-duty carton', category: 'Mailers & shipping', unitPrice: 2.6,
    blurb: 'Double wall for heavy or fragile loads.',
    description: 'Two layers of corrugated board for loads up to 30 kg. Choose it for glass, machinery parts, or anything going on a long courier journey.',
    sizes: s('40 × 30 × 30', '60 × 40 × 40', '80 × 60 × 50'), board: 'Kraft BC-flute corrugated, double wall', bestFor: 'Heavy goods, export, fragile items' },
  { slug: 'magnetic-gift-box', name: 'Magnetic gift box', category: 'Gift & rigid', unitPrice: 5.9,
    blurb: 'Rigid board with a satisfying magnetic snap.',
    description: 'A premium rigid box with a hidden magnetic flap. Wrapped in matte paper and made for foil or embossed logos.',
    sizes: s('18 × 12 × 6', '26 × 20 × 9', '36 × 28 × 12'), board: '2 mm greyboard, wrapped paper', bestFor: 'Gift sets, PR kits, premium launches' },
  { slug: 'lid-base-box', name: 'Lid and base box', category: 'Gift & rigid', unitPrice: 4.6,
    blurb: 'Two-piece rigid box with a lift-off lid.',
    description: 'The timeless two-piece gift box. The lid slides off slowly for a proper reveal, and both parts can be printed in different colours.',
    sizes: s('12 × 12 × 6', '20 × 20 × 8', '30 × 30 × 10'), board: '1.5 mm greyboard, wrapped paper', bestFor: 'Apparel, candles, chocolates' },
  { slug: 'drawer-box', name: 'Drawer box', category: 'Gift & rigid', unitPrice: 5.2,
    blurb: 'A sliding tray inside a printed sleeve.',
    description: 'A rigid sleeve with a pull-out drawer and ribbon tab. Print the sleeve and the tray separately for a two-step unboxing.',
    sizes: s('12 × 8 × 4', '20 × 12 × 6', '28 × 18 × 8'), board: '1.5 mm greyboard, wrapped paper', bestFor: 'Jewellery, watches, tech accessories' },
  { slug: 'jewellery-box', name: 'Jewellery box', category: 'Gift & rigid', unitPrice: 3.8,
    blurb: 'Small flip-top box with a soft insert.',
    description: 'A compact hinged box with a velvet-feel insert that holds rings, earrings or a pendant. Small enough to post in a padded envelope.',
    sizes: s('5 × 5 × 4', '8 × 8 × 4', '10 × 10 × 5'), board: '1.5 mm greyboard, foam insert', bestFor: 'Rings, earrings, small keepsakes' },
  { slug: 'round-hat-box', name: 'Round hat box', category: 'Special shapes', unitPrice: 6.4,
    blurb: 'A cylinder with a lift-off lid and ribbon.',
    description: 'A round rigid box that stands out on any shelf. Add a ribbon handle and print all the way around the wall.',
    sizes: s('Ø 15 × 12', 'Ø 22 × 18', 'Ø 30 × 22'), board: '2 mm greyboard, wrapped paper', bestFor: 'Flowers, hats, luxury gifts' },
  { slug: 'triangle-tube-box', name: 'Triangle tube box', category: 'Special shapes', unitPrice: 1.6,
    blurb: 'Three sides, no rolling, hard to ignore.',
    description: 'A triangular postal tube that cannot roll off a conveyor and stacks tightly. A good way to send posters, bottles or long products.',
    sizes: s('30 × 8 × 8', '50 × 10 × 10', '75 × 12 × 12'), board: 'White or kraft E-flute corrugated', bestFor: 'Posters, umbrellas, long products' },
  { slug: 'hexagon-box', name: 'Hexagon gift box', category: 'Special shapes', unitPrice: 6.1,
    blurb: 'Six sides for a gift that feels different.',
    description: 'A rigid six-sided box with a lift-off lid. The unusual shape reads as handmade and special, even in larger runs.',
    sizes: s('Ø 12 × 6', 'Ø 18 × 8', 'Ø 24 × 10'), board: '2 mm greyboard, wrapped paper', bestFor: 'Honey, sweets, cosmetics sets' },
  { slug: 'pillow-box', name: 'Pillow box', category: 'Special shapes', unitPrice: 0.75,
    blurb: 'Curved ends that fold shut without glue.',
    description: 'A light paperboard box with curved flaps. It ships flat, pops into shape in seconds and suits small, soft items.',
    sizes: s('10 × 7 × 2.5', '16 × 10 × 3.5', '24 × 14 × 5'), board: '350 gsm coated paperboard', bestFor: 'Scarves, samples, party favours' },
  { slug: 'gable-box', name: 'Gable box', category: 'Special shapes', unitPrice: 1.25,
    blurb: 'A box with its own carry handle.',
    description: 'The lunch-box shape with a built-in handle. Customers carry it out of the shop, so your logo travels with them.',
    sizes: s('15 × 10 × 10', '22 × 14 × 14', '30 × 18 × 18'), board: '400 gsm kraft or white paperboard', bestFor: 'Takeaway, gift packs, events' },
  { slug: 'pizza-box', name: 'Pizza box', category: 'Food & drink', unitPrice: 0.85,
    blurb: 'Flat, vented and printed on the lid.',
    description: 'A food-grade corrugated pizza box with steam vents. Print the whole lid: it is the largest ad space on any takeaway order.',
    sizes: s('26 × 26 × 4', '33 × 33 × 4', '40 × 40 × 4'), board: 'Food-grade E-flute corrugated', bestFor: 'Pizzerias, bakeries, flat foods' },
  { slug: 'tall-cake-box', name: 'Tall cake box', category: 'Food & drink', unitPrice: 2.9,
    blurb: 'Extra height for layered cakes.',
    description: 'A tall box with a lift-off lid and a side window, sized for tiered and layered cakes. Sturdy base, easy to carry.',
    sizes: s('20 × 20 × 20', '26 × 26 × 26', '32 × 32 × 30'), board: 'Food-grade 450 gsm paperboard', bestFor: 'Celebration cakes, patisserie' },
  { slug: 'window-box', name: 'Window bakery box', category: 'Food & drink', unitPrice: 1.35,
    blurb: 'A clear window that shows what is inside.',
    description: 'A paperboard box with a clear film window in the lid, so the product does the selling. Ships flat and folds in seconds.',
    sizes: s('15 × 10 × 5', '22 × 15 × 6', '30 × 22 × 8'), board: 'Food-grade 350 gsm paperboard, PET window', bestFor: 'Macarons, doughnuts, pastries' },
  { slug: 'wine-bottle-box', name: 'Wine bottle box', category: 'Food & drink', unitPrice: 4.9,
    blurb: 'A tall rigid box for a single bottle.',
    description: 'A rigid presentation box sized for a standard 75 cl bottle, with an insert that keeps it centred. Made for foil logos.',
    sizes: s('1 bottle, 9 × 9 × 33', '2 bottles, 18 × 9 × 33', '3 bottles, 27 × 9 × 33'), board: '2 mm greyboard, wrapped paper', bestFor: 'Wineries, corporate gifts' },
  { slug: 'paper-tube', name: 'Paper tube', category: 'Food & drink', unitPrice: 2.2,
    blurb: 'A round canister with a snug lid.',
    description: 'A spiral-wound paper canister with a push-on lid. Keeps dry goods fresh and gives you a full wrap-around print.',
    sizes: s('Ø 6 × 10', 'Ø 8 × 14', 'Ø 10 × 20'), board: 'Spiral-wound paperboard, food-safe liner', bestFor: 'Tea, coffee, candles, powders' },
  { slug: 'tuck-end-carton', name: 'Tuck-end carton', category: 'Retail', unitPrice: 0.65,
    blurb: 'The slim shelf carton for bottles and jars.',
    description: 'A folding carton with tuck flaps at both ends. Light, precise and printed on every panel, for products that sit on a shelf.',
    sizes: s('4 × 4 × 12', '6 × 6 × 16', '8 × 8 × 20'), board: '350 gsm coated paperboard', bestFor: 'Skincare, supplements, small electronics' },
  { slug: 'shoe-box', name: 'Shoe box', category: 'Retail', unitPrice: 2.4,
    blurb: 'Hinged lid, stackable, built for retail.',
    description: 'A corrugated shoe box with a hinged lid and finger notch. Print the lid and both ends so it is easy to find on a stockroom shelf.',
    sizes: s('Kids, 24 × 15 × 9', 'Adult, 33 × 21 × 12', 'Boots, 36 × 30 × 13'), board: 'White or kraft E-flute corrugated', bestFor: 'Footwear, accessories' },
];

export const findProduct = (slug: string) => CATALOG.find(p => p.slug === slug);
