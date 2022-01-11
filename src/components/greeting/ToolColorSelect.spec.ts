import { mount } from '@vue/test-utils';
import ToolColorSelect from './ToolColorSelect.vue';

describe('ToolColorSelect.vue', () => {
  it('should hide/show the options when the toggle button is clicked', () => {
    const wrapper = mount(ToolColorSelect);

    const options = wrapper.find('[data-testid="options"]');
    expect(options.isVisible()).toBeFalsy();

    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');
    expect(options.isVisible()).toBeTruthy();

    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');
    expect(options.isVisible()).toBeFalsy();
  });

  it('should send the "colorSelected" event when a color is chosen', () => {
    const wrapper = mount(ToolColorSelect);
    wrapper.find('[data-testid="toggle-text-align"]').trigger('click');

    const btn = wrapper.find('[data-testid="option-1"]');
    btn.trigger('click');

    const events = wrapper.emitted('colorSelected');
    expect(events).toHaveLength(1);
    expect(events).toEqual([['#d81b60']]);
  });
});
