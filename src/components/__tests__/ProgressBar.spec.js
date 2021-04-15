import { mount, shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden') // #A
  })

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('displays the bar when start is called', () => {
    const wrapper = mount(ProgressBar)
   
    expect(wrapper.classes()).toContain('hidden')
     
     wrapper.vm.start()
    // nextTick is used cuz the dom update is happing async
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).not.toContain("hidden");
    });
 
  })

  test('sets the bar to 100% width when finish is called', () => {
    
  })
})
