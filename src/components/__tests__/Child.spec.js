import { shallowMount } from '@vue/test-utils'
import Child from '../Child.vue'
import TestComponent from '../TestComponent.vue'

describe('Child Component', () => {
    test('render correct prop value', () => {
        const wrapper = shallowMount(TestComponent)
        const child = wrapper.findComponent(Child)
        expect(child.props().testProp).toBe('some-value')
    })
})