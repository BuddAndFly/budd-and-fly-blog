/**
 * Le Visa Budd&Fly : 10 questions, 6 jauges, 4 profils.
 * Le même modèle doit servir à l'application pour que le profil suive la personne.
 * Chaque jauge va de 0 (gauche) à 100 (droite).
 */
export const AXES = [
  { id: 'rythme', left: 'Lent', right: 'Intense' },
  { id: 'organisation', left: 'Tout planifié', right: 'Improvisé' },
  { id: 'confort', left: 'Simple', right: 'Confort' },
  { id: 'social', left: 'Entre nous', right: 'En groupe' },
  { id: 'horaires', left: 'Lève-tôt', right: 'Couche-tard' },
  { id: 'soirees', left: 'Soirées calmes', right: 'Fête' },
] as const;

export type AxisId = (typeof AXES)[number]['id'];
export type Scores = Partial<Record<AxisId, number>>;

export const PROFILES = {
  explorateur: {
    name: 'Explorateur libre',
    line: 'Un billet, un sac, et le reste se décide sur place.',
    text: "Tu voyages léger et tu laisses une vraie place à l'imprévu. Les lieux peu connus t'attirent plus que les incontournables, et tu préfères un trajet en bus local à un transfert privé.",
    tips: ['Réserve au moins la première nuit : tu arrives souvent tard.', 'Garde une marge dans ton budget pour les détours.', "Ton binôme idéal accepte de changer de plan en route."],
    proto: { rythme: 60, organisation: 80, confort: 25, social: 55, horaires: 50, soirees: 45 },
  },
  energique: {
    name: 'Énergique',
    line: 'Des journées pleines, des soirées aussi.',
    text: "Tu veux tout voir et tout vivre : visites le jour, sorties le soir, rencontres partout. Tu repars fatigué mais avec mille souvenirs.",
    tips: ['Prévois une journée calme tous les 4 ou 5 jours.', 'Les auberges et les visites en groupe sont faites pour toi.', 'Ton binôme idéal suit le rythme, ou assume de faire sa journée seul.'],
    proto: { rythme: 85, organisation: 55, confort: 40, social: 85, horaires: 75, soirees: 85 },
  },
  lent: {
    name: 'Voyageur lent',
    line: 'Trois villes bien vécues plutôt que huit survolées.',
    text: "Tu prends le temps : moins d'étapes, plus de profondeur. Un bon lit, un café au soleil, une balade sans but : c'est là que le voyage commence pour toi.",
    tips: ['Choisis 2 ou 3 bases et rayonne autour.', 'Pars hors saison : tu profiteras du calme.', 'Ton binôme idéal ne compte pas les visites.'],
    proto: { rythme: 25, organisation: 50, confort: 65, social: 35, horaires: 40, soirees: 25 },
  },
  stratege: {
    name: 'Stratège',
    line: 'Tout est prévu, et c’est pour ça que tout se passe bien.',
    text: "Tu prépares, tu compares, tu optimises. Tu sais où tu dors chaque soir et combien coûte chaque trajet, ce qui te laisse l'esprit libre une fois sur place.",
    tips: ['Garde une demi-journée libre par étape pour les découvertes.', 'Partage ton planning : ton binôme appréciera.', "Ton binôme idéal aime qu'on s'occupe de l'organisation."],
    proto: { rythme: 60, organisation: 15, confort: 55, social: 40, horaires: 30, soirees: 35 },
  },
} as const;

export type ProfileId = keyof typeof PROFILES;

export type Option = { label: string; hint: string; set: Scores; meta?: Record<string, string> };
export type Question = { tag: string; title: string; options: Option[] };

export const QUESTIONS: Question[] = [
  { tag: 'Rythme', title: 'Ta journée idéale en voyage ?', options: [
    { label: 'Trois visites et un bon dîner', hint: 'Je veux tout voir', set: { rythme: 90 } },
    { label: 'Une visite, puis une terrasse', hint: "L'équilibre", set: { rythme: 45 } },
    { label: 'Aucun plan, on verra bien', hint: 'Je me laisse porter', set: { rythme: 30, organisation: 90 } },
  ] },
  { tag: 'Organisation', title: 'Avant de partir, tu as réservé…', options: [
    { label: 'Tout, nuit par nuit', hint: "Je déteste l'incertitude", set: { organisation: 10 } },
    { label: 'Les premières nuits', hint: 'Le reste, on verra', set: { organisation: 50 } },
    { label: "Le billet d'avion, c'est tout", hint: "L'aventure commence à l'arrivée", set: { organisation: 90 } },
  ] },
  { tag: 'Imprévus', title: 'Ton train est annulé. Tu…', options: [
    { label: 'Sors ton plan B', hint: "Je l'avais prévu", set: { organisation: 15 } },
    { label: "Demandes à quelqu'un du coin", hint: 'On trouvera ensemble', set: { organisation: 60, social: 70 } },
    { label: 'Restes une nuit de plus', hint: "C'est peut-être un signe", set: { organisation: 90, rythme: 25 } },
  ] },
  { tag: 'Confort', title: 'Pour dormir, tu choisis…', options: [
    { label: 'Une auberge, en dortoir', hint: 'Pas cher et on rencontre du monde', set: { confort: 15, social: 75 } },
    { label: 'Une chambre simple et propre', hint: "L'essentiel suffit", set: { confort: 50 } },
    { label: 'Un hôtel qui a du charme', hint: 'Le lieu fait partie du voyage', set: { confort: 90 } },
  ] },
  { tag: 'Réveil', title: 'En vacances, tu te lèves…', options: [
    { label: 'À 6 h, pour le lever du soleil', hint: 'Lève-tôt assumé', set: { horaires: 10 } },
    { label: 'Vers 8 h', hint: 'Raisonnable', set: { horaires: 45 } },
    { label: 'Pas avant 10 h', hint: "Les vacances, c'est sacré", set: { horaires: 90 } },
  ] },
  { tag: 'Soirées', title: 'Le soir, tu es plutôt…', options: [
    { label: 'Bar, concert, on sort', hint: 'La nuit fait partie du voyage', set: { soirees: 90, social: 80, horaires: 80 } },
    { label: 'Un verre tranquille', hint: 'Et au lit pas trop tard', set: { soirees: 45 } },
    { label: 'Au lit tôt', hint: 'Demain, on part à l’aube', set: { soirees: 10, horaires: 20 } },
  ] },
  { tag: 'Rencontres', title: 'Rencontrer du monde en voyage ?', options: [
    { label: 'Je vais vers les gens', hint: "C'est la meilleure partie", set: { social: 85 } },
    { label: "Si l'occasion se présente", hint: 'Sans forcer', set: { social: 50 } },
    { label: 'Je préfère rester entre nous', hint: 'Le calme avant tout', set: { social: 15 } },
  ] },
  { tag: 'Budget', title: 'Ton budget par jour, hors vols ?', options: [
    { label: 'Moins de 50 €', hint: 'Malin et débrouillard', set: { confort: 20 }, meta: { budget: 'moins de 50 €' } },
    { label: 'De 50 à 100 €', hint: 'Raisonnable', set: { confort: 50 }, meta: { budget: '50 à 100 €' } },
    { label: 'Plus de 100 €', hint: 'Je me fais plaisir', set: { confort: 85 }, meta: { budget: 'plus de 100 €' } },
  ] },
  { tag: 'Envie', title: "Ce qui te fait le plus envie ?", options: [
    { label: 'Nature et randonnée', hint: 'Grand air', set: { rythme: 70 }, meta: { envie: 'nature' } },
    { label: 'Villes et culture', hint: 'Musées, architecture, histoire', set: { rythme: 55 }, meta: { envie: 'culture' } },
    { label: 'Me reposer', hint: 'Plage, spa, lecture', set: { rythme: 15, confort: 75 }, meta: { envie: 'detente' } },
    { label: 'Vivre comme les locaux', hint: 'Marchés, quartiers, rencontres', set: { organisation: 70, social: 65 }, meta: { envie: 'immersion' } },
  ] },
  { tag: 'À deux', title: 'Ton binôme veut autre chose que toi. Tu…', options: [
    { label: 'Proposes chacun sa journée', hint: 'On se retrouve le soir', set: { social: 30 } },
    { label: 'Cherches un compromis', hint: 'Un peu des deux', set: { social: 50 } },
    { label: 'Suis le mouvement', hint: "Tant qu'on est ensemble", set: { social: 70, organisation: 70 } },
  ] },
];

/** Moyenne des réponses par jauge, puis profil le plus proche. */
export function computeVisa(answers: Option[]) {
  const sums: Record<string, number[]> = {};
  const meta: Record<string, string> = {};
  for (const a of answers) {
    for (const [k, v] of Object.entries(a.set)) (sums[k] ??= []).push(v as number);
    Object.assign(meta, a.meta ?? {});
  }
  const scores = Object.fromEntries(
    AXES.map((ax) => {
      const vals = sums[ax.id] ?? [50];
      return [ax.id, Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)];
    }),
  ) as Record<AxisId, number>;
  let best: ProfileId = 'explorateur';
  let bestDist = Infinity;
  for (const [id, p] of Object.entries(PROFILES) as [ProfileId, (typeof PROFILES)[ProfileId]][]) {
    const d = AXES.reduce((s, ax) => s + (scores[ax.id] - p.proto[ax.id]) ** 2, 0);
    if (d < bestDist) { bestDist = d; best = id; }
  }
  return { profile: best, scores, meta };
}
