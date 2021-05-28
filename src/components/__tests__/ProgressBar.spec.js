import {shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'
let wrapper = null
beforeEach(() => {
  jest.useFakeTimers()
  wrapper = shallowMount(ProgressBar)
})
describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    expect(wrapper.classes()).toContain('hidden') // #A
  })

  test('initializes with 0% width', () => {
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('displays the bar when start is called', () => {
    expect(wrapper.classes()).toContain('hidden')

    wrapper.vm.start()
    // nextTick is used cuz the dom update is happing async

    expect(wrapper.classes()).not.toContain('hidden')
  })

  test('sets the bar to 100% width when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('set the bar to 0% width when start is called', () => {
    wrapper.vm.finish()
    wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('progress bar appers by increasing width 1% every 100ms', () => {
    wrapper.vm.start()
    jest.runTimersToTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    jest.runTimersToTime(900)
    expect(wrapper.element.style.width).toBe('10%')
    jest.runTimersToTime(4000)
    expect(wrapper.element.style.width).toBe('50%')
  })

  test('interval is cleared after calling finish func', () => {
    jest.spyOn(window, 'clearInterval')
    setInterval.mockReturnValue(123)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(window.clearInterval).toHaveBeenCalledWith(123)
  })
})
