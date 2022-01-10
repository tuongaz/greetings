import { mount } from '@vue/test-utils';
import ToolTextAlign from './ToolTextAlign.vue';

describe('ToolTextAlign.vue', () => {
  it('should hide/show the options when the toggle button is clicked', () => {
    const wrapper = mount(ToolTextAlign);

    const options = wrapper.find('[data-testid="options"]');
    expect(options.isVisible()).toBeFalsy();

    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');
    expect(options.isVisible()).toBeTruthy();

    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');
    expect(options.isVisible()).toBeFalsy();
  });

  it('should send "left" event when the left button is clicked', () => {
    const wrapper = mount(ToolTextAlign);
    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');

    const btn = wrapper.find('[data-testid="select-left"]');
    btn.trigger('click');

    const events = wrapper.emitted('optionSelected');
    expect(events).toHaveLength(1);
    expect(events).toEqual([['left']]);
  });

  it('should send "center" event when the center button is clicked', () => {
    const wrapper = mount(ToolTextAlign);
    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');

    const btn = wrapper.find('[data-testid="select-center"]');
    btn.trigger('click');

    const events = wrapper.emitted('optionSelected');
    expect(events).toHaveLength(1);
    expect(events).toEqual([['center']]);
  });

  it('should send "right" event when the right button is clicked', () => {
    const wrapper = mount(ToolTextAlign);
    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');

    const btn = wrapper.find('[data-testid="select-right"]');
    btn.trigger('click');

    const events = wrapper.emitted('optionSelected');
    expect(events).toHaveLength(1);
    expect(events).toEqual([['right']]);
  });
});
