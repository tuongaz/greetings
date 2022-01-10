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
});
