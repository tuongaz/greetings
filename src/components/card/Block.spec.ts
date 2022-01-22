import { mount } from '@vue/test-utils';
import Block from './Block.vue';

const block = {
  id: 'block1',
  pageId: 'page1',
  type: 'blocktext',
  top: 0,
  left: 0,
  width: 300,
  text: 'example text',
  fontFamily: 'Times New Roman',
  fontColor: '#EAAABB',
  fontStyle: 'italic',
  textAlign: 'center'
};

describe('Block.vue', () => {
  it('should render block', () => {
    const wrapper = mount(Block, {
      propsData: {
        block
      }
    } as any);
    expect(wrapper.text()).toBe('example text');
  });

  it('should render block with editing mode', () => {
    const wrapper = mount(Block, {
      propsData: {
        block
      },
      data() {
        return { editing: true };
      }
    } as any);

    wrapper.find('[data-testid="resize-left"]').isVisible();
    wrapper.find('[data-testid="resize-right"]').isVisible();
    wrapper.find('[data-testid="save-block"]').isVisible();
    wrapper.find('[data-testid="delete-block"]').isVisible();
  });
});
