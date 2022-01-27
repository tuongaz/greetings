import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import {
  DELETE_BLOCK as DELETE_BLOCK_ACTION,
  GET_CARD,
  CREATE_BLOCK as CREATE_BLOCK_ACTION,
  UPDATE_BLOCK as UPDATE_BLOCK_ACTION
} from './action_types';
import {
  DELETE_BLOCK,
  SET_CARD,
  CREATE_BLOCK,
  SET_EDIT_BLOCK,
  UPDATE_BLOCK,
  SET_ACTIVE_PAGE,
  ADD_NEW_PAGE
} from './mutation_types';
import { State, Card, Page, Block, App } from './models';
import { getColor, getFont } from '@/config';

export const coverPageId = 0;
export const backPageId = -1;

export interface DeleteBlockPayload {
  blockId: string;
}

export interface GetCardPayload {
  activePageNumber: number;
  cardId: string;
}
export interface SetActivePagePayload {
  pageId?: number;
  index?: number;
}

export interface UpdateBlockPayload {
  blockId: string;
  data: {
    [key: string]: any;
  };
}

export interface SetCardPayload {
  card: Card;
  coverPage: Page;
  backPage: Page;
  pages: Page[];
  blocks: Block[];
  app: App;
}

export interface SetEditBlockPayload {
  blockId: string;
}

export interface CreateBlockPayload {
  block: Block;
}

export const key: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
  state: {
    card: undefined,
    pages: [],
    blocks: [],
    app: {}
  },
  getters: {
    getEditingBlock: (st: State) => (): Block | undefined => st.app.editBlock,
    activePageNumber: (st: State) => (): number => {
      return st.pages.findIndex((p) => p.id === st.app.activePageId) + 1;
    },
    getActivePage: (st: State) => (): Page | undefined => {
      return st.pages.find((p) => p.id === st.app.activePageId);
    },
    isPageActive: (st: State) => (pageId: number) => {
      return pageId === st.app.activePageId;
    },
    getBlocksByPageID:
      (st: State) =>
      (pageId: number): Block[] =>
        st.blocks.filter((b) => b.pageId === pageId && !b.isHidden),
    getPages: (st: State) => (): Page[] => st.pages,
    totalPages: (st: State) => (): number => st.pages.length,
    hasEditingBlock: (st: State) => () => st.app.editBlock !== undefined,
    coverPage: (st: State) => () => {
      return st.pages[0];
    },
    backPage: (st: State) => () => {
      return st.pages[st.pages.length - 1];
    },
    getCard: (st: State) => () => {
      return st.card;
    },
    contentPages: (st: State) => () => {
      return st.pages.slice(1, st.pages.length - 1);
    }
  },
  mutations: {
    [DELETE_BLOCK](state: State, { blockId }: DeleteBlockPayload) {
      state.blocks = state.blocks.filter((b) => b.id !== blockId);
      state.app.editBlock = undefined;
    },
    [SET_CARD](state: State, { card, pages, blocks }: SetCardPayload) {
      state.card = card;
      state.blocks = blocks;
      state.pages = pages;
    },
    [SET_ACTIVE_PAGE](state: State, { pageId, index }: SetActivePagePayload) {
      if (index !== undefined) {
        const page = state.pages[index];
        if (page) {
          state.app.activePageId = page.id;
        }
        return;
      }

      state.app.activePageId = pageId;
    },
    [SET_EDIT_BLOCK](state: State, { blockId }: SetEditBlockPayload) {
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block) {
        return;
      }
      block.isHidden = true;
      state.app.editBlock = { ...block };
    },
    [UPDATE_BLOCK](state: State, { blockId, data }: UpdateBlockPayload) {
      state.blocks = state.blocks.map((b) => {
        if (b.id !== blockId) {
          return b;
        }

        const newBlock = { ...b, isHidden: false, ...data };

        return newBlock;
      });

      state.app.editBlock = undefined;
    },
    [CREATE_BLOCK](state: State, { block }: CreateBlockPayload) {
      state.blocks = [...state.blocks, block];
    },
    [ADD_NEW_PAGE](state: State) {
      state.pages.splice(state.pages.length - 1, 0, {
        id: state.pages.length
      });
    }
  },
  actions: {
    async [DELETE_BLOCK_ACTION](
      { commit }: ActionContext<State, State>,
      { blockId }: any
    ) {
      commit(DELETE_BLOCK, { blockId });
    },
    async [UPDATE_BLOCK_ACTION](
      { commit, state }: ActionContext<State, State>,
      payload: UpdateBlockPayload
    ) {
      commit(UPDATE_BLOCK, payload);

      // If this is the last page, create a new page
      const idx = state.pages.findIndex((p) => p.id === state.app.activePageId);
      if (idx === state.pages.length - 2) {
        // add new page
        commit(ADD_NEW_PAGE);
      }
    },
    async [CREATE_BLOCK_ACTION](
      { commit, state }: ActionContext<State, State>,
      { type }
    ) {
      const block: Block = {
        id: uuidv4(),
        pageId: state.app.activePageId || 0,
        type,
        top: 200,
        left: 200,
        width: 200,
        text: 'your message here...',
        editable: true,
        fontFamily: getFont(),
        fontColor: getColor(),
        textAlign: 'left'
      };
      commit(CREATE_BLOCK, { block });
      commit(SET_EDIT_BLOCK, { blockId: block.id });
    },
    async [GET_CARD](
      { commit }: ActionContext<State, State>,
      { activePageNumber, cardId }: GetCardPayload
    ) {
      await new Promise((resolve) => {
        console.log('loading card', cardId);
        setTimeout(resolve, 2000);
      });

      const card = {
        id: 'card1',
        recipientName: 'Tuong Le',
        recipientEmail: 'tuongaz@gmail.c.om',
        senderName: 'Bill Gates',
        deliveryDateTime: '2017-07-02 18:06:05.791337 +0000',
        deliveryTimeZone: 'Melbourne/Australia'
      };
      const pages: Page[] = [
        {
          id: 0,
          image: '/img/HBD-awesome-co-workers-PR-2021.gif'
        },
        {
          id: 1,
          cardId: 'card1',
          type: 'content'
        },
        {
          id: 2,
          cardId: 'card1',
          type: 'content'
        },
        {
          id: -1
        }
      ];
      const blocks: Block[] = [
        {
          id: 'block1',
          cardId: 'card1',
          pageId: 1,
          type: 'blocktext',
          top: 0,
          left: 0,
          width: 300,
          text: 'Congratulations on your graduation and best wishes',
          fontFamily: 'Times New Roman',
          fontColor: '#EAAABB',
          fontStyle: 'italic',
          textAlign: 'center'
        },
        {
          id: 'block2',
          cardId: 'card1',
          pageId: 1,
          type: 'blocktext',
          top: 200,
          left: 200,
          width: 200,
          text: 'Hello world 2',
          editable: true,
          fontFamily: 'Arial',
          fontColor: '#8e24aa',
          textAlign: 'right'
        },
        {
          id: 'block3',
          cardId: 'card1',
          pageId: 1,
          type: 'blocktext',
          top: 120,
          left: 100,
          width: 200,
          text: "I'm going to miss you so much\n From: Christina",
          fontFamily: 'Architects Daughter',
          fontColor: '#EAAABB',
          fontStyle: 'italic',
          editable: true,
          textAlign: 'center'
        }
      ];

      commit(SET_CARD, { card, pages, blocks });
      commit(SET_ACTIVE_PAGE, { index: activePageNumber - 1 });
    }
  }
});

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

export * from './models';
