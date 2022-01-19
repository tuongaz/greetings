export interface Block {
  id: string;
  cardId: string;
  pageId: string;
  editable?: boolean;
  type: string;
  top: number;
  left: number;
  width: number;
  isHidden?: boolean;
  [key: string]: any;
}

export interface App {
  activeBlockId?: string;
  activePageId?: string;
  editBlock?: Block;
}

export interface Page {
  id: string;
  cardId: string;
  order: number;
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
