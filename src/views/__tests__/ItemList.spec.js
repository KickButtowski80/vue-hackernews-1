jest.mock('../../api/api.js')

import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises'
import { fetchListData } from '../../api/api'


describe('ItemList.vue', () => {
  test('renders an Item with data for each item', async () => { // 199
    expect.assertions(4)
    const $bar = {
      start: () => { },
      finish: () => { }
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    fetchListData.mockResolvedValueOnce(items)
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)

    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => { }
    }
    shallowMount(ItemList, {
      mocks: {
        $bar
      }
    })
    expect($bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => { },
      finish: jest.fn()
    }
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1)
    const $bar = {
      start: jest.fn(),
      fail: jest.fn()
    }

    fetchListData.mockRejectedValueOnce()
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()

    expect($bar.fail).toHaveBeenCalled()
  })
  test('fetches data', async () => {
    // be sure all the assertions execute before the test finishes.
    expect.assertions(1)
    const data = await fetchListData()
    await flushPromises()
    expect(data).toEqual([])
  })
})
