export type AspectRatio = '16:9' | '9:16' | '21:9' | '3:4' | '4:3' | 'auto';
export type ArrowStyle = 'modern' | 'classic' | 'minimal' | 'none';
export type ArrowColor = 'white' | 'black' | 'red';

export interface Settings {
  aspectRatio: AspectRatio;
  thenLabel: string;
  nowLabel: string;
  arrowStyle: ArrowStyle;
  arrowColor: ArrowColor;
}

export interface AspectRatioValue {
  width: number;
  height: number;
}
