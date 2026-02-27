export interface ResourceItem {
  id: string;
  url: string;
  name: string;
  thumbnail_url?: string;
  type?: 'image' | 'video' | 'audio';
}

export interface MenuPosition {
  left: string;
  top: string;
}

export interface PreviewPosition {
  left: string;
  top: string;
  transform?: string;
}
