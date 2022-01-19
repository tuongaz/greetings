export interface Block {
  id: string;
  cardId: string;
  pageId: number;
  editable?: boolean;
  type: string;
  top: number;
  left: number;
  width: number;
  isHidden?: boolean;
  [key: string]: any;
}

export interface App {
  activePageId?: number;
  editBlock?: Block;
}

export interface Page {
  id: number;
  cardId: string;
  type?: 'front' | 'back';
}

export interface Card {
  id: string;
}

export interface State {
  app: App;
  card: Card | null;
  pages: Page[];
  blocks: Block[];
}
