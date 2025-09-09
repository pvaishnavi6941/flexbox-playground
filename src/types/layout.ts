export interface FlexboxProperties {
  display: 'flex' | 'block';
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  gap: number;
}

export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  properties: FlexboxProperties;
  itemCount: number;
  icon: string;
}

export interface LayoutItem {
  id: string;
  label: string;
  customStyles?: React.CSSProperties;
}