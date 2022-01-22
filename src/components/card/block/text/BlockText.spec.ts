import { mount } from '@vue/test-utils';
import BlockText from './BlockText.vue';

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

describe('BlockText.vue', () => {
  it('should render block', () => {
    const wrapper = mount(BlockText, {
      propsData: {
        block
      } as any
    });
    expect(wrapper.text()).toBe('example text');
  });

  it('should render block with editing mode', () => {
    const wrapper = mount(BlockText, {
      propsData: {
        block,
        editing: true
      } as any
    });
    wrapper.find('[data-testid="toggle-text-align"]').isVisible();
    wrapper.find('[data-testid="toggle-font-select"]').isVisible();
    wrapper.find('[data-testid="toggle-color-select"]').isVisible();
  });
});
