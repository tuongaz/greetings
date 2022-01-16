import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex';
import { DELETE_BLOCK as DELETE_BLOCK_ACTION, GET_CARD } from './action_types';
import { DELETE_BLOCK, SET_CARD } from './mutation_types';

export interface Block {
  id: string;
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
  card: Card | null;
  pages: Page[];
  blocks: Block[];
}

export interface DeleteBlockPayload {
  blockId: string;
}

export interface SetCardPayload {
  card: Card;
  pages: Page[];
  blocks: Block[];
}

export const key: InjectionKey<Store<State>> = Symbol('hi');

export const store = createStore<State>({
  state: {
    card: null,
    pages: [],
    blocks: []
  },
  getters: {
    getBlocksByPageID:
      (st: State) =>
      (pageId: string): Block[] =>
        st.blocks.filter((b) => b.pageId === pageId),
    getBlockByID:
      (st: State) =>
      (blockId: string): Block | undefined =>
        st.blocks.find((b) => b.id === blockId)
  },
  mutations: {
    [DELETE_BLOCK](state: State, { blockId }: DeleteBlockPayload) {
      state.blocks = state.blocks.filter((b) => b.id !== blockId);
    },
    [SET_CARD](state: State, { card, pages, blocks }: SetCardPayload) {
      state.card = card;
      state.blocks = blocks;
      state.pages = pages;
    }
  },
  actions: {
    async [DELETE_BLOCK_ACTION](
      { commit }: ActionContext<State, State>,
      { blockId }: any
    ) {
      commit(DELETE_BLOCK, { blockId });
    },

    async [GET_CARD]({ commit }: ActionContext<State, State>, { cardId }: any) {
      await new Promise((res) => {
        // simulate loading data takes 1 second.
        setTimeout(res, 1000);
      });
      // get detail based on cardId
      const _ = cardId;

      const card = {
        id: 'card1'
      };
      const pages = [
        {
          id: 'page1',
          cardId: 'card1',
          order: 1
        }
      ];
      const blocks = [
        {
          id: 'block1',
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
  },
  modules: {}
});

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
