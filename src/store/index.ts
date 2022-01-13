import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex';
import { DELETE_BLOCK as DELETE_BLOCK_ACTION } from './action_types';
import { DELETE_BLOCK } from './mutation_types';

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
  order: number;
}

export interface DeleteBlockPayload {
  blockId: string;
}

export interface State {
  pages: Page[];
  blocks: Block[];
}

export const key: InjectionKey<Store<State>> = Symbol('hi');

function deleteBlock(state: State, blockId: string) {
  state.blocks = state.blocks.filter((b) => b.id !== blockId);
}

function updateBlock(
  state: State,
  blockId: string,
  data: {
    [key: string]: any;
  }
): void {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx === -1) {
    return;
  }

  state.blocks[idx] = { ...state.blocks[idx], ...data } as Block;
}

export const store = createStore<State>({
  state: {
    pages: [
      {
        id: 'page1',
        order: 1
      }
    ],
    blocks: [
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
    ]
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
    [DELETE_BLOCK](state: State, { blockId }: DeleteBlockPayload): void {
      deleteBlock(state, blockId);
    }
  },
  actions: {
    async [DELETE_BLOCK_ACTION](
      { commit }: ActionContext<State, State>,
      { blockId }: any
    ) {
      commit(DELETE_BLOCK, { blockId });
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
