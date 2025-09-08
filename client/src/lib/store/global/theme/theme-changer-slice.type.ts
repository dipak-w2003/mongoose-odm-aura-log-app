export type IThemeCheck = "night" | "day";

export interface ITheme {
  name: IThemeCheck;
  twc: string

}

// Themes list
export const themes: ITheme[] = [
  {
    name: "night",
    twc: "bg-[#111711] text-[#D3D3D3]",
  },
  {
    twc: "",
    name: "day",


  },
];

// Optional: Find theme by name
export const getTheme = (theme: IThemeCheck): ITheme =>
  themes.find((t) => t.name === theme)!;



export const activeTheme = getTheme("night")

/*
    black: '#000000',
          white: '#FFFFFF',
          gray1: '#5F5E5E',
          gray2: '#7D7F7D',
          gray3: '#848484',
          gray4: '#9D9696',
          gray5: '#DADADA',
          gray6: '#757474',
          gray7: '#757575',
          red1: '#4EB01C',
          green1: '#29E029',
          green2: '#1F8E1F',
          green3: '#336730',
          yellow1: '#DBAE3D',
          darkGreen1: '#293829',
          darkGreen2: '#1D271D',
          black1: '#D0D0D0', // closest to #D0D0D0
*/