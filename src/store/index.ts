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
  SET_ACTIVE_PAGE
} from './mutation_types';
import { State, Card, Page, Block } from './models';

export interface DeleteBlockPayload {
  blockId: string;
}
export interface SetActivePagePayload {
  pageId: string;
}

export interface UpdateBlockPayload {
  blockId: string;
  data: {
    [key: string]: any;
  };
}

export interface SetCardPayload {
  card: Card;
  pages: Page[];
  blocks: Block[];
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
    card: null,
    pages: [],
    blocks: [],
    app: {}
  },
  getters: {
    getEditBlock: (st: State) => (): Block | undefined => st.app.editBlock,
    getBlocksByPageID:
      (st: State) =>
      (pageId: string): Block[] =>
        st.blocks.filter((b) => b.pageId === pageId && !b.isHidden),
    getPages: (st: State) => (): Page[] => st.pages,
    hasEditingBlock: (st: State) => () => st.app.editBlock !== undefined
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
    [SET_ACTIVE_PAGE](state: State, { pageId }: SetActivePagePayload) {
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
      { commit }: ActionContext<State, State>,
      payload: UpdateBlockPayload
    ) {
      commit(UPDATE_BLOCK, payload);
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
      // get detail based on cardId
      const _ = cardId;

      const card = {
        id: 'card1'
      };
      const pages: Page[] = [
        {
          id: 'front',
          cardId: 'card1',
          type: 'front'
        },
        {
          id: 'page1',
          cardId: 'card1'
        },
        {
          id: 'page2',
          cardId: 'card1'
        },
        {
          id: 'back',
          type: 'back',
          cardId: 'card1'
        }
      ];
      const blocks: Block[] = [
        {
          id: 'front',
          cardId: 'card0',
          pageId: 'front',
          type: 'blocktext',
          top: 120,
          left: 20,
          width: 300,
          text: 'COVER PAGE',
          editable: false
        },
        {
          id: 'back',
          cardId: 'card0',
          pageId: 'back',
          type: 'blocktext',
          top: 120,
          left: 350,
          width: 300,
          text: 'BACK PAGE',
          editable: false
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
