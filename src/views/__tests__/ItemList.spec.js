import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises'
import { fetchListData } from '../../api/__mocks__/api'

jest.mock('../../api/api.js')

describe('ItemList.vue', () => {
  test('renders an Item with data for each item', async () => {
    expect.assertions(4)
    const $bar = {
      start: jest.fn(),
      finish: () => { }
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    fetchListData.mockResolvedValueOnce(items)
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
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

  test('fetches data', async () => {
    expect.assertions(1)
    const data = await fetchListData()
    expect(data).toBe("some data")
  })

})
