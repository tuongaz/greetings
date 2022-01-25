export interface Block {
  id: string;
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
  type?: 'front' | 'back' | 'content';
  [key: string]: any;
}

export interface Card {
  id?: string;
  recipientName?: string;
  recipientEmail?: string;
  senderName?: string;
  deliveryDateTime?: string;
  deliveryTimeZone?: string;
}

export interface State {
  app: App;
  card?: Card;
  pages: Page[];
  blocks: Block[];
}
