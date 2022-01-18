export interface App {
  activeBlockId?: string;
}

export interface Block {
  id: string;
  cardId: string;
  pageId: string;
  editable?: boolean;
  type: string;
  top: number;
  left: number;
  width: number;
  [key: string]: any;
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
