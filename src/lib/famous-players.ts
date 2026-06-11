export type FamousPlayer = {
  name: string;
  country: string;
  flag: string;
};

export const famousPlayers: FamousPlayer[] = [
  { name: "Lionel Messi", country: "Argentina", flag: "🇦🇷" },
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹" },
  { name: "Kylian Mbappé", country: "France", flag: "🇫🇷" },
  { name: "Erling Haaland", country: "Norway", flag: "🇳🇴" },
  { name: "Neymar", country: "Brazil", flag: "🇧🇷" },
  { name: "Harry Kane", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Kevin De Bruyne", country: "Belgium", flag: "🇧🇪" },
  { name: "Luka Modrić", country: "Croatia", flag: "🇭🇷" },
  { name: "Mohamed Salah", country: "Egypt", flag: "🇪🇬" },
  { name: "Virgil van Dijk", country: "Netherlands", flag: "🇳🇱" },
  { name: "Pedri", country: "Spain", flag: "🇪🇸" },
  { name: "Jude Bellingham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Vinícius Júnior", country: "Brazil", flag: "🇧🇷" },
  { name: "Rodri", country: "Spain", flag: "🇪🇸" },
  { name: "Bukayo Saka", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Lamine Yamal", country: "Spain", flag: "🇪🇸" },
];

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 32;
