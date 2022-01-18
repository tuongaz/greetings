import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import {
  DELETE_BLOCK as DELETE_BLOCK_ACTION,
  GET_CARD,
  CREATE_BLOCK as CREATE_BLOCK_ACTION
} from './action_types';
import {
  DELETE_BLOCK,
  SET_CARD,
  SET_ACTIVE_BLOCK,
  CREATE_BLOCK
} from './mutation_types';
import { State, Card, Page, Block } from './models';

export interface DeleteBlockPayload {
  blockId: string;
}

export interface SetCardPayload {
  card: Card;
  pages: Page[];
  blocks: Block[];
}

export interface SetActiveBlockPayload {
  blockId: string;
}

export interface CreateBlockPayload {
  block: Block;
}

export const key: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
  state: {
    card: null,
    pages: [],
    blocks: [],
    app: {}
  },
  getters: {
    getBlocksByPageID:
      (st: State) =>
      (pageId: string): Block[] =>
        st.blocks.filter((b) => b.pageId === pageId),
    getPages: (st: State) => (): Page[] => st.pages,
    getBlockByID:
      (st: State) =>
      (blockId: string): Block | undefined =>
        st.blocks.find((b) => b.id === blockId),
    hasActiveBlockId: (st: State) => () => st.app.activeBlockId !== undefined
  },
  mutations: {
    [DELETE_BLOCK](state: State, { blockId }: DeleteBlockPayload) {
      state.blocks = state.blocks.filter((b) => b.id !== blockId);
    },
    [SET_CARD](state: State, { card, pages, blocks }: SetCardPayload) {
      state.card = card;
      state.blocks = blocks;
      state.pages = pages;
    },
    [SET_ACTIVE_BLOCK](state: State, { blockId }: SetActiveBlockPayload) {
      state.app.activeBlockId = blockId;
    },
    [CREATE_BLOCK](state: State, { block }: CreateBlockPayload) {
      state.blocks = [...state.blocks, block];
    }
  },
  actions: {
    async [DELETE_BLOCK_ACTION](
      { commit }: ActionContext<State, State>,
      { blockId }: any
    ) {
      commit(DELETE_BLOCK, { blockId });
    },
    async [CREATE_BLOCK_ACTION](
      { commit }: ActionContext<State, State>,
      { type, cardId, pageId }
    ) {
      const block: Block = {
        id: uuidv4(),
        cardId,
        pageId,
        type,
        top: 200,
        left: 200,
        width: 200,
        text: 'here is the text example',
        editable: true,
        fontFamily: 'Arial'
      };
      commit(CREATE_BLOCK, { block });
    },
    async [GET_CARD]({ commit }: ActionContext<State, State>, { cardId }: any) {
      await new Promise((res) => {
        // simulate loading data takes 1 second.
        setTimeout(res, 100);
      });
      // get detail based on cardId
      const _ = cardId;

      const card = {
        id: 'card1'
      };
      const pages = [
        {
          id: 'page0',
          cardId: 'card0',
          order: 1
        },
        {
          id: 'page1',
          cardId: 'card1',
          order: 2
        },
        {
          id: 'page2',
          cardId: 'card1',
          order: 3
        },
        {
          id: 'page3',
          cardId: 'card1',
          order: 4
        },
        {
          id: 'page4',
          cardId: 'card1',
          order: 5
        }
      ];
      const blocks: Block[] = [
        {
          id: 'block0',
          cardId: 'card0',
          pageId: 'page0',
          type: 'blocktext',
          top: 120,
          left: 20,
          width: 300,
          text: 'This is the first page content. Very cool heh?',
          fontFamily: 'Times New Roman',
          fontStyle: 'italic',
          editable: true,
          textAlign: 'center'
        },
        {
          id: 'block1',
          cardId: 'card1',
          pageId: 'page1',
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
          pageId: 'page1',
          type: 'blockimage',
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
          pageId: 'page1',
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
