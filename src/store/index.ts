import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex';
import { BLOCK_TEXT_CHANGE } from './action_types';
import { UPDATE_BLOCK } from './mutation_types';

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

export interface UpdateBlockPayload {
  blockId: string;
  data: {
    [key: string]: any;
  };
}

export interface State {
  pages: Page[];
  blocks: Block[];
}

export const key: InjectionKey<Store<State>> = Symbol('hi');

function updateBlock(
  state: State,
  blockId: string,
  data: {
    [key: string]: any;
  },
): void {
  const idx = state.blocks.findIndex((b) => b.id === blockId);
  if (idx === -1) {
    return;
  }

  state.blocks[idx] = { ...state.blocks[idx], ...data } as Block;
  console.log('updated');
}

export const store = createStore<State>({
  state: {
    pages: [
      {
        id: 'page1',
        order: 1,
      },
    ],
    blocks: [
      {
        id: 'block1',
        pageId: 'page1',
        type: 'message',
        top: 0,
        left: 0,
        width: 300,
        text: 'Congratulations on your graduation and best wishes for your next adventure!',
        fontFamily: 'Times New Roman',
        fontSize: 20,
        fontColor: '#EAAABB',
        fontStyle: 'italic',
      },
      {
        id: 'block2',
        pageId: 'page1',
        type: 'message',
        top: 200,
        left: 200,
        width: 300,
        text: 'Hello world 2',
        editable: true,
        fontFamily: 'Helvetica',
        fontSize: 22,
      },
    ],
  },
  getters: {
    getBlocksByPageID:
      (st: State) => (pageId: string): Block[] => st.blocks.filter((b) => b.pageId === pageId),
    getBlockByID:
      (st: State) => (blockId: string): Block|undefined => st.blocks.find((b) => b.id === blockId),
  },
  mutations: {
    [UPDATE_BLOCK](state: State, payload: UpdateBlockPayload): void {
      updateBlock(state, payload.blockId, payload.data);
    },
  },
  actions: {
    async [BLOCK_TEXT_CHANGE]({ commit }: ActionContext<State, State>, { blockId, text }: any) {
      commit(UPDATE_BLOCK, { blockId, data: { text } });
    },
  },
  modules: {},
});

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
