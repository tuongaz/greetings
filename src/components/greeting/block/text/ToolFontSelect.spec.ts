import { mount } from '@vue/test-utils';
import ToolFontSelect from './ToolFontSelect.vue';

describe('ToolFontSelect.vue', () => {
  it('should hide/show the options when the toggle button is clicked', () => {
    const wrapper = mount(ToolFontSelect);

    const options = wrapper.find('[data-testid="options"]');
    expect(options.isVisible()).toBeFalsy();

    wrapper.find('[data-testid="toggle-font-select"]').trigger('click');
    expect(options.isVisible()).toBeTruthy();

    wrapper.find('[data-testid="toggle-font-select"]').trigger('click');
    expect(options.isVisible()).toBeFalsy();
  });

  it('should send the "fontSelected" event when a font is chosen', () => {
    const wrapper = mount(ToolFontSelect);
    wrapper.find('[data-testid="toggle-font-select"]').trigger('click');

    const btn = wrapper.find('[data-testid="option-1"]');
    btn.trigger('click');

    const events = wrapper.emitted('fontSelected');
    expect(events).toHaveLength(1);
  });
});
